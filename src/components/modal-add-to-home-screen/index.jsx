import { t } from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
import { isMobile, isStandalone } from '../../utilities/appPromptHelper';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { Box, Checkbox, FormControlLabel, Grid, Modal } from '@mui/material';

const promptList = {
  IOs: () => <>{t("messages.info.install_app.ios1", {device:"device"})} <IosShareOutlinedIcon /> {t("messages.info.install_app.ios2")}</>,
  IPhone: () => <>{t("messages.info.install_app.ios1", {device:"iPhone"})} <IosShareOutlinedIcon /> {t("messages.info.install_app.ios2")}</>,
  IPad: () => <>{t("messages.info.install_app.ios1", {device:"iPad"})} <IosShareOutlinedIcon /> {t("messages.info.install_app.ios2")}</>,
  IPod: () => <>{t("messages.info.install_app.ios1", {device:"iPod"})} <IosShareOutlinedIcon /> {t("messages.info.install_app.ios2")}</>,
  Desktop: () => <>{t("messages.info.install_app.desktop")}</>,
  OtherMobile: () => <>{t("messages.info.install_app.other_mobile")}</>
}

const Prompt = 
  isMobile.iPhone() ? promptList.IPhone :
  isMobile.iPad() ? promptList.IPad :
  isMobile.iPod() ? promptList.IPod :
  isMobile.any() ? promptList.OtherMobile : promptList.Desktop

/**
 * 
 * @returns {Boolean}
 */
const getShowParam = () => {
  return window.localStorage.getItem('installPromptIsShown')
}
/**
 * 
 * @param {Boolean} isShown 
 * @returns 
 */
const setShowParam = (isShown) => {
  window.localStorage.setItem('installPromptIsShown', isShown)
}

export default function ModalAddToHomeScreen() {
  const initState = !isStandalone() && (JSON.parse(getShowParam()) ?? true)
  const [show, setShow] = useState(initState);
  
  const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		hight: window.innerHeight
	})


	const resizeHandler = useCallback(() => {
		setWindowSize({
			width: window.innerWidth,
			hight: window.innerHeight
		})
	}, [])

	useEffect(() => {		
		/** Registers event handler */
		window.addEventListener('resize', resizeHandler)
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, 
	[resizeHandler])

  const initStyle = {
    position: 'fixed',
    left: 0,
    width: '100%',
    bgcolor: 'white',
    color: 'gray',
    borderWidth: 0,
    padding: '1em 0!important'
  }
  windowSize.width > 650 ? initStyle.top = 0 : initStyle.bottom = 0

  const [boxStyle, setBoxStyle] = useState(initStyle)
  
  useEffect(() => {
    if (windowSize.width > 650) {
      if (boxStyle.bottom === 0) {
        setBoxStyle({
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          bgcolor: 'white',
          color: 'gray',
          borderWidth: 0,
          padding: '1em 0!important'
        })
      }
    } else {
      if (boxStyle.top === 0) {
        setBoxStyle({
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          bgcolor: 'white',
          color: 'gray',
          borderWidth: 0,
          padding: '1em 0!important'
        })
      }
    }
  }, [boxStyle.bottom, boxStyle.top, windowSize.width])

  
  const onClick = ({target}) => {
    setShowParam(!target.checked)
  }

  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >    
      <Box sx={ boxStyle }>
        <Grid container>
          <Grid item xs={12} container sx={{ justifyContent: 'center', alignItems:'center' }}>
              
            <Grid item xs={2} sm={1} sx={{
              display: 'flex',
              justifyContent: 'right !important',
              'img, svg': {
                  width: '2.5rem',
                  height: '2.5rem',
                  margin: '0.5em',
              }                
            }}>
              <AddBoxOutlinedIcon />
            </Grid>

            <Grid item xs={9} sm={10} sx={{ svg: { color: 'dodgerblue' } }}>
              <Prompt />
            </Grid>

          </Grid>

          <Grid item xs={12} container sx={{ justifyContent: 'center', alignItems:'center' }}>
              
            <Grid item xs={2} sm={1}>&nbsp;</Grid>

            <Grid item xs={9} sm={10} >
              <FormControlLabel
                label={t("messages.info.does_not_show")}
                control={<Checkbox checked={false} onChange={onClick} />}
              />
            </Grid>  

          </Grid>

        </Grid>
      </Box>

    </Modal>  
  );
}
