<template>
  <v-container mx-auto py-12 fill-height class="login__box">
    <v-layout text-center class="flex-column">
      <v-card color="#C5CAE9" class="px-6 py-10 mb-4">
        <v-text-field
          v-model="usernameORemail"
          :rules="[rules.required, rules.min, rules.email]"
          label="E-mail o username"
        ></v-text-field>

        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          :rules="[rules.required, rules.min]"
          name="input-password"
          :type="show2 ? 'text' : 'password'"
          label="Password"
          hint="At least 6 characters"
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-card>

      <v-btn depressed color="primary" @click="login()" max-width="100">Sign in</v-btn>

      <v-container>
        <v-content>
          Don't have an account?, Sign up
          <router-link :to="'/signup'" class="signup__link">here >></router-link>
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
      show2: false
    }
  },
  methods: {
    async login() {
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
        return this.$router.go(-2)
      }
    }
  }
}
</script>

<style scoped>
  .signup__link {
    text-decoration: none;
  }
  .login__box {
    max-width: 400px;
  }
</style>
