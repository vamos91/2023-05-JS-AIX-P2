import { SiGooglemaps } from "react-icons/si";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import { useState } from "react";

const PopUp = ({ records }) => {
  const [isFavorite, setIsFavorite] = useState(false); // get state from localstorage

  const openMaxiCard = (id) => {
    console.log("maxiCard " + id);
  };
  // add / remove favorites to localstorage
  const handleFavorites = (id) => {
    console.log(isFavorite);
    setIsFavorite(!isFavorite);
  };
  return (
    <PopupWrapper className="map-popup">
      <PopupImage
        onClick={() => openMaxiCard(records.id)}
        alt="Sample"
        src="https://picsum.photos/300/200"
      />
      <PopupInfoSection className="popup-description">
        <PopupTitleSection>
          <PopupTitle>{records.name}</PopupTitle>
          <PopupFavorite
            onClick={() => {
              handleFavorites(records.id);
            }}
          >
            {isFavorite ? (
              <FaHeart
                style={{
                  margin: "2px 0px 0px 6px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "58553F",
                }}
              />
            ) : (
              <FaRegHeart
                style={{
                  margin: "2px 0px 0px 6px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "58553F",
                }}
              />
            )}
          </PopupFavorite>
        </PopupTitleSection>
        <AddressBox>
          <SiGooglemaps style={{ margin: "4px 4px 0px 0px" }} />
          <Address>
            <li>{records.place}</li>
            <li>{records.address}</li>
            <li>
              {records.cp} {records.city}
            </li>
          </Address>
        </AddressBox>
      </PopupInfoSection>
    </PopupWrapper>
  );
};
export default PopUp;

const PopupWrapper = styled.div`
`;
const PopupInfoSection = styled.div`
  padding: 0px 10px 10px 10px;
`;
const PopupTitle = styled.h3`
  padding: 0;
  margin: 0;
`;
const Address = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const AddressBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`;
const PopupTitleSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
`;
const PopupFavorite = styled.div`
  width: 30px;
  cursor: pointer;
`;
const PopupImage = styled.img`
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  cursor: pointer;
`;
