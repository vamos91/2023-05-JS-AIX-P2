import React from "react";
import styled from "styled-components";
import { SiGooglemaps } from "react-icons/si";
import { RiSmartphoneFill } from "react-icons/ri";
import { BsGlobe } from "react-icons/bs";

const Image = styled.img`
  max-height: 128px;
  border-radius: 25px;
  margin-top: 20px;
`;
const AdresseBox = styled.div`
  display: flex;
  padding-bottom: 10px;
`;
const Adresse = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const Box = styled.div`
  display: flex;
  padding-bottom: "10px";
  align-items: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
  width: 30rem;
  border-bottom: 1px solid lightGrey;
  padding-bottom: 5px;
  z-index: 1000;
`;

const CardBody = styled.div`
  width: 100%;
`;

const CardTitle = styled.h3`
`;

function MuseumListCard({
  nomMusee,
  addresse,
  codePostal,
  ville,
  numeroTelphone,
  site,
}) {
  return (
    <Card>
      <Image alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody >
        <CardTitle >
          {nomMusee.charAt(0).toUpperCase() + nomMusee.slice(1)}
        </CardTitle>
        <Info>
          <AdresseBox>
            <SiGooglemaps style={{ marginRight: "3px", color: '#90a955'  }} />
            {/* 4f772d */}
            <Adresse>
              <li>{addresse}</li>
              <li>{codePostal}</li>
              <li>{ville}</li>
            </Adresse>
          </AdresseBox>
          <Box>
            <RiSmartphoneFill style={{ marginRight: "3px", color: '#90a955'  }} />
            {numeroTelphone}
          </Box>
          <Box>
           <BsGlobe style={{ marginRight: "5px", color: '#90a955' }} />
            {site && (
            <a
              href={"https://" + site}
              target="_blank"
              style={{ color: "#90a955" }}
            >
              {site.split("/")[0]}
            </a>
             )}
          </Box>
        </Info>
      </CardBody>
    </Card>
  );
}

export default MuseumListCard;
