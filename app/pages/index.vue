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
      <ChartsInfo/>
    </div>
    <ChartsTraffic class="mt-17"/>
    <ChartsKeywords class="mt-40"/>
    <ChartsBackLinksPerAnchor class="mt-40"/>
    <ChartsBacklinksPerUrl class="mt-40"/>
    <CitationsWrapper class="mt-40"/>
  </div>
</template>