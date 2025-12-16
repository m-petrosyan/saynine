<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  active: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const setActive = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div
      class="flex items-center justify-between p-4 rounded-xxl cursor-pointer transition-colors border-1 border-white-blue-light"
      :class="{ 'bg-white-blue-light': item.id === active}"
      @click="setActive(item.id)"
  >
    <div class="flex items-center gap-3">
      <div class="relative flex items-center justify-center">
        <input
            type="radio"
            name="keyword"
            :checked="item.id === active"
            class="w-5 h-5   rounded-full"
        />
        <div
            class="absolute w-full h-full rounded-full"
            :class="item.id === active ? 'bg-blue' : 'border-1 border-gray'"
        />
      </div>
      <span
          class="text-base"
          :class="item.id === active ? 'text-gray-darker' : 'text-gray'"
      >
            {{ item.name }}
          </span>
    </div>
    <ElementsRankInfo :value="item.rank" :growth="item.growth"/>
  </div>
</template>