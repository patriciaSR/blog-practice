<template>
  <v-container class="mx-auto d-flex justify-center">
    <v-layout wrap class="d-flex flex-row justify-space-between align-center my-4">
      <v-card v-if="notFound" width="80%" class="pa-10">Post Not Found :(</v-card>

      <div v-else class="v-card v-card--shadow-none">
        <PostCard
          :postData="postData"
          :isCommentsOpen="isCommentsOpen"
          @comment-clicked="toggleComments"
        />

        <CommentsCard
          :postID="postData._id"
          :comments="postData.comments"
          :isCommentsOpen="isCommentsOpen"
        />
      </div>

      <PrimaryBtn
        btnText="New Post"
        @go-to="goToView('/myprofile/newpost')"
        class="mt-10 align-self-start"
      />
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user';
import loadPostDetail from '../resources/loadPostDetail';
import formatDate from '../utils/formatDate';

import PrimaryBtn from '../components/Btns/PrimaryBtn';
import PostCard from '../components/PostCard';
import CommentsCard from '../components/CommentsCard';

export default {
  name: 'PostDetail',
  components: {
    PrimaryBtn,
    PostCard,
    CommentsCard
  },
  data: () => ({
    postData: {
      comments: [],
      userInfo: {}
    },
    isCommentsOpen: true,
    userStore: userStore.state,
    notFound: false
  }),
  async mounted() {
    let id = this.$route.params.id;
    let post;

    try {
      post = await loadPostDetail(id);
      post.date = formatDate(post.date);

      for (let comment of post.comments) {
        comment.date = formatDate(comment.date);
      }

      this.postData = post;
    } catch (e) {
      if (e.response.status === 404) {
        this.notFound = true;
      }
    }
  },
  methods: {
    toggleComments(isCommentsOpen) {
      this.isCommentsOpen = isCommentsOpen;
    },
    goToView(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.layout {
  max-width: 1000px;
}
.v-card--shadow-none {
  box-shadow: none;
}
</style>
