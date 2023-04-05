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
import {
  getRegisteredUsersFromURL, searchUser, getUserProfilesFromURL, searchUserProfile,
} from '../lib/user';
import { isDateFormatValid, getAge } from '../lib/date';

import sharedData from '../lib/sharedData';

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
    async submit() {
      if (!this.userName || !this.wish) {
        this.setCardInfo('Error', 'Please input correct information');
        return;
      }
      if (!this.isValidatedUserName(this.userName)) {
        this.setCardInfo('Error', 'Please input correct user name');
        return;
      }

      const registeredUsers = await getRegisteredUsersFromURL(this.userName);
      console.log('🚀 ~ file: SubmitButton.vue:93 ~ submit ~ registeredUsers:', registeredUsers);
      const user = searchUser(registeredUsers, this.userName);

      if (!user) {
        this.setCardInfo('Error', 'User is not registered');
        return;
      }

      const userId = user.uid;

      const userProfileInfo = await getUserProfilesFromURL(); // [userUid, address, birthdate]

      const userProfile = searchUserProfile(userProfileInfo, userId);
      const { address, birthdate } = userProfile;
      console.log('🚀 ~ file: SubmitButton.vue:107 ~ submit ~ address, birthdate:', address, birthdate);

      if (!isDateFormatValid(birthdate)) {
        this.setCardInfo('Error', 'Invalid Birthday');
        return;
      }

      if (getAge(birthdate) > 10) {
        this.setCardInfo('Error', 'You are larger than 10 years old');
        return;
      }

      sharedData.pendingWishes.push([this.userName, address, this.wish]);

      this.setCardInfo('Succeeded', 'You have successfully made a wish');
    },
    isValidatedUserName(val) {
      return !(!val || !val.trim().length);
    },
    setCardInfo(title, message) {
      this.title = title;
      this.message = message;
    },
  },
};
</script>
