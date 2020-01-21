<template>
  <v-container>
    <v-layout text-left class="d-flex flex-column mx-5">
      <v-card max-width="800">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{postData.title}}</v-card-title>
        </v-img>
        <div class="d-flex">
          <v-avatar size="70" class="ma-2">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <div class="d-flex-column justify-center py-3">
            <v-card-subtitle class="py-0 mb-1 primary--text">@{{postData.userInfo.username}}</v-card-subtitle>
            <v-card-subtitle class="py-0 caption">date: {{postData.date}}</v-card-subtitle>
          </div>
        </div>
        <v-card-text class="text--primary">{{postData.content}}</v-card-text>

        <v-card-actions v-if="token">
          <v-btn color="orange" text>Update</v-btn>
          <v-btn color="orange" text>Delete</v-btn>
        </v-card-actions>

        <v-card-actions>
          <v-btn color="orange" text @click="toggle()">Comments</v-btn>
        </v-card-actions>
      </v-card>

      <v-card max-width="800" :class="{ hidden: isClickedComments }" class="mt-5">
        <v-card-title>{{postData.comments.length}} COMMENTS</v-card-title>

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

            <v-card-actions v-if="token">
              <v-btn color="orange" text>Update</v-btn>
              <v-btn color="orange" text>Delete</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import loadPostDetail from '../resources/loadPostDetail'

export default {
  name: 'PostDetail',
  data: () => ({
    postData: {},
    isClickedComments: true,
    token: undefined
  }),
  async mounted() {
    let id = this.$route.params.id
    this.postData = await loadPostDetail(id)
  },
  methods: {
    toggle() {
      return (this.isClickedComments = !this.isClickedComments)
    }
  }
}
</script>

<style scoped>
.v-card.hidden {
  display: none;
}
</style>
