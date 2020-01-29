<template>
  <v-card max-width="800">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="postData.image || defaultPostImage">
        <v-card-title>{{postData.title}}</v-card-title>
    </v-img>

    <AvatarCard :postData="postData" />

    <v-card-text class="text--primary">{{postData.content}}</v-card-text>

    <v-card-actions
      v-if="userStore.token && (userStore.data._id === postData.userID || userStore.data.role === 'admin')"
      class="justify-end"
    >
      <SecondaryBtn btnText="Edit" @go-to="editPost(postData._id)" />
      <SecondaryBtn btnText="Delete" @go-to="deletePost(postData._id)" />
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

import AvatarCard from '../components/AvatarCard'
import SecondaryBtn from '../components/Btns/SecondaryBtn'

import deletePost from '../resources/deletePost'

export default {
  name: 'PostCard',
  data: () => ({
    userStore: userStore.state,
    defaultPostImage
  }),
  components: {
    AvatarCard,
    SecondaryBtn
  },
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
        this.$router.push('/myprofile')
      }
    }
  }
}
</script>

<style scoped>
</style>
