/* eslint-disable import/order */
import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'cozy-ui-plus/dist/stylesheet.css'
import 'cozy-bar/dist/stylesheet.css'

import '@/styles/index.styl'
import React from 'react'
import AppProviders from '@/components/AppProviders'
import setupApp from '@/targets/browser/setupApp'
import AppRouter from '@/components/AppRouter'

// We need to force light mode because Twake Calendar embedded app
// does not support dark mode
localStorage.setItem('ui-theme-type', 'light')

const init = () => {
  const { root, client, lang, polyglot } = setupApp()

  root.render(
    <AppProviders client={client} lang={lang} polyglot={polyglot}>
      <AppRouter />
    </AppProviders>
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
