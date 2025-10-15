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
      v-if="showPasswordPrompt"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-5 bg-black bg-opacity-50"
    >
      <div class="w-full p-6 space-y-4 bg-base-100 rounded-lg md:w-96">
        <h2 class="text-xl font-bold text-center">Enter Pin</h2>
        <div class="relative w-full inline-grid grid-cols-6 gap-3">
          <input
            v-for="(digit, index) in pinDigits"
            :key="index"
            type="text"
            maxlength="1"
            inputmode="numeric"
            pattern="[0-9]*"
            class="w-10 h-10 text-center text-sm input input-bordered md:w-12 md:h-12 md:text-xl"
            v-model="pinDigits[index]"
            @input="onInput($event, index)"
            @keydown.backspace="onBackspace($event, index)"
            ref="pinInputs"
          />
        </div>
        <p v-if="passwordError" class="text-sm text-center text-error">
          {{ passwordError }}
        </p>
        <div class="flex justify-between pt-2">
          <button
            class="btn btn-outline btn-error"
            @click="showPasswordPrompt = false"
          >
            Cancel
          </button>
          <button class="btn btn-primary" @click="verifyPassword">
            Submit
          </button>
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
        <div
          v-if="hasAnyImage"
          class="grid grid-cols-2 gap-4 py-3 md:grid-cols-3"
        >
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
      itemsPerPage: 5,
      showPasswordPrompt: false,
      blogToOpen: null,
      enteredPassword: '',
      passwordError: '',
      pinDigits: Array(6).fill(''),
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
      this.blogToOpen = blog;
      this.enteredPassword = '';
      this.passwordError = '';
      this.showPasswordPrompt = true;
    },
    allowOnlyNumbers(e) {
      const charCode = e.charCode;
      if (charCode < 48 || charCode > 57) {
        e.preventDefault(); // Hanya izinkan angka 0-9
      }
    },
    onInput(e, index) {
      const value = e.target.value;

      // Allow only digits
      if (!/^\d$/.test(value)) {
        this.pinDigits[index] = '';
        return;
      }

      if (index < this.pinDigits.length - 1) {
        this.$refs.pinInputs[index + 1].focus();
      }
    },

    onBackspace(e, index) {
      if (e.key === 'Backspace' && this.pinDigits[index] === '' && index > 0) {
        this.$refs.pinInputs[index - 1].focus();
      }
    },
    verifyPassword() {
      const correctPassword = '111101';
      const enteredPin = this.pinDigits.join('');

      if (enteredPin === correctPassword) {
        this.selectedBlog = this.blogToOpen;
        this.showPasswordPrompt = false;
        this.blogToOpen = null;
        this.pinDigits = Array(6).fill('');
      } else {
        this.passwordError = 'Incorrect PIN. Please try again.';
      }
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
    hasAnyImage() {
      const img = this.selectedBlog;
      return (
        img &&
        (img.image1 ||
          img.image2 ||
          img.image3 ||
          img.image4 ||
          img.image5 ||
          img.image6)
      );
    },
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
