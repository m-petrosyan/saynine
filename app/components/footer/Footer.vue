<script setup>
import Running from '@/assets/videos/football_elephant.mp4'
import RunningEnd from '@/assets/videos/football_hover.mp4'

const isHovered = ref(false)
const containerRef = ref(null)
const videoRef = ref(null)

const videoSrc = computed(() => isHovered.value ? RunningEnd : Running)

const {stop} = useIntersectionObserver(
    containerRef,
    ([{isIntersecting}]) => {
      if (isIntersecting) {
        console.log('play')
        videoRef.value?.play()
      } else {
        videoRef.value?.pause()
      }
    },
    {threshold: 0.5}
)

watch(videoSrc, () => {
  videoRef.value?.load()
  videoRef.value?.play()
})

onUnmounted(() => stop())
</script>

<template>
  <div ref="containerRef" class="flex items-center justify-end py-30">
    <div>
      <h2 class="text-white text-6xl font-bold">Thank you</h2>
      <NuxtLink to="/" class="flex gap-x-4 bg-white rounded-lg block w-fit px-6 py-3 mt-10">
        <p class="text-md font-medium text-blue">Go to platform</p>
        <div class="bg-blue rounded-full w-8 h-8 flex items-center justify-center">
          <img src="@/assets/icons/arrow-white.svg" alt="arrow">
        </div>
      </NuxtLink>
    </div>
    <div @mouseenter="isHovered = true" @mouseleave="isHovered = false"
         class="h-[227px] w-9/12">
      <video ref="videoRef" muted loop class="w-full h-auto">
        <source :src="videoSrc" type="video/mp4"/>
      </video>
    </div>
  </div>
</template>