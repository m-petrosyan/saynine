<script setup>
import googleIcon from '@/assets/icons/google.svg'
import chatGptIcon from '@/assets/icons/chatgpt.svg'
import perplexityIcon from '@/assets/icons/perplexity.svg'
import geminiIcon from '@/assets/icons/gemini.svg'
import copilotIcon from '@/assets/icons/copilot.svg'

const citations = [
  {
    id: 1,
    title: 'AI overview',
    icon: googleIcon,
    total: 545,
    pages: 402,
    rank: '1.9K',
    pages_rank: '875'
  },
  {
    id: 2,
    title: 'ChatGPT',
    icon: chatGptIcon,
    total: '1.1K',
    pages: 760,
    rank: null,
    pages_rank: null
  },
  {
    id: 3,
    title: 'Perplexity',
    icon: perplexityIcon,
    total: '0',
    pages: 0,
    rank: null,
    pages_rank: null
  },
  {
    id: 4,
    title: 'Gemini',
    icon: geminiIcon,
    total: '8',
    pages: 12,
    rank: null,
    pages_rank: null
  },
  {
    id: 5,
    title: 'Copilot',
    icon: copilotIcon,
    total: '155',
    pages: 92,
    rank: null,
    pages_rank: null
  },
]
</script>

<template>
  <div>
    <h2 class="text-center text-subtitle font-bold">AI citations</h2>
    <div class="flex flex-wrap justify-center gap-6 mt-6">
      <div v-for="item in citations" :key="item.id"
           class="w-[530px] p-8 border-4 border-white-blue rounded-3xl">
        <h3 class="text-3xl font-bold">{{ item.title }}</h3>
        <div class="flex justify-between items-center gap-x-2 border-b-2 border-blue-light p-2 mt-4">
          <div class="flex gap-3 items-center">
            <img :src="item.icon" alt="google">
            <p class="text-subtitle font-bold">{{ item.total }}</p>
          </div>
          <ElementsRankInfo v-if="item.rank" :value="item.rank" :growth="item.growth"/>
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="flex items-center gap-x-2">
            <p class="text-md font-normal">Pages</p>
            <p class="text-2xl font-bold ">{{ item.pages }}</p>
          </div>
          <ElementsRankInfo v-if="item.pages_rank" :value="item.pages_rank" :growth="item.growth"/>
        </div>
      </div>
    </div>
  </div>
</template>