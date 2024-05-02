<template>
  <LoadingScreen v-if="loading" />
  <div
    v-else
    class="container flex items-baseline h-auto px-5 py-24 mx-auto lg:py-16 bg-base-300 lg:w-9/12"
  >
    <div class="w-full">
      <h1 class="mb-5 text-2xl font-bold text-center md:text-4xl">
        Tools <i class="fa-solid fa-gears"></i>
      </h1>

      <div role="tablist" class="w-full tabs tabs-lifted">
        <input
          type="radio"
          id="tab-tech"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="Tech"
          aria-controls="tabpanel-tech"
          defaultChecked
        />
        <div
          id="tabpanel-tech"
          role="tabpanel"
          class="p-6 tab-content bg-base-100 border-base-300 rounded-box"
        >
          <p class="text-center"><i class="fa-solid fa-code"></i> Tech</p>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-6">
            <div
              v-for="(tech, index) in teches"
              :key="index"
              class="items-center text-center card-body"
            >
              <img
                :src="tech.tech_image"
                alt="tech_image"
                class="h-8 md:h-10"
              />
              <p class="font-bold">{{ tech.tech_name }}</p>
              <p>{{ tech.tech_level }}</p>
            </div>
          </div>
        </div>

        <input
          type="radio"
          id="tab-tools"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="Tools"
          aria-controls="tabpanel-tools"
        />
        <div
          id="tabpanel-tools"
          role="tabpanel"
          class="p-6 tab-content bg-base-100 border-base-300 rounded-box"
        >
          <p class="mb-5 text-center">
            <i class="fa-solid fa-screwdriver-wrench"></i> Tools
          </p>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-6">
            <div
              v-for="(tool, index) in tools"
              :key="index"
              class="items-center text-center card-body"
            >
              <img
                :src="tool.tool_image"
                alt="tools_image"
                class="h-8 md:h-10"
              />
              <p class="font-bold">{{ tool.tool_name }}</p>
              <p>{{ tool.tool_level }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen.vue';
import { useHead } from '@vueuse/head';
useHead({
  title: 'Fajrin Nurhakim | Skill',
});
export default {
  data() {
    return {
      teches: [],
      tools: [],
      loading: true,
    };
  },
  components: {
    LoadingScreen,
  },
  mounted() {
    this.getTools();
    this.getTeches();
  },
  methods: {
    async getTools() {
      try {
        const response = await axios.get('https://fajrin-api.vercel.app/tools');
        this.tools = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    },
    async getTeches() {
      try {
        const response = await axios.get(
          'https://fajrin-api.vercel.app/teches'
        );
        this.teches = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching teches:', error);
      }
    },
  },
};
</script>
