<script setup>
defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  growth: {
    type: Boolean,
    default: false
  },
  noarrow: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div class=" rounded-lg flex items-center gap-1 px-3 text-center py-1 text-lg"
       :class="growth ? 'bg-green text-green-dark' : 'bg-pink text-red'">
    <IconsArrowBolder v-if="!noarrow" :growth="growth"/>
    <p class="font-medium">{{ value }}</p>
  </div>
</template>