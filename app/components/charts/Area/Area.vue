<script setup>
import {computed, inject, onMounted, onUnmounted, ref, useTemplateRef, watch} from 'vue'
import {onClickOutside} from '@vueuse/core'

const context = inject('chartContext')
if (!context) throw new Error('chartContext not provided')
const {chartData, activeDatasets, toggleDataset} = context

const chartCanvas = ref(null)
let chartInstance = null
const open = ref(false)
const selectedLabel = ref('Last 2 years')
const target = useTemplateRef('target')

const options = [
  {label: 'Last 7 days', value: '7d'},
  {label: 'Last month', value: '1m'},
  {label: 'Last 3 months', value: '3m'},
  {label: 'Last 6 months', value: '6m'},
  {label: 'Last 2 years', value: '2y'},
  {label: 'Last 5 years', value: '5y'},
  {label: 'Custom range', value: 'custom'}
]

const fullLabels = computed(() => chartData.labels)
const fullDatasets = computed(() => chartData.datasets)

const chartConfig = ref({
  labels: [],
  datasets: []
})

const getDataForPeriod = (value) => {
  let count = fullLabels.value.length
  switch (value) {
    case '7d':
      count = Math.min(7, fullLabels.value.length);
      break
    case '1m':
      count = Math.min(2, fullLabels.value.length);
      break
    case '3m':
      count = Math.min(3, fullLabels.value.length);
      break
    case '6m':
      count = Math.min(4, fullLabels.value.length);
      break
    case '2y':
      count = Math.min(6, fullLabels.value.length);
      break
    case '5y':
      count = fullLabels.value.length;
      break
    case 'custom':
      count = fullLabels.value.length;
      break
  }
  const startIndex = Math.max(0, fullLabels.value.length - count)
  const slicedLabels = fullLabels.value.slice(startIndex, startIndex + count)
  const slicedDatasets = fullDatasets.value.map(d => ({
    ...d,
    data: d.data.slice(startIndex, startIndex + count)
  }))
  return {labels: slicedLabels, datasets: slicedDatasets}
}

const updateChartData = (value) => {
  const data = getDataForPeriod(value)
  chartConfig.value.labels = data.labels
  chartConfig.value.datasets = data.datasets
  if (chartInstance) {
    chartInstance.data.labels = data.labels
    data.datasets.forEach((ds, i) => {
      if (chartInstance.data.datasets[i]) {
        chartInstance.data.datasets[i].data = ds.data
      }
    })
    chartInstance.update('none')
  }
}

const customTooltip = (context) => {
  const {chart, tooltip} = context
  let tooltipEl = chart.canvas.parentNode.querySelector('.chartjs-tooltip')
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.classList.add('chartjs-tooltip')
    tooltipEl.style.cssText = `
      position: absolute;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      pointer-events: none;
      font-size: 14px;
      font-family: Inter, sans-serif;
      color: #0f172a;
      transition: all .1s ease;
      z-index: 100;
    `
    chart.canvas.parentNode.appendChild(tooltipEl)
  }
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }
  const label = tooltip.dataPoints[0].label
  const lines = tooltip.dataPoints.map(dp => `
    <div class="flex items-center gap-2 p-1">
      <span class="w-4 h-4 rounded-full" style="background:${dp.dataset.borderColor}"></span>
      <span class="">${dp.dataset.label}:</span> <span style="color:${dp.dataset.borderColor}">${dp.formattedValue}</span>
    </div>
  `).join('')
  tooltipEl.innerHTML = `
    <div class="mb-2">
      <span class="text-blue-light">Start:</span>
      <span>${label}</span>
    </div>
    ${lines}
  `
  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas
  tooltipEl.style.opacity = 1
  tooltipEl.style.left = positionX + tooltip.caretX + 'px'
  tooltipEl.style.top = positionY + tooltip.caretY + 'px'
}

onMounted(async () => {
  updateChartData('2y')
  if (process.client && chartCanvas.value) {
    const {Chart, registerables} = await import('chart.js')
    Chart.register(...registerables)
    const ctx = chartCanvas.value.getContext('2d')
    const datasets = chartConfig.value.datasets.map((config, index) => ({
      label: config.name,
      data: config.data,
      borderColor: config.color,
      backgroundColor: (context) => {
        const chart = context.chart
        const {ctx: cctx, chartArea} = chart
        if (!chartArea) return null
        const gradient = cctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, config.bgAlpha)
        gradient.addColorStop(1, config.bgAlpha.replace(/0\.15/, '0.01'))
        return gradient
      },
      fill: true,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: config.color,
      pointHoverBorderColor: 'white',
      pointHoverBorderWidth: 3,
      borderWidth: 2.5,
      yAxisID: config.yAxisID,
      hidden: !activeDatasets.value[index]
    }))
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartConfig.value.labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.8,
        animation: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false,
            external: customTooltip,
            position: 'nearest',
            backgroundColor: 'white',
            titleColor: '#94a3b8',
            bodyColor: '#0f172a',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: 16,
            displayColors: true,
            boxPadding: 6,
            usePointStyle: true,
            titleFont: {
              size: 14,
              weight: '500'
            },
            bodyFont: {
              size: 14,
              weight: '500'
            },
            callbacks: {
              title: (context) => `Start: ${context[0].label}`,
              label: (context) => {
                const label = context.dataset.label || ''
                const value = context.parsed.y.toLocaleString()
                return `  ${label}  ${value}`
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            border: {
              display: false
            },
            ticks: {
              color: '#646E8C',
              font: {
                size: 14
              },
              padding: 8
            }
          },
          y: {
            type: 'linear',
            display: false,
            position: 'left',
            min: 0,
            max: 60,
            grid: {
              color: '#f1f5f9',
              drawBorder: false
            },
            border: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11
              },
              padding: 8,
              stepSize: 2
            }
          },
          y1: {
            type: 'linear',
            display: false,
            position: 'right',
            min: 0,
            max: 4000,
            grid: {
              drawOnChartArea: false,
              drawBorder: false
            },
            border: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11
              },
              padding: 8,
              callback: function (value) {
                if (value >= 1000) {
                  return (value / 1000).toFixed(0) + 'k'
                }
                return value.toLocaleString()
              }
            }
          }
        }
      }
    })
  }
})

watch(activeDatasets, () => {
  if (chartInstance && chartInstance.data.datasets) {
    chartInstance.data.datasets.forEach((dataset, index) => {
      if (activeDatasets.value[index] !== undefined) {
        dataset.hidden = !activeDatasets.value[index]
      }
    })
    chartInstance.update('none')
  }
}, {deep: true})

watch(() => chartData, () => {
  updateChartData('2y')
}, {deep: true, immediate: true})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})

const select = (opt) => {
  selectedLabel.value = opt.label
  updateChartData(opt.value)
  open.value = false
}

onClickOutside(target, () => {
  open.value = false
})

const openToggle = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="rounded-xl p-6 w-full font-inter font-normal">
    <div class="border-2 border-white-blue outline-6 outline-white-blue-light rounded-xl px-6 mt-6">
      <div class="flex justify-end items-center mb-6 w-full mt-8 relative">
        <div @click="openToggle"
             class="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 cursor-pointer hover:border-slate-300 bg-white select-none">
          <img src="@/assets/icons/calendar.svg" alt="calendar" class="w-4 h-4"/>
          <span>{{ selectedLabel }}</span>
          <svg class="w-4 h-4 text-cyan-400 transition-transform duration-200" :class="{ 'rotate-180': open }"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <div v-if="open" ref="target"
             class="absolute top-12 right-0 w-44 bg-white rounded-xl shadow-lg py-2 text-sm z-50">
          <div v-for="(opt, i) in options" :key="i" @click="select(opt)"
               class="px-4 py-2 cursor-pointer hover:bg-slate-50">
            {{ opt.label }}
          </div>
        </div>
      </div>
      <div class="relative">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>