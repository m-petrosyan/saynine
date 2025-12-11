<script setup>
useHead({
  title: "Saynine"
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between border-b-2 border-white-blue pb-10 mb-10">
      <div>
        <img src="@/assets/icons/airfocus.svg" alt="airfocus">
      </div>
      <ChartsInfo/>
    </div>
    <ChartsWrapper>
      <ChartsTrafficInfo/>
    </ChartsWrapper>
    <ChartsWrapper title="Ranking results by Ahrefs">
      <ChartsTegInfo/>
    </ChartsWrapper>
    <ChartsNumber title="Number of backlinks per anchor text"/>
    <ChartsNumber title="Number of backlinks per URL" class="mt-40"/>
    <CitationsWrapper class="mt-40"/>
  </div>
</template>