/*REACT*/
import React, { useEffect } from 'react';

/*REDUX*/
import { useDispatch, useSelector } from 'react-redux';

/*MUI*/
import { Typography } from '@mui/material';
import { setTimerEnd } from '../redux/actions';

export default function Timer({ props }) {
    const minutes = props.minutes;
    const seconds = props.seconds;
    const timerEnd = useSelector(state => state.timer.timerEnd);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTimerEnd(false));
    }, [dispatch]);

    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                dispatch(props.setSeconds(seconds - 1));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    dispatch(setTimerEnd(true));
                    clearInterval(myInterval);
                } else {
                    dispatch(props.setMinutes(minutes - 1));
                    dispatch(props.setSeconds(59));
                }
            } 
        }, 1000);
        
        return ()=> {
            clearInterval(myInterval);
        };
    });

    return (
        <>
            { timerEnd
                ? null
                : <Typography id="timer" variant="h6" sx={{ color: '#F15D4C', width: 65 }}>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Typography> 
            }
        </>
    )
}
