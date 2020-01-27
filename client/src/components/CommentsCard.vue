<template>
  <v-card max-width="800" :class="{ 'd-none': isCommentsOpen }" class="mt-5" color="#E8EAF6">
    <v-card-title>{{comments.length}} COMMENTS</v-card-title>

    <div v-if="!userStore.token">
      Para comentar haz login
      <router-link :to="'/login'">aquí</router-link>
    </div>

    <div v-if="comments.length !== 0" class="px-4 pb-4">
      <v-card class="pa-4 my-4">
        <v-text-field
          v-model="newComment"
          filled
          label="Write your comment"
          rows="3"
          :rules="[rules.required]"
          @keyup.enter="addNewComment()"
        ></v-text-field>

        <PrimaryBtn btnText="+ Comment" @go-to="addNewComment" />
      </v-card>
      <v-card max-width="800" v-for="comment in comments" :key="comment._id" class="mb-1">
        <div class="d-flex">
          <v-avatar size="70" class="ma-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsc5Kf9fpgukpXftCaCxHgghEzGXtHPOoxirg5H1Psq8imumfI5Q&s"
              :alt="comment.username"
            />
          </v-avatar>
          <div class="d-flex-column justify-center py-3">
            <v-card-subtitle class="py-0 mb-1 primary--text">@{{comment.userInfo.username}}</v-card-subtitle>
            <v-card-subtitle class="py-0 caption">date: {{comment.date}}</v-card-subtitle>
          </div>
        </div>

        <v-card class="pa-4 my-4" v-if="comment._id === commentToEdit.id">
          <v-text-field
            v-model="commentToEdit.content"
            filled
            label="Write your comment"
            rows="3"
            :rules="[rules.required]"
            @keyup.enter="sendEditComment()"
          ></v-text-field>

          <PrimaryBtn btnText="Edit" @go-to="sendEditComment" />
        </v-card>
        <v-card-text v-else class="text--primary">{{comment.content}}</v-card-text>

        <v-card-actions v-if="userStore.token && (userStore.data._id === comment.userInfo.userID || userStore.data.role === 'admin')">
          <v-btn color="orange" text @click="editComment(comment)">Edit</v-btn>
          <v-btn color="orange" text @click="deleteComment(comment._id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import userStore from '../stores/user'

import sendNewComment from '../resources/sendNewComment'
import sendEditComment from '../resources/sendEditComment'
import deleteComment from '../resources/deleteComment'

import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'CommentsCard',
  components: {
    PrimaryBtn
  },
  data: () => ({
    userStore: userStore.state,
    newComment: undefined,
    commentToEdit: {
      id: '',
      content: ''
    },
    rules: {
      required: value => !!value || 'The field is required.'
    }
  }),
  props: {
    postID: undefined,
    comments: undefined,
    isCommentsOpen: undefined
  },
  computed: {
    idToEdit: {
      get: function() {
        return this.commentToEdit
      },
      set: function(comment) {
        this.commentToEdit.id = comment._id
        this.commentToEdit.content = comment.content
        return this.commentToEdit
      }
    }
  },
  methods: {
    async addNewComment() {
      if (this.newComment) {
        let resultSendComment
        try {
          resultSendComment = await sendNewComment(this.postID, this.newComment)
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!')
            this.$router.push('/login')
          } else {
            alert(e.response.data)
          }
        }

        if (resultSendComment) {
          const { _id, username, image } = this.userStore.data

          const userInfo = {
            userID: _id,
            username,
            image
          }

          resultSendComment.userInfo = userInfo
          this.newComment = ' '

          this.comments.unshift(resultSendComment)
        }
      } else {
        alert('Fill required fields')
      }
    },
    editComment(comment) {
      return (this.idToEdit = comment)
    },
    async sendEditComment() {
      if (this.commentToEdit) {
        let resultSendComment
        try {
          resultSendComment = await sendEditComment(
            this.postID,
            this.commentToEdit
          )
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!')
            this.$router.push('/login')
          } else {
            alert(e.response.data)
          }
        }

        if (resultSendComment) {
          const { _id, username, image } = this.userStore.data

          const userInfo = {
            userID: _id,
            username,
            image
          }

          resultSendComment.userInfo = userInfo
          this.commentToEdit.id = ''

          const indexComment = this.comments.findIndex(
            comment => comment._id === resultSendComment._id
          )
          this.comments.splice(indexComment, 1, resultSendComment)
        }
      } else {
        alert('Fill required fields')
      }
    },
    async deleteComment(id) {
      let resultSendDelete
      try {
        resultSendDelete = await deleteComment(this.postID, id)
      } catch (e) {
        if (e.response.status === 401) {
          alert('Your session has expired. Please, login again!')
          this.$router.push('/login')
        } else {
          alert(e.response.data)
        }
      }

      if (resultSendDelete) {
        const indexComment = this.comments.findIndex(
          comment => comment._id === id
        )
        this.comments.splice(indexComment, 1)
      }
    }
  }
}
</script>

<style scoped>
</style>
