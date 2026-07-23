import { onBeforeUnmount, onMounted } from 'vue'

type CanvasPalette = {
  ink: string
  plate: string
  light: string
  cool: string
  vig: string
  fill: string
  fillStrong: string
  lineBase: number
  lineAmp: number
  wire: number
  wireAlt: number
  galleryLine: number
  galleryLineAmp: number
  galleryGlow: number
  galleryVig: number
}

function isLightTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
}

function getCanvasPalette(): CanvasPalette {
  return isLightTheme()
    ? {
        ink: '33,30,26',
        plate: '#E8E1D5',
        light: 'rgba(128,93,53,',
        cool: 'rgba(50,63,58,',
        vig: 'rgba(93,85,75,',
        fill: 'rgba(128,93,53,0.055)',
        fillStrong: 'rgba(33,30,26,0.075)',
        lineBase: 0.2,
        lineAmp: 0.52,
        wire: 0.18,
        wireAlt: 0.22,
        galleryLine: 0.07,
        galleryLineAmp: 0.16,
        galleryGlow: 0.24,
        galleryVig: 0.16,
      }
    : {
        ink: '244,240,234',
        plate: '#1A1A1A',
        light: 'rgba(168,138,100,',
        cool: 'rgba(168,138,100,',
        vig: 'rgba(0,0,0,',
        fill: 'rgba(168,138,100,0.018)',
        fillStrong: 'rgba(244,240,234,0.022)',
        lineBase: 0.1,
        lineAmp: 0.4,
        wire: 0.08,
        wireAlt: 0.1,
        galleryLine: 0.04,
        galleryLineAmp: 0.1,
        galleryGlow: 0.16,
        galleryVig: 0.55,
      }
}

function setupRevealObserver(cleanup: Array<() => void>) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => observer.observe(element))
  cleanup.push(() => observer.disconnect())
}

function setupLayerLines(cleanup: Array<() => void>) {
  const layerLines = document.getElementById('layerlines')
  if (!layerLines) return

  const lines = Array.from({ length: 60 }, (_, index) => {
    const line = document.createElement('div')
    line.className = 'll'
    line.style.top = `${index * 1.7 + 1}%`
    line.style.opacity = (0.25 + Math.random() * 0.6).toFixed(2)
    layerLines.appendChild(line)
    return line
  })

  cleanup.push(() => lines.forEach((line) => line.remove()))
}

function setupCollabCanvas(reduceMotion: boolean, cleanup: Array<() => void>) {
  const canvas = document.getElementById('collabCanvas')
  if (!(canvas instanceof HTMLCanvasElement)) return

  const context = canvas.getContext('2d')
  if (!context) return

  let width = 0
  let height = 0
  let time = 0
  let raf = 0

  const resize = () => {
    const density = Math.min(window.devicePixelRatio || 1, 2)
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = width * density
    canvas.height = height * density
    context.setTransform(density, 0, 0, density, 0, 0)
  }

  const draw = () => {
    context.clearRect(0, 0, width, height)

    const palette = getCanvasPalette()
    const lightTheme = isLightTheme()
    const centerX = width / 2
    const centerY = height / 2
    const rings = 38
    const rotation = time * 0.004
    const formWidth = Math.min(width * 0.68, height * 0.58)
    const verticalSpan = Math.min(height * 0.64, width * 0.72)
    const minRx = formWidth * 0.12
    const maxRx = formWidth * 0.5
    const halo = context.createRadialGradient(centerX, centerY, formWidth * 0.12, centerX, centerY, formWidth * 0.82)

    halo.addColorStop(0, palette.fillStrong)
    halo.addColorStop(0.64, palette.fill)
    halo.addColorStop(1, `rgba(${palette.ink},0)`)
    context.fillStyle = halo
    context.fillRect(0, 0, width, height)

    for (let index = 0; index < rings; index += 1) {
      const progress = index / rings
      const y = centerY + (progress - 0.5) * verticalSpan
      const wobble = Math.sin(progress * Math.PI * 3 + rotation * 2) * 0.18 + 1
      const rx = (minRx + Math.sin(progress * Math.PI) * (maxRx - minRx)) * wobble
      const ry = rx * 0.18
      const alpha = palette.lineBase + Math.sin(progress * Math.PI) * palette.lineAmp

      context.beginPath()
      context.ellipse(centerX, y, rx, ry, 0, 0, Math.PI * 2)
      context.strokeStyle = `${palette.light}${alpha.toFixed(3)})`
      context.lineWidth = lightTheme ? 1.25 : 1
      context.stroke()
    }

    context.lineWidth = lightTheme ? 1.1 : 1

    for (let section = 0; section < 8; section += 1) {
      const angle = rotation + (section / 8) * Math.PI * 2
      context.strokeStyle = section % 3 === 1 ? `${palette.cool}${palette.wireAlt})` : `rgba(${palette.ink},${palette.wire})`
      context.beginPath()

      for (let index = 0; index <= rings; index += 1) {
        const progress = index / rings
        const y = centerY + (progress - 0.5) * verticalSpan
        const wobble = Math.sin(progress * Math.PI * 3 + rotation * 2) * 0.18 + 1
        const rx = (minRx + Math.sin(progress * Math.PI) * (maxRx - minRx)) * wobble
        const x = centerX + Math.cos(angle) * rx

        if (index === 0) {
          context.moveTo(x, y)
        } else {
          context.lineTo(x, y)
        }
      }

      context.stroke()
    }

    if (!reduceMotion) {
      time += 1
      raf = requestAnimationFrame(draw)
    }
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })
  cleanup.push(() => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(raf)
  })

  if (reduceMotion) {
    time = 200
    draw()
  } else {
    raf = requestAnimationFrame(draw)
  }
}

function setupGalleryCanvases(cleanup: Array<() => void>) {
  const redraws: Array<() => void> = []

  document.querySelectorAll<HTMLElement>('#gallery .gitem').forEach((item) => {
    const placeholder = item.querySelector<HTMLElement>('.ph')
    if (!placeholder) return

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const seed = Number.parseInt(item.dataset.seed ?? '1', 10)
    const resizeObserver = new ResizeObserver(() => resize())

    if (!context) return

    const draw = (width: number, height: number) => {
      const palette = getCanvasPalette()
      context.clearRect(0, 0, width, height)
      context.fillStyle = palette.plate
      context.fillRect(0, 0, width, height)

      const angle = 0.5 + seed * 0.13
      const gap = 6 + (seed % 3) * 2
      const span = Math.max(width, height) * 1.5

      context.save()
      context.translate(width / 2, height / 2)
      context.rotate(angle)

      for (let y = -span; y < span; y += gap) {
        const alpha = palette.galleryLine + ((Math.sin(y * 0.05 + seed) + 1) / 2) * palette.galleryLineAmp
        context.strokeStyle = `rgba(${palette.ink},${alpha.toFixed(3)})`
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(-span, y)
        context.lineTo(span, y)
        context.stroke()
      }

      context.restore()

      const lightX = seed % 2 ? width * 0.7 : width * 0.3
      const lightY = seed % 2 ? height * 0.35 : height * 0.6
      const radialGradient = context.createRadialGradient(lightX, lightY, 0, lightX, lightY, Math.max(width, height) * 0.6)
      radialGradient.addColorStop(0, `${palette.light}${palette.galleryGlow})`)
      radialGradient.addColorStop(1, `${palette.light}0)`)
      context.fillStyle = radialGradient
      context.fillRect(0, 0, width, height)

      const vignette = context.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.2, width / 2, height / 2, Math.max(width, height) * 0.75)
      vignette.addColorStop(0, `${palette.vig}0)`)
      vignette.addColorStop(1, `${palette.vig}${palette.galleryVig})`)
      context.fillStyle = vignette
      context.fillRect(0, 0, width, height)
    }

    const resize = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2)
      const rect = placeholder.getBoundingClientRect()
      if (rect.width === 0) return

      canvas.width = rect.width * density
      canvas.height = rect.height * density
      context.setTransform(density, 0, 0, density, 0, 0)
      draw(rect.width, rect.height)
    }

    placeholder.appendChild(canvas)
    resizeObserver.observe(placeholder)
    redraws.push(resize)
    resize()

    cleanup.push(() => {
      resizeObserver.disconnect()
      canvas.remove()
    })
  })

  return redraws
}

export function useLandingCanvasEffects() {
  const cleanup: Array<() => void> = []

  onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setupRevealObserver(cleanup)
    setupLayerLines(cleanup)
    setupCollabCanvas(reduceMotion, cleanup)

    const redrawGallery = setupGalleryCanvases(cleanup)
    const onThemeChange = () => {
      requestAnimationFrame(() => redrawGallery.forEach((redraw) => redraw()))
    }

    window.addEventListener('landing:themechange', onThemeChange)
    cleanup.push(() => window.removeEventListener('landing:themechange', onThemeChange))
  })

  onBeforeUnmount(() => {
    cleanup.splice(0).forEach((dispose) => dispose())
  })
}
