<template>
  <Header v-if="isHeaderVisible" />
  <router-view></router-view>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../src/components/Header.vue';
import { useAuthStore } from './stores/auth';

const route = useRoute();

const authStore = useAuthStore();

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'));
  if (tokens) {
    authStore.userInfo.token = tokens.token;
    authStore.userInfo.refreshToken = tokens.refreshToken;
  }
};

checkUser();

const isHeaderVisible = computed(() => route.name !== 'auth');
</script>

<style lang="scss" scoped></style>
