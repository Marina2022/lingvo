import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

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
    .map(({name, path}, key, array) => 
      (
          /**
          * @param {{isLast:Boolean, href:String}} param0 
          * @returns 
          */
          ({isLast , href}) => 
            // push last 3 items to show at breadcrumbs
            key > array.length - 4 ?
            // <Breadcrumb.Item href={href} key={key} active={isLast ?? undefined}>{name}</Breadcrumb.Item>
            (
              isLast ?
              <Typography key={key} sx={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }} color="text.secondary">{name}</Typography> :
              <Link key={key} underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center' }} href={href}>{name}</Link>
            ) :
            // change 4-th item from the end to '...'
            array.length > 3 && key === array.length - 4 ?
            // <Breadcrumb.Item key={key} href="#" active>...</Breadcrumb.Item>:
            <Typography key={key} sx={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }} color="text.secondary">...</Typography>:
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
