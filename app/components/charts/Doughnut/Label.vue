<script setup>
const props = defineProps({
  data: {type: Array, required: true},
  url: {type: Boolean, default: false},
  hoveredIndex: {type: Number, default: -1},
})

const emit = defineEmits(['hover'])

const setHoveredIndex = (index) => {
  emit('hover', index)
}
</script>

<template>
  <div class="font-inter flex justify-center flex-col mt-4">
    <div class="flex flex-col gap-y-1">
      <div v-for="(item, i) in props.data" :key="i"
           @mouseenter="setHoveredIndex(i)"
           @mouseleave="setHoveredIndex(-1)"
           class="flex mt-1 justify-between font-normal transition-opacity duration-200 cursor-default"
           :class="{'opacity-30': hoveredIndex !== -1 && hoveredIndex !== i}">
        <div class="flex items-center gap-3 mb-2">
          <p class="w-4 h-4 lg:w-5 lg:h-5 rounded-full text-white flex font-normal justify-center items-center text-xs"
             :class="{'w-5 h-5':url}"
             :style="{ backgroundColor: item.color }">
            <span v-if="url" class="p-2">{{ item.value }}</span>
          </p>
          <a v-if="url" :href="item.name" target="_blank" class="text-blue-dark font-normal underline">{{
              item.name
            }}</a>
          <span v-else>{{ item.name }}</span>
        </div>
        <p>{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>