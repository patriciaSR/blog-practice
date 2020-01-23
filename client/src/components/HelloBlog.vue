<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo-rocket.png')" class="my-3" contain height="180"></v-img>
      </v-flex>

      <v-flex py-15>
        <h1 class="display-2 font-weight-bold mt-6">Welcome to Patri's Blog</h1>

        <div class="py-5" v-if="!userStore.token">
          <p
            class="subheading font-weight-regular"
          >For create new posts and comments you need sign in.</p>

          <div class="py-5">
            <PrimaryBtn btnText="Login" @go-to="goToView('/login')" class="mr-4" />
            <PrimaryBtn btnText="Sign up" @go-to="goToView('/signup')" />
          </div>
        </div>

        <div v-else class="mt-12">
          <p>
            Welcome
            <span class="username">@{{userStore.data.username}}</span>
          </p>

          <div class="mt-8">
            <PrimaryBtn btnText="View posts" @go-to="goToView('/posts')" class="mr-4"/>
            <PrimaryBtn btnText="My Profile" @go-to="goToView('/myprofile')" />
          </div>

          <PrimaryBtn btnText="New Post" @go-to="goToView('/myprofile/newpost')" class="mt-10"/>
        </div>

        <div class="py-5" v-if="!userStore.token">
          <p class="subheading font-weight-regular">You can read posts and comments freely.</p>
          <PrimaryBtn btnText="View posts" @go-to="goToView('/posts')"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user'

import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'HelloBlog',
  components: {
    PrimaryBtn
  },
  data: () => ({
    userStore: userStore.state,
    Links: [
      {
        text: 'Sign up',
        href: '/signup'
      },
      {
        text: 'Login',
        href: '/login'
      },
      {
        text: 'View Posts',
        href: '/posts'
      }
    ]
  }),
  methods: {
    goToView(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.indigo {
  color: #b2ebf2;
  height: 100%;
}
.username {
  color: #1a237e;
  font-weight: bold;
}
</style>
