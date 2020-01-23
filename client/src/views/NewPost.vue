<template>
  <div class="mx-auto my-10">
    <v-card class="mx-auto" style="max-width: 500px" v-if="userStore.token">
      <v-form ref="form" class="pa-4 pt-6">
        <v-text-field
          v-model="newPost.title"
          :rules="[rules.required]"
          filled
          label="Title"
          style="min-height: 96px"
        ></v-text-field>

        <v-text-field v-model="newPost.image" filled label="Background image URL"></v-text-field>

        <v-textarea
          v-model="newPost.content"
          auto-grow
          filled
          label="Write your post"
          rows="5"
          :rules="[rules.required]"
        ></v-textarea>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="$refs.form.reset()">Clear</v-btn>

        <v-spacer></v-spacer>

        <PrimaryBtn btnText="+ Add Post" @go-to="addNewPost" />
      </v-card-actions>
    </v-card>

    <v-card class="mx-auto pa-10" max-width="500px" v-else>
      Login to add New Post
      <router-link :to="'/login'">here >></router-link>
    </v-card>
  </div>
</template>

<script>
import sendNewPost from '../resources/sendNewPost'
import userStore from '../stores/user'

import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'NewPost',
  components: {
    PrimaryBtn
  },
  data() {
    return {
      userStore: userStore.state,
      newPost: {
        title: '',
        content: '',
        userID: '',
        tags: [''],
        categories: [''],
        image: ''
      },
      rules: {
        required: value => !!value || 'The field is required.'
      },
      agreement: false
    }
  },
  methods: {
    async addNewPost() {
      const { title, content } = this.newPost
      if (title, content) {
        let resultSendPost
        try {
          resultSendPost = await sendNewPost(this.newPost)
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!')
            this.$router.push('/login')
          }
        }

        if (resultSendPost) {
          alert('Post registered correctly')
          return this.$router.push('/posts/' + resultSendPost._id)
        }
      } else {
        alert('Fill required fields')
      }
    }
  }
}
</script>

<style scoped>
</style>
