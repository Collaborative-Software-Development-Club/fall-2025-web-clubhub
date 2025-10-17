import MyClubCard from "@/components/myClubs/myClubCard";
import { mockMyClubs } from "@/data/sample-my-clubs";
export default function Dashboard(){
    return(
        <div className="p-6 bg-[#FAF9F6]">
        <h1 className="text-4xl font-bold text-center mb-6 ">Dashboard</h1>
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">My Clubs</h2>
            <div className="grid grid-cols-4 gap-4">
                {mockMyClubs.map((club, index) => (
                    <MyClubCard key={index} {...club} />
                ))}
                
            </div>
            
        </div>
        </div>

    )
}

