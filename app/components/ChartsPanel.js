"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartsPanel({ onClose }) {
  const [totals, setTotals] = useState({ users: 0, posts: 0, comments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [users, posts, comments] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
        fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
        fetch("https://jsonplaceholder.typicode.com/comments").then((r) => r.json()),
      ]);
      setTotals({ users: users.length, posts: posts.length, comments: comments.length });
      setLoading(false);
    }
    fetchData();
  }, []);

  const chartOptions = {
    chart: { type: "bar" },
    xaxis: { categories: ["Users", "Posts", "Comments"] },
    colors: ["#FBBF24", "#6366F1", "#10B981"],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "40%" } },
    dataLabels: { enabled: true },
  };
  const chartSeries = [
    {
      name: "Total",
      data: [totals.users, totals.posts, totals.comments],
    },
  ];

  return (
    <div className="rounded-lg bg-white border border-gray-200 flex flex-col transition-all duration-300 p-4 w-full max-w-3xl w-[700px] mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">Charts</h2>
        <button onClick={onClose} className="text-xl font-bold px-3 py-1 rounded hover:bg-gray-200">×</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {loading ? (
          <div>Loading chart...</div>
        ) : (
          <ApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
            width={600}
          />
        )}
      </div>
    </div>
  );
} 