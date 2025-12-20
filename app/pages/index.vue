<script setup>
useHead({
  title: "Saynine"
})
</script>

<template>
  <div>
    <div
        class="flex flex-col lg:flex-row gap-y-6 lg:gap-y-10 lg:items-center justify-between gap-x-4 border-b-2 border-white-blue pb-10">
      <div class="h-[18px] md:h-[27px] lg:h-[40px] lg:w-auto">
        <img src="@/assets/icons/airfocus.svg" class="h-full" alt="airfocus">
      </div>
      <ChartsElementsInfo/>
    </div>
    <ChartsAreaTraffic class="mt-17"/>
    <ChartsAreaKeywords class="mt-18 md:mt-26 lg:mt-40"/>
    <ChartsDoughnutAnchor class="mt-20 md:mt-40"/>
    <ChartsDoughnutBacklinks class="mt-20 md:mt-40"/>
    <CitationsWrapper class="mt-26 md:mt-40"/>
  </div>
</template>