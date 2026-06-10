const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchPosts(page: number, limit: number) {
    const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`);

    if (!response.ok) {
        throw Error("Failed to fetch posts");
    }
    const data = await response.json();

    console.log("data fetched.")

    return data;

}

async function fetchPostsById(id: string) {
    const response = await fetch(`${BASE_URL}/posts/${id}`);

    if (!response.ok) {
        throw Error("Failed to fetch post by id");
    }
    else {
        console.log("posts fetched")
        return response.json();

    }
}

async function fetchCommentsByPostId(id: string) {
    const response = await fetch(`${BASE_URL}/posts/${id}/comments`);

    if (!response.ok) {
        throw Error("Failed to fetch comments by post id");
    }
    else {
        console.log("comments fetched.")
        return response.json();
    }
}

async function addPosts(addData: any) {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(addData)
    });

    if (!response.ok) {
        throw new Error("Failed to add posts..")
    }

    const newPost = await response.json();
    console.log("Post added successfully", newPost)

}

async function updatePosts(id: string, updateData: any) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData)
    });

    if (!response.ok) {
        throw new Error("Failed to update post..")
    }

    const updatedPost = await response.json();
    console.log("Post updated successfully", updatedPost)

}

async function deletePosts(id: string) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE"
    })

    if (!response.ok) {
        throw new Error("Failed to delete post..")
    }

    const deletedPost = await response.json();
    console.log("Post deleted successfully", deletedPost)

}

export { fetchPosts, fetchPostsById, fetchCommentsByPostId, addPosts, updatePosts, deletePosts };