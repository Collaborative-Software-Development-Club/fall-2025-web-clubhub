import MyClubCard from "@/components/myClubs/myClubCard";
export default function Dashboard(){
    return(
        <div className="p-6 bg-[#FAF9F6]">
        <h1 className="text-4xl font-bold text-center mb-6 ">Dashboard</h1>
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">My Clubs</h2>
            <div className="grid grid-cols-4 gap-4">
                <MyClubCard name="Da Club" logo ="/default-club-logo.png" nextMeeting="Tuesday 2021" attendance={80} members={100} pending={0}/>
                <MyClubCard name="Da Club" logo ="/default-club-logo.png" nextMeeting="Tuesday 2021" attendance={80} members={100} pending={10}/>
                <MyClubCard name="Da Club" logo ="/default-club-logo.png" nextMeeting="Tuesday 2021" attendance={80} members={100} pending={0}/>
                <MyClubCard name="Da Club" logo ="/default-club-logo.png" nextMeeting="Tuesday 2021" attendance={80} members={100} pending={0}/>
                <MyClubCard name="Da Club" logo ="/default-club-logo.png" nextMeeting="Tuesday 2021" attendance={80} members={100} pending={10}/>
                
            </div>
            
        </div>
        </div>

    )
}

