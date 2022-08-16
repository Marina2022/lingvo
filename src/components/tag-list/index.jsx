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

const TagList = ({tags, onClick}) => {
  return tags?.length > 0 
    ? <Breadcrumbs aria-label="breadcrumb" separator="" >
    {
      tags
        .sort(({name:a},{name:b}) => a < b ? -1 : a > b ? 1 : 0)
        .map((tag, idx) => 
          <StyledBreadcrumb key={idx} component="a" label={tag.name} onClick={() => onClick(tag)} sx={{'&:hover':{cursor:'pointer'}}}/>
        )
    }
    </Breadcrumbs>
    : <></>
}

export default TagList