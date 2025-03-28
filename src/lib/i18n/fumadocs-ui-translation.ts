import { Translations } from 'fumadocs-ui/i18n'
import { type Locale } from 'next-intl'

const zh: Partial<Translations> = {
  search: '搜索',
  searchNoResult: '没有找到结果',
  toc: '目录',
  tocNoHeadings: '没有找到目录',
  lastUpdate: '最后更新',
  chooseLanguage: '选择语言',
  nextPage: '下一页',
  previousPage: '上一页',
  chooseTheme: '选择主题',
  editOnGithub: '在 GitHub 上编辑',
}

// 根据 routing.locales 生成文档框架内容的对应翻译
export const fumadocsUiTranslations: Partial<Record<Locale, Partial<Translations>>> = {
  zh,
}
