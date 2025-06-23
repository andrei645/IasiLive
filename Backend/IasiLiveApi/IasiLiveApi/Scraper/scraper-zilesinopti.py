import json
import os
import requests
from datetime import datetime
from dateparser import parse
from playwright.sync_api import sync_playwright


def clean_date(raw_text: str) -> str:
    if not raw_text:
        return datetime.utcnow().isoformat() + "Z"

    text = raw_text.split()[-2:]
    parsed = parse(" ".join(text), settings={"DATE_ORDER": "DMY"}, languages=["ro"])
    if parsed:
        return parsed.isoformat() + "Z"
    return datetime.utcnow().isoformat() + "Z"


def extract_events():
    url = "https://zilesinopti.ro/evenimente-iasi-2025/"
    events = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)
        page.wait_for_timeout(4000)

        cards = page.locator(".kzn-sw-item")
        count = cards.count()

        for i in range(count):
            try:
                title = cards.nth(i).locator(".kzn-sw-item-titlu").inner_text()
                category = cards.nth(i).locator(".kzn-sw-item-textsus").inner_text()
                summary = cards.nth(i).locator(".kzn-sw-item-sumar").inner_text()
                date_raw = cards.nth(i).locator(".kzn-one-event-date").inner_text()
                location = cards.nth(i).locator(".kzn-sw-item-adresa-eveniment").inner_text()

                date = clean_date(date_raw)

                events.append({
                    "title": title.strip() or "Eveniment fără titlu",
                    "description": summary.strip() or "Eveniment fără descriere",
                    "location": location.strip() or "Iași",
                    "date": date,
                    "category": category.strip() or "General",
                    "imageUrl": "https://via.placeholder.com/600x400"
                })
            except Exception as e:
                print(f"Error at event #{i}: {e}")

        browser.close()
    return events


def upload_events(events):
    url = "http://localhost:5298/api/Event"
    for event in events:
        try:
            r = requests.post(url, json=event)
            if r.status_code == 201:
                print(f"Event sent: {event['title']}")
            else:
                print(f"Eroare {r.status_code} la {event['title']}")
        except Exception as e:
            print(f"Error : {e}")


if __name__ == "__main__":
    print("scraping...")
    events = extract_events()
    print(f"Extracted {len(events)} events.")

    os.makedirs("data", exist_ok=True)
    with open("data/events.json", "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)

    upload_events(events)
