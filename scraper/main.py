from functions import extract_club_info_from_url, save_clubs_to_json

PAGE_URL = 'https://activities.osu.edu/involvement/student_organizations/find_a_student_org?v=list&c=Columbus'



if __name__ == "__main__":
    # Example usage:
    clubs = extract_club_info_from_url(PAGE_URL)
    save_clubs_to_json(clubs, "clubs.json")

    print(f"Extracted {len(clubs)} clubs → clubs.json")
