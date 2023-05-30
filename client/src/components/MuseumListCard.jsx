import React from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'
import styled from 'styled-components'
import {SiGooglemaps} from 'react-icons/si'
import {RiSmartphoneFill} from 'react-icons/ri'
import {BsGlobe} from 'react-icons/bs'

const Image = styled.img`
    max-width: 10vw;
    border-radius: 25px;
    margin: 20px; 
`;
const Adresse = styled.ul`
    list-style-type: none;
    padding: 0;
`;
const Info = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
function MuseumListCard({nomMusee, addresse, codePostal, ville, numeroTelphone, site}) {
  return (
    <Card
        style={{
            marginLeft:'10px',
            display: 'flex',
            alignItems: 'center',
            flexDirection:'row-reverse',
            width: '30rem'
        }}>
        <Image
        alt="Sample"
        src="https://picsum.photos/300/200"
        />
        <CardBody>
        <CardTitle tag="h3">
            {nomMusee}
        </CardTitle>
        <CardText>
            <Info>
            <Adresse>
            <li><SiGooglemaps style={{margin:'0 3px 0 0'}}/> {addresse}</li>
            <li style={{
                padding: '0 0 0 20px'
            }}>{codePostal}</li>
            <li style={{
                padding: '0 0 0 20px'
            }}>{ville}</li>
        </Adresse> 
          <p style={{margin:'0'}}><RiSmartphoneFill/> {numeroTelphone}</p>  
        <br/>
            <p style={{margin:'0'}}><BsGlobe/> {site}</p>
            </Info>
       
        </CardText>
        
        </CardBody>
  </Card>
  )
}

export default MuseumListCard