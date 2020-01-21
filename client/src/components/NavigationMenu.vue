<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :right="right"
    :src="bg"
    absolute
    dark
    :class="{open: isOpen, hidden: !isOpen}"
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="miniVariant && 'px-0 my-0'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content class="d-flex">
          <v-list-item-title>FirstName + LastName</v-list-item-title>
          <v-list-item-subtitle>@username</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn text icon color="pink" @click="close()">
          <v-icon>fa-times</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationMenu',
  props: {
    isOpen: undefined
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city', path: '/' },
        { title: 'My Account', icon: 'mdi-account', path: '/user' },
        { title: 'Posts', icon: 'mdi-view-dashboard', path: '/posts' },
      ],
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: true,
      miniVariant: true,
      expandOnHover: false,
      background: false,
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

      this.$emit('toggle-menu', false)
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
