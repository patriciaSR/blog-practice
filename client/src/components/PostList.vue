<template>
  <v-card max-width="800" color="secondary" wrap>
    <v-card-title class>{{listTitle}}</v-card-title>
    <v-list-item three-line class="d-block pb-3" v-if="posts">
      <v-card
        class="mx-1 my-3 px-2"
        max-width="800"
        tile
        v-for="post in posts"
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

    <v-card-text v-else width="100%" class="ma-4">
      There is no post yet. Create your first post
      <router-link :to="'/myprofile/newpost'">here >></router-link>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'PostList',
  components: {},
  data: () => ({
  }),
  props: {
    listTitle: undefined,
    posts: undefined,
  },
  methods: {}
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
}
</style>
