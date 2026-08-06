import requests
from bs4 import BeautifulSoup
import re

sites = {
    "IC Markets": "https://www.icmarkets.com",
    "Exness": "https://www.exness.com",
    "Pepperstone": "https://pepperstone.com",
    "OANDA": "https://www.oanda.com",
    "FXTM": "https://www.forextime.com",
    "RoboForex": "https://www.roboforex.com",
    "FBS": "https://fbs.com",
    "OctaFX": "https://octafx.com",
    "HFM": "https://www.hfm.com",
    "XM": "https://www.xm.com"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

session = requests.Session()
session.headers.update(headers)

for name, url in sites.items():
    print(f"=== {name} ({url}) ===")
    try:
        resp = session.get(url, timeout=10, allow_redirects=True)
        print(f"Status Code: {resp.status_code}, Final URL: {resp.url}")
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, 'html.parser')
            title = soup.title.string.strip() if soup.title and soup.title.string else "No title"
            print(f"Title: {title}")
            
            # Headings
            headings = [h.get_text(strip=True) for h in soup.find_all(['h1', 'h2', 'h3'])]
            print(f"Headings count: {len(headings)}")
            print(f"Sample Headings: {headings[:10]}")
            
            # Find nav links
            nav_links = [a.get_text(strip=True) for a in soup.find_all('a') if len(a.get_text(strip=True)) > 2]
            print(f"Sample Nav/CTA links: {nav_links[:15]}")
        print("\n" + "-"*50)
    except Exception as e:
        print(f"Error fetching {url}: {e}\n" + "-"*50)
