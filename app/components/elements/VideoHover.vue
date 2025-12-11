<script setup>
const props = defineProps({
  start: {
    type: String,
  },
  hover: {
    type: String,
  }
})

const isHovered = ref(false)
const containerRef = ref(null)
const videoRef1 = ref(null)
const videoRef2 = ref(null)

const {stop} = useIntersectionObserver(
    containerRef,
    ([{isIntersecting}]) => {
      if (isIntersecting) {
        videoRef1.value?.play()
        videoRef2.value?.play()
      } else {
        videoRef1.value?.pause()
        videoRef2.value?.pause()
      }
    },
    {threshold: 0.5}
)

onUnmounted(() => stop())
</script>

<template>
  <div
      ref="containerRef"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
  >
    <video
        ref="videoRef1"
        v-show="!isHovered"
        muted
        loop
    >
      <source :src="start" type="video/mp4"/>
    </video>

    <video
        ref="videoRef2"
        v-show="isHovered"
        muted
        loop
    >
      <source :src="hover" type="video/mp4"/>
    </video>
  </div>
</template>