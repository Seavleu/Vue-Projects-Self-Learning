<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';

const userStore = useUserStore();
const appStore = useAppStore();

const {userIsLoggedIn, session} = storeToRefs(userStore);
const {drawer} = storeToRefs(appStore);

const goToPage = (page: string): void => {
    appStore.navigateToPage(page);
};

const menuItems = [
    {
        icon:'mdi-home',
        title: 'Home',
        page: '/',
    },
    {
        icon:'mdi-account',
        title: 'Profile',
        page: '/track',
    },
    {
        icon:'mdi-account',
        title: 'Settings',
        page: '/graph',
    },
];
</script>

<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense v-if="userIsLoggedIn">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="goToPage(item.page)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="userStore.logout()">
          <template v-slot:prepend>
            <v-icon icon="mdi-account-arrow-right"></v-icon>
          </template>
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list dense v-else>
        <v-list-item @click="goToPage('/login')">
          <template v-slot:prepend>
            <v-icon icon="mdi-account"></v-icon>
          </template>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>


<!-- * This is a common pattern to leave the authentication to the server and never the client -->
<!-- * In next feature we wil configured with Supabase Low Level Security (RLS) policies -->