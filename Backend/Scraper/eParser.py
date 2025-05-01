import requests
from bs4 import BeautifulSoup
from datetime import datetime

def extract_events():
    url = "https://quotes.toscrape.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    events = []

    for quote in soup.select(".quote"):
        text = quote.select_one(".text").text.strip()
        author = quote.select_one(".author").text.strip()

        events.append({
            "title": text[:50],
            "description": f"Citat de la {author}",
            "location": "Iasi",
            "date": datetime.utcnow().isoformat() + "Z",
            "category": "Cultură",
            "imageUrl": "https://via.placeholder.com/600x400"
        })

    return events
