<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFitnessStore } from '@/stores/fitness'

const fitnessStore = useFitnessStore()

const { exercises } = storeToRefs(fitnessStore)

</script>

<template>
    <v-select 
        v-if="exercises" 
        label="Select exercise" 
        :items="exercises" 
        item-title="name" 
        item-value="id">
    </v-select>
</template>