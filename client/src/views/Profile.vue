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

        <AvatarCard :userData="userStore.data" />

        <v-card-actions v-if="userStore.token" class="flex-column align-start">
          <div>
            <SecondaryBtn btnText="Update Profile" />
            <SecondaryBtn btnText="Delete Profile" />
          </div>

          <div class="align-self-end">
            <PrimaryBtn btnText="+ New Post" @go-to="goToView('/myprofile/newpost')" />
            <PrimaryBtn
              v-if="userStore.data.role === 'admin'"
              btnText="⚙ Words"
              @go-to="goToView('/myprofile/words')"
            />
          </div>
        </v-card-actions>
      </v-card>

      <PostList listTitle="Your Posts" :posts="userPosts" />
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

import AvatarCard from '../components/AvatarCard'
import PostList from '../components/PostList'
import PrimaryBtn from '../components/Btns/PrimaryBtn'
import SecondaryBtn from '../components/Btns/SecondaryBtn'

export default {
  name: 'Profile',
  components: {
    AvatarCard,
    PostList,
    PrimaryBtn,
    SecondaryBtn
  },
  data: () => ({
    userStore: userStore.state,
    userPosts: [],
  }),
  props: {},
  async mounted() {
    this.userPosts = await this.getUserPosts()
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
.v-card--shadow-none {
  box-shadow: none;
}
</style>
