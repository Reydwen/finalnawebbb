"use client";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const buttons = [
    { label: "Users" },
    { label: "Posts" },
    { label: "Charts" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE066]">
      <div className="w-[900px] h-[600px] bg-[#FFE066] rounded-xl shadow flex p-12 relative">
        {/* Left side: Title and buttons */}
        <div className="flex flex-col justify-start items-start w-1/3">
          <h1 className="text-5xl font-extrabold mb-2 text-black">DataScope</h1>
          <p className="text-lg text-black mb-10">Explore and analyze data with<br />powerful visualization tools.</p>
          <div className="flex flex-col gap-6 mb-8">
            {buttons.map((btn, idx) => (
              <button
                key={btn.label}
                className={`w-28 h-28 rounded-full text-lg font-semibold transition-all border-none focus:outline-none ${selected === btn.label ? "bg-[#EADFB4] ring-4 ring-[#B2A46C]" : "bg-[#EADFB4] hover:bg-[#f5e7c0]"}`}
                onClick={() => setSelected(btn.label)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        {/* Right side: Content area */}
        <div className="flex-1 flex items-center justify-center">
          {selected && (
            <div className="w-full h-[400px] bg-[#6B613A] rounded-lg transition-all flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{selected} Content</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
