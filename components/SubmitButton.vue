<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          ref="btn"
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          @click="submit"
        >
          Send
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      message: 'default wishes',
      title: 'default title',
    };
  },
  props: {
    wish: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
  },
  mounted() {
    console.log(this.userName, this.wish);
  },
  methods: {
    submit() {
      if (!this.isValidatedUserName(this.userName)) {
        this.title = 'Error';
        this.message = 'Please input correct user name';
        return;
      }

      this.title = 'Succeed';
    },
    isValidatedUserName(val) {
      return !(!val || !val.trim().length);
    },
  },
};
</script>