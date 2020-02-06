import styled from "@emotion/styled";
import css from "@styled-system/css";

export interface Props {
  large?: boolean;
  error?: boolean;
}

const Input = styled.input<Props>(props =>
  css({
    appearance: "none",
    width: props.large ? "100%" : "auto",
    px: 3,
    py: 3,
    fontSize: 2,
    border: "solid 1px",
    borderRadius: "2px",

    transition: "border-color 250ms ease-in-out",

    borderColor: props.error ? "error" : "transparent",
  }),
);

export default Input;
