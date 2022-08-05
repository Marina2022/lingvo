import React from "react";
import { Breadcrumbs, Chip, emphasize, styled } from "@mui/material";

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
      cursor: 'pointer'
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

/**
 * Builds breadcrumb html
 * 
 * @param {{crumbs:Array<{key:Number,name:String,path:String}>, hrefStart:String|undefined}} props 
 * @returns  \<Breadcrumb>...\</Breadcrumb>
 */
export const BuildBreadcrumbs = (props) => {   
  const {crumbs, hrefStart = ""} = props
  let hrefAssembled = hrefStart

  return (
  <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '0.9em', pb: '1rem' }}>
  {
    crumbs
    .sort((a, b) => a.key < b.key ? -1 : 1)
    .map(({name, icon, path}, key, array) => 
      (
          /**
          * @param {{isLast:Boolean, href:String}} param0 
          * @returns 
          */
          ({isLast , href}) => 
            // push last 3 items to show at breadcrumbs
            key > array.length - 4 ?
            (
              <StyledBreadcrumb key={key} component="a" href={isLast ? undefined : href} label={name} icon={icon} />
              // isLast ?
              // <Typography key={key} sx={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }} color="text.secondary">{name}</Typography> :
              // <Link key={key} underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center' }} href={href}>{name}</Link>
            ) :
            // change 4-th item from the end to '...'
            array.length > 3 && key === array.length - 4 ?
            <StyledBreadcrumb key={key} component="a" label="..." /> :
            // <Typography key={key} sx={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }} color="text.secondary">...</Typography>:
            // avoid others items
            undefined
      ) ({ isLast: key === array.length - 1, href: path ? (hrefAssembled = `${hrefAssembled}/${path}`) : hrefAssembled})
    )

  }
  </Breadcrumbs>
)}

/**
 * Adds new crumbs to the crumbs array
 * @param {Array<{key:Number,name:String,path:String}>} crumbs 
 * @param {{key:Number,name:String,path:String}|Array<{key:Number,name:String,path:String}>} newCrumb 
 */
export const addCrumbs = (crumbs, newCrumb) => {
  // prepares array from newCrumbs
  const inCrumbs = Array.isArray(newCrumb) ? newCrumb : [newCrumb]
  // filters mismatched items only from the old crumbs array
  const outCrumbs = crumbs.filter(({key: oldKey}) => !inCrumbs.find(({key: inKey}) => oldKey === inKey))
  // adds new crumbs
  outCrumbs.push(...inCrumbs)
  // returns result
  return outCrumbs
}

/**
 * Removes item has a key smaller the input one from crumbs array 
 * @param {Array<{key:Number,name:String,path:String}>} crumbs 
 * @param {Number} key 
 * @returns 
 */
export const removeCrumb = (crumbs, key) => {
  return crumbs.filter(crumb => crumb.key < key)
}
