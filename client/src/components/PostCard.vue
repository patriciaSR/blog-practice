<template>
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
          <v-btn color="orange" text @click="toggle()"> Show Comments ({{postData.comments.length}})</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>

export default {
  name: 'PostCard',
  props: {
    postData: undefined,
    isCommentsOpen: undefined,
    token: undefined
  },
  methods: {
    toggle() {
      const newValue = !this.isCommentsOpen

      this.$emit('comment-clicked', newValue)
    }
  }
}
</script>

<style scoped>
.v-card.hidden {
  display: none;
}
</style>
