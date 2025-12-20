import {defineStore} from 'pinia'
import {ref} from 'vue'
import googleIcon from '@/assets/icons/google.svg'
import chatGptIcon from '@/assets/icons/chatgpt.svg'
import perplexityIcon from '@/assets/icons/perplexity.svg'
import geminiIcon from '@/assets/icons/gemini.svg'
import copilotIcon from '@/assets/icons/copilot.svg'

export const useCitationsStore = defineStore('citations', () => {
    const citationsData = ref([
        {
            id: 1,
            title: 'AI overview',
            icon: googleIcon,
            total: 545,
            pages: 402,
            rank: '1.9K',
            percent: '-12%',
            pages_rank: '875'
        },
        {
            id: 2,
            title: 'ChatGPT',
            icon: chatGptIcon,
            total: '1.1K',
            pages: 760,
            rank: null,
            percent: '+8%',
            pages_rank: null
        },
        {
            id: 3,
            title: 'Perplexity',
            icon: perplexityIcon,
            total: '0',
            pages: 0,
            rank: null,
            percent: '0%',
            pages_rank: null
        },
        {
            id: 4,
            title: 'Gemini',
            icon: geminiIcon,
            total: '8',
            pages: 12,
            rank: null,
            percent: '-5%',
            pages_rank: null
        },
        {
            id: 5,
            title: 'Copilot',
            icon: copilotIcon,
            total: '155',
            pages: 92,
            rank: null,
            percent: '+20%',
            pages_rank: null
        },
    ]);

    return {
        citationsData
    }
})
