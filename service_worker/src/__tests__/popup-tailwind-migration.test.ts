import { describe, test, expect } from 'vitest'
import { resolve } from 'path'
import { readFileSync, existsSync } from 'fs'
import { readdirSync } from 'fs'

const srcDir = resolve(__dirname, '..')

function readSrc(filename: string) {
  return readFileSync(resolve(srcDir, filename), 'utf-8')
}

describe('Popup Tailwind migration (7.2)', () => {
  const popupFiles = ['App.tsx', 'Home.tsx', 'Anki.tsx', 'About.tsx', 'Support.tsx',
    'Notification.tsx', 'LanguageSelector.tsx', 'HotkeyInput.tsx', 'Contacts.tsx',
    'main.tsx', 'support-main.tsx']

  test('no @chakra-ui imports in popup files', () => {
    for (const file of popupFiles) {
      const src = readSrc(file)
      expect(src, `${file} still imports @chakra-ui`).not.toMatch(/@chakra-ui/)
    }
  })

  test('no styled-components imports in popup files', () => {
    for (const file of popupFiles) {
      const src = readSrc(file)
      expect(src, `${file} still imports styled-components`).not.toMatch(/styled-components/)
    }
  })

  test('no react-icons imports in popup files', () => {
    for (const file of popupFiles) {
      const src = readSrc(file)
      expect(src, `${file} still imports react-icons`).not.toMatch(/react-icons/)
    }
  })

  test('no Container.tsx imports in popup files', () => {
    for (const file of popupFiles) {
      const src = readSrc(file)
      expect(src, `${file} still imports from Container`).not.toMatch(/from ['"]\.\/Container['"]/)
    }
  })

  test('no extendTheme imports in popup files', () => {
    for (const file of popupFiles) {
      const src = readSrc(file)
      expect(src, `${file} still imports extendTheme`).not.toMatch(/from ['"]\.\/extendTheme['"]/)
    }
  })

  test('Container.tsx is deleted', () => {
    expect(existsSync(resolve(srcDir, 'Container.tsx'))).toBe(false)
  })

  test('extendTheme.ts is deleted', () => {
    expect(existsSync(resolve(srcDir, 'extendTheme.ts'))).toBe(false)
  })

  test('tailwind.css has theme tokens', () => {
    const css = readSrc('tailwind.css')
    expect(css).toContain('--color-primary')
    expect(css).toContain('--color-surface')
    expect(css).toContain('--color-border')
    expect(css).toContain('--font-family-sans')
    expect(css).toContain('--animate-fade-in')
  })

  test('App.tsx uses Headless UI Tabs', () => {
    const src = readSrc('App.tsx')
    expect(src).toMatch(/@headlessui\/react/)
    expect(src).toContain('TabGroup')
    expect(src).toContain('TabList')
    expect(src).toContain('TabPanels')
  })

  test('LanguageSelector.tsx uses Headless UI RadioGroup and Listbox', () => {
    const src = readSrc('LanguageSelector.tsx')
    expect(src).toMatch(/@headlessui\/react/)
    expect(src).toContain('RadioGroup')
    expect(src).toContain('Listbox')
    expect(src).toContain('ListboxButton')
    expect(src).toContain('ListboxOptions')
  })

  test('Contacts.tsx uses @heroicons/react', () => {
    const src = readSrc('Contacts.tsx')
    expect(src).toMatch(/@heroicons\/react/)
    expect(src).toContain('EnvelopeIcon')
  })

  test('TabPanel has p-4 padding on all sides except bottom', () => {
    const src = readSrc('App.tsx')
    const panels = src.match(/TabPanel className="[^"]*"/g) || []
    expect(panels.length).toBeGreaterThanOrEqual(4)
    for (const panel of panels) {
      expect(panel).toContain('p-4')
      expect(panel).toContain('pb-0')
    }
  })

  test('Tab has text-base (16px) and px-4 sizing', () => {
    const src = readSrc('App.tsx')
    expect(src).toMatch(/Tab[\s\S]*?className="[^"]*text-base[^"]*"/)
    expect(src).toMatch(/Tab[\s\S]*?className="[^"]*px-4[^"]*"/)
  })

  test('link hover color is teal, not purple', () => {
    const css = readSrc('tailwind.css')
    expect(css).toContain('--color-link-hover: #2C7A7B')
    expect(css).not.toContain('darkviolet')
  })

  test('font smoothing is enabled', () => {
    const css = readSrc('tailwind.css')
    expect(css).toContain('-webkit-font-smoothing: antialiased')
    expect(css).toContain('-moz-osx-font-smoothing: grayscale')
  })

  test('dropdowns use anchor prop for fixed positioning', () => {
    const src = readSrc('LanguageSelector.tsx')
    expect(src).toContain('anchor={{ to: "bottom start"')
    expect(src).toContain('anchor={{ to: "top start"')
  })

  test('dropdowns have max-h-40 (not max-h-60)', () => {
    const src = readSrc('LanguageSelector.tsx')
    const options = src.match(/ListboxOptions[^>]*className="[^"]*"/g) || []
    expect(options.length).toBe(3)
    for (const opt of options) {
      expect(opt).toContain('max-h-40')
    }
  })

  test('ListboxButton has outline-none (no blue focus ring)', () => {
    const src = readSrc('LanguageSelector.tsx')
    const buttons = src.match(/ListboxButton className="[^"]*"/g) || []
    expect(buttons.length).toBe(3)
    for (const btn of buttons) {
      expect(btn).toContain('outline-none')
    }
  })

  // Flow log: verify visual regression fixes
  test('flow: visual regression fixes audit', () => {
    const log: string[] = []
    const app = readSrc('App.tsx')
    const css = readSrc('tailwind.css')
    const ls = readSrc('LanguageSelector.tsx')

    log.push(`TabPanel padding: ${(app.match(/TabPanel className="p-4 pb-0"/g) || []).length}/4 panels have p-4 pb-0`)
    log.push(`Tab font size: ${app.includes('text-base') ? 'text-base (16px)' : 'MISSING'}`)
    log.push(`Hover color: ${css.includes('#2C7A7B') ? 'teal (#2C7A7B)' : 'WRONG'}`)
    log.push(`Font smoothing: ${css.includes('antialiased') ? 'enabled' : 'MISSING'}`)
    log.push(`Translate dropdown anchor: ${ls.includes('"bottom start"') ? 'bottom start + padding' : 'MISSING'}`)
    log.push(`Anki dropdown anchor: ${ls.includes('"top start"') ? 'top start + padding' : 'MISSING'}`)
    log.push(`Dropdown height: ${ls.includes('max-h-40') && !ls.includes('max-h-60') ? 'max-h-40' : 'WRONG'}`)
    log.push(`Focus outline: ${(ls.match(/ListboxButton className="[^"]*outline-none/g) || []).length}/2 buttons have outline-none`)
    console.log('[flow-log:visual-regression-fixes]\n' + log.join('\n'))
  })

  // Flow log: verify all popup .tsx files use className (Tailwind) not styled()
  test('flow: all popup tsx files use className-based styling', () => {
    const tsxFiles = readdirSync(srcDir).filter(f => f.endsWith('.tsx') && popupFiles.includes(f))
    const log: string[] = []
    for (const file of tsxFiles) {
      const src = readSrc(file)
      const hasClassName = src.includes('className=')
      const hasStyled = src.includes('styled(') || src.includes('styled.')
      log.push(`${file}: className=${hasClassName}, styled=${hasStyled}`)
      if (file !== 'main.tsx' && file !== 'support-main.tsx') {
        expect(hasStyled, `${file} still uses styled-components`).toBe(false)
      }
    }
    console.log('[flow-log:7.2] popup styling audit:\n' + log.join('\n'))
  })
})
