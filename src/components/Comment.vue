<template>
  <li class="comments__item comment">
    <div class="comment__avatar"><span>RE</span></div>
    <div class="comment__content content">
      <div class="content__main">
        <div class="content__top">
          <p class="content__name">Ralph Edwards</p>
          <p class="content__date">{{ formatDate(data.date) }}</p>
        </div>
        <p class="content__text">
          {{ data.text }}
        </p>
        <div class="content__activity activity">
          <ul class="activity__list">
            <li class="activity__item activity__item--likes">
              <svg
                class="activity__icon"
                :class="{ 'activity__icon--liked': data.isLiked }"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 6H10.791L11.6332 3.47475C11.7847 3.01875 11.7083 2.51325 11.427 2.12325C11.1458 1.73325 10.6898 1.5 10.209 1.5H9C8.77725 1.5 8.5665 1.599 8.42325 1.77L4.89825 6H3C2.17275 6 1.5 6.67275 1.5 7.5V14.25C1.5 15.0773 2.17275 15.75 3 15.75H5.25H12.9802C13.602 15.75 14.166 15.3593 14.385 14.7765L16.4528 9.26325C16.4843 9.17925 16.5 9.09 16.5 9V7.5C16.5 6.67275 15.8273 6 15 6ZM3 7.5H4.5V14.25H3V7.5ZM15 8.86425L12.9802 14.25H6V7.0215L9.351 3H10.2105L9.039 6.51225C8.96175 6.741 9.00075 6.99225 9.14175 7.188C9.28275 7.3845 9.50925 7.5 9.75 7.5H15V8.86425Z"
                  fill="#9397AD" />
              </svg>
              <span>{{ data.likes }}</span>
            </li>
            <li class="activity__item activity__item--comments" @click="toggleInputField">
              <svg
                class="activity__icon"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 1.5H3C2.17275 1.5 1.5 2.17275 1.5 3V16.5L5.49975 13.5H15C15.8273 13.5 16.5 12.8273 16.5 12V3C16.5 2.17275 15.8273 1.5 15 1.5ZM15 12H5.00025L3 13.5V3H15V12Z"
                  fill="#9397AD" />
              </svg>
              <span>{{ commentsQty }}</span>
            </li>
          </ul>
        </div>
      </div>

      <input
        type="text"
        class="sub-comment-field"
        placeholder="Add a comment"
        v-model="formData.text"
        ref="input"
        @keyup.enter="addSubComment"
        v-if="isInputFleldVisible" />

      <div class="content__sub sub-comments" v-if="data.subcomments">
        <ul class="sub-comments__list">
          <Comment
            v-for="(subcomment, index) in data.subcomments"
            :key="index"
            :data="subcomment"
            :first-level-index="firstLevelIndex"
            :second-level-index="secondLevelIndex || index"
            :third-level-index="secondLevelIndex && !thirdLevelIndex ? index : null"
            @submited="$emit('submited')">
            <slot :data="subcomment" />
          </Comment>
        </ul>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, toRefs, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axiosApiInstance from '../api';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const props = defineProps(['data', 'firstLevelIndex', 'secondLevelIndex', 'thirdLevelIndex']);
const emit = defineEmits(['submited']);

const { data, firstLevelIndex, secondLevelIndex, thirdLevelIndex } = toRefs(props);

const formData = ref({
  text: '',
  date: new Date(),
  likes: 0,
  isLiked: false,
  comments: 0,
  subcomments: null,
});

const formatDate = (string) => {
  const date = new Date(string);
  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return dateString;
};

const input = ref(null);
const isInputFleldVisible = ref(false);

const commentsQty = ref(0);

const countCommentsQty = (data) => {
  for (let key in data) {
    if (key === 'subcomments') {
      commentsQty.value += Object.keys(data[key]).length;
      countCommentsQty(data[key]);
    } else if (typeof data[key] === 'object' && key !== 'subcomments') {
      countCommentsQty(data[key]);
    }
  }
};

countCommentsQty(data.value);

const toggleInputField = async () => {
  isInputFleldVisible.value = !isInputFleldVisible.value;

  if (isInputFleldVisible.value === true) {
    await nextTick();
    input.value.focus();
  }
};

const addSubComment = async () => {
  if (!authStore.userInfo.token) {
    router.push({ name: 'auth' });
    return;
  }

  try {
    await axiosApiInstance.post(
      `https://commentary-work-default-rtdb.europe-west1.firebasedatabase.app/comments/${
        firstLevelIndex.value
      }/subcomments${
        secondLevelIndex.value ? '/' + secondLevelIndex.value + '/subcomments' : ''
      }.json`,
      formData.value,
    );
    emit('submited');
    isInputFleldVisible.value = false;
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  column-gap: 20px;

  &:not(:last-child) {
    margin-bottom: 37px;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid #b4b7c9;
    color: #fff;
  }
}

.content {
  width: 100%;

  &__main {
    padding: 15px;
    font-family: 'Manrope', sans-serif;
    background-color: #10132e;
    border: 1px solid #b4b7c9;
    border-radius: 14px;

    &:not(:last-child) {
      margin-bottom: 37px;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__name {
    margin: 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    color: #fff;
  }

  &__date {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #9397ad;
  }

  &__text {
    margin: 0;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #fff;
  }
}

.activity {
  &__list {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;

    & span {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #9397ad;
    }
  }

  &__icon {
    margin-right: 2px;
  }

  &__icon--liked {
    & path {
      fill: #fff;
    }
  }
}

.sub-comments {
  &__list {
    padding: 0;
    list-style: none;
  }
}

.sub-comment-field {
  width: 100%;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
  background-color: #10132e;
  border: 1px solid #b4b7c9;
  border-radius: 14px;

  &::placeholder {
    color: #565973;
  }

  &:not(:last-child) {
    margin-bottom: 37px;
  }
}
</style>
