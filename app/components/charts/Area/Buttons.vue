<script setup>
import {inject} from 'vue'

const context = inject('chartContext')
if (!context) throw new Error('chartContext not provided')

const {chartData, activeDatasets, toggleDataset} = context

const setActive = (index) => {
  toggleDataset(index)
}
</script>

<template>
  <div class="flex gap-6">
    <button
        v-for="(dataset, index) in chartData.datasets"
        :key="index"
        @click="setActive(index)"
        class="flex flex-1 justify-between items-center text-xl py-3 px-3 rounded-xxl cursor-pointer transition-colors border-[#E5F1FF] border-1"
        :class="{'bg-white-blue-light' :activeDatasets[index] }">
        <span class="flex gap-2 items-center">
          <span
              class="rounded-full w-5 h-5"
              :style="activeDatasets[index] ? { backgroundColor: dataset.color } : 'border: 2px solid gray'">
        </span>
      <span>    {{ dataset.name }}</span>
        </span>
      <ElementsRankInfo v-if="dataset.rank" :value="dataset.rank" :growth="dataset.growth"
                        class="text-[17px] md:text-xl"/>
    </button>
  </div>
</template>