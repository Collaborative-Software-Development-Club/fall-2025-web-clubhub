import { mockAttendance } from "@/data/sample-attendance";
import { StudentRow } from "@/components/attendance/StudentRow";
import AttendanceCodeCard from "@/components/attendance/AttendanceCodeCard";

export default function AttendancePage() {
    const code = "0000";
    const meetingDate = new Date();

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Attendance</h1>

            <AttendanceCodeCard code={code} meetingDate={meetingDate} />

            {/* Students who have responded */}
            <div className="w-full space-y-4 bg-gray-200 p-4 rounded-lg">
                {mockAttendance
                    .filter((student) => student.status != "no-response")
                    .sort((a, b) => {
                        const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
                        const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
                        return dateB.getTime() - dateA.getTime();
                    })
                    .map((student) => (
                        <StudentRow key={student.dotNumber} {...student} />
                    ))}
            </div>

            <div className="flex items-center my-6 w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 font-medium">
                    No Response
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* No-response students */}
            <div className="w-full space-y-4 bg-gray-200 p-4 rounded-lg">
                {mockAttendance
                    .filter((student) => student.status == "no-response")
                    .map((student) => (
                        <StudentRow key={student.dotNumber} {...student} />
                    ))}
            </div>
        </main>
    );
}
