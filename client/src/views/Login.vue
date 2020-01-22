<template>
  <v-container>
    <v-layout text-center wrap>
      <v-container>
        <v-text-field
          v-model="usernameORemail"
          :rules="[rules.required, rules.min, rules.email]"
          label="E-mail o username"
        ></v-text-field>

        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-password"
          label="Password"
          hint="At least 8 characters"
          v-model="password"
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-container>

      <v-btn depressed color="primary" @click="login()">Sign in</v-btn>

      <v-container>
        <v-content>
          ¿No estas registrado?, Registrate
          <a @click="signup()">aquí</a>
        </v-content>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user'

export default {
  name: 'Login',
  data() {
    return {
      usernameORemail: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        email: value => {
          const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const patternUsername = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/

          return (
            patternEmail.test(value) ||
            patternUsername.test(value) ||
            'Invalid username or e-mail.'
          )
        }
      },
      show2: true
    }
  },
  methods: {
    async login(usernameORemail, password) {
      let resultAuth
      try {
        resultAuth = await userStore.authenticate(
          this.usernameORemail,
          this.password
        )
      } catch {
        alert('Invalid username or password')
      }

      if (resultAuth) {
        return this.$router.push('/posts')
      }
    },
    signup() {
      return this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
</style>
