<template>
  <v-card max-width="800" color="#E8EAF6" :class="{ 'd-none': isCommentsOpen }" class="mt-5 pa-4">
    <v-card-title>{{comments.length}} COMMENTS</v-card-title>

    <div v-if="!userStore.token" class="pa-4">
      Login to add new comment
      <router-link :to="'/login'">here >></router-link>
    </div>

    <v-card v-else class="pa-4 my-4">
      <v-text-field
        v-model="newComment"
        :rules="[rules.required]"
        filled
        label="Write your comment"
        name="input-comment"
        rows="3"
        @keyup.enter="addNewComment()"
      ></v-text-field>

      <PrimaryBtn btnText="+ Comment" data-id="add-comment-btn" @go-to="addNewComment" />
    </v-card>

    <v-card v-for="comment in comments" :key="comment._id" max-width="800" class="mb-2">
      <AvatarCard :commentUserData="comment.userInfo" :commentDate="comment.date" />

      <v-card v-if="comment._id === commentToEdit.id" class="pa-4 my-4">
        <v-text-field
          v-model="commentToEdit.content"
          :rules="[rules.required]"
          filled
          label="Write your comment"
          name="input-comment-edit"
          rows="3"
          @keyup.enter="sendEditComment()"
        ></v-text-field>

        <PrimaryBtn btnText="Edit" data-id="send-comment-btn" @go-to="sendEditComment" />
      </v-card>
      <v-card-text v-else class="text--primary">{{comment.content}}</v-card-text>

      <v-card-actions
        v-if="userStore.token && (userStore.data._id === comment.userID || userStore.data.role === 'admin')"
      >
        <SecondaryBtn btnText="Edit" data-id="edit-comment-btn" @go-to="editComment(comment)" />
        <SecondaryBtn
          btnText="Delete"
          data-id="delete-comment-btn"
          @go-to="deleteComment(comment._id)"
        />
      </v-card-actions>
    </v-card>

    <Dialog :offensiveError="offensiveError" :dialog="dialog" @close-dialog="dialog = false"/>
  </v-card>
</template>

<script>
import userStore from '../stores/user'
import defaultAvatar from '../assets/avatar-pengin.png'

import sendNewComment from '../resources/sendNewComment'
import sendEditComment from '../resources/sendEditComment'
import deleteComment from '../resources/deleteComment'

import AvatarCard from '../components/AvatarCard'
import PrimaryBtn from '../components/Btns/PrimaryBtn'
import SecondaryBtn from '../components/Btns/SecondaryBtn'
import Dialog from '../components/Dialog'


export default {
  name: 'CommentsCard',
  components: {
    AvatarCard,
    PrimaryBtn,
    SecondaryBtn,
    Dialog
  },
  props: {
    postID: undefined,
    comments: undefined,
    isCommentsOpen: undefined
  },
  data: () => ({
    userStore: userStore.state,
    defaultAvatar,
    newComment: undefined,
    commentToEdit: {
      id: '',
      content: ''
    },
    rules: {
      required: value => !!value || 'The field is required.'
    },
    offensiveError: undefined,
    dialog: false
  }),
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
      this.offensiveError = undefined
      if (this.newComment) {
        let resultSendComment
        try {
          resultSendComment = await sendNewComment(this.postID, this.newComment)
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!')
            this.$router.push('/login')
          } else {
            this.offensiveError = e.response.data
            this.dialog = true
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
          this.offensiveError = undefined

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
            this.offensiveError = e.response.data
            this.dialog = true
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
          this.offensiveError = undefined

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
