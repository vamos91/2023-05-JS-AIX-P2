import React, { useState } from 'react'
import MuseumListCard from './components/MuseumListCard'
import { Button } from 'reactstrap'

function App() {
  const [musee, setMusee] = useState()
  const fetchMusee = async () => {
    const  returnFetch = await  fetch('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=&rows=1')
    const fetchjson = await returnFetch.json()
    setMusee(fetchjson.records[0])
   
  }
  return (
    <div>
      {musee && <MuseumListCard nomMusee = {musee.fields.autnom} addresse = {musee.fields.adrl1_m} codePostal = {musee.fields.cp_m} ville = {musee.fields.ville_m  } numeroTelphone = {musee.fields.tel_m} site = {musee.fields.url_m} />}
      <Button onClick={fetchMusee}>salut</Button>
    </div>
    
  )
}

export default App