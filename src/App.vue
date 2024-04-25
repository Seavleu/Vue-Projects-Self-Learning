<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { useSupabaseClient } from "@/composables/supabase";

import AppMenu from "./components/AppMenu.vue";

const userStore = useUserStore();
const appStore = useAppStore();

const { pageTitle, dialog } = storeToRefs(appStore);
const currentYear = new Date().getFullYear();

/** Validating user session. Recieved data will store on user store and use the store upsert 
 a profile in db. **/
onMounted(async () => {
  const { data } = await useSupabaseClient.auth.getSession();
  if (data && data.session && data.session.user) {
    await userStore.insertProfile(data.session);
    userStore.setUserSession(data.session);
  }

  useSupabaseClient.auth.onAuthStateChange((_, _session) => {
    userStore.setUserSession(_session);
  });
});
</script>

<template>
  <v-app>
    <app-menu />
    <v-app-bar app style="position: relative">
      <v-app-bar-nav-icon @click="appStore.toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title
        >💪 Welcome To Your Future Slim Figure -
        {{ pageTitle }}</v-toolbar-title
      >
    </v-app-bar>
    <v-card class="mx-auto my-15" elevation="16" max-width="344">
      <v-card-item>
        <v-card-title> A fitness App Tracker </v-card-title>
        <v-card-subtitle> Learned </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        State Management: pinia <br />
        Authentication Policy: Row Level Security (RLS) <br />
        vue-chart.js <br />
        vue-router <br />
        vuetify <br />
        Apply concepts of stores, composables, and nested components
      </v-card-text>
    </v-card>
    <v-main>
      <router-view />
      <v-dialog v-model="dialog.visible" :fullscreen="dialog.fullscreen">
        <v-card>
          <v-card-title>{{ dialog.title }}</v-card-title>
          <v-card-text><p v-html="dialog.contents"></p> </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="appStore.hideDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>

    <v-footer app>
      <span>&copy; {{ currentYear }} 💪 Slim Figure Fitness Tracker</span>
    </v-footer>
  </v-app>
</template>
