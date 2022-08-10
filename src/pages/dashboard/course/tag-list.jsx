import { Breadcrumbs, Chip, emphasize, styled } from "@mui/material";
import React from "react";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const TagList = ({tags}) => {
  return tags?.length > 0 
    ? <Breadcrumbs aria-label="breadcrumb" separator="" >
    {
      tags.map((tag, idx) => 
          <StyledBreadcrumb key="idx"
                component="a"
                href="#"
                label="Home"                                          
            />
      )
    }
    </Breadcrumbs>
    : <></>
}

export default TagList