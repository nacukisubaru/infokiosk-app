/*REDUX*/
import { useSelector } from 'react-redux';

/*MUI*/
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    input: {
        position: 'absolute',
        bottom: '-30px',
        left: 30,
        color: theme.palette.primary.red
    },
}));

export default function InputMessage({ props }) {
    const classes = useStyles();
    const show = props.isShow;
    const styles = props.styles ? props.styles : {};
    // const existEmail = useSelector((state) => state.keyboard.errorEmailExist);

    return (
        <>
            {show &&
                <Typography variant="body1" className={ classes.input } sx={ styles }>{ props.message }</Typography>
            } 
        </>
    );
}