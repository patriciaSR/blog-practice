<template>
  <v-container mx-auto py-12 fill-height class="signup__box">
    <v-layout text-center class="flex-column">
      <v-card class="px-6 py-10 mb-4 indigo lighten-4">
        <v-form>
          <v-text-field v-model="newUser.firstname" :rules="[rules.required]" label="First name *"></v-text-field>

          <v-text-field v-model="newUser.lastname" label="Last Name"></v-text-field>

          <v-text-field
            v-model="newUser.username"
            :rules="[rules.required, rules.min, rules.max, rules.username]"
            label="Username *"
          ></v-text-field>

          <v-text-field
            v-model="newUser.email"
            :rules="[rules.required, rules.email]"
            label="E-mail *"
          ></v-text-field>

          <v-text-field v-model="newUser.image" label="Profile Image url"></v-text-field>

          <v-text-field
            v-model="newUser.password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-password"
            label="Password"
            hint="At least 6 characters"
            class="input-group--focused"
            @click:append="show2 = !show2"
            @keyup.enter="signup()"
          ></v-text-field>
        </v-form>
      </v-card>

      <PrimaryBtn btnText="Sign up" @go-to="signup" />
    </v-layout>
  </v-container>
</template>

<script>
import registNewUser from '../resources/registNewUser'

import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'Signup',
  components: {
    PrimaryBtn
  },
  data() {
    return {
      newUser: {
        firstname: '',
        lastname: '',
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
      } catch (e) {
        alert(e.response.data)
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
