<template>
  <v-container mx-auto py-12 fill-height class="signup__box">
    <v-layout text-center class="flex-column">
      <v-card color="#C5CAE9" class="px-6 py-10 mb-4">
        <v-text-field v-model="newUser.firstName" :rules="[rules.required]" label="First name *"></v-text-field>

        <v-text-field v-model="newUser.lastName" label="Last Name"></v-text-field>

        <v-text-field
          v-model="newUser.username"
          value
          :rules="[rules.required, rules.min, rules.max, rules.username]"
          label="Username *"
        ></v-text-field>

        <v-text-field
          v-model="newUser.email"
          value
          :rules="[rules.required, rules.email]"
          label="E-mail *"
        ></v-text-field>

        <v-text-field v-model="newUser.image" label="Profile Image url"></v-text-field>

        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-password"
          label="Password"
          hint="At least 6 characters"
          v-model="newUser.password"
          value
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-card>

      <v-btn depressed color="primary" @click="signup()" max-width="100px">Sign up</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import registNewUser from '../resources/registNewUser'

export default {
  name: 'Login',
  data() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        image: '',
        password: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        max: v => v.length <= 10 || 'Max 10 characters',
        email: value => {
          const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

          return patternEmail.test(value) || 'Invalid e-mail.'
        },
        username: value => {
          const patternUsername = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/
          return patternUsername.test(value) || 'Invalid username'
        }
      },
      show2: false
    }
  },
  methods: {
    async signup() {
      let resultSignUp
      try {
        resultSignUp = await registNewUser(this.newUser)
      } catch {
        alert('algo fue mal...')
      }

      if (resultSignUp) {
        alert('User registered correctly')
        return this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
  .signup__box {
    max-width: 600px;
  }
</style>
