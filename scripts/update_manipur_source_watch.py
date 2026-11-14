#!/usr/bin/env python3
"""Manipur public-news discovery; never treats RSS results as verified incidents.

Writes data/manipur-source-watch.json. Only retains headlines and provider links.
Source reports must be reviewed separately before joining the historical event index.
"""
import datetime as dt
import email.utils
import html
import json
import pathlib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

OUT = pathlib.Path("data/manipur-source-watch.json")
QUERIES = [
    "Manipur violence when:7d",
    "Manipur shootings clashes when:7d",
    "Manipur Ukhrul Kangpokpi Senapati when:7d",
    "Manipur police arrest security forces when:7d",
    "Manipur displaced rehabilitation relief camp when:7d",
    "Manipur NIA court investigation when:7d",
]
PROVIDERS = [
    "news.google.com",
]
MAX_PER_FEED = 55
MAX_TOTAL = 150
USER_AGENT = "Manipur-Evidence-Research-Watch/1.0 (+public archive; no automated conclusions)"
now = dt.datetime.now(dt.timezone.utc)
last = None
if OUT.exists():
    try:
        last = json.loads(OUT.read_text(encoding="utf-8"))
    except (ValueError, OSError):
        last = None
if not isinstance(last, dict):
    last = {"status": "not_started", "items": [], "last_checked_utc": None}

results = {}
errors = []
ok = 0


def clean(v):
    s = html.unescape(str(v or ""))
    s = re.sub(r"\s+", " ", s)
    return s.strip()[:550]


def parsed_time(text):
    try:
        p = email.utils.parsedate_to_datetime(text or "")
        if p:
            if p.tzinfo is None:
                p = p.replace(tzinfo=dt.timezone.utc)
            return p.astimezone(dt.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    except (ValueError, TypeError, OverflowError):
        pass
    return None


def get_feed(query):
    args = urllib.parse.urlencode({"q": query, "hl": "en-IN", "gl": "IN", "ceid": "IN:en"})
    url = "https://news.google.com/rss/search?" + args
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml,application/xml;q=0.9"})
    with urllib.request.urlopen(req, timeout=24) as r:
        data = r.read(2_500_000)
    root = ET.fromstring(data)
    if root.tag.lower() not in {"rss", "rdf"} and not root.findall(".//item"):
        raise ValueError("No RSS entries found")
    return root.findall(".//item")[:MAX_PER_FEED]


for q in QUERIES:
    try:
        entries = get_feed(q)
        ok += 1
    except (urllib.error.URLError, TimeoutError, ET.ParseError, ValueError, OSError) as ex:
        errors.append(q + ": " + str(ex)[:160])
        continue
    for entry in entries:
        title = clean(entry.findtext("title"))
        link = clean(entry.findtext("link"))
        source = clean(entry.findtext("source") or "Google News / publisher headline")
        published = parsed_time(entry.findtext("pubDate"))
        if not title or len(title) < 12 or not link.startswith("https://"):
            continue
        if not re.search(r"\bmanipur\b|\bukhrul\b|\bkangpokpi\b|\bimphal\b|\bsenapati\b|\bchurachandpur\b|\bjiribam\b", title, re.I):
            continue
        if published:
            try:
                stamp = dt.datetime.fromisoformat(published.replace("Z", "+00:00"))
                if (now - stamp).days > 21 or stamp > now + dt.timedelta(days=1):
                    continue
            except (ValueError, TypeError):
                pass
        # Google News links are discovery links, not evidence of a source article's full content.
        # Article-level checking is a separate editorial process.
        identifier = re.sub(r"[^a-z0-9]+", " ", title.lower()).strip()[:150]
        if identifier in results:
            continue
        results[identifier] = {
            "title": title,
            "url": link,
            "source": source,
            "published_at": published,
            "category": q.replace(" when:7d", ""),
            "review_status": "unverified_rss_headline",
        }

if ok:
    items = sorted(results.values(), key=lambda r: r.get("published_at") or "", reverse=True)[:MAX_TOTAL]
    output = {
        "status": "ok",
        "last_checked_utc": now.isoformat(timespec="seconds").replace("+00:00", "Z"),
        "items": items,
        "query_count": len(QUERIES),
        "successful_queries": ok,
        "failed_queries": len(errors),
        "note": "Automated Google News RSS discovery. These are unverified headlines, not confirmed incidents or police alerts. Feed delays, duplicate reporting, geography errors and outages are possible.",
        "errors": errors[:8],
    }
else:
    output = {
        **last,
        "status": "unavailable",
        "last_attempt_utc": now.isoformat(timespec="seconds").replace("+00:00", "Z"),
        "note": "All RSS sources failed this run; retained previous checked timestamp and article leads. Data is stale until a successful fetch.",
        "errors": errors[:8],
    }
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print("Manipur RSS discovery:", {"successful_queries": ok, "items": len(output.get("items", [])), "status": output.get("status"), "errors": len(errors)})
if not ok:
    sys.exit(1)
