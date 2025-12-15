<script setup>
useHead({
  title: "Saynine"
})
</script>

<template>
  <div>
    <div
        class="flex flex-col md:flex-row gap-y-10 md:items-center justify-between gap-x-4 border-b-2 border-white-blue pb-10">
      <div>
        <img src="@/assets/icons/airfocus.svg" alt="airfocus">
      </div>
      <ChartsElementsInfo/>
    </div>
    <ChartsAreaTraffic class="mt-17"/>
    <ChartsAreaKeywords class="mt-40"/>
    <ChartsDoughnutAnchor class="mt-40"/>
    <ChartsDoughnutBacklinks class="mt-40"/>
    <CitationsWrapper class="mt-40"/>
  </div>
</template>