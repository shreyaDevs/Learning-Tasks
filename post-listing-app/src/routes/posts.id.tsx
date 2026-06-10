import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { fetchPostsById, fetchCommentsByPostId } from "../api/posts";
import CommentCard from "../components/CommentCard";
import { Link } from "@tanstack/react-router";

type Comment = {
    id: number;
    name: string;
    email: string;
    body: string;
};

const PostDetailsPage = () => {
    const { id } = useParams({
        from: "/posts/$id",
    });

    const postQuery = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPostsById(id),
    });

    const commentsQuery = useQuery({
        queryKey: ["comments", id],
        queryFn: () => fetchCommentsByPostId(id),
    });

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (commentsQuery.data) {
            setComments(commentsQuery.data);
        }
    }, [commentsQuery.data]);




    if (postQuery.isLoading) {
        return (
            <h2 className="text-center text-xl p-4">
                Loading post...
            </h2>
        );
    }

    if (postQuery.error) {
        return (
            <h2 className="text-center text-xl p-4">
                Failed to load post
            </h2>
        );
    }

    return (
        <div className="min-h-screen bg-fuchsia-100 p-4">

            <h2 className="font-serif text-3xl text-mauve-800 text-center mb-3">
                Selected Post -

                <p className="text-xl text-mauve-950 mt-2">
                    {id} - Title:
                    <span className="text-mauve-700">
                        {" "}
                        {postQuery.data.title}
                    </span>
                </p>

                <p className="text-xl text-mauve-950">
                    Body:
                    <span className="text-mauve-700">
                        {" "}
                        {postQuery.data.body}
                    </span>
                </p>
            </h2>

            <h3 className="text-3xl font-serif py-2">
                Comments:
            </h3>

            {comments.map((comment) => (
                <CommentCard
                    key={comment.id}
                    id={comment.id}
                    name={comment.name}
                    email={comment.email}
                    body={comment.body}

                />
            ))}

            <Link
                to="/posts"
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-xl font-serif">
                Back
            </Link>
        </div>

    );
};

export default PostDetailsPage;