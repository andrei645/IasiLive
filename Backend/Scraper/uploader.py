import requests

def upload_events(events):
    url = "http://localhost:5298/api/Event" 

    for event in events:
        try:
            r = requests.post(url, json=event)
            if r.status_code == 201:
                print(f"Event {event['title']} sent.")
            else:
                print(f"❌ Error {r.status_code} on event {event['title']}")
        except Exception as e:
            print(f"Network error: {e}")
