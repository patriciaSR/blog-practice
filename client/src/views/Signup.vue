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

          <v-file-input
            accept="image/*"
            prepend-icon
            append-icon="mdi-camera"
            label="Profile Image file"
            name="input-image"
            id="file"
            @change="handleUploadImage"
          ></v-file-input>

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
            @keyup.enter="signup"
          ></v-text-field>
        </v-form>
      </v-card>

      <PrimaryBtn btnText="Sign up" @go-to="signup" />

      <Dialog :offensiveError="offensiveError" :dialog="dialog" @close-dialog="dialog = false" />
    </v-layout>
  </v-container>
</template>

<script>
import registNewUser from '../resources/registNewUser';

import PrimaryBtn from '../components/Btns/PrimaryBtn';
import Dialog from '../components/Dialog';

export default {
  name: 'Signup',
  components: {
    PrimaryBtn,
    Dialog
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
          const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          return patternEmail.test(value) || 'Invalid e-mail.';
        },
        username: value => {
          const patternUsername = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
          return patternUsername.test(value) || 'Invalid username';
        }
      },
      show2: false,
      offensiveError: {
        errorText: undefined
      },
      dialog: false
    };
  },
  methods: {
    async signup() {
      if (this.checkFields()) {
        let resultSignUp;
        try {
          resultSignUp = await registNewUser(this.newUser);
        } catch (e) {
          this.offensiveError.errorText = e.response.data;
          this.dialog = true;
        }

        if (resultSignUp) {
          alert('User registered correctly');
          return this.$router.push('/login');
        }
      } else {
        this.offensiveError.errorText = 'Fill required fields correctly';
        this.dialog = true;
      }
    },
    checkFields() {
      const checkEmail =
        typeof this.rules.email(this.newUser.email) === 'boolean';

      const checkUsernameMin =
        typeof this.rules.min(this.newUser.username) === 'boolean';
      const checkUsernameMax =
        typeof this.rules.max(this.newUser.username) === 'boolean';
      const checkUsername =
        typeof this.rules.username(this.newUser.username) === 'boolean';

      const checkPassword =
        typeof this.rules.min(this.newUser.password) === 'boolean';

      if (checkUsername && checkUsernameMin && checkUsernameMax && checkEmail && checkPassword) {
        return true;
      }
    },
    handleUploadImage(ev) {
      const file = ev;
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ev => {
        this.newUser.image = ev.target.result;
      };
      document.querySelector('#file').value = '';
    }
  }
};
</script>

<style scoped>
.signup__box {
  max-width: 600px;
}
</style>
