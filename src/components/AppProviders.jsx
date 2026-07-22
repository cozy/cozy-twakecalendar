import React from 'react'

import { BarProvider } from 'cozy-bar'
import { CozyProvider } from 'cozy-client'
import { DataProxyProvider } from 'cozy-dataproxy-lib'
import { WebviewIntentProvider } from 'cozy-intent'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import I18n from 'twake-i18n'

const AppProviders = ({ client, lang, polyglot, children }) => {
  return (
    <WebviewIntentProvider>
      <CozyProvider client={client}>
        <DataProxyProvider>
          <BarProvider>
            <I18n lang={lang} polyglot={polyglot}>
              <BreakpointsProvider>{children}</BreakpointsProvider>
            </I18n>
          </BarProvider>
        </DataProxyProvider>
      </CozyProvider>
    </WebviewIntentProvider>
  )
}

export default AppProviders
