<template>
  <section class="header">
    <nav class="header__nav nav">
      <ul class="list-reset nav__list">
        <li class="nav__item">
          <router-link :to="{ name: 'about' }" class="nav__link" active-class="nav__link--active"
            >About</router-link
          >
        </li>
        <li class="nav__item">
          <router-link :to="{ name: 'projects' }" class="nav__link" active-class="nav__link--active"
            >Projects</router-link
          >
        </li>
        <li class="nav__item">
          <router-link
            :to="{ name: 'testimonials' }"
            class="nav__link"
            active-class="nav__link--active"
            >Testimonials</router-link
          >
        </li>
        <li class="nav__item">
          <router-link :to="{ name: 'contact' }" class="nav__link" active-class="nav__link--active"
            >Contact</router-link
          >
        </li>
      </ul>
    </nav>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  padding-top: 102px;
  padding-bottom: 73px;

  &__list {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
    padding: 24px 50px;
    background: linear-gradient(150deg, #04071d 0%, #0c0e23 100%);
    border-radius: 13px;
  }

  &__link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.03em;
    text-decoration: none;
    color: #c1c2d3;
  }

  &__link--active {
    color: #fff;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 7px;
      height: 7px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
