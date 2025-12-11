<script setup>
useHead({
  title: "Saynine"
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between border-b-2 border-white-blue pb-10 mb-10">
      <IconsAirfocus/>
      <ChartsInfo/>
    </div>
    <ChartsWrapper>
      <ChartsTrafficInfo/>
    </ChartsWrapper>
    <ChartsWrapper title="Ranking results by Ahrefs">
      <ChartsTegInfo/>
    </ChartsWrapper>
  </div>
</template>