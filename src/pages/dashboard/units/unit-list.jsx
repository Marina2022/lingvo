import React from "react";

//BASE COMPONENTS
import LoaderWrapper from "../../../components/loader-wrapper/LoaderWrapper.component";

import { deleteUnitAsync, getSingleUnitAsync } from "../../../redux/units/units.actions";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Grid, Typography } from "@mui/material";
import { PlayerEmbedControls } from "../../../components/audio/player";
import { toDigestString } from "../../../utilities/helper-functions";


const UnitsListCard = (props) => {
  const {      
    itemsList,
    isLoading,
    filter,
    dispatchDeleteUnitAsync    
  } = props;

  const navigate = useNavigate()
  const { topicId } = useParams()

  const onDelete = (unitId, topicId) => 
    window.confirm(t("messages.confirm.deleteItem")) && dispatchDeleteUnitAsync(unitId, topicId)

  const getVoiceMaxId = (voices) => {
    if (!voices || !Array.isArray(voices) || voices.length === 0) return {}

    return voices.sort((a,b) => a.id < b.id ? 1 : -1)[0]
  }

  const filterLC = filter ? filter.toLowerCase() : filter

  return (
    <LoaderWrapper isLoading={isLoading}>
    {
      itemsList
        .filter(item => !filterLC || toDigestString(item).includes(filterLC))
        .map((item, idx) => (
        <Card key={idx} sx={{
          my: '2em',
          padding:'1em'
        }}>
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Typography component='div'
                sx={{ fontSize: '1.2rem', fontWeight: 'medium', color:"Chocolate", '&:hover': { cursor: 'pointer', color: 'sandybrown' } }}
                onClick={() => navigate(`units/${item?.id}`)}
              >
                {item?.value}
              </Typography>

              <PlayerEmbedControls source={getVoiceMaxId(item?.voices)}>
                <Typography sx={{fontSize: '1rem'}} color="text.secondary">
                  {item?.translation}
                </Typography>
              </PlayerEmbedControls>

            </Grid>
            <Grid item xs={1}
              title={t("actions.delete")} 
              onClick={() => onDelete(item?.id, topicId)}
              container
              justifyContent="center"              
              sx={{
                color: 'MidnightBlue',
                '&:hover': {
                  cursor: 'pointer',
                  color: 'dodgerblue',
                  transform: 'scale(1.5)'
                }
              }}
            >
              <DeleteOutlinedIcon />

            </Grid>
          </Grid>
        </Card>
        ))
    }   
    </LoaderWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGetSingleUnitAsync: (unitId) => dispatch(getSingleUnitAsync(unitId)),
  dispatchDeleteUnitAsync: (unitID, topicID) => dispatch(deleteUnitAsync(unitID, topicID)),
});

export default connect(null, mapDispatchToProps)(UnitsListCard);

