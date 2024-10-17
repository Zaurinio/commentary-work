<template>
  <div class="comments">
    <form @submit.prevent="addComment" class="form">
      <input type="text" class="form__input" placeholder="Add a comment" v-model="formData.text" />
      <button class="form__btn" type="submit">Post</button>
    </form>
    <template v-if="comments">
      <ul class="comments__list">
        <Comment
          v-for="(comment, index) in comments"
          :key="index"
          :data="comment"
          :first-level-index="index"
          @submited="$emit('submited')"
        </Comment>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { ref, toRefs  } from 'vue';
import {useRouter} from 'vue-router'
import Comment from './Comment.vue';
import axiosApiInstance from '../api';
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const props = defineProps(['comments']);
const emit = defineEmits(['submited']);

const { comments } = toRefs(props);

const formData = ref({
  text: '',
  date: new Date(),
  likes: 0,
  isLiked: false,
  comments: 0,
  subcomments: null,
});

const addComment = async () => {
  if (!authStore.userInfo.token) {
    router.push({name: 'auth'})
    return;
  }

  try {
    await axiosApiInstance.post(
      `https://commentary-work-default-rtdb.europe-west1.firebasedatabase.app/comments.json`,
      formData.value,
    );
    formData.value.text = '';
    emit('submited');
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped>
.comments {
  padding: 30px 20px;

  &__list {
    padding: 0;
    margin: 0;
  }
}

.form {
  margin-bottom: 37px;
  position: relative;

  &__input {
    width: 662px;
    padding: 28px 110px 28px 15px;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #fff;
    background-color: #10132e;
    border: 1px solid #b4b7c9;
    border-radius: 14px;
    outline: none;

    &::placeholder {
      color: #565973;
    }
  }

  &__btn {
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 14px;
    padding: 13px 25px;
    background: linear-gradient(90deg, #161a31 0%, #06091f 100%);
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    color: #fff;
    border: 1px solid #353b5c;
    cursor: pointer;
  }
}
</style>
