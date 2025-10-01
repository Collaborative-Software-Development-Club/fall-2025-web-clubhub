from functions import extract_club_info_from_url, save_clubs_to_json, get_subpage_info
PAGE_URL = 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?v=list&c=Columbus'
FILENAME = "data/club-list.json"

if __name__ == "__main__":
    # Example usage:
    clubs = extract_club_info_from_url(PAGE_URL)
    save_clubs_to_json(clubs, FILENAME)

    print(f"Extracted {len(clubs)} clubs → {FILENAME}")

    #get_subpage_info(page_url="https://activities.osu.edu/involvement/student_organizations/find_a_student_org/?i=947e5f63-8c1c-4340-b84e-768cf18c092c&v=card&s=collaborative+software+development&c=Columbus&page=0")
    #get_subpage_info(page_url="https://activities.osu.edu/involvement/student_organizations/find_a_student_org?i=fd8d4fcc-2f93-4d4a-a9ea-203f2c20fee6&v=list&c=Columbus&page=0")