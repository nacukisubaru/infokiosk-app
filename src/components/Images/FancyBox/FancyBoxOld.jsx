import React, { useEffect } from "react";

import { Box, Typography } from "@mui/material";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";
import "./FancyBoxStyle.css";
import SvgEyePlus from "../../Icons/SvgEyePlus";

const SHOWN_IMAGES = 2;

function Fancybox(props) {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = props.options || {};

    NativeFancybox.bind(delegate, opts);

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  const styleFbContainer = props.images.length === 1 ?  {display:'flex', justifyContent: 'center'} : {}

  const ImagesNotShown = props.images.length - SHOWN_IMAGES;

  const buttons = props.images.map((imageSrc, index) => {
    let properClass = "fb__image-first";

    if (index === 1) properClass = "fb__image-second";
    if (index === 2) properClass = "fb__image-third";

    return (
      <a
        href={imageSrc}
        key={`fb-img-${index}`}
        data-fancybox="gallery"
        data-src={imageSrc}
        style={{ display: index > 2 ? "none" : "inline" }}
        className={`fb__image ${properClass}`}
      >
        {index === 0 && (
          <Box
            top={30}
            left={30}
            position="absolute"
            zIndex={1}
            color="#FFFFFF"
          >
            <Typography variant="h4">{props.excursionTitle}</Typography>
          </Box>
        )}
        {index === 0 &&  props.excursionInfo && (
          <Box
            color="#FFFFFF"
            bottom={30}
            left={30}
            position="absolute"
            zIndex={1}
            display={"flex"}
            justifyContent={"space-between"}
            width={"91%"}
          >
            <Box display={"flex"} gap={"20px"}>
              {props.excursionInfo.days && (
                <Typography fontWeight={600} variant="h6">
                  {props.excursionInfo.days}
                </Typography>      
              )}

              {props.excursionInfo.length && (
                <Typography fontWeight={600} variant="h6">
                  {props.excursionInfo.length}
                </Typography>
              )}

              {props.excursionInfo.seats && (
                <Typography fontWeight={600} variant="h6">
                  {props.excursionInfo.seats}
                </Typography>
              )}
              
            </Box>
            <Box>
              <SvgEyePlus />
            </Box>
          </Box>
        )}
        {index === 2 && (
          <Box
            position={"absolute"}
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"#FFFFFF"}
            zIndex={2}
          >
            <Box>
              <Typography variant="h2">+{ImagesNotShown}</Typography>
              <Typography variant="body1">фото</Typography>
            </Box>
          </Box>
        )}
        <img src={imageSrc} alt="" />
      </a>
    );
  });

  return <Box className="fb__container" style={styleFbContainer} >{buttons}</Box>;
}

export default Fancybox;
