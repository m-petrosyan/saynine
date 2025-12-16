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
    <h2 class="text-center text-3xl md:text-6xl font-bold">AI citations</h2>
    <div class="flex flex-wrap justify-center gap-6 mt-6">
      <CitationsCard :citations/>
    </div>
  </div>
</template>