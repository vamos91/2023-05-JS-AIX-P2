import React, { useState } from 'react'
// import { Button } from 'reactstrap'
import SideBarMuseums from './components/SideBarMuseums'
import SearchBar from './components/SearchBar'

function App() {
  const [musees, setMusees] = useState()
  
  return (
    <div>
      <SearchBar musees={musees} setMusees={setMusees}/>
      {musees && <SideBarMuseums musees = {musees} />}
      {/* <Button style={{position: 'fixed', left: '700px'}} onClick={fetchMusee}>salut</Button> */}
    </div>
    
  )
}

export default App