import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import router from '@/router'

interface DialogOptions {
  title: string;
  content: string | HTMLElement;
  fullscreen?: boolean;
}

interface Dialog extends DialogOptions {
  visible: boolean;
}

export const useAppStore = defineStore('app', () => {
  const drawer: Ref<boolean> = ref(false);
  
  const toggleDrawer = (newValue?: boolean): void => {
    drawer.value = newValue ?? !drawer.value;
  }
  
  const pageTitle: Ref<string> = ref('Home');

  // Function to navigate to a page and set the page title
  const navigateToPage = (page: string): void => {
    // Corrected for ensuring page is a string and it's non-empty
    if (page) {
      // Assuming page format is like "/home", "/about", etc.
      const title = page.substring(1)  // Remove the leading slash
                     .charAt(0)        // Get the first character
                     .toUpperCase()    // Convert to uppercase
                     + page.slice(2);  // Append the rest of the string without the first character
      pageTitle.value = title || 'Home';
    } else {
      pageTitle.value = 'Home';  // Fallback if page string is not valid
    }
    toggleDrawer(false);  // Always close the drawer when navigating
    router.push(page);
  }

  const dialog: Ref<Dialog> = ref({
    title: '',
    content: '',
    visible: false,
    fullscreen: false,
  });

  const showDialog = (options: DialogOptions = {title: '', content: ''}): void => {
    dialog.value = {
      ...options,
      visible: true,
    };
  }

  const hideDialog = () => {
    dialog.value = {
      ...dialog.value,
      title: '',
      content: '',
      visible: false,
      fullscreen: false
    };
  }

  return {
    drawer,
    toggleDrawer,
    pageTitle,
    navigateToPage,
    dialog,
    showDialog,
    hideDialog,
  }
});
