<template>
    <div
        :class="{ 'fixed top-0 left-0 right-0 z-50': isScrolled }"
        class="shadow-lg bg-base-100"
    >
        <div class="container flex mx-auto navbar">
            <div class="w-1/3 navbar-start">
                <a
                    href="/"
                    class="hidden text-xl text-white btn btn-ghost md:inline-flex"
                >
                    <span v-for="(profile, index) in profiles" :key="index">
                        <img :src="profile.image" alt="image" class="w-5 h-6" />
                    </span>
                    Fajrin Nurhakim
                </a>

                <details class="inline-flex dropdown md:hidden">
                    <summary class="m-1 btn btn-ghost">
                        <i class="fa-solid fa-bars"></i>
                    </summary>

                    <ul
                        class="z-50 w-screen space-y-2 shadow pe-5 me-5 menu dropdown-content bg-base-100 rounded-box"
                    >
                        <li>
                            <a href="#home"> Home </a>
                        </li>
                        <li>
                            <a href="#profiles"> Profiles </a>
                        </li>
                        <li>
                            <a href="#skills"> Skills </a>
                        </li>
                        <li>
                            <a href="#educations"> Educations </a>
                        </li>
                        <li>
                            <a href="#experiences"> Experiences </a>
                        </li>
                        <li>
                            <a href="#portofolios"> Portofolios </a>
                        </li>
                    </ul>
                </details>
            </div>

            <div class="w-2/3 navbar-end">
                <a class="flex text-xl btn btn-ghost md:hidden">
                    <span v-for="(profile, index) in profiles" :key="index">
                        <img :src="profile.image" alt="image" class="w-5 h-6" />
                    </span>
                    Fajrin Nurhakim
                </a>

                <ul
                    class="hidden space-x-2 menu menu-horizontal md:inline-flex md:justify-end"
                >
                    <li>
                        <a href="#home"> Home </a>
                    </li>
                    <li>
                        <a href="#profiles"> Profiles </a>
                    </li>
                    <li>
                        <a href="#skills"> Skills </a>
                    </li>
                    <li>
                        <a href="#educations"> Educations </a>
                    </li>
                    <li>
                        <a href="#experiences"> Experiences </a>
                    </li>
                    <li>
                        <a href="#portofolios"> Portofolios </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

export default {
    name: "NavbarHome",
    setup() {
        const profiles = ref([]);
        const activeMenu = ref("home");
        const isScrolled = ref(false);

        const loadProfiles = async () => {
            try {
                const response = await axios.get(
                    "https://fajrin-api.vercel.app/profiles"
                );
                profiles.value = response.data;
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        const handleMenuClick = (menu) => {
            activeMenu.value = menu.name;
        };

        const handleScroll = () => {
            isScrolled.value = window.scrollY > 1;
        };

        onMounted(() => {
            loadProfiles();
            window.addEventListener("scroll", handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);
        });

        return { profiles, activeMenu, isScrolled, handleMenuClick };
    },
};
</script>
