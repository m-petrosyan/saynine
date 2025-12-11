<script setup>
defineProps({
  growth: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <svg :class="{'rotate-180' : !growth}" width="12" height="12" viewBox="0 0 12 12" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M10.3333 5.66667L5.66659 1M5.66659 1L0.999918 5.66667M5.66659 1V10.3333"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>