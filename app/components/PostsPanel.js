"use client";
import React, { useEffect, useState } from "react";

export default function PostsPanel({ onClose }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  useEffect(() => {
    if (selectedPost) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPost.id}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          setLoading(false);
        });
    }
  }, [selectedPost]);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="rounded-lg bg-white border border-gray-200 flex flex-col transition-all duration-300 p-4 w-full max-w-3xl w-[700px] mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">Posts</h2>
        <button onClick={onClose} className="text-xl font-bold px-3 py-1 rounded hover:bg-gray-200">×</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col md:flex-row gap-4">
        {/* Posts List */}
        <div className="w-full md:w-1/2">
          <ul className="divide-y divide-gray-200">
            {paginatedPosts.map((post) => (
              <li
                key={post.id}
                className={`py-3 cursor-pointer hover:bg-[#f5e7c0] rounded transition-all px-2 ${selectedPost?.id === post.id ? "bg-[#eadfb4]" : ""}`}
                onClick={() => setSelectedPost(post)}
              >
                <div className="font-semibold text-lg">{post.title}</div>
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
        {/* Post Details */}
        <div className="w-full md:w-1/2 p-0 m-0 flex flex-col justify-start">
          {selectedPost ? (
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
              <div className="mb-2 text-gray-700">{selectedPost.body}</div>
              <div>
                <h4 className="font-semibold mb-1">Comments:</h4>
                {loading ? (
                  <div>Loading comments...</div>
                ) : (
                  <ul className="list-disc ml-6 max-h-32 overflow-y-auto">
                    {comments.map((comment) => (
                      <li key={comment.id} className="mb-1">
                        <span className="font-semibold">{comment.name}</span>
                        <div className="text-gray-600 text-sm">{comment.body}</div>
                        <div className="text-gray-400 text-xs">{comment.email}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 flex items-center justify-center h-full">Select a post to see details</div>
          )}
        </div>
      </div>
    </div>
  );
} 