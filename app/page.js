"use client";
import { useState } from "react";
import UserPanel from "./components/UserPanel";
import PostsPanel from "./components/PostsPanel";
import ChartsPanel from "./components/ChartsPanel";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showPostsPanel, setShowPostsPanel] = useState(false);
  const [showChartsPanel, setShowChartsPanel] = useState(false);
  const buttons = [
    { label: "Users" },
    { label: "Posts" },
    { label: "Charts" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE066]">
      <div className="w-[1100px] h-[700px] bg-[#D6B94D] rounded-xl shadow flex p-20 relative">
        {/* Left side: Title and buttons */}
        <div className="flex flex-col justify-start items-start w-1/3">
          <h1 className="text-4xl font-extrabold mb-2 text-black">DataScope</h1>
          <p className="text-lg text-black mb-10">Explore and analyze data with<br />powerful visualization tools.</p>
          <div className="flex flex-col gap-6 mb-8">
            {buttons.map((btn, idx) => (
              <button
                key={btn.label}
                className={`w-28 h-28 rounded-full text-lg font-semibold transition-all border-none focus:outline-none ${selected === btn.label ? "bg-[#EADFB4] ring-4 ring-[#B2A46C]" : "bg-[#EADFB4] hover:bg-[#b2a46c]"}`}
                onClick={() => {
                  setSelected(btn.label);
                  if (btn.label === "Users") {
                    setShowUserPanel(true);
                    setShowPostsPanel(false);
                    setShowChartsPanel(false);
                  } else if (btn.label === "Posts") {
                    setShowPostsPanel(true);
                    setShowUserPanel(false);
                    setShowChartsPanel(false);
                  } else if (btn.label === "Charts") {
                    setShowChartsPanel(true);
                    setShowUserPanel(false);
                    setShowPostsPanel(false);
                  }
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        {/* Right side: Content area */}
        <div className="flex-1 flex items-center justify-center">
          {selected && selected !== "Users" && selected !== "Posts" && (
            <div className="w-full h-[400px] bg-[#6B613A] rounded-lg transition-all flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{selected} Content</span>
            </div>
          )}
        </div>
        {showUserPanel && (
          <div className="ml-16">
            <UserPanel onClose={() => setShowUserPanel(false)} />
          </div>
        )}
        {showPostsPanel && (
          <div className="ml-16">
            <PostsPanel onClose={() => setShowPostsPanel(false)} />
          </div>
        )}
        {showChartsPanel && (
          <div className="ml-16">
            <ChartsPanel onClose={() => setShowChartsPanel(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
