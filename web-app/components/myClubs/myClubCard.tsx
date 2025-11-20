'use client';
import {useState} from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import Popup from '../popup/Popup';
import AttendanceCharts from '../attendance/attendanceCharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import attendanceData from '../../mock/sample-attendanceData';

type MyClubCardProps = {
    key: number;
    name: string;
    logo: string;
    nextMeeting: string;
    attendance: number;
    members: number;
    pending: number;
    leader:boolean;
}

//Need to implement functionality to the pending club button. Thinking of it just being a popup with the pending club information.
export default function MyClubCard({name, logo, nextMeeting, attendance, members, pending, leader}: MyClubCardProps) {
    const [attendancePopup, setAttendancePopup] = useState(false);
    const [membersPopup, setMembersPopup] = useState(false);
    const [pendingPopup, setPendingPopup] = useState(false);
    
    return (
        <Card className="w-full max-w-sm">
            <CardContent className="flex flex-col items-center gap-0">
                <h1 className="text-center text-2xl font-bold mb-4">{name? name: "Unnamed Club"}</h1>
                <Image src={logo} alt={name} width={100} height={100} className="mx-auto mb-4"/>
                <div className="flex flex-col items-center justify-center">
                    <Bell className="w-7 h-7 "/>
                    <h2 className="text-center text-lg font-bold mb-4">{nextMeeting? nextMeeting: "No next meeting"}</h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 w-full">
                    {leader && (
                    <>
                    {/* Attendance Button and Popup */}
                        <div className="flex flex-row gap-2">
                            <Button 
                                variant="default"
                                size="sm"
                                className="flex-1"
                                onClick={() => setAttendancePopup(true)}
                            >
                                Attendance: {attendance? attendance: 0}%
                            </Button>
                        
                        <Popup 
                            width={1250}
                            height={700} 
                            open={attendancePopup}
                            onOpenChange={setAttendancePopup}
                            title="Attendance Details"
                        >
                            <AttendanceCharts data={attendanceData} title={name + " Attendance"}/>
                        </Popup>
                            <Button 
                                variant="secondary"
                                size="sm"
                                className="flex-1"
                                onClick={() => setMembersPopup(true)}
                            >
                                Members: {members? members: 0}
                            </Button>
                        <Popup 
                            width={300}
                            height={700} 
                            open={membersPopup}
                            onOpenChange={setMembersPopup}
                            title={"Members in " + name}
                        >
                            
                        </Popup>
                        </div>
                        {/* Members Button and Popup */}
                        <div className="flex flex-col gap-2 w-full">
                            {pending > 0 && (
                                <Button 
                                    variant="outline"
                                    size="sm"
                                    className="bg-accent hover:bg-accent/80 text-accent-foreground" 
                                    onClick={() => setPendingPopup(true)}
                                >
                                    Pending: {pending? pending: 0} Member Requests
                                </Button>     
                            )}
                        {/* Popup showing pending member join requests that need approval */}
                        <Popup 
                            width={300}
                            height={700} 
                            open={pendingPopup}
                            onOpenChange={setPendingPopup}
                            title={"Pending Member Requests in " + name}
                        >
                            <p>Pending member requests will go here...</p>
                        </Popup>
                        </div>
                    </>
                    )}
                    {/* View Club Button */}
                    <Button 
                        variant="default"
                        size="sm"
                        className="w-full"
                    >
                        View Club
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}