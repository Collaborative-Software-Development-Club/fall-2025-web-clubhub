import json
from dataclasses import asdict, dataclass
from typing import List, Union
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup


@dataclass
class Club:
    """Dataclass representing a single student organization/club."""

    name: str
    purpose_statement: str
    affiliation: str
    url: str
    image_url: str
    campus: str
    status: str
    primary_leader: str
    secondary_leader: str
    treasurer_leader: str
    advisor: str
    co_advisor: str
    orgainization_email: str
    instagram: str
    facebook_group_page: str
    twitter: str
    other: str
    website: str
    primary_type: str
    secondary_type: str
    primary_make_up: str
    meeting_time_and_place: str
    office_location: str
    membership_type: str
    membership_contact: str
    time_of_year_for_new_membership: str
    how_does_a_prospective_member_apply: str
    charge_dues: str
    primary_leader_email: str
    secondary_leader_email: str
    treasurer_leader_email: str


def extract_club_info_from_url(
    page_url: str, base_url: Union[str, None] = None, limit: int = 10
) -> List[Club]:
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

    soup = BeautifulSoup(response.text, "html.parser")
    clubs: List[Club] = []

    # Locate the main table
    table = soup.find("table", class_="c-table")
    if not table:
        return clubs

    rows = table.find_all("tr")[1:]  # skip header row

    i = 0

    for row in rows:
        cols = row.find_all("td")
        if len(cols) != 3:
            continue

        # Extract name + href
        link = cols[0].find("a")
        name = link.get_text(strip=True) if link else ""
        href = link["href"] if link and "href" in link.attrs else ""
        url = urljoin(base_url or page_url, href) if href else ""

        purpose = cols[1].get_text(strip=True)
        affiliation = cols[2].get_text(strip=True)

        # Search subpage for more information
        subpage_dict = get_subpage_info(page_url=url)

        # debug line
        print("Retrived club " + name)

        if i == limit:
            break
        i += 1
        clubs.append(
            Club(
                name=name,
                purpose_statement=purpose,
                affiliation=affiliation,
                url=url,
                image_url=subpage_dict["image_url"],
                campus=subpage_dict["campus"],
                status=subpage_dict["status"],
                primary_leader=subpage_dict.get("primary leader", ""),
                secondary_leader=subpage_dict.get("secondary leader", ""),
                treasurer_leader=subpage_dict.get("treasurer leader", ""),
                advisor=subpage_dict.get("advisor", ""),
                co_advisor=subpage_dict.get("co-advisor", ""),
                orgainization_email=subpage_dict.get("organization email", ""),
                instagram=subpage_dict.get("instagram", ""),
                facebook_group_page=subpage_dict.get("facebook group page", ""),
                twitter=subpage_dict.get("twitter", ""),
                other=subpage_dict.get("other", ""),
                website=subpage_dict["website"],
                primary_type=subpage_dict["primary type"],
                secondary_type=subpage_dict["secondary types"],
                primary_make_up=subpage_dict["primary make up"],
                meeting_time_and_place=subpage_dict["meeting time and place"],
                office_location=subpage_dict["office location"],
                membership_type=subpage_dict["membership type"],
                membership_contact=subpage_dict["membership contact"],
                time_of_year_for_new_membership=subpage_dict[
                    "time of year for new membership"
                ],
                how_does_a_prospective_member_apply=subpage_dict[
                    "how does a prospective member apply"
                ],
                charge_dues=subpage_dict["charge dues"],
                primary_leader_email=subpage_dict.get("primary leader email", ""),
                secondary_leader_email=subpage_dict.get("secondary leader email", ""),
                treasurer_leader_email=subpage_dict.get("treasurer leader email", ""),
            )
        )

    return clubs


def get_subpage_info(page_url: str, base_url: Union[str, None] = None):
    """
    Given the url of a club subpage, extracts and returns the relevant info
    including leader names + emails.
    """

    info_dict = {}

    response = requests.get(page_url)
    response.raise_for_status()

    subsoup = BeautifulSoup(response.text, "html.parser")

    info = subsoup.find(
        "div", {"id": "ctl00_ContentBody_pageFormControl_panel_information"}
    )

    # Extract image URL
    try:
        img_src = info.find("div", {"class": "o-media__image"}).img["src"]
        info_dict["image_url"] = "https://activities.osu.edu" + img_src
    except Exception:
        info_dict["image_url"] = None

    # Find the table
    table = info.find("table", {"class": "c-table"})
    rows = table.find_all("tr")

    for row in rows:
        th = row.find("th")
        td = row.find("td")
        if not th or not td:
            continue

        # Normalize key name
        row_name = th.get_text(strip=True).replace(":", "").lower()

        # Check if there is an <a> tag (email)
        link = td.find("a", href=True)

        if link and link["href"].startswith("mailto:"):
            # Name is link text
            name = link.get_text(strip=True)

            # Email extracted from "mailto:"
            email = link["href"].replace("mailto:", "").strip()

            info_dict[row_name] = name
            info_dict[row_name + " email"] = email

        else:
            # Fallback: plain text value
            row_value = td.get_text(" ", strip=True)
            info_dict[row_name] = row_value

    return info_dict


def save_clubs_to_json(clubs: List[Club], filename: str) -> None:
    """Saves a list of clubs to a JSON file."""
    with open(filename, "w", encoding="utf-8") as f:
        json.dump([asdict(c) for c in clubs], f, indent=4, ensure_ascii=False)
