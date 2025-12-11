<script setup>
import ElephantFootball from '@/assets/videos/elephant_football.mp4'
import ElephantFootballHover from '@/assets/videos/elephant_football_hover.mp4'
</script>

<template>
  <div ref="containerRef" class="flex items-center justify-end py-30">
    <div>
      <h2 class="text-white text-6xl font-bold">Thank you</h2>
      <NuxtLink to="/" class="flex gap-x-4 bg-white rounded-lg block w-fit px-6 py-3 mt-10">
        <p class="text-md font-medium text-blue">Go to platform</p>
        <div class="bg-blue rounded-full w-8 h-8 flex items-center justify-center">
          <img src="@/assets/icons/arrow-white.svg" alt="arrow">
        </div>
      </NuxtLink>
    </div>
    <div class="w-8/12 flex items-center">
      <ElementsVideoHover :start="ElephantFootball" :hover="ElephantFootballHover"
                          class="ml-20  absolute right-0"/>
    </div>
  </div>
</template>