<template>
  <v-container>
    <v-layout text-left class="d-flex flex-column mx-5">
      <PostCard
        :postData="postData"
        :isCommentsOpen="isCommentsOpen"
        @comment-clicked="toggleComments"
      />

      <CommentsCard :comments="postData.comments" :isCommentsOpen="isCommentsOpen"/>

      <!-- <v-card max-width="800" :class="{ hidden: isCommentsOpen }" class="mt-5">
        <v-card-title>{{postData.comments.length}} COMMENTS</v-card-title>

        <div v-if="!userStore.token">
          Para comentar haz login
          <a @click="login()" href="#">aquí</a>
        </div>

        <div v-if="postData.comments.length !== 0">
          <v-card max-width="800" v-for="comment in postData.comments" :key="comment._id">
            <div class="d-flex">
              <v-avatar size="70" class="ma-2">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" :alt="comment.username" />
              </v-avatar>
              <div class="d-flex-column justify-center py-3">
                <v-card-subtitle class="py-0 mb-1 primary--text">@{{comment.userInfo.username}}</v-card-subtitle>
                <v-card-subtitle class="py-0 caption">date: {{comment.date}}</v-card-subtitle>
              </div>
            </div>
            <v-card-text class="text--primary">{{comment.content}}</v-card-text>

            <v-card-actions v-if="userStore.token">
              <v-btn color="orange" text>Update</v-btn>
              <v-btn color="orange" text>Delete</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card> -->
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
