<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue'

const props = defineProps({
  data: {type: Array, required: true},
  url: {type: Boolean, default: false},
  hoveredIndex: {type: Number, default: -1},
})

const emit = defineEmits(['hover'])

const canvas = ref(null)
let instance = null

// Utility to add transparency to a color string (HEX or RGB)
const addOpacity = (color, opacity = 0.3) => {
  if (color.startsWith('#')) {
    return color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
  }
  return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba')
}

// Renders a custom floating tooltip for the doughnut/pie chart
const customTooltip = (context) => {
  const {chart, tooltip} = context
  let tooltipEl = chart.canvas.parentNode.querySelector('.chartjs-tooltip')
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.classList.add('chartjs-tooltip', 'absolute', 'bg-white', 'border', 'border-slate-200', 'rounded-md', 'whitespace-nowrap', 'p-4', 'pointer-events-none', 'text-xs', 'font-inter', 'transition-all', 'duration-100', 'z-50', 'shadow-lg')
    chart.canvas.parentNode.appendChild(tooltipEl)
  }
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }
  const point = tooltip.dataPoints[0]
  const label = point.label
  const value = point.formattedValue
  const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0)
  const percentage = ((point.parsed / total) * 100).toFixed(0)
  const pointColor = point.dataset.borderColor[point.dataIndex]
  tooltipEl.innerHTML = `
    <div class="flex items-center gap-2 text-gray-500">
          <p class="w-5 h-5 rounded-full text-white flex justify-center items-center text-xs"
             style="background: ${pointColor}">
       ${props.url ? `<span>${value}</span>` : ''}
          </p>
      <div class="flex gap-2">
        <p class="font-normal ">${label}</p>
        <p style="color: ${pointColor}" class="font-base font-medium">${value}</p>
        <p>(${percentage}%)</p>
      </div>
    </div>
  `
  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas
  const container = chart.canvas.parentNode
  const containerWidth = container.offsetWidth
  const containerHeight = container.offsetHeight
  const tooltipWidth = tooltipEl.offsetWidth
  const tooltipHeight = tooltipEl.offsetHeight

  let left = positionX + tooltip.caretX
  let top = positionY + tooltip.caretY

  // Boundary checks
  if (left + tooltipWidth > containerWidth) {
    left = containerWidth - tooltipWidth - 10
  }
  if (top + tooltipHeight > containerHeight) {
    top = containerHeight - tooltipHeight - 10
  }
  if (left < 0) left = 10
  if (top < 0) top = 10

  tooltipEl.style.opacity = 1
  tooltipEl.style.left = left + 'px'
  tooltipEl.style.top = top + 'px'
}

onMounted(async () => {
  if (process.client && canvas.value) {
    const {Chart, registerables} = await import('chart.js')
    Chart.register(...registerables)
    const ctx = canvas.value.getContext('2d')

    const originalColors = props.data.map(d => d.color)
    const colorsWithOpacity = originalColors.map(color => addOpacity(color, 0.3))

    instance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: props.data.map(d => d.name),
        datasets: [{
          data: props.data.map(d => d.value),
          backgroundColor: originalColors,
          borderColor: originalColors,
          borderWidth: 0,
          hoverBorderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '78%',
        plugins: {
          legend: {display: false},
          tooltip: {
            enabled: false,
            external: customTooltip
          }
        },
        animation: {animateRotate: true, duration: 2000},
        // Handles internal chart hover to highlight slices and notify parent
        onHover: (event, elements, chart) => {
          if (elements.length > 0) {
            const hoveredIndex = elements[0].index
            emit('hover', hoveredIndex)
            // Dim other slices while hovering
            const newColors = originalColors.map((color, i) => i === hoveredIndex ? color : addOpacity(color, 0.3))
            chart.data.datasets[0].backgroundColor = newColors
            chart.update('none')
          } else {
            emit('hover', -1)
            chart.data.datasets[0].backgroundColor = originalColors
            chart.update('none')
          }
        },
        // Handles mouse leaving the entire chart area
        onLeave: (event, elements, chart) => {
          emit('hover', -1)
          chart.data.datasets[0].backgroundColor = originalColors
          chart.update('none')
        }
      }
    })

    // Synchronizes highlighting and tooltip when parent component triggers hover via props
    watch(() => props.hoveredIndex, (index) => {
      if (instance) {
        if (index >= 0) {
          // Highlight the segment
          const newColors = originalColors.map((color, i) => i === index ? color : addOpacity(color, 0.3))
          instance.data.datasets[0].backgroundColor = newColors
          
          // Show the tooltip programmatically
          instance.tooltip.setActiveElements([
            {
              datasetIndex: 0,
              index: index,
            }
          ])
        } else {
          // Reset segment colors
          instance.data.datasets[0].backgroundColor = originalColors
          
          // Hide the tooltip
          instance.tooltip.setActiveElements([])
        }
        instance.update('none')
      }
    })
  }
})

onUnmounted(() => {
  if (instance) instance.destroy()
})
</script>

<template>
  <div class="relative h-96">
    <canvas ref="canvas"></canvas>
  </div>
</template>