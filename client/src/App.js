import React, { useState } from 'react'
import MuseumListCard from './components/MuseumListCard'
import { Button } from 'reactstrap'
import SideBarMuseums from './components/SideBarMuseums'

function App() {
  const [musee, setMusee] = useState()
  const fetchMusee = async () => {
    const  returnFetch = await  fetch('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=&rows=1')
    const fetchjson = await returnFetch.json()
    setMusee(fetchjson.records[0])
   
  }
  return (
    <div>
      {musee && <SideBarMuseums musee = {musee} />}
      <Button onClick={fetchMusee}>salut</Button>
    </div>
    
  )
}

export default App