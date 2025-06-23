import json
import os
import requests
from datetime import datetime
from playwright.sync_api import sync_playwright


def extract_events():
    url = "https://360.uaic.ro/blog/category/noutati/"
    events = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)

        # Așteaptă până când articolele sunt prezente
        page.wait_for_selector("h2.entry-title a", timeout=7000)

        cards = page.locator(".entry")
        count = cards.count()
        print(f"🔍 Găsit {count} articole...")

        for i in range(count):
            try:
                card = cards.nth(i)
                title = card.locator("h2.entry-title a").inner_text()
                summary = card.locator("p").first.inner_text()
                link = card.locator("h2.entry-title a").get_attribute("href")

                # fallback: data = azi
                date = datetime.utcnow().isoformat() + "Z"

                events.append({
                    "title": title.strip(),
                    "description": summary.strip(),
                    "location": "Iași",
                    "date": date,
                    "category": "Students",
                    "imageUrl": "https://via.placeholder.com/600x400",
                    "externalUrl": link
                })
            except Exception as e:
                print(f"❌ Eroare la cardul #{i}: {e}")

        browser.close()

    return events


def upload_events(events):
    url = "http://localhost:5298/api/Event"
    for event in events:
        try:
            r = requests.post(url, json=event)
            if r.status_code == 201:
                print(f"✅ Trimis: {event['title']}")
            else:
                print(f"❌ Eroare {r.status_code} la {event['title']}")
        except Exception as e:
            print(f"❌ Eroare la trimitere: {e}")


if __name__ == "__main__":
    print("📡 Încep scraping...")
    events = extract_events()
    print(f"📦 Extras {len(events)} evenimente.")

    os.makedirs("data", exist_ok=True)
    with open("data/events.json", "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)

    upload_events(events)
