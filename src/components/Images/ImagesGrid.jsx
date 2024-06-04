import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import SvgEyePlus from "../Icons/SvgEyePlus";

const FancyBoxGrid = ({
  mainImg,
  addImg1,
  addImg2,
  classes,
  excursionTitle,
  openSliderHandler,
  excursionInfo,
  ImagesNotShown,
}) => (
  <Grid container columnGap={5} columns={18}>
    <Grid
      item
      xs={12.2}
      className={classes.gridMainItem}
      onClick={() => openSliderHandler(mainImg)}
    >
      <Box className={classes.headerTopContainer}>
        <Typography variant="h4">{excursionTitle}</Typography>
      </Box>
      <Box component="img" src={mainImg} className={classes.mainImg} />
      <Box className={classes.headerBottomContainer}>
        <Box className={classes.excurionInfoContainer}>
          <Typography variant="h6" className={classes.excursionInfoItem}>
            {excursionInfo.days}
          </Typography>
          <Typography variant="h6" className={classes.excursionInfoItem}>
            {excursionInfo.length}
          </Typography>
          <Typography variant="h6" className={classes.excursionInfoItem}>
            {excursionInfo.seats}
          </Typography>
        </Box>
        <Box>
          <SvgEyePlus />
        </Box>
      </Box>
    </Grid>
    <Grid item container xs={3.6} rowGap={5}>
      <Grid
        item
        className={classes.gridAddItem}
        onClick={() => openSliderHandler(addImg1)}
      >
        <Box component="img" src={addImg1} className={classes.image} />
      </Grid>
      <Grid
        item
        className={classes.gridGalleryData}
        onClick={() => openSliderHandler(addImg2)}
      >
        <Box className={classes.gridGalleryInfo}>
          <Typography variant="h2">+{ImagesNotShown}</Typography>
          <Typography variant="body1">фото</Typography>
        </Box>
        <Box component="img" src={addImg2} className={classes.image} />
      </Grid>
    </Grid>
  </Grid>
);

export default FancyBoxGrid;
