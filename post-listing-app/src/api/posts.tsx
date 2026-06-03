const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts() {
    const response = await fetch(`${BASE_URL}/posts`);

    if (!response.ok) {
        throw Error("Failed to fetch posts");
    }
    const data = await response.json();

    console.log("data fetched.")

    return data;
   
}

async function fetchPostsById(id: string){
    const response = await fetch(`${BASE_URL}/posts/${id}`);

    if (!response.ok) {
        throw Error("Failed to fetch post by id"); 
    }
    else {
        console.log("posts fetched")
        return response.json();
        
    }
}

async function fetchCommentsByPostId(id: string){
    const response = await fetch(`${BASE_URL}/posts/${id}/comments`);

    if (!response.ok) {
        throw Error("Failed to fetch comments by post id");
    }
    else {
        console.log("comments fetched.")
        return response.json();
    }
}

export {fetchPosts, fetchPostsById, fetchCommentsByPostId};