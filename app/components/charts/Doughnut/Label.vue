<script setup>
const props = defineProps({
  data: {type: Array, required: true},
  url: {type: Boolean},
})
</script>

<template>
  <div class="font-inter flex justify-center flex-col mt-4">
    <div>
      <div v-for="(item, i) in props.data" :key="i" class="flex mt-1 justify-between">
        <div class="flex items-center gap-2 mb-2">
          <p class="w-4 h-4 rounded-full text-white flex font-normal justify-center items-center text-sm"
             :style="{ backgroundColor: item.color }">
            <span v-if="url">{{ item.value }}</span>
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