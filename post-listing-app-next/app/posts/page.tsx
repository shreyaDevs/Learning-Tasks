"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/api/posts";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";
import { addPosts } from "@/api/posts";


export default function PostsPage() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts(currentPage, 10);
      setPosts(data);
    }

    fetchPosts();
  }, [currentPage]);

  const handleAdd = async () => {

    if (!newPost.title || !newPost.body) return;
    await addPosts(newPost);

    const createdPost: Post = {
      id: posts.length + 1,
      title: newPost.title,
      body: newPost.body,
    };

    setPosts((prevPosts) => [
      ...prevPosts,
      createdPost,
    ]);


    setNewPost({
      title: "",
      body: "",
    });

    setShowCreateForm(false);
  };

  const handleUpdated = (id: number, data: { title: string; body: string }) => {
    setPosts((prev) => prev.map((p) =>
      (p.id === id ? { ...p, title: data.title, body: data.body } : p)));
  };


  const handleDeleted = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4 bg-[rgb(218,207,208)] min-h-screen">
      <h1 className="text-4xl text-center mb-6 font-serif">
        All Posts
      </h1>
      <button
        onClick={() => setShowCreateForm(true)}
        className="bg-white text-mauve-700 hover:bg-gray-100 border border-gray-700 font-serif text-lg px-4 py-2 rounded mb-4">
        Create New Post
      </button>

      {showCreateForm && (
        <div className="bg-gray-300 p-4 rounded mb-4 flex gap-2">

          <input
            type="text"
            placeholder="Enter title"
            className="border p-2 rounded"
            value={newPost.title}
            onChange={(e) =>
              setNewPost({
                ...newPost,
                title: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Enter body"
            className="border p-2 rounded"
            value={newPost.body}
            onChange={(e) =>
              setNewPost({
                ...newPost,
                body: e.target.value,
              })
            }
          />

          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Submit
          </button>

          <button
            onClick={() => setShowCreateForm(false)}
            className="bg-white px-3 rounded"
          >
            Cancel
          </button>

        </div>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            onUpdated={handleUpdated}
            onDeleted={handleDeleted}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">

        {currentPage > 1 && (
          <button
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
            Previous
          </button>
        )}

        <p className="font-semibold">
          Current Page: {currentPage}
        </p>

        <button
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
          Next
        </button>


      </div>


    </div>
  );
}