import React, { useState } from 'react'
import MuseumListCard from './components/MuseumListCard'
import { Button } from 'reactstrap'
import SideBarMuseums from './components/SideBarMuseums'

function App() {
  const [musees, setMusees] = useState()
  const fetchMusee = async () => {
    const  returnFetch = await  fetch('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=&rows=10')
    const fetchjson = await returnFetch.json()
    setMusees(fetchjson.records)
    console.log(fetchjson.records)
  }
  return (
    <div>
      {musees && <SideBarMuseums musees = {musees} />}
      <Button style={{position: 'fixed', left: '700px'}} onClick={fetchMusee}>salut</Button>
    </div>
    
  )
}

export default App