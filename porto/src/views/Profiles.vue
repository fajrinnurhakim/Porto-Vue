<template>
    <LoadingScreen v-if="loading" />
    <div
        v-else
        class="container flex items-center h-screen p-5 px-5 py-24 mx-auto lg:py-16 lg:w-9/12 bg-base-300"
    >
        <div class="space-y-5">
            <h1 class="mb-12 text-2xl font-bold text-center md:text-4xl">
                Profile <i class="fa-solid fa-id-badge"></i>
            </h1>

            <div
                v-for="profile in profiles"
                :key="profile.id"
                class="flex items-center"
            >
                <div
                    class="flex-row content-center w-full space-y-3 md:w-2/3 md:mx-auto"
                >
                    <div class="space-y-4">
                        <p class="text-xl font-bold md:text-2xl">
                            Hello i'm {{ profile.name }}
                        </p>
                        <p class="font-medium">
                            <i class="fa-solid fa-location-dot"></i>
                            {{ profile.address }}
                        </p>
                        <p class="font-medium text-neutral-content">
                            {{ profile.main_socmed }}
                        </p>
                        <p class="text-justify text-neutral-content">
                            {{ profile.description }}
                        </p>
                        <div class="flex space-x-2">
                            <div
                                class="w-1/3 shadow-xl card card-compact bg-base-content"
                            >
                                <div class="text-center text-black card-body">
                                    <i class="fa-solid fa-star"></i>
                                    <h2 class="text-xl font-bold">
                                        {{ profile.year_experience }} +
                                    </h2>
                                    <p>Year of experience</p>
                                </div>
                            </div>

                            <div
                                class="w-1/3 shadow-xl card card-compact bg-base-content"
                            >
                                <div class="text-center text-black card-body">
                                    <i class="fa-solid fa-microchip"></i>
                                    <h2 class="text-xl font-bold">
                                        {{ profile.tech_stack }} +
                                    </h2>
                                    <p>Framework & Tech Stack Use</p>
                                </div>
                            </div>

                            <div
                                class="w-1/3 shadow-xl card card-compact bg-base-content"
                            >
                                <div class="text-center text-black card-body">
                                    <i class="fa-solid fa-sheet-plastic"></i>
                                    <h2 class="text-xl font-bold">
                                        {{ profile.success_project }} +
                                    </h2>
                                    <p>Successed Projects</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-x-2">
                            <a
                                v-for="(socmed, index) in socmeds"
                                :key="index"
                                :href="socmed.socmed_link"
                                class="text-2xl btn btn-ghost btn-circle"
                            >
                                <i :class="socmed.socmed_image"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen.vue";
import { useHead } from "@vueuse/head";
useHead({
    title: "Fajrin Nurhakim | Profile",
});
export default {
    data() {
        return {
            profiles: [],
            socmeds: [],
            loading: true,
        };
    },
    components: {
        LoadingScreen,
    },
    mounted() {
        this.getProfiles();
        this.getSocmeds();
    },
    methods: {
        async getProfiles() {
            try {
                const response = await axios.get(
                    "https://fajrin-api.vercel.app/profiles"
                );
                this.profiles = response.data;
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        },
        async getSocmeds() {
            try {
                const response = await axios.get(
                    "https://fajrin-api.vercel.app/socmeds"
                );
                this.socmeds = response.data;
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            } catch (error) {
                console.error("Error fetching socmeds:", error);
            }
        },
    },
};
</script>
