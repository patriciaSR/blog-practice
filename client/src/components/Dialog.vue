<template>
  <v-dialog v-if="offensiveError" v-model="dialog" max-width="500">
    <v-card color="#FAD9D3" class="pa-4">
      <v-card-text class="text--primary text-center" data-id="error-text">{{offensiveError.errorText}}</v-card-text>
      <v-list color="#FAD9D3">
        <v-list-item
          v-for="word in offensiveError.notAllowedWords"
          :key="word.word"
          three-line
          class="d-block pb-3 mb-3 white"
        >
          <v-list-item-content shaped>
            <v-list-item-title class="mb-2">
              <strong>Word:</strong>
              {{word.word}}
            </v-list-item-title>
            <v-list-item-subtitle class="caption">
              <strong>Level:</strong>
              {{word.level}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog()">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  components: {},
  props: {
    offensiveError: undefined,
    dialog: undefined
  },
  data: () => ({}),
  methods: {
     closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>
</style>
