import { createRoot } from 'react-dom/client'
import { initTranslation } from 'twake-i18n'

import CozyClient from 'cozy-client'
import flag from 'cozy-flags'
import { RealtimePlugin } from 'cozy-realtime'

import manifest from '../../../manifest.webapp'

import schema from '@/doctypes'

/**
 * Make and returns cozy client instance
 * @param {HTMLElement} container - application container
 * @returns {import('cozy-client/types/CozyClient').default} cozy client instance
 */
const makeClient = container => {
  const data = JSON.parse(container.dataset.cozy)
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.domain}`

  const client = new CozyClient({
    uri: cozyUrl,
    token: data.token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    store: true,
    autoHydrate: true
  })

  return client
}

const getDataOrDefault = (data, defaultData) =>
  /^\{\{\..*\}\}$/.test(data) ? defaultData : data

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = () => {
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)
  const client = makeClient(container)
  const locale = JSON.parse(container.dataset.cozy)?.locale
  const lang = getDataOrDefault(locale, 'en')
  const polyglot = initTranslation(lang, lang => require(`@/locales/${lang}`))
  client.registerPlugin(flag.plugin)
  client.registerPlugin(RealtimePlugin)

  return { root, client, lang, polyglot }
}

export default setupApp
