import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/posts';
import PostCard from '../components/PostCard';

                                                                        
const PostsPage = () => {
    const {
        data,
       isLoading,
        error
    } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (isLoading) {
        return <h2 className="text-center text-xl p-4">Loading posts..</h2>
    }

    if (error) {
        return <h2 className="text-center text-xl p-4">Something went wrong</h2>
    }

    return(
        <div className='min-h-screen bg-fuchsia-100 p-4'>
            <h2 className='text-center text-4xl font-serif text-mauve-600 mb-4'>All Posts </h2>

            {data.map((post:any) => (
                <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                />
            ))}

            {data.map((post:any) => (
                <PostCard 
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                />
            ))}

        </div>
    )
}
    export default PostsPage;

    