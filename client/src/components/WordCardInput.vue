<template>
  <v-card max-width="400px" class="pa-4 ma-4">
    <v-text-field
      v-model="newWord.word"
      :rules="[rules.required]"
      filled
      label="Write your word"
      @keyup.enter="sendWord"
    ></v-text-field>

    <v-text-field
      v-model="newWord.level"
      :rules="[rules.required]"
      type="number"
      filled
      min="1"
      max="5"
      label="level"
    ></v-text-field>

    <PrimaryBtn :btnText="btnText" @go-to="sendWord" />
  </v-card>
</template>

<script>
import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'WordCardInput',
  components: {
    PrimaryBtn
  },
  props: {
    btnText: String,
    word: Object
  },
  data() {
    return {
      newWord: {
        word: this.word.word,
        level: this.word.level
      },
      rules: {
        required: value => !!value || 'The field is required.'
      }
    }
  },
  methods: {
    sendWord() {
      this.$emit('go-sendWord', this.newWord)
    }
  }
}
</script>

<style scoped>
.word__box {
  max-width: 200px;
}
</style>
