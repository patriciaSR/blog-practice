<template>
  <v-card max-width="800" :class="{ hidden: isCommentsOpen }" class="mt-5">
    <v-card-title>{{comments.length}} COMMENTS</v-card-title>

    <div v-if="!userStore.token">
      Para comentar haz login
      <a @click="login()" href="#">aquí</a>
    </div>

    <div v-if="comments.length !== 0">
      <v-card max-width="800" v-for="comment in comments" :key="comment._id">
        <div class="d-flex">
          <v-avatar size="70" class="ma-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsc5Kf9fpgukpXftCaCxHgghEzGXtHPOoxirg5H1Psq8imumfI5Q&s" :alt="comment.username" />
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
  </v-card>
</template>

<script>
import userStore from '../stores/user'

export default {
  name: 'CommentsCard',
  data: () => ({
    userStore: userStore.state
  }),
  props: {
    comments: undefined,
    isCommentsOpen: undefined,
  },
  methods: {
    login() {
      return this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.v-card.hidden {
  display: none;
}
</style>
