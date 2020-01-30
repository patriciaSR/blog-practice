<template>
  <v-flex py-15>
    <div v-if="!userStore.token" class="py-5">
      <p class="subheading font-weight-regular">For create new posts and comments you need sign in.</p>

      <div class="py-5">
        <PrimaryBtn btnText="Login" @go-to="goToView('/login')" class="mr-4" />
        <PrimaryBtn btnText="Sign up" @go-to="goToView('/signup')" />
      </div>

      <p class="subheading font-weight-regular">You can read posts and comments freely.</p>

      <PrimaryBtn btnText="View posts" @go-to="goToView('/posts')" />
    </div>

    <div v-else class="mt-12">
      <p>
        Welcome
        <span class="username__text">@{{userStore.data.username}}</span>
      </p>

      <div class="mt-8">
        <PrimaryBtn btnText="View posts" @go-to="goToView('/posts')" class="mr-4" />
        <PrimaryBtn btnText="My Profile" @go-to="goToView('/myprofile')" />
      </div>

      <PrimaryBtn btnText="New Post" @go-to="goToView('/myprofile/newpost')" class="mt-10" />
    </div>
  </v-flex>
</template>

<script>
import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'WelcomeCard',
  components: {
    PrimaryBtn
  },
  props: {
    userStore: undefined
  },
  data: () => ({}),
  methods: {
    goToView(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.username__text {
  color: #1a237e;
  font-weight: bold;
}
</style>
