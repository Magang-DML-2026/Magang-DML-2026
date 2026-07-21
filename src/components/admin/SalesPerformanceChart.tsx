"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

type Props = {
  data: { date: string; amount: number }[];
};

export default function SalesPerformanceChart({ data }: Props) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  // Format data based on selected time range if needed
  // For now, we assume the server passes pre-formatted daily data for the past week/month
  // The mockup shows Mon, Tue, Wed, Thu, Fri, Sat, Sun.
  
  // Convert date strings to short weekday names for the chart
  const formattedData = data.map((d) => {
    const dateObj = new Date(d.date);
    return {
      name: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
      amount: d.amount,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 flex flex-col w-full shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-black">Sales Performance</h3>
        
        <div className="flex bg-zinc-100 p-1 rounded-md text-xs font-medium">
          <button 
            className={`px-4 py-1.5 rounded ${timeRange === "week" ? "bg-white text-black shadow-sm" : "text-zinc-500 hover:text-black"}`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button 
            className={`px-4 py-1.5 rounded ${timeRange === "month" ? "bg-white text-black shadow-sm" : "text-zinc-500 hover:text-black"}`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button 
            className={`px-4 py-1.5 rounded ${timeRange === "year" ? "bg-white text-black shadow-sm" : "text-zinc-500 hover:text-black"}`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#888" }} 
              dy={10} 
            />
            <YAxis 
              hide={true} // Hidden in mockup
            />
            <Tooltip 
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              formatter={(value: any) => [`Rp ${Number(value).toLocaleString()}`, "Sales"]}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#f05c35" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#f05c35", strokeWidth: 0 }} 
              activeDot={{ r: 6, fill: "#f05c35", stroke: "#fff", strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
