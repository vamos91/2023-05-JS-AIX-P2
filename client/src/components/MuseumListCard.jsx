import React from 'react'
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'
import styled from 'styled-components'
import {SiGooglemaps} from 'react-icons/si'
import {RiSmartphoneFill} from 'react-icons/ri'
import {BsGlobe} from 'react-icons/bs'

const Image = styled.img`
    max-width: 20vw;
    border-radius: 25px;
    margin: 20px; 
`;
const AdresseBox = styled.div`
    display: flex;
    padding-bottom: 10px;
`;
const Adresse = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    /* flex: 1;
    width: 100%; */
`;
const Box = styled.div`
    display: flex;
    padding-bottom:'10px';
    align-items: center;
`;
const Info = styled.div`
    display: flex;
    flex-direction: column; 
`;

function MuseumListCard({nomMusee, addresse, codePostal, ville, numeroTelphone, site}) {
  return (
    <Card
        style={{
            marginLeft:'10px',
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection:'row-reverse',
            width: '30rem',
           
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
                    <AdresseBox> 
                        <SiGooglemaps style={{marginRight:'3px'}} />  
                        <Adresse>
                            <li>{addresse}</li>
                            <li>{codePostal}</li>
                            <li>{ville}</li>
                        </Adresse>
                    </AdresseBox>
                    <Box><RiSmartphoneFill style={{marginRight:'3px'}}/>  {numeroTelphone}</Box>
                    <Box><BsGlobe style={{marginRight:'5px'}}/>  {site}</Box>
                </Info>
            </CardText>
        </CardBody>
  </Card>
  )
}

export default MuseumListCard