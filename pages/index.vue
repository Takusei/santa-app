<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Hello Santa
        </v-card-title>
        <v-card-text>
          What do you want for christmas?
          <v-text-field
            label="Name"
            placeholder="charlie.brown"
            type="email"
            :rules="[required]"
            v-model="userName"
          ></v-text-field>
          <v-textarea
          label="Wishes"
          :rules="[required]"
          v-model="wish"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <SubmitButton :userName="userName" :wish="wish"/>
        </v-card-actions>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
import SubmitButton from '../components/SubmitButton.vue';

export default {
  name: 'IndexPage',
  components: { SubmitButton },
  data() {
    return {
      userName: null,
      wish: null,
      dialog: false,
    };
  },
  methods: {
    required(val) {
      return !!val || 'Please input this before you make wishes';
    },
  },
};
</script>
