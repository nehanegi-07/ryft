import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, disabled,width,color,textAlign, ...rest }, ref) => (
  <MDInputRoot {...rest} ref={ref} color={color} ownerState={{ error, success,width,textAlign, disabled}} />
));

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  width:0,

};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  width:PropTypes.number,
  color:PropTypes.string,
  textAlign:PropTypes.string,
};

export default MDInput;
