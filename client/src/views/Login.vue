<template>
  <v-container mx-auto py-12 fill-height class="login__box">
    <v-layout text-center class="flex-column">
      <v-card color="#C5CAE9" class="px-6 py-10 mb-4">
        <v-text-field
          v-model="username"
          :rules="[rules.required, rules.min]"
          label="Username"
          data-id="username"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          name="input-password"
          label="Password"
          hint="At least 6 characters"
          class="input-group--focused"
          data-id="password"
          @click:append="show2 = !show2"
          @keyup.enter="login()"
        ></v-text-field>
      </v-card>

      <PrimaryBtn btnText="Sign in" data-id="signin-btn" @go-to="login" />

      <v-container>
        <v-content>
          Don't have an account?, Sign up
          <router-link :to="'/signup'" class="signup__link">here >></router-link>
        </v-content>
      </v-container>

      <Dialog :offensiveError="offensiveError" :dialog="dialog" @close-dialog="dialog = false" />
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user';

import PrimaryBtn from '../components/Btns/PrimaryBtn';
import Dialog from '../components/Dialog';

export default {
  name: 'Login',
  components: {
    PrimaryBtn,
    Dialog
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        max: v => v.length <= 10 || 'Max 10 characters'
      },
      show2: false,
      offensiveError: {
        errorText: undefined
      },
      dialog: false
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.offensiveError.errorText = 'Enter your username and password';
        this.dialog = true;
      } else {
        let resultAuth;
        try {
          resultAuth = await userStore.authenticate(
            this.username,
            this.password
          );
        } catch {
          this.offensiveError.errorText = 'Invalid username or password';
          this.dialog = true;
        }

        if (resultAuth) {
          return this.$router.push('/myprofile');
        }
      }
    }
  }
};
</script>

<style scoped>
.signup__link {
  text-decoration: none;
}
.login__box {
  max-width: 400px;
}
</style>
