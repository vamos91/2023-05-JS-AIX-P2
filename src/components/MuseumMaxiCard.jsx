import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import auvergne from '../images/logo-auvergne-rhone-alpes.png'
import bourgogne from '../images/logo-bourgogne-franche-comte.png'
import bretagne from '../images/logo-bretagne.png'
import valoire from '../images/logo-centre-val-de-loire.png'
import corse from '../images/logo-corse.png'
import est from '../images/logo-grand-est.png'
import hauts from '../images/logo-hauts-de-france.png'
import normandie from '../images/logo-normandie.png'
import aquitaine from '../images/logo-nouvelle-aquitaine.png'
import occitanie from '../images/logo-occitanie.png'
import loire from '../images/logo-pays-de-la-loire.png'
import paca from '../images/logo-provence-alpes-cote-d-azur.png'
import paris from '../images/logo-ile-de-france.png'
import autre from '../images/logo-autre.jpg'


const Container = styled.div`
    background-color: #FFF;
    border-radius: 15px;
    /* border: solid #999 1px; */
    width: 400px;
    /* height: 250px; */
    margin: 30px;
    padding: 10px;
    box-shadow: rgba(35, 107, 137, 0.2) 0px 7px 29px 0px;
    /* overflow: hidden; */
`

const ImageContainer = styled.img`
    width: 100%;
    object-fit: contain;
`;

// const id = "M5002"

// const endpoint = "?dataset=musees-de-france-base-museofile&facet=dompal&facet=region"
// const endpoint = "?dataset=musees-de-france-base-museofile&q=ref="+id

// const imgPlaceHolder = './images/logo-autre.jpg' 
// const imgPlaceHolder = "https://www.pop.culture.gouv.fr/notice/museo/"+id

const logoOfRegions = {
    'Auvergne-Rhône-Alpes': auvergne,
    'Bourgogne-Franche-Comté': bourgogne,
    'Bretagne': bretagne,
    'Centre-Val de Loire': valoire,
    'Corse': corse,
    'Grand Est': est,
    'Hauts-de-France': hauts,
    'Normandie': normandie,
    'Nouvelle-Aquitaine': aquitaine,
    'Occitanie': occitanie,
    'Pays-de-la-Loire': loire,
    "Provence-Alpes-Côte d'Azur": paca,
    'Île-de-France': paris,
    'Autre': autre
}

const listOfRegions = [
    'Auvergne-Rhône-Alpes',
    'Bourgogne-Franche-Comté',
    'Bretagne',
    'Centre-Val de Loire',
    'Corse',
    'Grand Est',
    'Hauts-de-France',
    'Normandie',
    'Nouvelle-Aquitaine',
    'Occitanie',
    'Pays-de-la-Loire',
    "Provence-Alpes-Côte d'Azur",
    'Île-de-France'
]

const MuseumMaxiCard = ({id}) => {
    const [museum, setMuseum] = useState({})

    const url = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=musees-de-france-base-museofile&q=ref="+id

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setMuseum(data.records[0].fields)
        })
        .catch(err => console.error(err))
    }, [])

    console.log(museum);
    
    return (
        <Container className='container'>
            <img
                alt={museum.region}
                src={listOfRegions.includes(museum.region) ? `${logoOfRegions[museum.region]}` : `${logoOfRegions['Autre']}`}
                width="100%"
            />
            <h3>{museum.nomoff}</h3>
            <p>{museum.interet}</p>
            <p>{museum.hist}</p>
            <ul>
                
                    {museum.lieu_m ? (
                        <React.Fragment>
                            {museum.lieu_m} <br />
                            {museum.adrl1_m} <br />
                        </React.Fragment>
                    ) : 
                    <React.Fragment>
                            {museum.adrl1_m} <br />
                        </React.Fragment>
                        }
                    {museum.cp_m} {museum.ville_m}<br/>
                
                {museum.tel_m}<br/>
                <a href={`http://${museum.url_m}`} target="_blank" >{museum.url_m}</a>
            </ul>
        </Container>
    )
}

export default MuseumMaxiCard

// const [post, setPost] = useState({})

//   const {id} = useParams()

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//       .then(response => response.json())
//       .then(json => {
//         console.log("useEffect Post: ", json)
//         setPost(json)})
//   }, []);

//   console.log("id: ",id)
//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <div>{post.body}</div>
//       <Link to={"/"} >Retour</Link>
//     </div>
//   )