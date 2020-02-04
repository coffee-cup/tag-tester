import styled from "@emotion/styled";
import css from "@styled-system/css";

const Button = styled.button<{ primary?: boolean }>(props =>
  css({
    appearance: "none",
    color: props.primary ? "white" : "text",
    backgroundColor: props.primary ? "primary" : "muted",
    minWidth: props.primary ? "10rem" : "auto",
    m: 1,
    px: 3,
    py: 2,
    fontSize: 2,
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",

    transition: "background-color 250ms ease-in-out",

    "&:hover": {
      backgroundColor: "black",
    },
  }),
);

export default Button;
