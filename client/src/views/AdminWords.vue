<template>
  <v-container class="mx-auto d-flex justify-center">
    <v-layout text-left wrap class="d-flex flex-column justify-space-between align-center my-4">
      <v-card width="800" color="secondary">
        <WordCardInput btnText="+ Word" :word="newWord" @go-sendWord="addNewWord" />

        <v-card-title class>Lista de palabras</v-card-title>
        <v-list-item three-line class="d-flex flex-wrap pb-3">
          <v-card
            v-for="word in offensiveWords"
            :id="word._id"
            :key="word._id"
            tile
            class="mx-2 my-3 px-2"
            max-width="800"
          >
            <WordCardInput
              v-if="word._id === wordToEdit.id"
              btnText="Edit"
              :word="wordToEdit"
              @go-sendWord="sendEditWord"
            />

            <v-list-item-content v-else class="word__box">
              <v-list-item-title class="mb-2">
                <strong>Word:</strong>
                {{word.word}}
              </v-list-item-title>
              <v-list-item-subtitle class="caption">
                <strong>Level:</strong>
                {{word.level}}
              </v-list-item-subtitle>

              <v-card-actions class="justify-end">
                <SecondaryBtn btnText="Edit" @go-to="editWord(word)" />
                <SecondaryBtn btnText="Delete" @go-to="deleteWord(word.word)" />
              </v-card-actions>
            </v-list-item-content>
          </v-card>
        </v-list-item>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user'

import loadWords from '../resources/loadWords.js'
import sendNewWord from '../resources/sendNewWord'
import sendEditWord from '../resources/sendEditWord'
import deleteWord from '../resources/deleteWord'

import WordCardInput from '../components/WordCardInput'
import SecondaryBtn from '../components/Btns/SecondaryBtn'

export default {
  name: 'AdminWords',
  components: {
    WordCardInput,
    SecondaryBtn
  },
  data: () => ({
    userStore: userStore.state,
    offensiveWords: [],
    newWord: {
      word: '',
      level: ''
    },
    wordToEdit: {
      id: '',
      word: '',
      level: ''
    },
    rules: {
      required: value => !!value || 'The field is required.'
    }
  }),
  computed: {
    idToEdit: {
      get: function() {
        return this.wordToEdit
      },
      set: function(word) {
        this.wordToEdit.id = word._id
        this.wordToEdit.word = word.word
        this.wordToEdit.level = word.level

        return this.wordToEdit
      }
    }
  },
  async mounted() {
    const result = await loadWords()
    this.offensiveWords = result
  },
  methods: {
    async addNewWord(newWord) {
      if (newWord.word && newWord.level) {
        const noSpaceWord = newWord.word.trim()
        newWord.word = noSpaceWord
        let resultSendWord

        try {
          resultSendWord = await sendNewWord(newWord)
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!')
            this.$router.push('/login')
          } else {
            alert(e.response.data)
          }
        }

        if (resultSendWord) {
          this.offensiveWords.unshift(resultSendWord)
        }
      } else {
        alert('Fill required fields')
      }
    },
    editWord(word) {
      return (this.idToEdit = word)
    },
    async sendEditWord(newWord) {
      if (this.wordToEdit) {
        const noSpaceWord = newWord.word.trim()
        newWord.word = noSpaceWord

        let resultSendWord

        try {
          resultSendWord = await sendEditWord(this.wordToEdit.word, newWord)
        } catch (e) {
          if (e.response.status === 401) {
            alert('Your session has expired. Please, login again!')
            this.$router.push('/login')
          } else {
            alert(e.response.data)
          }
        }
        if (resultSendWord) {
          const indexWord = this.offensiveWords.findIndex(
            word => word._id === this.wordToEdit.id
          )
          this.offensiveWords.splice(indexWord, 1, resultSendWord)
        }
      } else {
        alert('Fill required fields')
      }
    },
    async deleteWord(word) {
      let resultSendDelete
      try {
        resultSendDelete = await deleteWord(word)
      } catch (e) {
        if (e.response.status === 401) {
          alert('Your session has expired. Please, login again!')
          this.$router.push('/login')
        } else {
          alert(e.response.data)
        }
      }

      if (resultSendDelete) {
        const indexWord = this.offensiveWords.findIndex(
          arrayWord => arrayWord.word === word
        )
        this.offensiveWords.splice(indexWord, 1)
      }
    }
  }
}
</script>

<style scoped>
.word__box {
  max-width: 200px;
}
</style>
