import {defineStore} from 'pinia'
import {ref} from 'vue'
import Backlink from "@/assets/icons/backlink.svg";
import Average from "@/assets/icons/average.svg";
import Domain from "@/assets/icons/domain.svg";

export const useChartStore = defineStore('chart', () => {
    const trafficInfo = ref([
        {
            title: 'Backlinks provided',
            value_title: '',
            value: '30/30',
            percent: '50%',
            avg_title: '',
            growth: true,
            icon: Backlink
        },
        {
            title: 'Domain Traffic',
            value: '1000',
            value_title: 'Min. agreed',
            avg: 97058,
            avg_title: 'Avg. provided',
            growth: true,
            icon: Average
        },
        {
            title: 'Domain rate',
            value: '100 DR',
            value_title: 'Min. agreed',
            avg: '70 DR',
            avg_title: 'Avg. provided',
            growth: true,
            icon: Domain
        },
    ]);

    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 104; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - (i * 7));
            dates.push(date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}));
        }
        return dates;
    };

    const generateData = (count, start, trend, noise, min = null, max = null) => {
        const data = [];
        let current = start;

        for (let i = 0; i < count; i++) {
            current = current + trend + (Math.random() * noise - noise / 2);

            if (min !== null && current < min) {
                current = min;
            }
            if (max !== null && current > max) {
                current = max;
            }

            data.push(Math.round(current));
        }
        return data;
    };


    const dates = generateDates();
    const dataCount = dates.length;

    const trafficData = ref({
        labels: dates,
        datasets: [
            {
                name: 'Domain Rating',
                data: generateData(dataCount, 40, 0.1, 2),
                color: '#3b82f6',
                bgAlpha: 'rgba(59, 130, 246, 0.15)',
                yAxisID: 'y'
            },
            {
                name: 'Organic traffic',
                data: generateData(dataCount, 2000, 20, 300),
                color: '#33BEEC',
                bgAlpha: 'rgba(34, 211, 238, 0.15)',
                yAxisID: 'y1'
            }
        ]
    });

    const trafficActiveDatasets = ref([true, true]);

    const keywordsData = ref({
        labels: dates,
        datasets: [
            {
                name: 'product strategy',
                data: generateData(105, 2, 0.3, 10, 0, 100),
                color: '#3b82f6',
                bgAlpha: 'rgba(59, 130, 246, 0.15)',
                yAxisID: 'y',
                rank: 15,
                growth: true
            },
            {
                name: 'product strategy',
                data: generateData(105, 2, 0.3, 10, 0, 100),
                color: '#33BEEC',
                bgAlpha: 'rgba(34, 211, 238, 0.15)',
                yAxisID: 'y1',
                rank: 13,
                growth: true
            }
        ]
    });

    const keywordsActiveDatasets = ref([true, true]);

    const anchorData = ref([
        {
            name: 'product management software',
            value: 5,
            color: '#0E44B0'
        },
        {
            name: 'product strategy',
            value: 4,
            color: '#077DFD'
        },
        {
            name: 'product management',
            value: 3,
            color: '#33BEEC'
        },
        {
            name: 'enterprise software',
            value: 2,
            color: '#99CAFF'
        },
        {
            name: 'enterprise tool',
            value: 2,
            color: '#FCD834'
        }
    ]);

    const backlinksData = ref([
        {
            name: '/logo-maker',
            value: 1,
            color: '#0E44B0'
        },
        {
            name: '/ai-logo-generator',
            value: 2,
            color: '#077DFD'
        },
        {
            name: '/pros-and-cons-of-creating-your-logo-yourself/',
            value: 3,
            color: '#33BEEC'
        },
        {
            name: '/business-name-generator',
            value: 4,
            color: '#99CAFF'
        },
    ]);

    const toggleTrafficDataset = (index) => {
        trafficActiveDatasets.value[index] = !trafficActiveDatasets.value[index]
    };

    const toggleKeywordsDataset = (index) => {
        keywordsActiveDatasets.value[index] = !keywordsActiveDatasets.value[index]
    };

    const areaOptions = ref([
        {label: 'Last month', value: '1m'},
        {label: 'Last 3 months', value: '3m'},
        {label: 'Last 6 months', value: '6m'},
        {label: 'Last 1 year', value: '1y'},
    ]);

    return {
        trafficInfo,
        trafficData,
        trafficActiveDatasets,
        keywordsData,
        keywordsActiveDatasets,
        anchorData,
        backlinksData,
        toggleTrafficDataset,
        toggleKeywordsDataset,
        areaOptions
    }
})
