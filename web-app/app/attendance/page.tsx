import { mockAttendance } from "@/data/sample-attendance";
import { StudentRow } from "@/components/attendance/StudentRow";
import AttendanceCodeCard from "@/components/attendance/AttendanceCodeCard";

export default function AttendancePage() {
    const code = "0000";
    const meeting_date = "Sept. 24, 2025";

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Attendance</h1>

            <AttendanceCodeCard code={code} meetingDate={meeting_date} />

            {/* Students who have responded */}
            <div className="w-full space-y-4">
                {mockAttendance
                    .filter((student) => student.status != "no-response")
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
            <div className="w-full space-y-4">
                {mockAttendance
                    .filter((student) => student.status == "no-response")
                    .map((student) => (
                        <StudentRow key={student.dotNumber} {...student} />
                    ))}
            </div>
        </main>
    );
}
