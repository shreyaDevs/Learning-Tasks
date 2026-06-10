import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import PostCard from "../components/PostCard";
import { addPosts, updatePosts, deletePosts } from "../api/posts";


type Post = {
    id: number;
    title: string;
    body: string;
};

const PostsPage = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 10;

    const totalPages = 10;

    const [posts, setPosts] = useState<Post[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createPost, setCreatePost] = useState({ title: "", body: "" });

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () =>
            fetchPosts(currentPage, postsPerPage),
    });

    useEffect(() => {
        if (data) {
            setPosts(data);
        }
    }, [data]);


    const handleAdd = async (newData: {
        title: string;
        body: string;
    }) => {
        await addPosts(newData);

        const lastId =
            posts.length > 0
                ? posts[posts.length - 1].id
                : 0;

        const newPost: Post = {
            id: lastId + 1,
            title: newData.title,
            body: newData.body,
        };

        setPosts((prev) => [
            ...prev,
            newPost,
        ]);
        setCreatePost({ title: "", body: "" });
        setShowCreateForm(false);
    };

    // update
    const handleUpdate = async (
        postId: number,
        updatedData: {
            title: string;
            body: string;
        }
    ) => {

        await updatePosts(
            String(postId),
            updatedData
        );

        setPosts((prev) =>
            prev.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        ...updatedData,
                    }
                    : post
            )
        );
    };


     // delete
    const handleDelete = async (
        postId: number
    ) => {

        await deletePosts(
            String(postId)
        );

        setPosts((prev) =>
            prev.filter(
                (post) =>
                    post.id !== postId
            )
        );
    };

    


    if (isLoading) {
        return (
            <h2 className="text-center text-xl p-4">
                Loading posts...
            </h2>
        );
    }

    if (error) {
        return ("Something went wrong");
    }

    return (
        <div className="min-h-screen bg-fuchsia-100 p-4 ">
            <div className="relative">
                <h2 className="text-center text-4xl font-serif text-mauve-600 mb-4">
                    All Posts
                </h2>
                <button
                    onClick={() => setShowCreateForm((prev) => !prev)}
                    className="absolute top-5 right-5 bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded-xl font-serif">
                    {showCreateForm ? "Cancel" : "+ Create a post"}
                </button>
            </div>

            {showCreateForm && (
                <div className="mb-6 border border-green-500 rounded-2xl bg-white p-4 shadow-sm">
                    <h3 className="text-xl font-serif text-green-700 mb-3">Create a new post</h3>
                    <div className="flex flex-col gap-3">
                        <input
                            value={createPost.title}
                            onChange={(e) => setCreatePost({ ...createPost, title: e.target.value })}
                            placeholder="Enter a post title"
                            className="border border-black rounded p-2"
                        />
                        <textarea
                            value={createPost.body}
                            onChange={(e) => setCreatePost({ ...createPost, body: e.target.value })}
                            placeholder="Enter a post body"
                            className="border border-black rounded p-2"
                            rows={4}
                        />
                     
                        <button
                            onClick={() => handleAdd(createPost)}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 font-serif w-32"
                        >
                            Submit
                        </button>
                      </div>
                    
                </div>
            )}

            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ))}

            <div className="flex justify-center items-center gap-4 mt-6">

                <button
                    onClick={() =>
                        setCurrentPage((prev) => prev - 1)
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded bg-white"
                >
                    Previous
                </button>

                <span className="font-bold">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((prev) => prev + 1)
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded bg-white"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default PostsPage;
