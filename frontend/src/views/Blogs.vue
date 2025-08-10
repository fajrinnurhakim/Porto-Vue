<template>
  <LoadingScreen v-if="loading" />
  <div
    v-else
    class="container flex items-baseline h-screen px-5 py-24 mx-auto lg:py-16 bg-base-300 lg:w-full"
  >
    <div class="w-full">
      <h1 class="mb-12 text-2xl font-bold text-center md:text-4xl">
        My Blog <i class="fa-solid fa-file-contract"></i>
      </h1>
      <div class="w-full p-5 h-fit rounded-box bg-base-100">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-1">
          <div
            class="p-4 rounded-lg card-body bg-base-300"
            v-for="(blog, index) in blogsToShow"
            :key="index"
          >
            <p
              class="text-lg font-bold text-center link-hover link"
              @click="openModal(blog)"
            >
              {{ blog.title }}
            </p>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <div class="join">
            <button
              class="join-item btn"
              :disabled="currentPage === 1"
              @click="prevPage"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              class="join-item btn"
              :class="{ 'btn-active': page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <button
              class="join-item btn"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selectedBlog"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-5 bg-black bg-opacity-50"
    >
      <div
        class="w-full p-4 space-y-2 overflow-y-auto max-h-[80vh] rounded-lg bg-base-300 md:w-6/12"
      >
        <figure class="flex items-center justify-center">
          <img
            :src="selectedBlog.hero"
            alt="blogHero"
            class="object-cover h-48 md:h-64"
          />
        </figure>
        <h2 class="text-3xl font-bold text-center md:text-2xl">
          {{ selectedBlog.title }}
        </h2>
        <h2 class="text-xs font-bold text-center md:text-sm">
          {{ selectedBlog.date }} | by Fajrin Nurhakim
        </h2>
        <p
          class="text-xs leading-relaxed text-justify whitespace-pre-line md:text-sm"
        >
          {{ selectedBlog.description }}
        </p>
        <div class="divider"></div>
        <p
          class="text-xs leading-relaxed text-justify whitespace-pre-line md:text-sm"
        >
          {{ selectedBlog.content }}
        </p>
        <div class="text-xs font-bold divider md:text-sm">Album</div>
        <div class="grid grid-cols-2 gap-4 py-3 md:grid-cols-3">
          <img :src="selectedBlog.image1" alt="image1" class="w-auto" />
          <img :src="selectedBlog.image2" alt="image2" class="w-auto" />
          <img :src="selectedBlog.image3" alt="image3" class="w-auto" />
          <img :src="selectedBlog.image4" alt="image4" class="w-auto" />
          <img :src="selectedBlog.image5" alt="image5" class="w-auto" />
          <img :src="selectedBlog.image6" alt="image6" class="w-auto" />
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
  title: 'Fajrin Nurhakim | Blogs',
});
export default {
  data() {
    return {
      selectedBlog: null,
      blogs: [],
      showAllPortfolios: false,
      loading: true,
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  components: {
    LoadingScreen,
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    openModal(blog) {
      this.selectedBlog = blog;
    },
    closeModal() {
      this.selectedBlog = null;
    },
    async getBlogs() {
      try {
        const response = await axios.get('https://fajrin-api.vercel.app/blogs');
        this.blogs = response.data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    },
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },

  computed: {
    blogsToShow() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.blogs.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.blogs.length / this.itemsPerPage);
    },
  },
};
</script>
