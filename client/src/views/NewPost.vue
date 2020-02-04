<template>
  <v-container fluid mx-auto my-6 pa-0>
    <v-card v-if="userStore.token" class="mx-4">
      <v-form ref="form" class="pa-4 pt-6">
        <v-text-field
          v-model="newPost.title"
          :rules="[rules.required]"
          filled
          label="Title"
          name="input-title"
        ></v-text-field>

        <v-file-input
          accept="image/*"
          filled
          prepend-icon
          prepend-inner-icon="mdi-camera"
          :label="newPost.imageName || 'Background image file'"
          name="input-image"
          id="file"
          @change="handleUploadImage"
        ></v-file-input>

        <v-textarea
          v-model="newPost.content"
          :rules="[rules.required]"
          auto-grow
          filled
          label="Write your post"
          rows="6"
        ></v-textarea>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="$refs.form.reset()">Clear</v-btn>

        <v-spacer></v-spacer>

        <PrimaryBtn
          v-if="this.$route.query.edit"
          data-id="editpost-btn"
          btnText="Edit Post"
          @go-to="editPost"
        />

        <PrimaryBtn v-else btnText="+ Add Post" data-id="addpost-btn" @go-to="addNewPost" />
      </v-card-actions>
    </v-card>

    <v-card v-else class="mx-auto pa-10" max-width="500px" color="secondary">
      Login to add New Post
      <router-link :to="'/login'">here >></router-link>
    </v-card>

    <Dialog :offensiveError="offensiveError" :dialog="dialog" @close-dialog="dialog = false" />
  </v-container>
</template>

<script>
import sendNewPost from '../resources/sendNewPost';
import userStore from '../stores/user';

import PrimaryBtn from '../components/Btns/PrimaryBtn';
import Dialog from '../components/Dialog';

import loadPostDetail from '../resources/loadPostDetail';
import sendEditPost from '../resources/sendEditPost';

export default {
  name: 'NewPost',
  components: {
    PrimaryBtn,
    Dialog
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
        image: '',
        imageName: ''
      },
      postToEdit: '',
      rules: {
        required: value => !!value || 'The field is required.'
      },
      offensiveError: {
        errorText: undefined
      },
      dialog: false
    };
  },
  async mounted() {
    if (this.$route.query.edit) {
      this.newPost = await this.loadPostToEdit();
    }
  },
  methods: {
    async addNewPost() {
      const { title, content } = this.newPost;
      if (title && content) {
        let resultSendPost;
        try {
          resultSendPost = await sendNewPost(this.newPost);
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!');
            this.$router.push('/login');
          }
        }

        if (resultSendPost) {
          alert('Post registered correctly');
          return this.$router.push('/posts/' + resultSendPost._id);
        }
      } else {
        this.offensiveError.errorText = 'Fill required fields';
        this.dialog = true;
      }
    },
    async editPost() {
      const postID = this.$route.query.edit;

      const { title, content } = this.newPost;
      if (title && content) {
        let resultSendToEdit;
        try {
          resultSendToEdit = await sendEditPost(this.newPost, postID);
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!');
            this.$router.push('/login');
          }
        }

        if (resultSendToEdit) {
          alert('Post registered correctly');
          return this.$router.push('/posts/' + postID);
        }
      } else {
        this.offensiveError.errorText = 'Fill required fields';
        this.dialog = true;
      }
    },
    async loadPostToEdit() {
      let postToEdit;
      const postID = this.$route.query.edit;

      try {
        postToEdit = await loadPostDetail(postID);
        delete postToEdit._id;
        delete postToEdit.comments;
        delete postToEdit.userInfo;
        delete postToEdit.userID;

        return postToEdit;
      } catch (e) {
        if (e.response.status === 401) {
          alert('Your session has expired. Please, login again!');
          this.$router.push('/login');
        }
      }
    },
    handleUploadImage(ev) {
      const file = ev;
      if (!file) return;
      this.newPost.imageName = file.name

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ev => {
        this.newPost.image = ev.target.result;
      };
      document.querySelector('#file').value = '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
