<template>
  <div class="d-flex">
    <v-avatar size="70" class="ma-2">
      <img :src="postData.userInfo.image || defaultAvatar" :alt="postData.userInfo.username" />
    </v-avatar>
    <div class="d-flex-column justify-center py-3">
      <v-card-subtitle class="py-0 mb-1 primary--text">@{{postData.userInfo.username}}</v-card-subtitle>
      <v-card-subtitle class="py-0 caption">date: {{postData.date}}</v-card-subtitle>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '../assets/avatar-pengin.png'

export default {
  name: 'PrimaryBtn',
  data: () => ({
    defaultAvatar
  }),
  props: {
    postData: undefined
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
