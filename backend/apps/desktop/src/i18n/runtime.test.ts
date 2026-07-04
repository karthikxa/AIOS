import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { fieldCopyForSchemaKey } from '@/app/settings/field-copy'

import { TRANSLATIONS } from './catalog'
import { setRuntimeI18nLocale, translateNow } from './runtime'
import { zh } from './zh'

describe('desktop i18n runtime translator', () => {
  beforeEach(() => {
    setRuntimeI18nLocale('en')
  })

  afterEach(() => {
    setRuntimeI18nLocale('en')
  })

  it('translates string paths for the active runtime locale', () => {
    setRuntimeI18nLocale('zh')

    expect(translateNow('boot.ready')).toBe('Zed æ¡Œé¢ç‰ˆå·²å°±ç»ª')
    expect(translateNow('notifications.voice.noSpeechDetected')).toBe('æ²¡æœ‰æ£€æµ‹åˆ°è¯­éŸ³')
    expect(translateNow('composer.lookupNoMatches')).toBe('æ²¡æœ‰åŒ¹é…é¡¹ã€‚')
    expect(translateNow('assistant.tool.statusRecovered')).toBe('å·²æ¢å¤')
  })

  it('passes arguments to function translations', () => {
    expect(translateNow('notifications.updateReadyMessage', 2)).toBe('2 new changes available.')
  })

  it('translates migrated overlap keys for newly supported locales', () => {
    setRuntimeI18nLocale('ja')
    expect(translateNow('common.save')).toBe('ä¿å­˜')

    setRuntimeI18nLocale('zh-hant')
    expect(translateNow('cron.promptPlaceholder')).toBe('ä»£ç†æ¯æ¬¡åŸ·è¡Œæ™‚æ‡‰åšä»€éº¼ï¼Ÿ')
  })

  it('translates settings copy for newly supported locales', () => {
    setRuntimeI18nLocale('ja')
    expect(translateNow('settings.appearance.title')).toBe('å¤–è¦³')
    expect(translateNow('settings.nav.providers')).toBe('ãƒ—ãƒ­ãƒã‚¤ãƒ€ãƒ¼')

    setRuntimeI18nLocale('zh-hant')
    expect(translateNow('settings.appearance.title')).toBe('å¤–è§€')
    expect(translateNow('settings.nav.providerApiKeys')).toBe('API é‡‘é‘°')
  })

  it('keeps translated settings field copy addressable from schema keys', () => {
    const field = ['display', 'show_reasoning'].join('.')

    expect(fieldCopyForSchemaKey(zh.settings.fieldLabels, field)).toBe('æŽ¨ç†è¿‡ç¨‹å—')
    expect(fieldCopyForSchemaKey(zh.settings.fieldDescriptions, field)).toBe('å½“åŽç«¯æä¾›æŽ¨ç†å†…å®¹æ—¶äºˆä»¥æ˜¾ç¤ºã€‚')
  })

  it('falls back to English when the active locale cannot resolve a key', () => {
    const boot = TRANSLATIONS.ja.boot as { ready?: string }
    const originalReady = boot.ready

    try {
      boot.ready = undefined
      setRuntimeI18nLocale('ja')

      expect(translateNow('boot.ready')).toBe('Zed Desktop is ready')
    } finally {
      boot.ready = originalReady
    }
  })

  it('returns the key when no locale can resolve a path', () => {
    setRuntimeI18nLocale('zh')

    expect(translateNow('missing.path')).toBe('missing.path')
  })
})
