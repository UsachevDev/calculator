import React from "react";

export const Button = (props) => {
  return <button onClick={props.clickHandler}>{props.children}</button>;
};
