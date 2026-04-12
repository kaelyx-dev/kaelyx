import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@view/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@view/AboutView.vue")
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
    }
]

export const router = createRouter({
    history: createMemoryHistory(import.meta.env.BASE_URL),
    routes
})

export default router