'use client';
import {useState} from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import {createPortal} from 'react-dom';
import Popup from '../popup/Popup';
import AttendanceCharts from './attendanceCharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type MyClubCardProps = {
    key: number;
    name: string;
    logo: string;
    nextMeeting: string;
    attendance: number;
    members: number;
    pending: number;
}

//Need to implement functionality to the pending club button. Thinking of it just being a popup with the pending club information.
export default function MyClubCard({name, logo, nextMeeting, attendance, members, pending}: MyClubCardProps) {
    const [attendancePopup, setAttendancePopup] = useState(false);
    const [membersPopup, setMembersPopup] = useState(false);
    const [pendingPopup, setPendingPopup] = useState(false);
    
    return (
        <Card className="bg-white border-3 border-[#BA0C2F] w-full h-110" style={{boxShadow: '3px 3px 0px #BA0C2F'}}>
            <CardContent className="flex flex-col items-center p-6 gap-0">
                <h1 className="text-center text-2xl font-bold mb-4">{name? name: "Unnamed Club"}</h1>
                <Image src={logo} alt={name} width={100} height={100} className="mx-auto mb-4"/>
                <div className="flex flex-col items-center justify-center">
                    <Bell className="w-7 h-7 "/>
                    <h2 className="text-center text-lg font-bold mb-4">{nextMeeting? nextMeeting: "No next meeting"}</h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 w-full">
                    <div className="flex flex-row gap-2">
                        <Button 
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm w-37 border-2 border-black" 
                            onClick={() => setAttendancePopup(true)}
                        >
                            Attendance: {attendance? attendance: 0}%
                        </Button>
                    { attendancePopup && (
                        createPortal(
                            <Popup 
                                width={1250}
                                height={700} 
                                onClose={() => setAttendancePopup(false)}
                                title="Attendance Details"
                            >
                                <AttendanceCharts/>
                            </Popup>, 
                            document.body
                        )
                    )}
                        <Button 
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 text-sm w-37 border-2 border-black" 
                            onClick={() => setMembersPopup(true)}
                        >
                            Members: {members? members: 0}
                        </Button>
                    {membersPopup && (
                        createPortal(
                            <Popup 
                                width={300}
                                height={700} 
                                onClose={() => setMembersPopup(false)}
                                title={"Members in " + name}
                            >
                                
                            </Popup>, 
                            document.body
                        )
                    )}
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full">
                        <Button className="bg-[#BA0C2F] hover:bg-[#9a0a26] text-white px-4 py-2 text-sm w-full border-2 border-black">
                            View Club
                        </Button>
                        {pending > 0 && (
                            <Button 
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm border-2 border-black" 
                                onClick={() => setPendingPopup(true)}
                            >
                                Pending: {pending? pending: 0} Member Requests
                            </Button>     
                        )}
                    {pendingPopup && (
                        createPortal(
                            <Popup 
                                width={300}
                                height={700} 
                                onClose={() => setPendingPopup(false)}
                                title={"Pending Member Requests in " + name}
                            >
                                <p>Pending member requests will go here...</p>
                            </Popup>, 
                            document.body
                        )
                    )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}