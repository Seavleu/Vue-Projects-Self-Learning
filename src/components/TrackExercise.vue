<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { Routine } from "@/types/fitness";
import AddRoutine from "./AddRoutine.vue";
import { VDatePicker } from "vuetify/labs/VDatePicker";

import { useFitnessStore } from "@store/fitness";
const fitnessStore = useFitnessStore();

import { useAppStore } from "@store/app";
const appStore = useAppStore();

const routines: Ref<Routine[]> = ref([]);
const showDialogRoutine: Ref<boolean> = ref(false);
const addRoutineToExercise = (newRoutine: any) => {
  showDialogRoutine.value = false;
  routines.value.push(newRoutine);
};

const showDialogDate: Ref<boolean> = ref(false);
const selectedDate: Ref<any[] | undefined> = ref(undefined);

const formattedDate: Ref<boolean> = computed(() => {
  if (selectedDate?.value?.lenght) {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(selectedDate.value[0]);
  }
  return "";
});

// Validation if the workout can be saved
const canSaveWorkout = computed (() => {
    return routines.value.length > 0 && selectedDate.value?.length > 0;
});

const reset = () => {
    routines.value = [];
    selectedDate.value = undefined;
    showDialogDate.value = false;
};

const saveWorkout = () => {
    if(selectedDate.value && routines.value?.lenght > 0 ) {
        fitnessStore.saveWorkout({
            title: "Success",
            content: "Workout save sucessfully",
        });
        reset();
    } else {
        appStore.showDialog ({
            title: "Error",
            content: "Please select a date and add at least one routine",
        });
    }
};
</script>

<template>
    <v-container>
      <v-row class="mb-6 align-center justify-space-between">
        <v-btn @click="showDialogDate = true">
          <span v-if="selectedDate">Change date</span>
          <span v-else>Select date</span>
        </v-btn>
        <h4 class="text-h5">{{ formattedDate }}</h4>
  
        <v-dialog v-model="showDialogDate" center>
          <v-date-picker
            v-model="selectedDate"
            show-adjacent-months
            @click:cancel="showDialogDate = false"
            @click:save="showDialogDate = false"
            style="margin: 0 auto"
          ></v-date-picker>
        </v-dialog>
      </v-row>
      
      <exercise-grouping
          :key="index"
          v-for="(row, index) in routines"
          :exercise-id="row.exercise || 'Unknown'"
          :routines="row?.routines"
          class="mb-6"
        />
  
      <v-row class="mb-6">
        <v-btn
          block
          size="x-large"
          @click="showDialogRoutine = true"
          v-if="selectedDate"
        >
          Add routine
        </v-btn>
        <v-dialog v-model="showDialogRoutine" fullscreen>
          <v-card>
            <v-card-text>
              <add-routine @add="addRoutineToExercise" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="showDialogRoutine = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
  
      <v-row class="mb-6">
        <v-btn
          block
          size="x-large"
          :disabled="!canSaveWorkout"
          @click="saveWorkout"
          v-if="selectedDate"
          >Save workout</v-btn
        >
      </v-row>
    </v-container>
  </template>
