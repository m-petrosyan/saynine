<script setup>
useHead({
  title: "Saynine"
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between border-b-2 border-white-blue pb-10">
      <div>
        <img src="@/assets/icons/airfocus.svg" alt="airfocus">
      </div>
      <ChartsElementsInfo/>
    </div>
    <ChartsAreaTraffic class="mt-17"/>
    <ChartsElementsKeywords class="mt-40"/>
    <ChartsDoughnutAnchor class="mt-40"/>
    <ChartsElementsBacklinksPerUrl class="mt-40"/>
    <CitationsWrapper class="mt-40"/>
  </div>
</template>