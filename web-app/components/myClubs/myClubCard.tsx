import React from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';

type MyClubCardProps = {
    name: string;
    logo: string;
    nextMeeting: string;
    attendance: number;
    members: number;
    pending: number;
}

//Need to implement functionality to the pending club button. Thinking of it just being a popup with the pending club information.
export default function MyClubCard({name, logo, nextMeeting, attendance, members, pending}: MyClubCardProps) {
    return (
        <div className={`bg-white border-3 border-[#BA0C2F] rounded-xl p-6 w-full h-110`} style={{boxShadow: '3px 3px 0px #BA0C2F'}}>
            <h1 className="text-center text-2xl font-bold mb-4">{name? name: "Unnamed Club"}</h1>
            <Image src={logo} alt={name} width={100} height={100} className="mx-auto mb-4"/>
            <div className="flex flex-col items-center justify-center">
                <Bell className="w-7 h-7 "/>
                <h2 className="text-center text-lg font-bold mb-4">{nextMeeting? nextMeeting: "No next meeting"}</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex flex-row gap-2">
                    <button className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm w-37 border-2 border-black">Attendance: {attendance? attendance: 0}%</button>
                    <button className="bg-gray-500 text-white px-3 py-2 rounded-md text-sm w-37 border-2 border-black">Members: {members? members: 0}</button>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                    <button className="bg-[#BA0C2F] text-white px-4 py-2 rounded-md text-sm w-full border-2 border-black">View Club</button>
                    {pending > 0 && (
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm border-2 border-black">Pending: {pending? pending: 0} Member Requests</button>
                    )}

                </div>
            </div>

        </div>

    );
}