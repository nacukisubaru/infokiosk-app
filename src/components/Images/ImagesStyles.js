import { makeStyles } from "@mui/styles";

const BORDER_RADIUS = { borderRadius: 50 };
const FULL_SPACE = {
  width: "100%",
  height: "100%",
};
const ADDITIONAL_IMAGE = {
  ...BORDER_RADIUS,
  height: 210,
  width: "100%",
  overflow: "hidden",
};
const IMAGE_STYLES = {
  ...FULL_SPACE,
  objectFit: "cover",
};
const IMG_COVER = {
  ...FULL_SPACE,
  ...BORDER_RADIUS,
  content: "''",
  position: "absolute",
  top: 0,
  left: 0,
};
const HEADER_CONTAINER = {
  position: "absolute",
  zIndex: 1,
  left: 0,
  paddingLeft: 30,
};
const BTN_CONTAINER = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  height: "100%",
  top: 0,
};

export const useStyles = makeStyles((theme) => {

  return {
    image: {
      ...IMAGE_STYLES,
    },
    gridMainItem: {
      ...BORDER_RADIUS,
      userSelect: "none",
      height: 440,
      position: "relative",
      overflow: "hidden",
      "&::after": {
        ...IMG_COVER,
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 34.9%, rgba(255, 255, 255, 0) 77.08%, rgba(0, 0, 0, 0.5) 100%);",
      },
    },
    mainImg: {
      ...IMAGE_STYLES,
    },
    gridAddItem: {
      ...ADDITIONAL_IMAGE,
      userSelect: "none",
    },
    gridGalleryData: {
      ...ADDITIONAL_IMAGE,
      userSelect: "none",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&::after": {
        ...IMG_COVER,
        backgroundColor: "rgba(87, 87, 87, 0.7)",
      },
    },
    gridGalleryInfo: {
      ...FULL_SPACE,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: theme.palette.text.white,
      "& > h2": {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    headerTopContainer: {
      ...HEADER_CONTAINER,
      color: theme.palette.text.white,
      top: 0,
      paddingTop: 30,
      userSelect: "none",
    },
    headerBottomContainer: {
      ...HEADER_CONTAINER,
      color: theme.palette.text.white,
      bottom: 0,
      paddingBottom: 30,
      paddingRight: 30,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      userSelect: "none",
    },
    excurionInfoContainer: {
      display: "flex",
      gap: theme.spacing(5),
    },
    excursionInfoItem: {
      fontWeight: 600,
    },
    backDropStyle: {
      zIndex: theme.zIndex.mobileStepper,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    sliderContainer: {
      position: "absolute",
      top: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: 869,
      backgroundColor: theme.palette.common.black,
      zIndex: theme.zIndex.modal,
    },
    sliderSelectedImg: {
      ...BORDER_RADIUS,
      overflow: "hidden",
      height: 640,
      width: "100%",
      position: "relative",
      marginBottom: 16,
      "& > img": {
        ...IMAGE_STYLES,
      },
    },
    sliderImagesInfo: {
      color: theme.palette.text.white,
      marginTop: 10,
      marginBottom: 10,
    },
    sliderPrevBtn: {
      ...BTN_CONTAINER,
      left: 50,
    },
    sliderNextBtn: {
      ...BTN_CONTAINER,
      right: 50,
    },
    sliderBtn: {
      width: 60,
      height: 60,
      backgroundColor: theme.palette.primary.grey,
      opacity: 0.7,
      zIndex: 10,

      "&:hover": {
        opacity: 1,
        backgroundColor: theme.palette.primary.grey,
      },
    },
    sliderCloseBtn: {
      position: "absolute",
      top: 50,
      width: "100%",
      display: "flex",
      justifyContent: "end",
      paddingRight: 50,
    },
    sliderTabsContainer: {
      overflow: "hidden",
      width: "100%",
      paddingLeft: 49,
      paddingRight: 50,
    },
    sliderTabs: {
      backgroundColor: "black",
      '& [class$="flexContainer"]': { gap: 18 },
    },
    sliderTab: {
      borderRadius: 30,
      backgroundColor: "black",
      padding: 0,
      border: "4px solid transparent",
      "&.Mui-selected": {
        borderRadius: 30,
        borderColor: theme.palette.primary.main,
      },
    },
    sliderTabImg: {
      width: 146,
      height: 97,
      borderRadius: 30,
      "& > img": {
        ...IMAGE_STYLES,
      },
    },
  };
});
