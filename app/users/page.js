"use client";
import React, { useEffect, useState } from "react";

const MAPBOX_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your Mapbox token

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }
  }, [selectedUser]);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 min-h-screen bg-[#FFE066]">
      {/* User List */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li
              key={user.id}
              className={`py-4 cursor-pointer hover:bg-[#f5e7c0] rounded transition-all px-2 ${selectedUser?.id === user.id ? "bg-[#eadfb4]" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="font-semibold text-lg">{user.name}</div>
              <div className="text-gray-600">@{user.username}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* User Details */}
      <div className="flex-1 bg-white rounded-lg shadow p-6 min-h-[400px]">
        {selectedUser ? (
          <div>
            <h3 className="text-xl font-bold mb-2">{selectedUser.name} (@{selectedUser.username})</h3>
            <div className="mb-4">
              <div className="text-gray-700">Email: {selectedUser.email}</div>
              <div className="text-gray-700">Phone: {selectedUser.phone}</div>
              <div className="text-gray-700">Website: {selectedUser.website}</div>
              <div className="text-gray-700">Company: {selectedUser.company?.name}</div>
            </div>
            {/* Mapbox Map */}
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Address:</h4>
              <div className="mb-2 text-gray-700">
                {selectedUser.address.suite}, {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.zipcode}
              </div>
              <iframe
                title="User Location"
                width="100%"
                height="200"
                className="rounded"
                frameBorder="0"
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=false&access_token=${MAPBOX_TOKEN}#14/${selectedUser.address.geo.lat}/${selectedUser.address.geo.lng}`}
                allowFullScreen
              ></iframe>
            </div>
            {/* User's Posts */}
            <div>
              <h4 className="font-semibold mb-2">Posts:</h4>
              {loading ? (
                <div>Loading posts...</div>
              ) : (
                <ul className="list-disc ml-6">
                  {posts.map((post) => (
                    <li key={post.id} className="mb-1">
                      <span className="font-semibold">{post.title}</span>
                      <div className="text-gray-600 text-sm">{post.body}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 flex items-center justify-center h-full">Select a user to see details</div>
        )}
      </div>
    </div>
  );
} 