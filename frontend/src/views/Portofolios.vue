<template>
  <LoadingScreen v-if="loading" />
  <div
    v-else
    class="container flex items-baseline h-auto px-5 py-24 mx-auto lg:py-16 bg-base-300 lg:w-9/12"
  >
    <div class="w-full">
      <h1 class="mb-12 text-2xl font-bold text-center md:text-4xl">
        Portofolio <i class="fa-solid fa-file-contract"></i>
      </h1>
      <div class="w-full p-5 rounded-box bg-base-100">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div
            v-for="(portofolio, index) in portofoliosToShow"
            :key="index"
            class="shadow-xl card bg-base-300"
          >
            <figure>
              <img
                :src="portofolio.portofolio_image"
                alt="portofolioImage"
                class="w-full h-40"
              />
            </figure>
            <div class="p-4 card-body">
              <p
                class="text-sm font-bold cursor-pointer md:card-title link-hover link"
                @click="openModal(portofolio)"
              >
                {{ portofolio.portofolio_name }}
              </p>
              <div class="flex space-x-2">
                <img
                  :src="portofolio.tech_stack1"
                  alt="portofolio1"
                  class="h-5"
                />
                <img
                  :src="portofolio.tech_stack2"
                  alt="portofolio1"
                  class="h-5"
                />
                <img
                  :src="portofolio.tech_stack3"
                  alt="portofolio1"
                  class="h-5"
                />
              </div>
              <p class="text-sm">
                {{
                  portofolio.description.length > 50
                    ? portofolio.description.substring(0, 50) + '...'
                    : portofolio.description
                }}
              </p>
              <div class="flex space-x-1">
                <a :href="portofolio.link_github" class="w-1/2 btn btn-square">
                  Repository
                  <i class="fa-solid fa-code"></i>
                </a>
                <a :href="portofolio.link_demo" class="w-1/2 btn btn-square">
                  Preview
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="toggleShowAllPortfolios" class="btn">
            {{ showAllPortfolios ? 'View Less' : 'View More' }}
            <i class="fa-solid fa-external-link-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="selectedPortofolio"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div class="p-4 space-y-2 rounded-lg bg-base-300 w-80 md:w-96 card">
        <figure>
          <img
            :src="selectedPortofolio.portofolio_image"
            alt="portofolioImage"
            class="w-full h-48"
          />
        </figure>
        <h2 class="text-sm font-bold">
          {{ selectedPortofolio.portofolio_name }}
        </h2>
        <div class="flex space-x-2">
          <img
            :src="selectedPortofolio.tech_stack1"
            alt="tech_stack1"
            class="h-5"
          />
          <img
            :src="selectedPortofolio.tech_stack2"
            alt="tech_stack2"
            class="h-5"
          />
          <img
            :src="selectedPortofolio.tech_stack3"
            alt="tech_stack3"
            class="h-5"
          />
        </div>
        <p>{{ selectedPortofolio.description }}</p>
        <div class="flex space-x-1">
          <a
            :href="selectedPortofolio.link_github"
            class="w-1/2 btn btn-square"
          >
            Repository
            <i class="fa-solid fa-code"></i>
          </a>
          <a :href="selectedPortofolio.link_demo" class="w-1/2 btn btn-square">
            Preview
            <i class="fa-solid fa-link"></i>
          </a>
        </div>
        <button @click="closeModal" class="w-full btn btn-square">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen.vue';
import { useHead } from '@vueuse/head';
useHead({
  title: 'Fajrin Nurhakim | Portofolio',
});
export default {
  data() {
    return {
      selectedPortofolio: null,
      portofolios: [],
      showAllPortfolios: false,
      loading: true,
    };
  },
  components: {
    LoadingScreen,
  },
  mounted() {
    this.getPortofolios();
  },
  methods: {
    openModal(portofolio) {
      this.selectedPortofolio = portofolio;
    },
    closeModal() {
      this.selectedPortofolio = null;
    },
    async getPortofolios() {
      try {
        const response = await axios.get(
          'https://fajrin-api.vercel.app/portofolios'
        );
        this.portofolios = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching portofolios:', error);
      }
    },
    toggleShowAllPortfolios() {
      this.showAllPortfolios = !this.showAllPortfolios;
    },
  },
  computed: {
    portofoliosToShow() {
      return this.showAllPortfolios
        ? this.portofolios
        : this.portofolios.slice(0, 6);
    },
  },
};
</script>
