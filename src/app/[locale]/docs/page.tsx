import { useLocale } from 'next-intl'

export default function Docs() {
  const locale = useLocale()

  return <div>Docs {locale}</div>
}
