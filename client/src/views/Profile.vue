<template>
  <v-layout wrap>
    <div v-if="userStore.token" class="mx-auto my-10 v-card v-card--shadow-none">
      <v-card max-width="800" class="mb-6">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://i.pinimg.com/originals/11/3b/a4/113ba4f4a6ab9817069ca3a3bb4a1b1b.jpg"
        >
          <v-card-title>Hello, {{userStore.data.firstname}}</v-card-title>
        </v-img>
        <div class="d-flex">
          <v-avatar size="70" class="ma-2">
            <img :src="userStore.data.image || defaultAvatar" alt="user avatar" />
          </v-avatar>
          <div class="d-flex-column justify-center py-3">
            <v-card-subtitle class="py-0 mb-1 primary--text">
              <strong>Username:</strong>
              @{{userStore.data.username}}
            </v-card-subtitle>
            <v-card-subtitle class="py-0 mb-1 primary--text">
              <strong>Name:</strong>
              {{userStore.data.firstname}} {{userStore.data.lastname || ''}}
            </v-card-subtitle>
          </div>
        </div>

        <v-card-actions v-if="userStore.token">
          <v-btn color="orange" text>Update Profile</v-btn>
          <v-btn color="orange" text>Delete Profile</v-btn>
        </v-card-actions>

        <v-card-actions v-if="userStore.token" class="justify-end">
          <PrimaryBtn btnText="+ New Post" @go-to="goToView('/myprofile/newpost')" />
          <PrimaryBtn
            v-if="userStore.data.role === 'admin'"
            btnText="⚙ Words"
            @go-to="goToView('/myprofile/words')"
          />
        </v-card-actions>
      </v-card>

      <v-card max-width="800" color="secondary">
        <v-card-title class>Your posts</v-card-title>
        <v-list-item three-line class="d-block pb-3" v-if="isLoaded && userPosts">
          <v-card
            class="mx-1 my-3 px-2"
            max-width="800"
            tile
            v-for="post in userPosts"
            :key="post._id"
            :id="post._id"
          >
            <router-link :to="'/posts/' + post._id" class="no-underline">
              <v-list-item-content>
                <v-list-item-title class="mb-2">{{post.title}}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{post.date}}</v-list-item-subtitle>
                <v-list-item-subtitle class="mt-2">{{post.content}}</v-list-item-subtitle>
              </v-list-item-content>
            </router-link>
          </v-card>
        </v-list-item>

        <v-card-text v-else width="100%">
          You don't have any post yet. Create your first post
          <router-link :to="'/myprofile/newpost'">here >></router-link>
        </v-card-text>
      </v-card>
    </div>

    <v-card v-else class="pa-10">
      You need Login or Sign up
      <router-link :to="'/login'">here >></router-link>
    </v-card>
  </v-layout>
</template>

<script>
import loadUserPosts from '../resources/loadUserPosts'

import userStore from '../stores/user'
import defaultAvatar from '../assets/avatar-pengin.png'

import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'Profile',
  components: {
    PrimaryBtn
  },
  data: () => ({
    userStore: userStore.state,
    defaultAvatar: defaultAvatar,
    userPosts: [],
    isLoaded: false
  }),
  props: {},
  async mounted() {
    this.userPosts = await this.getUserPosts()
    this.isLoaded = true
  },
  methods: {
    toggle() {
      const newValue = !this.isCommentsOpen

      this.$emit('comment-clicked', newValue)
    },
    goToView(path) {
      this.$router.push(path)
    },
    async getUserPosts() {
      const userData = this.userStore.data

      if (userData) {
        const result = await loadUserPosts(userData._id)
        return result
      }
    }
  }
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
}
.v-card--shadow-none {
  box-shadow: none;
}
</style>
