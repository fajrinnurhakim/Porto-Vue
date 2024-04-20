<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
    <div class="flex-none lg:flex">
        <Navbar />
        <router-view />
    </div>
</template>
