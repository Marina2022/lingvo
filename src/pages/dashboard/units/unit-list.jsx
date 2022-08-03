import React from "react";

//BASE COMPONENTS
import LoaderWrapper from "../../../components/loader-wrapper/LoaderWrapper.component";

import { deleteUnitAsync, getSingleUnitAsync } from "../../../redux/units/units.actions";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Grid, Typography } from "@mui/material";
import { PlayerEmbedControls } from "./player";


const UnitsListCard = (props) => {
  const {      
    itemsList,
    isLoading,
    filter,
    dispatchDeleteUnitAsync    
  } = props;

  const navigate = useNavigate()
  const { topicId } = useParams()

  const onConfirm = (topicId, unitId) => {
    if (window.confirm(t("messages.confirm.is_sure"))) {
      dispatchDeleteUnitAsync(unitId, topicId);
    }
  };

  return (
    <LoaderWrapper isLoading={isLoading}>
    {
      itemsList
        .filter(item => !filter || Object.values(item).join("|").toLowerCase().includes(filter.toLowerCase()))
        .map((item, idx) => (
        <Card key={idx} sx={{
          my: '2em',
          padding:'1em'
        }}>
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Typography component='div'
                sx={{ fontSize: '1.2rem', fontWeight: 'medium', color:"Chocolate", '&:hover': { cursor: 'pointer', color: 'sandybrown' } }}
                onClick={() => {navigate(`units/${item?.id}`)}}
              >
                {item?.value}
              </Typography>

              <PlayerEmbedControls source={item?.voices && item.voices[0] ? item.voices[0] : {}}>
                <Typography sx={{fontSize: '1rem'}} color="text.secondary">
                  {item?.translation}
                </Typography>
              </PlayerEmbedControls>

            </Grid>
            <Grid item xs={1}
              title={t("actions.delete")} 
              onClick={() => onConfirm(item?.id, topicId)}
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

