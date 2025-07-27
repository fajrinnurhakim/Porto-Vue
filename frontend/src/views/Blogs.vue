<template>
  <LoadingScreen v-if="loading" />
  <div
    v-else
    class="container flex items-baseline h-auto px-5 py-24 mx-auto lg:py-16 bg-base-300 lg:w-9/12"
  >
    <div class="w-full space-y-5">
      <h1 class="mb-12 text-2xl font-bold text-center md:text-4xl">
        My Blog <i class="fa-solid fa-pencil"></i>
      </h1>
      <div class="w-full card card-border bg-base-100">
        <div class="flex items-center justify-between p-5">
          <h2 class="w-1/2">Title</h2>
          <a href=""><button class="btn btn-square">></button></a>
        </div>
      </div>
      <div class="w-full card card-border bg-base-100">
        <div class="flex items-center justify-between p-5">
          <h2 class="w-1/2">Title</h2>
          <a href=""><button class="btn btn-square">></button></a>
        </div>
      </div>
      <div class="w-full card card-border bg-base-100">
        <div class="flex items-center justify-between p-5">
          <h2 class="w-1/2">Title</h2>
          <a href=""><button class="btn btn-square">></button></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
