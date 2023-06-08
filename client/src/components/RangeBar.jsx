import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 5px;
  border-radius: 20px;
`;

const Input = styled.input`
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 4px;
    cursor: pointer;
    background: #58553F;
    border-radius: 5px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 10px;
    margin-top: -5px;
    background: #58553F;
  }
`;

const RangeBar = ({ perimeter, setPerimeter }) => {
  return (
    <Container>
      <Input
        id="exampleRange"
        name="range"
        type="range"
        value={perimeter/1000}
        min={1}
        max={20}
        onChange={(e) => setPerimeter(e.target.value*1000)}
      />
      <label for="exampleRange">{perimeter/1000} km</label>
    </Container>
  );
};

export default RangeBar;
