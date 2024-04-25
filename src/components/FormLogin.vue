<script setup lang="ts">
import {ref} from "vue";
import type { Ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useAppStore } from "@/stores/app";

const userStore = useUserStore();
const appStore = useAppStore();

const email: Ref<string> = ref("");

const login = () => {
  if (email.value ===  "" ){
    appStore.showDialog({
        title: "Email is required",
        content: `We use the email address to send you a one-time password login link. Please enter your email address.`
    });
  } else {
    userStore.login(email.value);
    appStore.showDialog({
        title: "Email sent",
        content: `We have sent a one-time password login link to ${email.value}. Please check your email.`
    });
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>