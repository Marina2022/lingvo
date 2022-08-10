import React from "react"
import { Grid } from "@mui/material"
import { BuildBreadcrumbs } from "./layout/breadcrumbs"


const PageWrapper = ({crumbs, children}) => {

  return(
    <Grid container spacing={2} sx={{ justifyContent: 'center', alignContent: 'flex-start', padding: '2rem 1rem', flexGrow:undefined, flexBasis:undefined }}>
        <Grid item xs={12} sm={9}>
          <BuildBreadcrumbs crumbs={crumbs} />
        </Grid>
        <Grid item xs={12} sm={9}>
          { children(crumbs) }
        </Grid>
    </Grid>
  )

}

export default PageWrapper
