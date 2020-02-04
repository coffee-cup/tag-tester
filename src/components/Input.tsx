import styled from "@emotion/styled";
import css from "@styled-system/css";

const Input = styled.input<{ large?: boolean }>(props =>
  css({
    appearance: "none",
    width: props.large ? "100%" : "auto",
    m: 1,
    px: 3,
    py: 2,
    fontSize: 2,
    border: "solid 1px grey",
    borderRadius: "2px",
  }),
);

export default Input;
