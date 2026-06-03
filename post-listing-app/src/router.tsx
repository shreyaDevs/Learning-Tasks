import {createRootRoute, createRoute, createRouter, Outlet} from "@tanstack/react-router";
import App from "./App";
import PostsPage from "./routes/posts";
import PostDetailsPage from "./routes/posts.id";


const rootRoute = createRootRoute({
    component: () => (
            <Outlet />
    ),
});

const postsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/posts",
    component: PostsPage,
});

const postDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/posts/$id",
    component: PostDetailsPage,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: App,
})

const routeTree = rootRoute.addChildren([
    postsRoute,
    postDetailsRoute,
    homeRoute,
]);

export const router = createRouter({
    routeTree,
});