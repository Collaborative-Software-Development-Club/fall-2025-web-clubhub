import AttendanceCharts from '@/components/attendance/attendanceCharts';
import clubs from '@/mock/clubs.json';
import attendanceData from '@/mock/sample-attendanceData';

export default async function AttendanceGraphPage({
    params,
}: {
    params: Promise<{ club: string }>;
}) {
    const { club } = await params;
    const clubData = clubs[0] || "Club"; // TODO: Replace with actual club lookup based on club ID

    return (
        <div className="w-full max-w-6xl py-5">
            <AttendanceCharts 
                data={attendanceData} 
                title={"Attendance Graph for " + clubData} 
            />
        </div>
    );
}
