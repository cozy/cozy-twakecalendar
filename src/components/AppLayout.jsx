import React from 'react'
import { Outlet } from 'react-router-dom'

import { BarComponent } from 'cozy-bar'

import Calendar from './Icons/Calendar'
import CalendarText from './Icons/CalendarText'

const AppLayout = () => {
  return (
    <>
      <BarComponent
        searchOptions={{ enabled: false }}
        appIcon={Calendar}
        appTextIcon={CalendarText}
      />
      <Outlet />
    </>
  )
}

export default AppLayout
