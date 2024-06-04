import React from "react";
import { Box, Typography, IconButton, Tabs, Tab } from "@mui/material";
import SvgPrevImg from "../Icons/SvgPrevImg";
import SvgNextImg from "../Icons/SvgNextImg";
import SvgCloseImages from "../Icons/SvgCloseImages";

const FancyBoxGallery = ({
  classes,
  closeSliderHandler,
  images,
  selImgIdx,
  selectImageHandler,
  selectNextImageHandler,
  selectPrevImageHandler,
}) => {
  const selImgNum = selImgIdx + 1;
  const imagesLength = images.length;

  const imagesTabs = images.map((image, idx) => (
    <Tab
      className={classes.sliderTab}
      key={`ft-img-${idx}`}
      value={idx}
      icon={
        <Box className={classes.sliderTabImg} component="img" src={image} />
      }
    />
  ));

  return (
    <Box className={classes.sliderContainer}>
      <Box className={classes.sliderImagesInfo}>
        <Typography variant="body2">
          {selImgNum} из {imagesLength}
        </Typography>
      </Box>
      <Box className={classes.sliderSelectedImg}>
        <Box className={classes.sliderCloseBtn}>
          <IconButton
            className={classes.sliderBtn}
            onClick={closeSliderHandler}
          >
            <SvgCloseImages />
          </IconButton>
        </Box>
        {selImgIdx > 0 && (
          <Box className={classes.sliderPrevBtn}>
            <IconButton
              onClick={selectPrevImageHandler}
              className={classes.sliderBtn}
            >
              <SvgPrevImg />
            </IconButton>
          </Box>
        )}
        <Box component="img" src={images[selImgIdx]} />
        {selImgNum < images.length && (
          <Box className={classes.sliderNextBtn}>
            <IconButton
              onClick={selectNextImageHandler}
              className={classes.sliderBtn}
            >
              <SvgNextImg />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box className={classes.sliderTabsContainer}>
        <Tabs
          value={selImgIdx}
          variant="scrollable"
          scrollButtons="auto"
          onChange={selectImageHandler}
          className={classes.sliderTabs}
        >
          {imagesTabs}
        </Tabs>
      </Box>
    </Box>
  );
};

export default FancyBoxGallery;
