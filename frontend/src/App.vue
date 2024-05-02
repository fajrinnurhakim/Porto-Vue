<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="flex-none lg:flex bg-base-300">
    <Navbar />
    <Transition name="bounce">
      <router-view />
    </Transition>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
