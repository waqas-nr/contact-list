/*
  Side Bar Component
*/

import React from 'react';

// Import Component
import Filters from '../Filters';

type SideBarProps = {
  totalContacts: number,
  submitFilter: (query: string) => void,
}

const SideBar = ({ totalContacts, submitFilter }: SideBarProps) => {
  return (
    <div id="sidebar-wrapper">
      <h3 className="bolder-font mb-4">Audience
        <span>{totalContacts} Contacts</span>
      </h3>
      <Filters
        submitFilter={submitFilter}
      />
    </div>
  )
}

export default SideBar;