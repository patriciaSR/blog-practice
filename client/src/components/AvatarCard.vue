<template>
  <div class="d-flex">
    <v-avatar size="70" class="ma-2">
      <img v-if="userData" :src="userData.image || defaultAvatar" :alt="userData.username" />

      <img
        v-if="commentUserData"
        :src="commentUserData.image || defaultAvatar"
        :alt="commentUserData.username"
      />

      <img
        v-if="postData"
        :src="postData.userInfo.image || defaultAvatar"
        :alt="postData.userInfo.username"
      />
    </v-avatar>

    <div v-if="userData" class="d-flex-column justify-center py-3">
      <v-card-subtitle class="py-0 mb-1 primary--text">
        <strong>Username:</strong>
        @{{userData.username}}
      </v-card-subtitle>

      <v-card-subtitle class="py-0 mb-1 primary--text">
        <strong>Name:</strong>
        {{userData.firstname}} {{userData.lastname || ''}}
      </v-card-subtitle>
    </div>

    <div v-if="commentUserData" class="d-flex-column justify-center py-3">
      <v-card-subtitle class="py-0 mb-1 primary--text">@{{commentUserData.username}}</v-card-subtitle>
      <v-card-subtitle class="py-0 caption">date: {{commentDate}}</v-card-subtitle>
    </div>

    <div v-if="postData" class="d-flex-column justify-center py-3">
      <v-card-subtitle class="py-0 mb-1 primary--text">@{{postData.userInfo.username}}</v-card-subtitle>
      <v-card-subtitle class="py-0 caption">date: {{postData.date}}</v-card-subtitle>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '../assets/avatar-pengin.png'

export default {
  name: 'PrimaryBtn',
  props: {
    postData: undefined,
    commentUserData: undefined,
    commentDate: undefined,
    userData: undefined
  },
  data: () => ({
    defaultAvatar
  })
}
</script>

<style scoped>
</style>
