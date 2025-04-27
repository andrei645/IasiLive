from eParser import extract_events
from uploader import upload_events
import json
import os

if __name__ == "__main__":
    print("Scraping ... ")

    events = extract_events()
    print(f"Parsing {len(events)} events")

    os.makedirs("data", exist_ok=True)
    with open("data/events.json", "w") as f:
        json.dump(events, f, indent=2)

    upload_events(events)
