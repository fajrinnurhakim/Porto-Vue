<template>
    <div
        class="flex h-screen bg-base-300 item-center lg:w-9/12"
        v-for="(profile, index) in profiles"
        :key="index"
    >
        <div class="container flex items-center h-auto p-5 py-24 mx-auto">
            <div class="flex-row mx-auto space-y-5 text-center md:w-2/3">
                <p class="text-xl font-bold">Hello there! 👋🏼</p>
                <p class="text-2xl font-bold">{{ profile.name }}</p>
                <p class="text-base-content">
                    Combining expertise in developing captivating user
                    interfaces with a keen attention to detail to ensure optimal
                    product quality, Let's create something extraordinary
                    together!
                </p>
                <a :href="profile.link_cv" class="btn btn-outline">
                    Curriculum Vitae
                    <span>
                        <i class="fa-solid fa-file-invoice"></i>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Profiles",
    data() {
        return {
            profiles: [],
        };
    },
    mounted() {
        this.getProfiles();
    },
    methods: {
        async getProfiles() {
            try {
                const response = await axios.get(
                    "https://fajrin-api.vercel.app/profiles"
                );
                this.profiles = response.data;
                console.log(this.profiles);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        },
    },
};
</script>
