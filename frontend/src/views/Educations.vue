<template>
  <LoadingScreen v-if="loading" />
  <div
    v-else
    class="container flex items-baseline h-auto px-5 py-24 mx-auto lg:py-16 bg-base-300 lg:w-9/12"
  >
    <div class="w-full space-y-5">
      <h1 class="mb-12 text-2xl font-bold text-center md:text-4xl">
        Educations <i class="fa-solid fa-user-graduate"></i>
      </h1>

      <div class="flex items-center">
        <div class="w-auto p-5 rounded-box bg-base-100">
          <div>
            <div class="flex space-x-2">
              <div class="w-1/2">
                <h3 class="text-2xl font-semibold text-center">
                  Educations
                  <i class="fa-solid fa-graduation-cap"></i>
                </h3>

                <template
                  v-for="(education, index) in displayedEducations"
                  :key="index"
                >
                  <ul
                    class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
                  >
                    <li>
                      <div class="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div
                        :class="{
                          'timeline-start text-start md:text-end':
                            index % 2 === 0,
                          'timeline-end text-start md:text-start':
                            index % 2 !== 0,
                        }"
                      >
                        <time class="font-mono text-sm italic"
                          >{{ education.start_date }}
                          -
                          {{ education.end_date }}</time
                        >
                        <div
                          :class="{
                            'flex justify-start md:justify-end':
                              index % 2 === 0,
                            'flex justify-start md:justify-start':
                              index % 2 !== 0,
                          }"
                        >
                          <div class="flex items-center">
                            <img
                              :src="education.education_image"
                              alt="educationImage"
                              class="h-4 me-2"
                            />
                            <p>
                              {{ education.institution_education }}
                            </p>
                          </div>
                        </div>
                        <div class="text-sm font-bold">
                          {{ education.education_name }}
                        </div>
                        <div class="text-sm">
                          {{ education.type_education }}
                          education
                        </div>
                      </div>
                      <hr />
                    </li>
                  </ul> </template
                ><button
                  v-if="!showAllEducations && educations.length > 4"
                  @click="toggleEducations"
                >
                  Read more
                </button>
              </div>

              <div class="w-1/2">
                <p class="text-2xl font-semibold text-center">
                  Achievements
                  <i class="fa-solid fa-award"></i>
                </p>
                <template
                  v-for="(award, index) in displayedAwards"
                  :key="index"
                >
                  <ul
                    class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
                  >
                    <li>
                      <div class="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div
                        :class="{
                          'timeline-start text-start md:text-end':
                            index % 2 === 0,
                          'timeline-end text-start md:text-start':
                            index % 2 !== 0,
                        }"
                      >
                        <time class="font-mono text-sm italic">{{
                          award.win_date
                        }}</time>
                        <div>
                          {{ award.institution_award }}
                        </div>
                        <div class="text-sm font-bold">
                          {{ award.award_name }}
                        </div>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </template>
                <button
                  v-if="!showAllAwards && awards.length > 4"
                  @click="toggleAwards"
                >
                  Read more
                </button>
              </div>
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
  title: 'Fajrin Nurhakim | Education',
});

export default {
  data() {
    return {
      showAllEducations: false,
      showAllAwards: false,
      educations: [],
      awards: [],
      loading: true,
    };
  },
  components: {
    LoadingScreen,
  },
  computed: {
    displayedEducations() {
      return this.showAllEducations
        ? this.educations
        : this.educations.slice(0, 4);
    },
    displayedAwards() {
      return this.showAllAwards ? this.awards : this.awards.slice(0, 4);
    },
  },
  mounted() {
    this.getEducations();
    this.getAwards();
  },
  methods: {
    toggleEducations() {
      this.showAllEducations = !this.showAllEducations;
    },
    toggleAwards() {
      this.showAllAwards = !this.showAllAwards;
    },
    async getEducations() {
      try {
        const response = await axios.get(
          'https://fajrin-api.vercel.app/educations'
        );
        this.educations = response.data;
        this.educations.sort(
          (a, b) => new Date(b.start_date) - new Date(a.start_date)
        );
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching educations:', error);
      }
    },
    async getAwards() {
      try {
        const response = await axios.get(
          'https://fajrin-api.vercel.app/awards'
        );
        this.awards = response.data;
        this.awards.sort((a, b) => new Date(b.win_date) - new Date(a.win_date));
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching awards:', error);
      }
    },
  },
};
</script>
