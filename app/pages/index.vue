<script setup>
import BacklinksPerUrl from "~/components/charts/BacklinksPerUrl.vue";
import BackLinksPerAnchor from "~/components/charts/BackLinksPerAnchor.vue";

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
      <ChartsInfo/>
    </div>
    <ChartsWrapper class="mt-17">
      <ChartsTrafficInfo/>
    </ChartsWrapper>
    <ChartsWrapper title="Ranking results by Ahrefs" class="mt-40">
      <ChartsTegInfo/>
    </ChartsWrapper>
    <BackLinksPerAnchor class="mt-40"/>
    <BacklinksPerUrl class="mt-40"/>
    <CitationsWrapper class="mt-40"/>
  </div>
</template>