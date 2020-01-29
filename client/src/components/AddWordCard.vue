<template>
    <v-card class="pa-4 ma-4" max-width="400px">
      <v-text-field
        v-model="newWord.word"
        filled
        label="Write your word"
        :rules="[rules.required]"
        @keyup.enter="addNewWord"
      ></v-text-field>

      <v-text-field
        type="number"
        min="1"
        max="5"
        v-model="newWord.level"
        :rules="[rules.required]"
        filled
        label="level"
      ></v-text-field>

      <PrimaryBtn btnText="+ Word" @go-to="addNewWord" />
    </v-card>
</template>

<script>
import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'Posts',
  components: {
    PrimaryBtn
  },
  data: () => ({
    newWord: {
      word: '',
      level: ''
    },
    rules: {
      required: value => !!value || 'The field is required.'
    }
  }),
  methods: {
    addNewWord() {
      this.$emit('go-addNewWord', this.newWord)

      this.newWord = {
        word: ' ',
        level: 1
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
