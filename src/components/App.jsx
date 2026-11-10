import React, { useEffect } from 'react'

import { isFlagshipApp } from 'cozy-device-helper'
import { useExternalBridge } from 'cozy-external-bridge-container'
import flag from 'cozy-flags'

const App = () => {
  const embeddedAppRootUrl = flag('calendar.embedded-app-url')

  const { isReady, urlToLoad } = useExternalBridge(embeddedAppRootUrl)

  // Calendar is now opened at its client URL as a standalone app: old links
  // and bookmarks to this container app are redirected there, deep link included.
  // Not in the flagship app: it opens the client URL in its in-app browser and
  // keeps this container on screen, so the iframe must stay
  const shouldRedirect =
    !isFlagshipApp() &&
    flag('apps.enable-standalone-apps') === true &&
    /^https?:\/\//.test(urlToLoad ?? '')

  useEffect(() => {
    if (shouldRedirect) window.location.replace(urlToLoad)
  }, [shouldRedirect, urlToLoad])

  // We can not return null if bridge is not ready because to setup
  // the bridge we need iframe HTML element
  return (
    <iframe
      id="embeddedApp"
      src={isReady && !shouldRedirect ? urlToLoad : null}
      allow="clipboard-read; clipboard-write"
    ></iframe>
  )
}

export default App
