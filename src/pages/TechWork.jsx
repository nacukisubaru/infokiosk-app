/*REACT*/
import React from 'react';
import QRCode from "react-qr-code";

/*MUI*/
import { makeStyles } from '@mui/styles';
import { Box, Button, Container, Typography } from '@mui/material';

import imgLogo from '../assets/images/logo.svg';

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: '280px 20px',
  },
  center: {
    textAlign: 'center'
  },
  text: {
    padding: '0 40px',
  },
  logo: {
    height: '560px',
    background: `#7348FF url(${imgLogo}) center center no-repeat`,
    backgroundSize: '800px 210px', 
    borderRadius: '50px',
    marginBottom: 100
  },
  textSm: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '22px',
    margin: 0
  },
}));

export default function TechWork() {
  const classes = useStyles(); 

  return (
    <>
      <Container maxWidth="md">
        <Box className={ classes.container }>
          <Box component="div" className={ classes.logo }></Box>

          <Box component="div" className={ classes.text }>
            <Typography variant="h2" mb={15} className={ classes.center }>Сервис временно не доступен</Typography>
            <Typography variant="h6" mb={25} className={ classes.center }>Ведутся технические работы. Приносим извинения за доставленные неудобства.</Typography>
          </Box>

          <Box className={ classes.center }>
            <QRCode value="https://visit-sochi.com/" />
            <p className={ classes.textSm }>Перейти на сайт</p>
          </Box>
        </Box>
      </Container>
    </>
  )
}