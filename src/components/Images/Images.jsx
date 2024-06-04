import React, { useState } from "react";
import { Backdrop } from "@mui/material";

import ImagesGrid from "./ImagesGrid";
import ImagesSlider from "./ImagesSlider";
import { useStyles } from "./ImagesStyles";

const SHOWN_IMAGES = 2;
const MAIN_IMG = 0;
const SECOND_IMG = 1;
const THIRD_IMG = 2;

export default function FancyBox({ images, excursionTitle, excursionInfo }) {
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [selImgIdx, setSelImgIdx] = useState(0);

  const classes = useStyles();

  const openSliderHandler = (imageLink) => {
    let selImageNum = 0;
    const clickedImgIdx = images.findIndex((image) => image === imageLink);

    if (clickedImgIdx > 0) selImageNum = clickedImgIdx;

    setSelImgIdx(selImageNum);
    setSliderIsOpen(true);
  };

  const closeSliderHandler = () => setSliderIsOpen(false);
  const selectImageHandler = (event, value) => setSelImgIdx(value);
  const selectNextImageHandler = () =>
    setSelImgIdx((prevImgIdx) => ++prevImgIdx);
  const selectPrevImageHandler = () =>
    setSelImgIdx((prevImgIdx) => --prevImgIdx);

  if (images.length < 3) return;

  const mainImg = images[MAIN_IMG];
  const addImg1 = images[SECOND_IMG];
  const addImg2 = images[THIRD_IMG];

  const ImagesNotShown = images.length - SHOWN_IMAGES;

  return (
    <>
      <Backdrop className={classes.backDropStyle} open={sliderIsOpen}>
        <ImagesSlider
          classes={classes}
          closeSliderHandler={closeSliderHandler}
          images={images}
          selImgIdx={selImgIdx}
          selectImageHandler={selectImageHandler}
          selectNextImageHandler={selectNextImageHandler}
          selectPrevImageHandler={selectPrevImageHandler}
        />
      </Backdrop>
      <ImagesGrid
        mainImg={mainImg}
        addImg1={addImg1}
        addImg2={addImg2}
        classes={classes}
        excursionTitle={excursionTitle}
        openSliderHandler={openSliderHandler}
        excursionInfo={excursionInfo}
        ImagesNotShown={ImagesNotShown}
      />
    </>
  );
}
