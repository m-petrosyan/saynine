<script setup>
defineProps({
  percent: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-green text-green-dark rounded-lg flex items-center gap-1 px-2 py-1 w-fit text-lg">
    <slot/>
    <p class="font-medium">{{ percent }}</p>
  </div>
</template>