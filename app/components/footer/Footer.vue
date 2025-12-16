<script setup>
import ElephantFootball from '@/assets/videos/elephant_football.mp4'
import ElephantFootballHover from '@/assets/videos/elephant_football_hover.mp4'
</script>

<template>
  <div class="relative max-w-[1980px] mx-auto flex gap-x-10 p-10 items-center justify-end py-28">
    <div class="w-full lg:w-auto">
      <h2 class="text-white text-4xl md:text-6xl lg:text-7xl font-bold">Thank you</h2>
      <NuxtLink to="/"
                class="flex items-center gap-x-4 bg-white rounded-lg block w-fit px-6 py-3 mt-10 text-blue hover:bg-blue-900 hover:text-white transition-colors duration-300 ease-in-out">
        <p class="base-lg md:text-lg font-medium ">Go to platform</p>
        <div class="bg-blue rounded-full w-8 h-8 flex items-center justify-center">
          <img src="@/assets/icons/arrow_white.svg" alt="arrow">
        </div>
      </NuxtLink>
    </div>
    <div class="w-8/12 flex items-center ">
      <ElementsVideoHover :start="ElephantFootball" :hover="ElephantFootballHover"
                          class="ml-20"/>
    </div>
  </div>
</template>