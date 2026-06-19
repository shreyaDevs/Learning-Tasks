import { Comment } from "@/types/comment";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getComments(
    id: string
): Promise<Comment[]> {
    const response = await fetch(
        `${BASE_URL}/posts/${id}/comments`
    );

    return response.json();
}