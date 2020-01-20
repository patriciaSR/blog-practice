<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/blog-logo-transparent.png')"
          class="my-3"
          contain
          height="180"
        ></v-img>
      </v-flex>

      <v-flex py-15>
        <h1 class="display-2 font-weight-bold mt-6">Welcome to Patri's Blog</h1>

        <div class="py-5">
          <p
            class="subheading font-weight-regular"
          >For create new posts and comments you need sign in.</p>

          <div class="py-5">
            <v-btn class="mr-4" depressed color="primary" href="/login">Login</v-btn>
            <v-btn depressed color="primary" href="/signup">Sign up</v-btn>
          </div>
        </div>

        <div>
        </div>

        <div class="py-5">
          <p class="subheading font-weight-regular">You can read posts and comments freely.</p>
          <v-btn depressed color="primary" href="/posts">View posts</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
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
  })
}
</script>

<style scoped>
.indigo {
  color: #b2ebf2;
  height: 100%;
}
</style>
