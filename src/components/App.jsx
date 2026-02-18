import React from 'react'

import { useExternalBridge } from 'cozy-external-bridge-container'
import flag from 'cozy-flags'

const App = () => {
  const embeddedAppRootUrl = flag('calendar.embedded-app-url')

  const { isReady, urlToLoad } = useExternalBridge(embeddedAppRootUrl)

  // We can not return null if bridge is not ready because to setup
  // the bridge we need iframe HTML element
  return (
    <iframe
      id="embeddedApp"
      src={isReady ? urlToLoad : null}
      allow="clipboard-read; clipboard-write"
    ></iframe>
  )
}

export default App
