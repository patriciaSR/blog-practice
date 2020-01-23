<template>
  <v-container>
    <v-layout text-left class="d-flex flex-column mx-5">
      <PostCard
        :postData="postData"
        :isCommentsOpen="isCommentsOpen"
        @comment-clicked="toggleComments"
      />

      <CommentsCard :postID="postData._id" :comments="postData.comments" :isCommentsOpen="isCommentsOpen"/>

    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user'
import loadPostDetail from '../resources/loadPostDetail'

import PostCard from '../components/PostCard'
import CommentsCard from '../components/CommentsCard'

export default {
  name: 'PostDetail',
  data: () => ({
    postData: {
      comments: [],
      userInfo: {}
    },
    isCommentsOpen: true,
    userStore: userStore.state
  }),
  components: {
    PostCard,
    CommentsCard
  },
  async mounted() {
    let id = this.$route.params.id
    this.postData = await loadPostDetail(id)
  },
  methods: {
    toggleComments(isCommentsOpen) {
      this.isCommentsOpen = isCommentsOpen
    },
  }
}
</script>

<style scoped>
  .v-card.hidden {
    display: none;
  }
</style>
