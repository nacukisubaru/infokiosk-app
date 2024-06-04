/*REACT*/
import React from "react";

/*HELPERS*/
import { decodeHtml } from "../../helpers/stringHelper";

/*MUI*/
import { Box, Typography, Stack, Button } from "@mui/material";

export default function SelectionOptions({ classes, data }) {
    return (
        <>
            <Stack className={classes.selectWrap} spacing={5}>
                {data.allLocationValue && (
                    <Box
                        className={classes.selectItem}
                        sx={
                            data.allLocation
                                ? {
                                      background: "#7348FF !important",
                                      color: "white",
                                  }
                                : {}
                        }
                    >
                        <Typography
                            variant="h7"
                            className={classes.selectText}
                            onClick={data.resetHandler}
                        >
                            {data.allLocationValue}
                        </Typography>
                    </Box>
                )}
                {data.body.map((option) => {
                    return (
                        <Box
                            key={option.id}
                            className={classes.selectItem}
                            sx={
                                option.hasOwnProperty("active") && option.active
                                    ? {
                                          background: "#7348FF !important",
                                          color: "white",
                                      }
                                    : {}
                            }
                        >
                            <Typography
                                variant="h7"
                                className={classes.selectText}
                                onClick={() =>
                                    data.optionHandler(option.id, option.option)
                                }
                            >
                                {decodeHtml(option.option)}
                            </Typography>
                        </Box>
                    );
                })}
            </Stack>

            <Stack
                spacing={5}
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.modalFooter}
            >
                <Button variant="outlined" onClick={data.resetBtnFilterHandler}>
                    <Typography variant="button2">
                        {data.hasOwnProperty("isCancel") && data.isCancel
                            ? "ОТМЕНИТЬ"
                            : "СБРОСИТЬ"}
                    </Typography>
                </Button>
                <Button variant="contained" onClick={data.searchHandler}>
                    <Typography variant="button2">Применить</Typography>
                </Button>
            </Stack>
        </>
    );
}
