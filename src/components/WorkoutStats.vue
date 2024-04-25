<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useFitnessStore } from "@/stores/fitness";

const fitnessStore = useFitnessStore();

const { dashboard } = storeToRefs(fitnessStore);

const daysSinceLastWorkout = computed(() => {
  if (!dashboard.value) return 0;
  const lastWorkout = new Date(dashboard.value.last_workout_date);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastWorkout.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});
onMounted(() => {
  fitnessStore.getDashboard();
});
</script>

<template>
  <v-row>
    <v-col cols="12" sm="3" m="2" class="d-flex justify-space-between">
      <v-card class="align-self-stretch flex-grow-1">
        <v-card-title>
          {{ daysSinceLastWorkout }}
        </v-card-title>
        <v-card-text> Days since last workout </v-card-text>
      </v-card>
    </v-col>

    <v-con cols="12" sm="3" m="2" class="d-flex justify-space-between">
      <v-card class="align-self-stretch flex-grow-1">
        <v-card-title>
          {{ dashboard?.total_workouts || 0 }}
        </v-card-title>
        <v-card-text> Total Workouts </v-card-text>
      </v-card>
    </v-con>

    <v-col cols="12" sm="3" m="2" class="d-flex justify-space-between">
      <v-card class="align-self-stretch flex-grow-1">
        <v-card-title>
          {{ dashboard?.cumulative_weight || 0 }}
        </v-card-title>
        <v-card-text> Cumulative weigth moved </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="3" m="2" class="d-flex justify-space-between"
      ><v-card class="align-self-stretch flex-grow-1"
        ><v-card-title>{{
          dashboard?.most_weight_single_workout || 0
        }}</v-card-title
        ><v-card-text>Most weight in a single workout</v-card-text>
        </v-card
      ></v-col
    >
  </v-row>
</template>

<!--* We’re using an expression to default to 0 values if we have no results 
from the dashboard. Once it gets filled with values, though, we populate 
the template with the values. There is some room for optimization since there’s 
some repetition involved in the template. This would be a good exercise to improve on your own! -->