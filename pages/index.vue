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
          ></v-text-field>
          <v-textarea
          label="Wishes"
          :rules="[required]"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return null;
  },
  methods: {
    required: (value) => !!value || 'Please input this before you make wishes',
  },
};
</script>
