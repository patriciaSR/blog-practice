<template>
  <v-container>
    <v-layout class="d-flex flex-row justify-space-between align-center my-4" wrap>
      <div>
        <PostCard
          :postData="postData"
          :isCommentsOpen="isCommentsOpen"
          @comment-clicked="toggleComments"
        />

        <CommentsCard
          :postID="postData._id"
          :comments="postData.comments"
          :isCommentsOpen="isCommentsOpen"
        />
      </div>

      <PrimaryBtn
        v-if="userStore.token"
        btnText="New Post"
        @go-to="goToView('/myprofile/newpost')"
        class="mt-10 align-self-start"
      />
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user'
import loadPostDetail from '../resources/loadPostDetail'

import PrimaryBtn from '../components/Btns/PrimaryBtn'
import PostCard from '../components/PostCard'
import CommentsCard from '../components/CommentsCard'

export default {
  name: 'PostDetail',
  data: () => ({
    postData: {
      comments: [],
      userInfo: {}
    },
    isCommentsOpen: true,
    userStore: userStore.state
  }),
  components: {
    PrimaryBtn,
    PostCard,
    CommentsCard
  },
  async mounted() {
    let id = this.$route.params.id
    this.postData = await loadPostDetail(id)
  },
  methods: {
    toggleComments(isCommentsOpen) {
      this.isCommentsOpen = isCommentsOpen
    },
    goToView(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.v-card.hidden {
  display: none;
}
</style>
