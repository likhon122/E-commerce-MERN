"use client";
import { Alert } from "keep-react";
import { useState } from "react";

export const AlertComponent = ({ color, message }) => {
  const [hidden, setHidden] = useState(false);
  return (
    <Alert color={color} className={`${hidden ? "hidden" : ""}`}>
      <Alert.Container>
        <Alert.Icon />
        <Alert.Title></Alert.Title>
        <h1>{message}</h1>
      </Alert.Container>
      {/* <Alert.Link>Learn More</Alert.Link> */}
      <Alert.Dismiss
        onClick={() => {
          setHidden(true);
        }}
      />
    </Alert>
  );
};
