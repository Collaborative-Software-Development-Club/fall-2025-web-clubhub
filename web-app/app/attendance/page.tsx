import { mockAttendance } from "@/data/sample-attendance";
import { StudentRow } from "@/components/attendance/StudentRow";

export default function AttendancePage() {
    const code = "0000";
    const meeting_date = "Sept. 24, 2025";

    return (
        <main className="flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold mb-8">Attendance</h1>

            {/* Attendance code + QR */}
            <div className="flex flex-col md:flex-row items-center gap-8 shadow-md rounded-2xl p-8 mb-14">
                <div className="text-center">
                    <p className="text-lg mb-2">
                        {meeting_date} Attendance Code:
                    </p>
                    <p className="text-5xl font-mono font-bold tracking-widest text-blue-600">
                        {code}
                    </p>
                </div>
                <div>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/500px-QR_code_for_mobile_English_Wikipedia.svg.png"
                        alt="QR Code"
                        width={200}
                        height={200}
                    />
                </div>
            </div>

            {/* Students who have responded */}
            <div className="w-full max-w-3xl space-y-4">
                {mockAttendance
                    .filter((student) => student.status != "no-response")
                    .map((student) => (
                        <StudentRow key={student.dotNumber} {...student} />
                    ))}
            </div>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 font-medium">
                    No Response
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* No-response students */}
            <div className="w-full max-w-3xl space-y-4">
                {mockAttendance
                    .filter((student) => student.status == "no-response")
                    .map((student) => (
                        <StudentRow key={student.dotNumber} {...student} />
                    ))}
            </div>
        </main>
    );
}
