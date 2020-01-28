<template>
  <v-card max-width="800">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="postData.image || defaultPostImage"
    >
      <v-card-title>{{postData.title}}</v-card-title>
    </v-img>
    <div class="d-flex">
      <v-avatar size="70" class="ma-2">
        <img
          :src="postData.userInfo.image || defaultAvatar"
          :alt="postData.userInfo.username"
        />
      </v-avatar>
      <div class="d-flex-column justify-center py-3">
        <v-card-subtitle class="py-0 mb-1 primary--text">@{{postData.userInfo.username}}</v-card-subtitle>
        <v-card-subtitle class="py-0 caption">date: {{postData.date}}</v-card-subtitle>
      </div>
    </div>
    <v-card-text class="text--primary">{{postData.content}}</v-card-text>

    <v-card-actions v-if="userStore.token && (userStore.data._id === postData.userID || userStore.data.role === 'admin')" class="justify-end">
      <v-btn color="orange" text @click="editPost(postData._id)">Edit</v-btn>
      <v-btn color="orange" text @click="deletePost(postData._id)">Delete</v-btn>
    </v-card-actions>

    <v-divider class="mx-3"></v-divider>

    <v-card-actions>
      <v-btn color="orange" text @click="toggle()">Show Comments ({{postData.comments.length}})</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import userStore from '../stores/user'
import defaultPostImage from '../assets/defaultPostImage.jpg'
import defaultAvatar from '../assets/avatar-pengin.png'


import deletePost from '../resources/deletePost'

export default {
  name: 'PostCard',
  data: () => ({
    userStore: userStore.state,
    defaultPostImage,
    defaultAvatar
  }),
  props: {
    postData: undefined,
    isCommentsOpen: undefined,
    token: undefined
  },
  methods: {
    toggle() {
      const newValue = !this.isCommentsOpen

      this.$emit('comment-clicked', newValue)
    },
    editPost(postID) {
      this.$router.push({
        path: '/myprofile/newpost/',
        query: { edit: postID }
      })
    },
    async deletePost(postID) {
      let resultSendDelete
      try {
        resultSendDelete = await deletePost(postID)
      } catch (e) {
        if (e.response.status === 401) {
          alert('Your session has expired. Please, login again!')
          this.$router.push('/login')
        } else {
          alert(e.response.data)
        }
      }

      if (resultSendDelete) {
        alert('Your post has deleted correctly')
        this.$router.push('/posts')
      }
    }
  }
}
</script>

<style scoped>
.v-card.hidden {
  display: none;
}
</style>
