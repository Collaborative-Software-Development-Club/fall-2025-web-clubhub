import json
import requests
from bs4 import BeautifulSoup
from dataclasses import dataclass, asdict
from urllib.parse import urljoin
from typing import List, Union

@dataclass
class Club:
    """Dataclass representing a single student organization/club."""
    name: str
    purpose_statement: str
    affiliation: str
    url: str


def extract_club_info_from_url(page_url: str, base_url: Union[str, None] = None) -> List[Club]:
    """
    Fetches an HTML page from a URL and extracts club information.

    Args:
        page_url: The URL of the student organizations listing page.
        base_url: Optional base URL for resolving relative links.

    Returns:
        A list of Club objects.
    """
    response = requests.get(page_url)
    response.raise_for_status()  # exit if request failed

    soup = BeautifulSoup(response.text, 'html.parser')
    clubs: List[Club] = []

    # Locate the main table
    table = soup.find('table', class_='c-table')
    if not table:
        return clubs

    rows = table.find_all('tr')[1:]  # skip header row

    for row in rows:
        cols = row.find_all('td')
        if len(cols) != 3:
            continue

        # Extract name + href
        link = cols[0].find('a')
        name = link.get_text(strip=True) if link else ''
        href = link['href'] if link and 'href' in link.attrs else ''
        url = urljoin(base_url or page_url, href) if href else ''

        purpose = cols[1].get_text(strip=True)
        affiliation = cols[2].get_text(strip=True)

        clubs.append(
            Club(
                name=name,
                purpose_statement=purpose,
                affiliation=affiliation,
                url=url
            )
        )
    return clubs


def save_clubs_to_json(clubs: List[Club], filename: str) -> None:
    """Saves a list of clubs to a JSON file."""
    with open(filename, "w", encoding="utf-8") as f:
        json.dump([asdict(c) for c in clubs], f, indent=4, ensure_ascii=False)
