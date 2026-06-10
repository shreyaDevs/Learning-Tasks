const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchComments(id: string) {
    const response = await fetch(`${BASE_URL}/posts/${id}/comments`);

    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    return response.json();
}

