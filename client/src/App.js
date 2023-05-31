import React, { useState } from 'react'
import SideBarMuseums from './components/SideBarMuseums'
import SearchBar from './components/SearchBar'

function App() {
  const [musees, setMusees] = useState()
  
  return (
    <div>
      <SearchBar musees={musees} setMusees={setMusees}/>
      {musees && <SideBarMuseums musees = {musees} />}
    </div>
  )
}

export default App