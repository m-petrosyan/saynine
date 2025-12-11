<script setup>
defineProps({
  percent: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-green text-green-dark rounded-lg flex items-center gap-1 px-3 text-center py-1 text-lg">
    <slot/>
    <p class="font-medium">{{ percent }}</p>
  </div>
</template>