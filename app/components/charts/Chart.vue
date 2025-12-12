<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue'

const chartCanvas = ref(null)
const activeDatasets = ref([true, true])
let chartInstance = null

const chartConfig = ref({
  labels: [
    '29 Jun 2023',
    '11 Oct 2023',
    '23 Jan 2024',
    '6 May 2024',
    '18 Aug 2024',
    '30 Nov 2024',
    '14 Mar 2025',
    '26 Jun 2025'
  ],
  datasets: [
    {
      name: 'Domain Rating',
      data: [39, 40, 42, 45, 48, 46, 49, 52],
      color: '#3b82f6',
      bgAlpha: 'rgba(59, 130, 246, 0.15)',
      yAxisID: 'y'
    },
    {
      name: 'Organic traffic',
      data: [2115, 2200, 2400, 2800, 3200, 3400, 3600, 3850],
      color: '#33BEEC',
      bgAlpha: 'rgba(34, 211, 238, 0.15)',
      yAxisID: 'y1'
    }
  ]
})

const toggleDataset = (index) => {
  activeDatasets.value[index] = !activeDatasets.value[index]
  if (chartInstance) {
    chartInstance.data.datasets[index].hidden = !activeDatasets.value[index]
    chartInstance.update('none')
  }
}


function customTooltip(context) {
  const {chart, tooltip} = context;

  let tooltipEl = chart.canvas.parentNode.querySelector('.chartjs-tooltip');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.classList.add('chartjs-tooltip');
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
    `;
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  const label = tooltip.dataPoints[0].label;
  const lines = tooltip.dataPoints.map(dp => `
      <div class="flex items-center gap-2 p-1">
        <span class="w-4 h-4 rounded-full" style="background:${dp.dataset.borderColor}"></span>
        <span class="">${dp.dataset.label}:</span> <span style="color:${dp.dataset.borderColor}">${dp.formattedValue}</span>
      </div>
  `).join('');

  tooltipEl.innerHTML = `
    <div class="mb-2">
      <span class="text-blue-light">Start:</span>
      <span>${label}</span>
    </div>
    ${lines}
  `;

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
}


onMounted(async () => {
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
              title: (context) => {
                return `Start: ${context[0].label}`
              },
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
              color: '#94a3b8',
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
      dataset.hidden = !activeDatasets.value[index]
    })
    chartInstance.update('none')
  }
}, {deep: true})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})


const open = ref(false)

const options = [
  {label: 'Last 7 days', value: '7d'},
  {label: 'Last month', value: '1m'},
  {label: 'Last 3 months', value: '3m'},
  {label: 'Last 6 months', value: '6m'},
  {label: 'Last 2 years', value: '2y'},
  {label: 'Last 5 years', value: '5y'},
  {label: 'Custom range', value: 'custom'}
]

const selectedLabel = ref('Last 2 years')

const select = (opt) => {
  selectedLabel.value = opt.label
  open.value = false
}

const openToggle = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="bg-white rounded-xl p-6 w-full font-inter font-normal">
    <ChartsButtons
        :datasets="chartConfig.datasets"
        :activeDatasets="activeDatasets"
        @toggle-dataset="toggleDataset"
    />
    <div class="border-2 border-white-blue outline-6 outline-white-blue-light  rounded-xl px-6 mt-6">
      {{ open }}
      <div class="flex justify-end items-center mb-6 w-full mt-8 relative">
        <div @click="openToggle"
             class="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 cursor-pointer hover:border-slate-300 bg-white select-none">
          <img src="@/assets/icons/calendar.svg" alt="calendar" class="w-4 h-4"/>
          <span>{{ selectedLabel }}</span>

          <svg class="w-4 h-4 text-cyan-400 transition-transform duration-200"
               :class="{'rotate-180': open}"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        <!-- Выпадающий список -->
        <div v-if="open"
             class="absolute top-12 right-0 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-2 text-sm z-50">

          <div v-for="(opt, i) in options" :key="i"
               @click="select(opt)"
               class="px-4 py-2 cursor-pointer text-slate-700 hover:bg-slate-50">
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