<template>
  <HelloBlog />
</template>

<script>
import HelloBlog from '../components/HelloBlog'

export default {
  name: 'Home',
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
  }),
  components: {
    HelloBlog
  },
}
</script>

<style scoped>
.indigo {
  color: #b2ebf2;
  height: 100%;
}
</style>
