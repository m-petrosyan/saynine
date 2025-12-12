<script setup>
const props = defineProps({
  datasets: {
    type: Array,
    required: true
  },
  activeDatasets: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle-dataset'])

const setActive = (index) => {
  emit('toggle-dataset', index)
}
</script>

<template>
  <div class="flex gap-6 flex-1">
    <button
        v-for="(dataset, index) in props.datasets"
        :key="index"
        @click="setActive(index)"
        class="flex flex-1 items-center py-3 gap-2 px-3 rounded-lg  cursor-pointer transition-colors bg-white-blue-light">
      <span
          class="rounded-full w-5 h-5  "
          :style="props.activeDatasets[index] ?  { backgroundColor: dataset.color } : 'border: 2px solid gray'">
      </span>
      <span>{{ dataset.name }}</span>
    </button>
  </div>
</template>