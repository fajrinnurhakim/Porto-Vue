<template>
    <LoadingScreen v-if="loading" />
    <div
        v-else
        class="container flex-col items-baseline h-screen px-5 py-24 mx-auto lg:py-16 lg:w-9/12 bg-base-300"
    >
        <div class="space-y-5"></div>
        <h1 class="mb-12 text-2xl font-bold text-center md:text-4xl">
            Experiences <i class="fa-solid fa-briefcase"></i>
        </h1>
        <div class="w-full h-auto p-5 rounded-box bg-base-100">
            <div class="flex flex-row justify-end mb-2">
                <button class="btn btn-circle btn-ghost" @click="handlePrev">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button class="btn btn-ghost btn-circle" @click="handleNext">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            <div
                ref="snapContainer"
                class="flex flex-row space-x-2 overflow-hidden snap-x-mandatory smooth-scroll"
            >
                <div
                    v-for="(experience, index) in experiencesToShow"
                    :key="index"
                    class=""
                >
                    <div class="h-64 shadow-xl w-80 card bg-base-300">
                        <div class="p-4 card-body">
                            <h2
                                class="cursor-pointer card-title link link-hover"
                                @click="openModal(experience)"
                            >
                                {{ experience.experience_name }}
                                <div class="badge badge-secondary">
                                    {{ experience.type }}
                                </div>
                            </h2>
                            <p class="font-bold">
                                {{ experience.institution_name }}
                            </p>
                            <div class="flex space-x-2">
                                <img
                                    :src="experience.tech_stack1"
                                    alt="experience1"
                                    class="h-5"
                                />
                                <img
                                    :src="experience.tech_stack2"
                                    alt="experience1"
                                    class="h-5"
                                />
                                <img
                                    :src="experience.tech_stack3"
                                    alt="experience1"
                                    class="h-5"
                                />
                            </div>
                            <p>
                                {{
                                    experience.experience_description.length >
                                    75
                                        ? experience.experience_description.substring(
                                              0,
                                              75
                                          ) + "..."
                                        : experience.experience_description
                                }}
                            </p>
                            <div class="justify-start card-actions">
                                <div class="badge badge-outline">
                                    {{ experience.start_date }}/{{
                                        experience.end_date
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="toggleShowAllExperiences">
                    <div
                        class="flex items-center justify-center h-64 p-4 shadow-xl w-80 card bg-base-300 card-body"
                    >
                        <div>
                            <p>
                                {{
                                    showAllExperiences
                                        ? "Less experiences"
                                        : "More experiences"
                                }}
                                <i class="fa-solid fa-external-link-alt"></i>
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div
            v-if="selectedExperience"
            class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
            <div class="p-4 space-y-2 rounded-lg bg-base-300 card w-80 md:w-96">
                <h2 class="text-xl font-bold">
                    {{ selectedExperience.experience_name }}
                    <div class="badge badge-secondary">
                        {{ selectedExperience.type }}
                    </div>
                </h2>
                <p class="font-bold">
                    {{ selectedExperience.institution_name }}
                </p>
                <div class="flex space-x-2">
                    <img
                        :src="selectedExperience.tech_stack1"
                        alt="experience1"
                        class="h-5"
                    />
                    <img
                        :src="selectedExperience.tech_stack2"
                        alt="experience1"
                        class="h-5"
                    />
                    <img
                        :src="selectedExperience.tech_stack3"
                        alt="experience1"
                        class="h-5"
                    />
                </div>
                <p>{{ selectedExperience.experience_description }}</p>
                <button @click="closeModal" class="w-full btn btn-square">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen.vue";
import { useHead } from "@vueuse/head";
useHead({
    title: "Fajrin Nurhakim | Experience",
});
export default {
    name: "Experiencess",
    data() {
        return {
            selectedExperience: null,
            experiences: [],
            showAllExperiences: false,
            loading: true,
        };
    },
    components: {
        LoadingScreen,
    },
    mounted() {
        this.getExperiences();
    },
    methods: {
        handlePrev() {
            const snapContainer = this.$refs.snapContainer;
            if (snapContainer) {
                snapContainer.scrollBy({
                    left: -snapContainer.offsetWidth,
                    behavior: "smooth",
                });
            }
        },
        handleNext() {
            const snapContainer = this.$refs.snapContainer;
            if (snapContainer) {
                snapContainer.scrollBy({
                    left: snapContainer.offsetWidth,
                    behavior: "smooth",
                });
            }
        },
        openModal(experience) {
            this.selectedExperience = experience;
        },
        closeModal() {
            this.selectedExperience = null;
        },
        async getExperiences() {
            try {
                const response = await axios.get(
                    "https://fajrin-api.vercel.app/experiences"
                );
                this.experiences = response.data;
                this.experiences.sort(
                    (a, b) => new Date(b.start_date) - new Date(a.start_date)
                );
                setTimeout(() => {
                    this.loading = false;
                }, 1000);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            }
        },
        toggleShowAllExperiences() {
            this.showAllExperiences = !this.showAllExperiences;
        },
    },
    computed: {
        experiencesToShow() {
            return this.showAllExperiences
                ? this.experiences
                : this.experiences.slice(0, 3);
        },
    },
};
</script>
