import React from "react";
import MuiPhoneNumber from 'material-ui-phone-number';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        height: '200px'
    },
});

const PhoneField = ({ width, dataCy, defaultCountry, sx, type, label, value, variant, id, autoComplete, onChange, error, helperText,fullWidth=false }) => {
    const classes = useStyles();
    return (

        <MuiPhoneNumber
            width={width}
            data-cy={dataCy}
            defaultCountry={defaultCountry}
            sx={sx}
            type={type}
            label={label}
            value={value}
            variant={variant}
            id={id}
            dropdownClass={classes.root}
            autoComplete={autoComplete}
            onChange={onChange}
            error={
                error
            }
            helperText={
                helperText
            }
            fullWidth={fullWidth}
        />
    )
}
export default PhoneField;
