<script setup>
import Chart from "~/components/charts/Chart.vue";

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div>
    <h2 v-if="title" v-text="title" class="text-center text-subtitle font-bold mb-16"/>
    <div class="flex justify-between gap-x-20">
      <slot/>
      <Chart/>
    </div>
  </div>
</template>