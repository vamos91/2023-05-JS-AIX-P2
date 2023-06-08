import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return (
    <SpinnerContainer className="spinner-container">
      <LoadingSpinner className="loading-spinner"/>
    </SpinnerContainer>
  );
};
export default Spinner;


/* LOADING SPINNER */
const SpinnerContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
`
const spinAnimation = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const LoadingSpinner = styled.div`
width: 30px;
height: 30px;
border: 10px solid #f3f3f3; /* Light grey */
border-top: 10px solid #12B5CB; /* Teal */
border-radius: 50%;
animation: ${spinAnimation} 1.5s linear infinite;
` 
  
  
