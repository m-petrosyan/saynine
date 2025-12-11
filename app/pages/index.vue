<script setup>
import BacklinksPerUrl from "~/components/charts/BacklinksPerUrl.vue";
import BackLinksPerAnchor from "~/components/charts/BackLinksPerAnchor.vue";

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
    <BackLinksPerAnchor/>
    <BacklinksPerUrl class="mt-40"/>
    <CitationsWrapper class="mt-40"/>
  </div>
</template>