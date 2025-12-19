<script setup>
const props = defineProps({
  start: String,
  hover: String,
  classes: {
    type: String,
    default: '',
  },
})

const isHovered = ref(false)
const isHoverPlaying = ref(false)

const canHover = ref(false)
const hasEnded = ref(false)
const isMouseInside = ref(false)

const containerRef = ref(null)
const videoRef1 = ref(null)
const videoRef2 = ref(null)

const {stop} = useIntersectionObserver(
    containerRef,
    ([{isIntersecting}]) => {
      if (isIntersecting) {
        if (!hasEnded.value) {
          videoRef1.value?.play()
        }
      } else {
        videoRef1.value?.pause()
      }
    },
    {threshold: 0.5}
)

onUnmounted(() => stop())

const playHoverVideo = () => {
  if (isHoverPlaying.value) return

  isHoverPlaying.value = true
  isHovered.value = true

  const video = videoRef2.value
  if (video) {
    video.currentTime = 0
    video.play()
  }
}

const onStartEnded = () => {
  hasEnded.value = true
  canHover.value = true

  if (isMouseInside.value) {
    playHoverVideo()
  }
}

const onHoverEnded = () => {
  if (isMouseInside.value) {
    const video = videoRef2.value
    if (video) {
      video.currentTime = 0
      video.play()
    }
  } else {
    isHoverPlaying.value = false
    isHovered.value = false
  }
}

const onMouseEnter = () => {
  isMouseInside.value = true
  if (canHover.value) {
    playHoverVideo()
  }
}

const onMouseLeave = () => {
  isMouseInside.value = false
}
</script>

<template>
  <div
      ref="containerRef"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
  >
    <video
        ref="videoRef1"
        :class="classes"
        v-show="!isHovered"
        muted
        playsinline
        @ended="onStartEnded"
    >
      <source :src="start" type="video/mp4"/>
    </video>

    <video
        ref="videoRef2"
        :class="classes"
        v-show="isHovered"
        muted
        playsinline
        @ended="onHoverEnded"
    >
      <source :src="hover" type="video/mp4"/>
    </video>
  </div>
</template>
