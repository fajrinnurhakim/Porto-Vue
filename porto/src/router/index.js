import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profiles from "../views/Profiles.vue";
import Skills from "../views/Skills.vue";
import Educations from "../views/Educations.vue";
import Experiences from "../views/Experiences.vue";
import Portofolios from "../views/Portofolios.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/profiles",
        name: "Profiles",
        component: Profiles,
    },
    {
        path: "/skills",
        name: "Skills",
        component: Skills,
    },
    {
        path: "/educations",
        name: "Educations",
        component: Educations,
    },
    {
        path: "/experiences",
        name: "Experiences",
        component: Experiences,
    },
    {
        path: "/portofolios",
        name: "Portofolios",
        component: Portofolios,
    },
    {
        path: "/profiles",
        name: "Profiles",
        component: Profiles,
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

export default router;
