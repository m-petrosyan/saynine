<script setup>
import Backlink from "@/components/icons/Backlink.vue";
import Average from "@/components/icons/Average.vue";
import Domain from "@/components/icons/Domain.vue";

const trafficData = [
  {title: 'Backlinks provided', value: '15/30', percent: '50%', icon: Backlink},
  {title: 'Average traffic', value: '10', avg: 97058, icon: Average},
  {title: 'Domain rate', value: '50 DR', avg: '70 DR', icon: Domain},
];
</script>

<template>
  <div class="w-3/12">
    <div v-for="(item,index) in trafficData" :key="item.title"
         class=" pb-4 mb-4"
         :class="{'border-b-2 border-blue-light':index !== trafficData.length - 1 }">
      <div class="flex items-center gap-4">
        <component :is="item.icon"/>
        <h4 class="text-md font-bold">{{ item.title }}</h4>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <p class="text-xl font-bold pt-6">{{ item.value }}</p>
          <p class="text-info text-gray">Min. agreed</p>
        </div>
        <div v-if="item.avg" class="flex flex-col">
          <p class="text-xl font-bold pt-6">{{ item.avg }}</p>
          <p class="text-info text-gray">Avg. provided</p>
        </div>
        <ElementsRankInfo v-if="item.percent" percent="50%"/>
      </div>
    </div>
  </div>
</template>