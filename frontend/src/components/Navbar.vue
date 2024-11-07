<template>
  <div class="fixed top-0 left-0 right-0 z-50 shadow-lg bg-base-200 lg:hidden">
    <div class="container flex mx-auto navbar">
      <div class="navbar-start"></div>
      <div class="navbar-end" v-for="(profile, index) in profiles" :key="index">
        <img :src="profile.image" alt="image" class="w-5 h-6" />
        <span class="mx-2 font-medium">{{ profile.name }}</span>
      </div>
    </div>
  </div>
  <div class="hidden h-screen lg:inline-flex lg:w-3/12 bg-base-300">
    <div
      class="flex items-center justify-center w-5/6 mx-auto my-auto rounded-lg h-5/6 bg-base-100"
    >
      <div class="flex flex-col items-center justify-center pt-5 space-y-1">
        <span v-for="(profile, index) in profiles" :key="index">
          <img :src="profile.image" alt="image" class="w-20 h-24" />
        </span>
        <p class="font-bold">Fajrin Nurhakim</p>
        <p class="text-center">FrontEnd & Quality Assurance Enthusiast</p>
        <ul class="w-5/6 menu">
          <li>
            <router-link to="/">
              <i class="w-4 fa-solid fa-house"></i>
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/profiles"
              ><i class="w-4 fa-solid fa-id-badge"></i>
              Profile
            </router-link>
          </li>
          <li>
            <router-link to="/skills"
              ><i class="w-4 fa-solid fa-gears"></i>
              Skill
            </router-link>
          </li>
          <li>
            <router-link to="/educations"
              ><i class="w-4 fa-solid fa-user-graduate"></i>
              Education
            </router-link>
          </li>
          <li>
            <router-link to="/experiences"
              ><i class="w-4 fa-solid fa-briefcase"></i>
              Experiences
            </router-link>
          </li>
          <li>
            <router-link to="/portofolios"
              ><i class="w-4 fa-solid fa-file-contract"></i>
              Portofolios
            </router-link>
          </li>
        </ul>
        <div class="flex space-x-3">
          <a
            v-for="(socmed, index) in socmeds"
            :key="index"
            :href="socmed.socmed_link"
            class="text-xl btn btn-ghost btn-circle"
          >
            <i :class="socmed.socmed_image"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed z-50 btm-nav btm-nav-xs lg:hidden">
    <button
      :class="{ active: activeMenu === 'home' }"
      @click="handleMenuClick('home')"
    >
      <router-link to="/">
        <i class="w-4 fa-solid fa-house"></i>
      </router-link>
    </button>
    <button
      :class="{ active: activeMenu === 'profiles' }"
      @click="handleMenuClick('profiles')"
    >
      <router-link to="/profiles">
        <i class="w-4 fa-solid fa-id-badge"></i>
      </router-link>
    </button>
    <button
      :class="{ active: activeMenu === 'skills' }"
      @click="handleMenuClick('skills')"
    >
      <router-link to="/skills">
        <i class="w-4 fa-solid fa-gears"></i>
      </router-link>
    </button>
    <button
      :class="{ active: activeMenu === 'educations' }"
      @click="handleMenuClick('educations')"
    >
      <router-link to="/educations">
        <i class="w-4 fa-solid fa-user-graduate"></i>
      </router-link>
    </button>
    <button
      :class="{ active: activeMenu === 'experiences' }"
      @click="handleMenuClick('experiences')"
    >
      <router-link to="/experiences">
        <i class="w-4 fa-solid fa-briefcase"></i>
      </router-link>
    </button>
    <button
      :class="{ active: activeMenu === 'portofolios' }"
      @click="handleMenuClick('portofolios')"
    >
      <router-link to="/portofolios">
        <i class="w-4 fa-solid fa-file-contract"></i>
      </router-link>
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'NavbarHome',
  setup() {
    const profiles = ref([]);
    const socmeds = ref([]);

    const activeMenu = ref('home');

    const loadProfiles = async () => {
      try {
        const response = await axios.get(
          'https://fajrin-api.vercel.app/profiles'
        );
        profiles.value = response.data;
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const loadSocmeds = async () => {
      try {
        const response = await axios.get(
          'https://fajrin-api.vercel.app/socmeds'
        );
        socmeds.value = response.data;
      } catch (error) {
        console.error('Error fetching socmeds:', error);
      }
    };

    const handleMenuClick = (menu) => {
      activeMenu.value = menu;
    };

    onMounted(() => {
      loadProfiles();
      loadSocmeds();
    });

    return { profiles, socmeds, activeMenu, handleMenuClick };
  },
};
</script>
