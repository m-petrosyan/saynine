<script setup>
import ElephantFootball from '@/assets/videos/elephant_football.mp4'
import ElephantFootballHover from '@/assets/videos/elephant_football_hover.mp4'
</script>

<template>
  <div
      class="max-w-[1980px] overflow-x-hidden items-center mx-auto flex lg:gap-x-10 pl-10 justify-end pt-20 pb-10 md:pb-20 md:pt-28">
    <div class="w-1/2 md:w-auto ">
      <h2 class="text-white text-4xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap">Thank you</h2>
      <NuxtLink to="/"
                class="flex items-center gap-x-4 bg-white rounded-xxl block w-fit whitespace-nowrap px-1 pl-4 md:px-6 py-1 md:py-3 mt-6 lg:mt-10 text-blue hover:bg-blue-900 hover:text-white transition-colors duration-300 ease-in-out">
        <p class="base-lg md:text-lg font-medium pt-1">Go to platform</p>
        <div class="bg-blue rounded-full w-8 h-8 flex items-center justify-center">
          <img src="@/assets/icons/arrow_white.svg" alt="arrow">
        </div>
      </NuxtLink>
    </div>
    <div class="relative h-[114px] md:h-full w-1/2 md:w-auto lg:w-8/12 flex items-center ">
      <!-- overflow-visible, добавил h- -->
      <ElementsVideoHover :start="ElephantFootball" :hover="ElephantFootballHover"
                          class="md:static lg:ml-20 w-[606px] md:w-auto h-full"
                          classes="h-full object-cover object-left h-full w-full"/>
      <!-- Убрал h-[144px], сдвиг по Y -->
    </div>
  </div>
</template>