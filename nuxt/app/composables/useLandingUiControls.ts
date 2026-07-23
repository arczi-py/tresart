import { onBeforeUnmount, onMounted } from 'vue'

type LandingTheme = 'dark' | 'light'

function getActiveTheme(): LandingTheme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function setActiveTheme(theme: LandingTheme) {
  document.documentElement.setAttribute('data-theme', theme)
  window.dispatchEvent(new CustomEvent('landing:themechange', { detail: { theme } }))
}

export function useLandingUiControls() {
  const cleanup: Array<() => void> = []

  onMounted(() => {
    const nav = document.getElementById('nav')
    const menuToggle = document.getElementById('menuToggle')
    const themeToggle = document.getElementById('themeToggle')

    if (nav) {
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanup.push(() => window.removeEventListener('scroll', onScroll))
      onScroll()

      const navLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>('.nav-links a'))
      navLinks.forEach((link) => {
        const closeMenu = () => {
          nav.classList.remove('open')
          menuToggle?.setAttribute('aria-expanded', 'false')
        }
        link.addEventListener('click', closeMenu)
        cleanup.push(() => link.removeEventListener('click', closeMenu))
      })
    }

    if (nav && menuToggle) {
      const toggleMenu = () => {
        const isOpen = nav.classList.toggle('open')
        menuToggle.setAttribute('aria-expanded', String(isOpen))
      }
      menuToggle.addEventListener('click', toggleMenu)
      cleanup.push(() => menuToggle.removeEventListener('click', toggleMenu))
    }

    if (themeToggle) {
      let theme = getActiveTheme()
      const toggleTheme = () => {
        theme = theme === 'light' ? 'dark' : 'light'
        setActiveTheme(theme)
      }

      themeToggle.addEventListener('click', toggleTheme)
      cleanup.push(() => themeToggle.removeEventListener('click', toggleTheme))
    }
  })

  onBeforeUnmount(() => {
    cleanup.splice(0).forEach((dispose) => dispose())
  })
}
