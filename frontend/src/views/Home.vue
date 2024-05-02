<template>
  <LoadingScreen v-if="loading" />
  <div v-else class="flex h-screen bg-base-300 item-center lg:w-9/12">
    <div
      class="container flex items-center h-auto p-5 py-24 mx-auto"
      v-for="(profile, index) in profiles"
      :key="index"
    >
      <div class="flex-row mx-auto space-y-5 text-center md:w-2/3">
        <p class="text-xl font-bold">Hello there! 👋🏼</p>
        <img
          src="../assets/profile.svg"
          alt="profile"
          class="w-32 h-32 mx-auto"
        />
        <p class="text-2xl font-bold">{{ profile.name }}</p>
        <p class="text-base-content">
          Combining expertise in developing captivating user interfaces with a
          keen attention to detail to ensure optimal product quality, Let's
          create something extraordinary together!
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
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen.vue';
import { useHead } from '@vueuse/head';
useHead({
  title: 'Fajrin Nurhakim',
});
export default {
  name: 'Profiles',
  components: {
    LoadingScreen,
  },
  data() {
    return {
      profiles: [],
      loading: true,
    };
  },
  mounted() {
    this.getProfiles();
  },
  methods: {
    async getProfiles() {
      try {
        const response = await axios.get(
          'https://fajrin-api.vercel.app/profiles'
        );
        this.profiles = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    },
  },
};
</script>
