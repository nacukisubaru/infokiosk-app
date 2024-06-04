/*REACT*/
import React, { useState } from "react";

/*MUI*/
import { Tabs, Tab, Box } from "@mui/material";

/*COMPONENTS*/
import { TabPanel } from "./TabPanel";

export default function TabsCard({ options, activeTab = 0 }) {
    const [value, setValue] = useState(activeTab);
    const handleChangeTabs = (event, newValue) => setValue(newValue);

    const style = {
        height: "calc(100vh - 1025px)",
        paddingBottom: '130px',
        overflowX: "hidden",
        overflowY: "auto",
    };

    const styleQr = {
        overflowX: "hidden",
        overflowY: "auto",
        height: 'calc(100% - 65px)'
    };

    return (
        <>
            <Tabs
                value={ value }
                onChange={ handleChangeTabs }
                variant="scrollable"
                scrollButtons={ false }
                aria-label="scrollable prevent tabs example"
            >
                {options.tabs.map((tab, index) => {
                    return <Tab label={tab.name} key={index} onClick={tab.click}/>
                })}
            </Tabs>

            <Box component="div" style={{flexGrow: 1}}>
                {options.panels.map((panel, index) => {
                    if (options.kassirQr && index === 2) {
                        return <TabPanel value={value} key={index} index={index} style={styleQr}>
                                    {panel}
                                </TabPanel>
                    } else {
                        return <TabPanel value={value} key={index} index={index} style={!options.noScroll ? style : {}}>
                                    {panel}
                                </TabPanel>
                    }                    
                })}
            </Box>
        </>
    );
}
