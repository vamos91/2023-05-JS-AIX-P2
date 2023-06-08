import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const RangeBar = ({ perimeter, setPerimeter }) => {
  return (
    <Form>
      <FormGroup
        style={{
          borderRadius: '20px',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          padding: '0 5px'
        }}
      >
        <Input
          id="exampleRange"
          name="range"
          type="range"
          value={perimeter/1000}
          min={1}
          max={20}
          onChange={(e) => setPerimeter(e.target.value*1000)}
        />
        <Label for="exampleRange">{perimeter/1000} km</Label>
      </FormGroup>
    </Form>
  );
};

export default RangeBar;
