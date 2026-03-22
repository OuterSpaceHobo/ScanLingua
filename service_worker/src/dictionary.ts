interface CharData {
  literal: string
  meanings: string[]
  readings: string[]
  level?: number
  frequency?: number
  grade?: number
  pinyin?: string
  traditional?: string
  simplified?: string
  romaja?: string
  pos?: string
}

interface RawJAEntry {
  literal: string
  readingMeaning?: {
    groups?: {
      meanings: { lang: string; value: string }[]
      readings: { type: string; value: string }[]
    }[]
  }
  misc?: { jlptLevel?: number; frequency?: number; grade?: number }
}

interface RawZHEntry {
  term: string
  meanings: string[]
  pinyin: string
  traditional: string
  simplified: string
}

interface RawKOEntry {
  term: string
  meanings: string[]
  readings?: string[]
  romaja: string
  pos?: string
}

const DICT_FILES: Record<string, string> = {
  ja: 'kanjidic2-all-3.5.0.json',
  zh: 'cedict.json',
  ko: 'kedict.json',
}

const cache: Record<string, Map<string, CharData>> = {}

function transformJA(entries: RawJAEntry[]): Map<string, CharData> {
  const map = new Map<string, CharData>()
  for (const entry of entries) {
    const groups = entry.readingMeaning?.groups?.[0]
    if (!groups) continue
    const meanings = groups.meanings
      .filter((m) => m.lang === 'en')
      .map((m) => m.value)
    const readings = groups.readings
      .filter((r) => r.type === 'ja_on' || r.type === 'ja_kun')
      .map((r) => r.value)
    map.set(entry.literal, {
      literal: entry.literal,
      meanings,
      readings,
      level: entry.misc?.jlptLevel,
      frequency: entry.misc?.frequency,
      grade: entry.misc?.grade,
    })
  }
  return map
}

function transformZH(entries: RawZHEntry[]): Map<string, CharData> {
  const map = new Map<string, CharData>()
  for (const entry of entries) {
    if (entry.term.length !== 1) continue
    map.set(entry.term, {
      literal: entry.term,
      meanings: entry.meanings,
      readings: [entry.pinyin],
      pinyin: entry.pinyin,
      traditional: entry.traditional !== entry.term ? entry.traditional : undefined,
      simplified: entry.simplified,
    })
  }
  return map
}

function transformKO(entries: RawKOEntry[]): Map<string, CharData> {
  const map = new Map<string, CharData>()
  for (const entry of entries) {
    if (entry.term.length !== 1) continue
    map.set(entry.term, {
      literal: entry.term,
      meanings: entry.meanings,
      readings: entry.readings || [entry.romaja],
      romaja: entry.romaja,
      pos: entry.pos,
    })
  }
  return map
}

async function loadDictionary(lang: string): Promise<Map<string, CharData>> {
  if (cache[lang]) return cache[lang]

  const file = DICT_FILES[lang]
  if (!file) return new Map()

  const url = chrome.runtime.getURL(`resources/dictionaries/${file}`)
  const response = await fetch(url)
  const data = await response.json()

  let map: Map<string, CharData>
  if (lang === 'ja') {
    map = transformJA(data.KanjiDic_characters)
  } else if (lang === 'zh') {
    map = transformZH(data)
  } else {
    map = transformKO(data)
  }

  cache[lang] = map
  return map
}

export async function lookupChars(text: string, lang: string): Promise<CharData[]> {
  const dict = await loadDictionary(lang)
  const seen = new Set<string>()
  const results: CharData[] = []

  for (const char of text) {
    if (seen.has(char)) continue
    seen.add(char)
    const entry = dict.get(char)
    if (entry) results.push(entry)
  }

  return results
}

export type { CharData }
export { cache }
