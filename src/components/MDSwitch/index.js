import { Switch as MuiSwitch } from "@mui/material";
import PropTypes from "prop-types";
import { useStyles } from "./styles";

const Switch = ({ checked, onChange, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.switchRoot}>
      <MuiSwitch
        checked={checked}
        onChange={onChange}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    </div>
  );
};

export default Switch;

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
};
