"use client"

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartDataPoint = {
    name: string;
    value: number;
}

type AttendanceChartsProps = {
    data?: ChartDataPoint[];
    title?: string;
}

const defaultData: ChartDataPoint[] = [
    { name: 'Week 1', value: 45 },
    { name: 'Week 2', value: 62 },
    { name: 'Week 3', value: 58 },
    { name: 'Week 4', value: 71 }
];

export default function AttendanceCharts({ data = defaultData, title }: AttendanceChartsProps) {

    function deltaAttendance(data: ChartDataPoint[]) {
        const current = data[data.length - 1].value;
        const previous = data[data.length - 2].value;
        return ((current/previous) - 1) * 100;
    }

    const [delta, setDelta] = useState(0);
    useEffect(() => {
        setDelta(deltaAttendance(data));
    }, [data]);

    return (
        <div className="w-full">
            {title && <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>}
            
            {/* Chart Container */}
            <div className="bg-white rounded-lg p-4 mb-4 border-2 border-black shadow-sm">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                            dataKey="name" 
                            stroke="#6b7280"
                            style={{ fontSize: '13px', fontWeight: '500' }}
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
                            dataKey="value" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Delta Info */}
            <div className={`p-4 rounded-lg font-semibold text-center border-2 ${
                delta >= 0 
                    ? 'bg-green-50 border-green-400 text-green-700' 
                    : 'bg-red-50 border-red-400 text-red-700'
            }`}>
                {delta >= 0 ? "✓ Great Job! Attendance increased by " : "⚠ Uh oh! Attendance decreased by "}
                <span className="font-bold text-lg">{Math.abs(delta).toFixed(2)}% </span>
                <span >since last meeting</span>
            </div>
        </div>
    );
}
