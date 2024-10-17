<template>
  <section class="auth">
    <div class="container">
      <div class="auth__content">
        <div class="auth__content-top">
          <component :is="tabs[currentTab]"></component>
        </div>
        <div class="auth__content-bottom">
          <p class="auth__toggle" v-if="currentTab === 'SignUpForm'">
            Already have an account? <span @click="toggleTab">Login</span>
          </p>
          <p class="auth__toggle" v-else>
            Don’t have account? <span @click="toggleTab">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import SignUpForm from '../components/SignUpForm.vue';
import SignInForm from '../components/SignInForm.vue';

const currentTab = ref('SignInForm');

const tabs = {
  SignInForm,
  SignUpForm,
};

const toggleTab = () =>
  (currentTab.value = currentTab.value === 'SignInForm' ? 'SignUpForm' : 'SignInForm');
</script>

<style lang="scss" scoped>
.auth {
  background-image: url('../assets/img/auth-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;

  & {
    @media (min-resolution: 2dppx) {
      background-image: url('../assets/img/auth-bg_2x.jpg');
    }
  }

  &__content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__content-top {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }

  &__content-bottom {
    align-self: flex-start;
  }

  &__toggle {
    margin: 0;
    margin-bottom: 40px;
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);

    & span {
      font-weight: 700;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
