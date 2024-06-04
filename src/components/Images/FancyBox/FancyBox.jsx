/*REACT*/
import React from "react";
import Slider from "react-slick";

/*MUI*/
import { Box, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

/*IMAGES*/
import svgLeft from '../../../assets/images/slide-left.svg';
import svgRight from '../../../assets/images/slide-right.svg';

/*STYLES*/
import "./slick.css"; 
import "./slick-theme.css";
import "../FancyBox/style.css";

export const useStyles = makeStyles((theme) => ({
  slider: {
    borderRadius: '50px 0px',
    overflow: 'hidden',
    position: 'relative',
    '& .slick-slider' : {
      height: 540
    },
    '& .slick-dots' : {
      bottom: 42
    },
    '& .slick-dots li button:before, & .slick-dots li.slick-active button:before, & .slick-next:before,  & .slick-prev:before': {
      display: 'none'
    },
    '& .slick-next, & .slick-prev': {
      zIndex: 1,
      width: 24,
      height: 35
    },
    '& .slick-prev': {
      background: `url(${svgLeft}) center center no-repeat`,
      left: 30
    },
    '& .slick-next': {
      background: `url(${svgRight}) center center no-repeat`,
      right: 30
    },
    '& .slick-dots li': {
      width: 20,
      height: 20,
      margin: '0 6px'
    },
    '& .slick-dots li button': {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '3px solid',
      borderColor: theme.palette.primary.green
    },
    '& .slick-dots li.slick-active button': {
      background: theme.palette.primary.green
    }
  },
  slide: {
    width: 980,
    height: 540,    
    borderRadius: '50px 0px',
    backgroundSize: 'cover',
    position: 'relative',
    color: theme.palette.text.white,
    textAlign: 'center',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        background: theme.palette.background.bgOpacity,
        position: 'absolute',
        top: '0',
        left: '0'
    }
  },
  slideInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '1',
    paddingTop: 35,
    width: '100%'
  },
  info: {
    padding: '0 30px'
  },
  infoText: {
    color: theme.palette.text.white,
    fontSize: 24, 
    fontWeight: 600,
    textTransform: 'unset'
  },
  sliderWrapper: {
    position: 'relative'
  }
}));

function Fancybox(props) {
  const {excursionTitle, excursionInfo, images} = props;
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div className={ classes.slider }>
        <Box className={ classes.slideInner }>
          <div className="wrapper-info">
            <div className="info-title">
              <Typography variant="h3" className={ classes.infoText }>{excursionTitle}</Typography>
            </div>
            <div className="info-detail">
              {excursionInfo &&
                <>
                  <Typography variant="h3" className={ classes.infoText } style={{marginRight: '25px'}}>{ excursionInfo.days }</Typography>
                  <Typography variant="h3" className={ classes.infoText } style={{marginRight: '25px'}}>{ excursionInfo.length }</Typography>
                  <Typography variant="h3" className={ classes.infoText }>{ excursionInfo.seats }</Typography>
                </>                 
              }
            </div>
        
          </div>
      </Box>
      <Slider {...settings}>
        {images.length > 0 &&
          images.map((image, index) => {
            return (
              <Box key={ index } component="div" className={ classes.slide } sx={{background: `url(${image}) center center no-repeat`}}></Box>
            )
          })
        }
      </Slider>
    </div>
  )
}

export default Fancybox;
