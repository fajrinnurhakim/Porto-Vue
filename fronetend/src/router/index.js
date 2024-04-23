import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "profiles" */ "../views/Home.vue"),
    },
    {
        path: "/profiles",
        name: "Profiles",
        component: () =>
            import(/* webpackChunkName: "profiles" */ "../views/Profiles.vue"),
    },
    {
        path: "/skills",
        name: "Skills",
        component: () =>
            import(/* webpackChunkName: "skills" */ "../views/Skills.vue"),
    },
    {
        path: "/educations",
        name: "Educations",
        component: () =>
            import(
                /* webpackChunkName: "educations" */ "../views/Educations.vue"
            ),
    },
    {
        path: "/experiences",
        name: "Experiences",
        component: () =>
            import(
                /* webpackChunkName: "experiences" */ "../views/Experiences.vue"
            ),
    },
    {
        path: "/portofolios",
        name: "Portofolios",
        component: () =>
            import(
                /* webpackChunkName: "portofolios" */ "../views/Portofolios.vue"
            ),
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

export default router;
