"use client";
import React, { useEffect, useState } from "react";

const MAPBOX_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your Mapbox token

export default function UserPanel({ onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 5;

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

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const paginatedUsers = users.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  return (
    <div className="rounded-lg bg-white border border-gray-200 flex flex-col transition-all duration-300 p-4 w-full max-w-3xl w-[700px] mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">Users</h2>
        <button onClick={onClose} className="text-xl font-bold px-3 py-1 rounded hover:bg-gray-200">×</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col md:flex-row gap-4">
        {/* User List */}
        <div className="w-full md:w-1/2">
          <ul className="divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <li
                key={user.id}
                className={`py-3 cursor-pointer hover:bg-[#f5e7c0] rounded transition-all px-2 ${selectedUser?.id === user.id ? "bg-[#eadfb4]" : ""}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="font-semibold text-lg">{user.name}</div>
                <div className="text-gray-600">@{user.username}</div>
              </li>
            ))}
          </ul>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {page} of {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        {/* User Details */}
        <div className="w-full md:w-1/2">
          {selectedUser ? (
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedUser.name} (@{selectedUser.username})</h3>
              <div className="mb-2 text-gray-700">Email: {selectedUser.email}</div>
              <div className="mb-2 text-gray-700">Phone: {selectedUser.phone}</div>
              <div className="mb-2 text-gray-700">Website: {selectedUser.website}</div>
              <div className="mb-2 text-gray-700">Company: {selectedUser.company?.name}</div>
              <div className="mb-2 text-gray-700">
                Address: {selectedUser.address.suite}, {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.zipcode}
              </div>
              <div>
                <h4 className="font-semibold mb-1">Posts:</h4>
                {loading ? (
                  <div>Loading posts...</div>
                ) : (
                  <ul className="list-disc ml-6 max-h-32 overflow-y-auto">
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
    </div>
  );
} 