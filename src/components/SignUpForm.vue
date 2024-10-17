<template>
  <section class="sign-up">
    <h1 class="sign-up__title">Sign Up</h1>
    <p class="sign-up__descr">
      Ready to become part of the exclusive club? Fill in the details below, and let the journey
      begin!
    </p>
    <form @submit.prevent="submitForm" class="sign-up__form form">
      <div class="form__field">
        <input class="form__input" type="text" id="fullname" required v-model="formData.fullname" />
        <label class="form__label" for="fullname">Full Name</label>
      </div>
      <div class="form__field">
        <input class="form__input" type="text" id="email" required v-model="formData.email" />
        <label class="form__label" for="email">Email Address</label>
      </div>
      <div class="form__field">
        <input class="form__input" type="text" id="password" required v-model="formData.password" />
        <label class="form__label" for="password">Password</label>
        <span class="form__error" v-if="isPasswordError">passwords do not match</span>
      </div>
      <div class="form__field">
        <input
          class="form__input"
          type="text"
          id="password-change"
          required
          v-model="formData.confirmPassword" />
        <label class="form__label" for="password-change">Confirm Password</label>
        <span class="form__error" v-if="isPasswordError">passwords do not match</span>
      </div>
      <button class="form__btn" type="submit">Sign Up</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const isPasswordError = ref(false);

const submitForm = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    isPasswordError.value = true;
    return;
  }
  await authStore.auth(
    { email: formData.value.email, password: formData.value.password },
    'signup',
  );
  router.push('/projects');
};
</script>

<style lang="scss" scoped>
.sign-up {
  width: 548px;
  font-family: 'Helvetica', sans-serif;

  &__title {
    font-weight: 700;
    font-size: 40px;
    text-transform: capitalize;
    text-align: center;
    color: #fff;
  }

  &__descr {
    margin-bottom: 56px;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #fff;
  }
}

.form {
  &__field {
    position: relative;

    &:not(:last-of-type) {
      margin-bottom: 24px;
    }

    &:last-of-type {
      margin-bottom: 56px;
    }
  }

  &__input {
    width: 548px;
    height: 60px;
    padding: 24px 18px;
    font-weight: 700;
    font-size: 22px;
    color: #fff;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    border: 1px solid #4d4d4d;

    &:focus,
    &:valid {
      border: 1px solid #ababab;
    }
  }

  &__label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 18px;
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);
    pointer-events: none;
    transition: 0.3s;
  }

  &__btn {
    display: block;
    width: 100%;
    border-radius: 4px;
    padding: 14px;
    background: linear-gradient(134deg, #f6b8fd 0%, #316ad7 100%);
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #fff;
    cursor: pointer;
  }

  &__error {
    position: absolute;
    right: 0;
    bottom: -20px;
    color: red;
  }
}

.form__input:focus ~ label,
.form__input:valid ~ label {
  top: 0;
  font-weight: 400;
  font-size: 14px;
  padding: 0 7px;
}
</style>
