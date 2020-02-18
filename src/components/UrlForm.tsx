import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import Button from "./Button";
import Input from "./Input";
import { useOG } from "../context";

const StyledUrlForm = styled.form(
  css({
    display: "flex",
    flexWrap: "wrap",

    input: {
      flexGrow: 1,
      borderTopRightRadius: ["2px", 0],
      borderBottomRightRadius: ["2px", 0],
      borderRight: 0,
    },

    button: {
      borderTopLeftRadius: ["2px", 0],
      borderBottomLeftRadius: ["2px", 0],
      width: ["100%", "auto"],
      mt: [2, 0],
    },
  }),
);

const UrlForm = () => {
  const { url, isUrlError, fetchTags, setUrl } = useOG();

  return (
    <StyledUrlForm
      onSubmit={e => {
        e.preventDefault();
        fetchTags();
      }}
    >
      <Input
        name="url"
        value={url}
        placeholder="URL you want to test"
        onChange={e => setUrl(e.target.value)}
        error={isUrlError}
      />
      <Button primary>Go</Button>
    </StyledUrlForm>
  );
};

export default UrlForm;
