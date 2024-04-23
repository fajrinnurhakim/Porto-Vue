<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
    <div class="flex-none lg:flex bg-base-300">
        <Navbar />
        <router-view />
    </div>
</template>
