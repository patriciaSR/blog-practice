<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :right="right"
    :src="bg"
    absolute
    dark
    :class="{open: isOpen, hidden: !isOpen}"
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="miniVariant && 'px-0 my-0'">
        <v-list-item-avatar v-if="userStore.token">
          <img :src="userStore.data.image || defaultAvatar" />
        </v-list-item-avatar>

        <v-list-item-content class="d-flex" v-if="userStore.token">
          <v-list-item-title>{{userStore.data.firstname}} {{userStore.data.lastname || ''}}</v-list-item-title>
          <v-list-item-subtitle>@{{userStore.data.username}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn text icon color="red" @click="close()">
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <div v-if="userStore.token">
      <router-link :to="item.path" v-for="item in items" :key="item.title">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <v-list-item link @click="logout()">
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <div v-else>
        <router-link :to="'/login'">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      </div>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import userStore from '../stores/user'
import defaultAvatar from '../assets/avatar-pengin.png'

export default {
  name: 'NavigationMenu',
  props: {
    isOpen: undefined
  },
  data() {
    return {
      userStore: userStore.state,
      defaultAvatar,
      drawer: true,
      items: [
        { title: 'Posts', icon: 'mdi-view-dashboard', path: '/posts' },
        { title: 'My Profile', icon: 'mdi-account', path: '/myprofile' }
      ],
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: true,
      miniVariant: true,
      expandOnHover: false,
      background: false
    }
  },
  computed: {
    bg() {
      return this.background
        ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
        : undefined
    }
  },
  methods: {
    close() {
      this.$emit('toggle-menu', false);
    },
    logout(){
      localStorage.clear();
      userStore.state.token = '';
      userStore.state.data = {};

      return this.$router.push('/');
    }
  }
}
</script>

<style scoped>
aside.hidden {
  display: none;
}
aside.open {
  display: block;
  transform: none !important;
}
</style>
