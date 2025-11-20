"use client"

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartDataPoint = {
    date: string;
    attendance: number;
}

type AttendanceChartsProps = {
    data?: ChartDataPoint[];
    title?: string;
}

const defaultData: ChartDataPoint[] = [
    { date: '2025-11-5', attendance: 45 },
    { date: '2025-11-12', attendance: 62 },
    { date: '2025-11-19', attendance: 58 },
    { date: '2025-11-26', attendance: 71 }
];

export default function AttendanceCharts({ data = defaultData, title }: AttendanceChartsProps) {

    function deltaAttendance(data: ChartDataPoint[]) {
        if (data.length < 2) return 0;
        const current = data[data.length - 1].attendance;
        const previous = data[data.length - 2].attendance;
        return ((current/previous) - 1) * 100;
    }

    const [delta, setDelta] = useState(0);

    // Get only the last 10 meetings
    const last10Meetings = data.slice(-10);

    useEffect(() => {
        if (last10Meetings.length >= 2) {
            setDelta(deltaAttendance(last10Meetings));
        } else {
            setDelta(0);
        }
    }, [last10Meetings]);

    return (
        <div className="w-full">
            {title && <h3 className="text-xl font-bold mb-4 text-gray-800">{title} for last 10 meetings</h3>}
            
            {/* Chart Container */}
            <div className="bg-white rounded-lg p-4 pt-6 mb-4 border-2 border-black shadow-sm ">
                <ResponsiveContainer width="100%" height={600}>
                    <LineChart data={last10Meetings} margin={{ top: 80, right: 20, left: 0, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                            dataKey="date" 
                            stroke="#6b7280"
                            style={{ fontSize: '13px', fontWeight: '500' }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                            stroke="#6b7280"
                            style={{ fontSize: '13px', fontWeight: '500' }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '2px solid #3b82f6',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                padding: '8px 12px'
                            }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="attendance" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Delta Info */}
            {last10Meetings.length >= 2 && (
                <div className={`p-4 rounded-lg font-semibold text-center border-2 ${
                    delta >= 0 
                        ? 'bg-green-50 border-green-400 text-green-700' 
                        : 'bg-red-50 border-red-400 text-red-700'
                }`}>
                    {delta >= 0 ? "✓ Great Job! Attendance increased by " : "⚠ Uh oh! Attendance decreased by "}
                    <span className="font-bold text-lg">{Math.abs(delta).toFixed(2)}% </span>
                    <span >since last meeting</span>
                </div>
            )}
        </div>
    );
}
