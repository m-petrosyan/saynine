<script setup>
useHead({
  title: "Saynine"
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between border-b-2 border-blue-light pb-10 mb-10">
      <IconsAirfocus/>
      <ChartsInfo/>
    </div>
    <ChartsWrapper>
      <ChartsTrafficInfo/>
    </ChartsWrapper>
  </div>
</template>