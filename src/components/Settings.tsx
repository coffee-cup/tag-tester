import * as React from "react";
import styled from "@emotion/styled";
import css from "@styled-system/css";
import { useOG } from "../context";
import { FilterType } from "../tags";
import { Checkbox, Label } from "theme-ui";

const StyledSettings = styled.div(css({}));

const Group = styled.div(
  css({
    my: 3,
  }),
);

const StyledFilters = styled.div(
  css({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 2,
    maxWidth: "measure",
  }),
);

const FilterButton = styled.button<{ selected?: boolean }>(props =>
  css({
    appearance: "none",
    py: 1,
    px: 2,
    fontSize: 0,
    color: props.selected ? "primary" : "grey.400",
    fontWeight: "bold",
    border: "none",
    borderRadius: "2px",
    bg: "",
    cursor: "pointer",
    transition: "color 150ms ease-in-out",

    "&:hover": {
      color: props.selected ? "primary" : "grey.500",
    },
  }),
);

const Filters = () => {
  const { settings, updateSettings } = useOG();

  const toggleFilter = (filter: FilterType) => {
    if (settings.filters.includes(filter)) {
      if (settings.filters.length !== 1) {
        // remove filter from list of filters
        updateSettings({
          ...settings,
          filters: settings.filters.filter(f => f !== filter),
        });
      }
    } else {
      // add the filter
      updateSettings({
        ...settings,
        filters: [...settings.filters, filter],
      });
    }
  };

  return (
    <StyledFilters>
      <FilterButton
        selected={settings.filters.includes(FilterType.Html)}
        onClick={() => toggleFilter(FilterType.Html)}
      >
        HTML
      </FilterButton>

      <FilterButton
        selected={settings.filters.includes(FilterType.OpenGraph)}
        onClick={() => toggleFilter(FilterType.OpenGraph)}
      >
        Open Graph
      </FilterButton>
      <FilterButton
        selected={settings.filters.includes(FilterType.Twitter)}
        onClick={() => toggleFilter(FilterType.Twitter)}
      >
        Twitter
      </FilterButton>
    </StyledFilters>
  );
};

const Settings: React.FC = () => {
  const { settings, updateSettings } = useOG();

  const toggleShowRecommended = () => {
    updateSettings({
      ...settings,
      onlyShowRecommended: !settings.onlyShowRecommended,
    });
  };

  return (
    <StyledSettings>
      <Group>
        <Label>
          <Checkbox
            checked={settings.onlyShowRecommended}
            onChange={toggleShowRecommended}
          />
          Only show recommended tags
        </Label>
      </Group>

      <Group>
        <Filters />
      </Group>
    </StyledSettings>
  );
};

export default Settings;
