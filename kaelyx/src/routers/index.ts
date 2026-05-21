import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@view/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/tools",
        name: "Tools",
        component: () => import("@view/ToolView.vue")
    },
    {
        path: "/projects",
        name: "Projects",
        component: () => import("@view/ProjectsView.vue")
    },
    {
        path: "/blog",
        name: "Blog",
        component: () => import("@view/BlogView.vue")
    },
    {
        path: "/blog/:slug",
        name: "BlogPost",
        component: () => import("@view/BlogPostView.vue"),
        meta: { hide: true }
    },
    {
        path: "/blog/:category/:slug",
        name: "BlogPostWithCategory",
        component: () => import("@view/BlogPostView.vue"),
        meta: { hide: true }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@view/NotFoundView.vue"),
        meta: { hide: true }
    }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router