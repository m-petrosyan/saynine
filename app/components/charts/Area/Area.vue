Вот исправленный код для реверсного графика:

<script setup>
import {computed, onMounted, onUnmounted, ref, toRefs, useTemplateRef, watch} from 'vue'

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  activeDatasets: {
    type: Array,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  scale: {
    type: [Boolean, Array],
    default: false
  },
  reverseGraphic: {
    type: Boolean,
    default: false
  }
})

const {chartData, activeDatasets, options, scale, reverseGraphic} = toRefs(props)

const chartCanvas = ref(null)
let chartInstance = null
const open = ref(false)
const selectedLabel = ref('Last 1 year')
const target = useTemplateRef('target')

let hoverX = null
let hoverPositions = {}
let fractionalIndex = -1
const mouseMoveHandler = ref(null)
const mouseLeaveHandler = ref(null)

const fullLabels = computed(() => chartData.value.labels)
const fullDatasets = computed(() => chartData.value.datasets)

const chartConfig = ref({
  labels: [],
  datasets: []
})

const getDisplayLabels = (labels) => {
  const isMobile = window?.innerWidth < 768
  const maxLabels = isMobile ? 4 : 8

  if (labels.length <= maxLabels) return labels

  const indices = []
  for (let i = 0; i < maxLabels; i++) {
    indices.push(Math.floor(i * (labels.length - 1) / (maxLabels - 1)))
  }

  return indices.map(i => labels[i])
}

const displayLabels = ref([])

const getDataForPeriod = (value) => {
  if (value === 'custom' || value === '5y') {
    return {
      labels: fullLabels.value,
      datasets: fullDatasets.value.map(d => ({...d, data: d.data}))
    }
  }

  const now = new Date()
  let days
  switch (value) {
    case '1m':
      days = 30;
      break
    case '3m':
      days = 90;
      break
    case '6m':
      days = 180;
      break
    case '1y':
      days = 365;
      break
    default:
      days = 365
  }
  const startDate = new Date(now.getTime() - days * 86400000)
  const dates = fullLabels.value.map(l => new Date(l))
  let startIndex = dates.findIndex(date => date >= startDate)
  if (startIndex === -1) startIndex = 0

  if (fullLabels.value.length - startIndex < 2) {
    startIndex = Math.max(0, fullLabels.value.length - 2)
  }
  const slicedLabels = fullLabels.value.slice(startIndex)
  const slicedDatasets = fullDatasets.value.map(d => ({
    ...d,
    data: d.data.slice(startIndex)
  }))
  return {labels: slicedLabels, datasets: slicedDatasets}
}

const updateChartData = (value) => {
  const dataForPeriod = getDataForPeriod(value)
  chartConfig.value.labels = dataForPeriod.labels
  chartConfig.value.datasets = dataForPeriod.datasets
  displayLabels.value = getDisplayLabels(dataForPeriod.labels)

  if (chartInstance) {
    chartInstance.data.labels = dataForPeriod.labels

    let scaleMin = 0
    let scaleMax = 100

    if (Array.isArray(scale.value) && scale.value.length === 2) {
      scaleMin = scale.value[0]
      scaleMax = scale.value[1]
    }

    dataForPeriod.datasets.forEach((ds, i) => {
      if (chartInstance.data.datasets[i]) {
        const isReverse = reverseGraphic.value
        if (isReverse) {
          chartInstance.data.datasets[i].data = ds.data.map(v => scaleMin + scaleMax - v)
        } else {
          chartInstance.data.datasets[i].data = ds.data
        }
      }
    })

    const isScale = !!scale.value || reverseGraphic.value
    chartInstance.options.scales.y.display = isScale
    chartInstance.options.scales.y.ticks.display = isScale
    chartInstance.options.scales.y1.display = isScale && !reverseGraphic.value
    chartInstance.options.scales.y1.ticks.display = isScale && !reverseGraphic.value

    let minY = 0
    let maxY = undefined

    if (reverseGraphic.value) {
      minY = scaleMin
      maxY = scaleMax
      chartInstance.options.scales.y.reverse = false
      chartInstance.options.scales.y1.display = false
      chartInstance.options.scales.y1.ticks.display = false
    } else if (Array.isArray(scale.value) && scale.value.length === 2) {
      minY = scale.value[0]
      maxY = scale.value[1]
      chartInstance.options.scales.y.reverse = false
    } else if (scale.value === true) {
      let maxDataY = 0
      chartInstance.data.datasets.forEach(ds => {
        if (ds.yAxisID === 'y' && ds.data) {
          const dsMax = Math.max(...ds.data)
          if (dsMax > maxDataY) maxDataY = dsMax
        }
      })
      maxY = maxDataY
      chartInstance.options.scales.y.reverse = false
    } else {
      chartInstance.options.scales.y.reverse = false
    }

    chartInstance.options.scales.y.min = minY
    chartInstance.options.scales.y.max = maxY

    if (reverseGraphic.value || (Array.isArray(scale.value) && scale.value.length === 2)) {
      chartInstance.options.scales.y1.min = minY
      chartInstance.options.scales.y1.max = maxY
    } else {
      chartInstance.options.scales.y1.min = 0
      chartInstance.options.scales.y1.max = undefined
    }

    chartInstance.options.layout.padding.top = 40 // dosent cut top
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
    <div class="flex items-center gap-2 p-1 whitespace-nowrap">
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
  const rect = chart.canvas.getBoundingClientRect()
  const tooltipWidth = 200

  let leftPos = positionX + tooltip.caretX
  if (leftPos + tooltipWidth > rect.width) {
    leftPos = positionX + tooltip.caretX - tooltipWidth - 20
  }

  tooltipEl.style.opacity = 1
  tooltipEl.style.left = leftPos + 'px'
  tooltipEl.style.top = positionY + tooltip.caretY - 120 + 'px'
}

const handleMouseMove = (e) => {
  if (!chartInstance) return
  const rect = chartCanvas.value.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const scaleX = chartInstance.scales.x
  fractionalIndex = scaleX.getValueForPixel(mouseX)
  const dataLength = chartInstance.data.labels.length
  if (fractionalIndex < 0 || fractionalIndex > dataLength - 1) {
    if (hoverX !== null) {
      hoverX = null
      hoverPositions = {}
      customTooltip({chart: chartInstance, tooltip: {opacity: 0}})
      chartInstance.draw()
    }
    return
  }
  hoverX = mouseX
  const customDataPoints = []
  const ys = []

  let scaleMin = 0
  let scaleMax = 100
  if (Array.isArray(scale.value) && scale.value.length === 2) {
    scaleMin = scale.value[0]
    scaleMax = scale.value[1]
  }

  chartInstance.data.datasets.forEach((dataset, i) => {
    if (dataset.hidden) return
    const dData = dataset.data
    const index1 = Math.floor(fractionalIndex)
    const index2 = Math.min(index1 + 1, dData.length - 1)
    const frac = fractionalIndex - index1
    const y1 = dData[index1]
    const y2 = dData[index2]
    const y = y1 + frac * (y2 - y1)

    const isReverse = reverseGraphic.value
    const originalY = isReverse ? scaleMin + scaleMax - y : y

    const scaleY = chartInstance.scales[dataset.yAxisID || 'y']
    const pixelY = scaleY.getPixelForValue(y)
    hoverPositions[i] = {x: mouseX, y: pixelY, color: dataset.borderColor}
    ys.push(pixelY)
    const dp = {
      datasetIndex: i,
      dataset,
      index: fractionalIndex,
      parsed: {y: originalY},
      label: chartInstance.data.labels[index1],
      formattedValue: originalY.toFixed(1),
      element: {x: mouseX, y: pixelY}
    }
    customDataPoints.push(dp)
  })
  if (customDataPoints.length > 0) {
    const caretY = Math.min(...ys) - 20
    const tooltipContext = {
      chart: chartInstance,
      tooltip: {
        opacity: 1,
        dataPoints: customDataPoints,
        caretX: mouseX,
        caretY
      }
    }
    customTooltip(tooltipContext)
  }
  chartInstance.draw()
}

const handleMouseLeave = () => {
  if (hoverX !== null) {
    hoverX = null
    hoverPositions = {}
    fractionalIndex = -1
    customTooltip({chart: chartInstance, tooltip: {opacity: 0}})
    chartInstance.draw()
  }
}

const createCustomPointsPlugin = () => ({
  id: 'customPoints_' + Math.random().toString(36).substr(2, 9),
  afterDatasetsDraw: (chart) => {
    if (!hoverX) return
    const ctx = chart.ctx
    Object.values(hoverPositions).forEach(({x, y, color}) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.restore()
    })
  }
})

let customPointsPlugin = null

onMounted(async () => {
  if (process.client && chartCanvas.value) {
    const {Chart, registerables} = await import('chart.js')
    Chart.register(...registerables)
    customPointsPlugin = createCustomPointsPlugin()
    Chart.register(customPointsPlugin)
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
      pointHoverRadius: 0,
      borderWidth: 2.5,
      yAxisID: config.yAxisID,
      hidden: !activeDatasets.value[index],
      clip: false
    }))
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartConfig.value.labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {left: 0, right: 0, top: 40, bottom: 0}
        },
        aspectRatio: 2.8,
        animation: false,
        interaction: {
          mode: 'none'
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
            offset: false,
            grid: {
              display: false,
              drawBorder: false
            },
            border: {
              display: false
            },
            ticks: {
              display: false,
              color: '#646E8C',
              font: {
                size: 14
              },
              padding: 0,
            }
          },
          y: {
            type: 'linear',
            display: false,
            position: 'left',
            min: 0,
            reverse: false,
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
              stepSize: 10,
              callback: function (value) {
                if (reverseGraphic.value) {
                  const scaleMin = Array.isArray(scale.value) ? scale.value[0] : 0
                  const scaleMax = Array.isArray(scale.value) ? scale.value[1] : 100
                  return (scaleMin + scaleMax - value).toLocaleString()
                }
                return value.toLocaleString()
              }
            }
          },
          y1: {
            type: 'linear',
            display: false,
            position: 'right',
            min: 0,
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
                let displayValue = value
                if (reverseGraphic.value) {
                  const scaleMin = Array.isArray(scale.value) ? scale.value[0] : 0
                  const scaleMax = Array.isArray(scale.value) ? scale.value[1] : 100
                  displayValue = scaleMin + scaleMax - value
                }

                if (displayValue >= 1000) {
                  return (displayValue / 1000).toFixed(0) + 'k'
                }
                return displayValue.toLocaleString()
              }
            }
          }
        }
      }
    })

    updateChartData('1y')

    mouseMoveHandler.value = handleMouseMove
    mouseLeaveHandler.value = handleMouseLeave
    const canvasEl = chartCanvas.value
    canvasEl.addEventListener('mousemove', mouseMoveHandler.value)
    canvasEl.addEventListener('mouseleave', mouseLeaveHandler.value)
  }
  window.addEventListener('resize', () => {
    displayLabels.value = getDisplayLabels(chartConfig.value.labels)
  })
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

// watch(scale, () => {
//   updateChartData(selectedLabel.value.toLowerCase().replace('last ', '').replace(' years', 'y').replace(' year', 'y').replace(' months', 'm').replace(' month', 'm').replace(' weeks', 'w').replace(' week', 'w').replace(' days', 'd').replace(' day', 'd'))
// }, {deep: true})
//
// watch(reverseGraphic, () => {
//   updateChartData(selectedLabel.value.toLowerCase().replace('last ', '').replace(' years', 'y').replace(' year', 'y').replace(' months', 'm').replace(' month', 'm').replace(' weeks', 'w').replace(' week', 'w').replace(' days', 'd').replace(' day', 'd'))
// }, {deep: true})

onUnmounted(() => {
  if (chartInstance) {
    if (customPointsPlugin) {
      Chart.unregister(customPointsPlugin)
    }
    chartInstance.destroy()
  }
  if (process.client && chartCanvas.value && mouseMoveHandler.value && mouseLeaveHandler.value) {
    const canvasEl = chartCanvas.value
    canvasEl.removeEventListener('mousemove', mouseMoveHandler.value)
    canvasEl.removeEventListener('mouseleave', mouseLeaveHandler.value)
  }
  window.removeEventListener('resize', () => {
    displayLabels.value = getDisplayLabels(chartConfig.value.labels)
  })
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
  <div class="rounded-xl p-0 lg:p-6 w-full font-inter font-normal">
    <div class="border-2 border-white-blue outline-6 outline-white-blue-light rounded-xl mt-6 h-full">
      <div class="flex justify-end items-center mb-6 mt-2 md:mt-4 lg:mt-2 lg:mt-8 px-4 lg:px-10">
        <div class="relative">
          <div @click="openToggle" ref="target"
               class="flex items-center gap-x-2 md:gap-x-10 px-3 py-1.5 border border-slate-200 text-sm text-slate-600 cursor-pointer hover:border-slate-300 bg-white select-none"
               :class="open ? 'rounded-t-xl border-b-0' : 'rounded-xxl'">
            <div class="flex items-center gap-x-2">
              <img src="@/assets/icons/calendar.svg" alt="calendar" class="w-4 h-4"/>
              <span>{{ selectedLabel }}</span>
            </div>
            <img src="@/assets/icons/arrow_down.svg" alt="arrow" :class="{ 'rotate-180': open }"/>
          </div>
          <div v-if="open"
               class="absolute top-full left-0 w-full bg-white rounded-b-xl border border-t-0 border-slate-200 shadow-lg py-2 text-xs z-50">
            <div v-for="(opt, i) in options" :key="i" @click="select(opt)"
                 class="px-4 py-2 cursor-pointer hover:bg-slate-50 flex items-center justify-between">
              <span>{{ opt.label }}</span>
              <img v-if="opt.value === 'custom'" src="@/assets/icons/arrow_down.svg" alt="arrow"
                   class="w-4 h-4 -rotate-90"/>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 py-8 lg:py-6 lg:px-10">
        <div class="relative h-[400px] p-0">
          <canvas ref="chartCanvas"></canvas>
        </div>
        <div class="flex mt-2 justify-between px-0 mt-0 text-xxs lg:text-xs text-slate-600">
          <div v-for="(label, i) in displayLabels" :key="i" class="flex-1 text-center">
            {{ label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>