<template>
  <section class="about">
    <div class="container">
      <div class="about__content">
        <div class="about__image"></div>
        <section class="about__info">
          <h1 class="about__title">Contact <span>Us</span></h1>
          <p class="about__descr">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ligula quis lacus
            fermentum, vitae vulputate sem tristique. Nunc justo orci, porta in luctus eget,
            ultrices vitae justo. Mauris dignissim laoreet mi, a commodo libero volutpat non.
          </p>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.about {
  padding: 22px 0;

  &__image {
    height: 502px;
    margin-bottom: 52px;
    background-size: cover;
    background-image: url('../assets/img/projects-image.jpg');

    & {
      @media (min-resolution: 2dppx) {
        background-image: url('../assets/img/projects-image_2x.jpg');
      }
    }
  }

  &__title {
    margin: 0;
    margin-bottom: 52px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 48px;
    line-height: 48px;
    letter-spacing: -0.04em;
    text-align: center;

    span {
      color: #cbacf9;
    }
  }

  &__descr {
    font-family: 'Helvetica', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    margin: 0;
    padding: 0 20px;
    color: #fff;
  }
}
</style>
