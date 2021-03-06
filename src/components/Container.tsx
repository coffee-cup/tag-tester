import styled from "@emotion/styled";
import css from "@styled-system/css";

const Container = styled.div<{ large?: boolean }>(props =>
  css({
    maxWidth: props.large ? "largeContainer" : "container",
    mx: "auto",
    px: [3, 4],

    transition: "max-width 50ms ease-out",
  }),
);

export default Container;
