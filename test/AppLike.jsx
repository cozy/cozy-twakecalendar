import React from 'react'
import { HashRouter } from 'react-router-dom'
import I18n from 'twake-i18n'

import { CozyProvider, createMockClient } from 'cozy-client'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'

import enLocale from '../src/locales/en.json'

const AppLike = ({ children, client }) => (
  <CozyProvider client={client || createMockClient({})}>
    <I18n dictRequire={() => enLocale} lang="en">
      <BreakpointsProvider>
        <HashRouter>
          <AlertProvider>{children}</AlertProvider>
        </HashRouter>
      </BreakpointsProvider>
    </I18n>
  </CozyProvider>
)

export default AppLike
