import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 56,
    height: 26,
    padding: 0,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(30px)",

      "& + $track": {
        backgroundColor: theme.palette?.primary.main,
        opacity: 1,
        border: "none",
      },
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    width: "53px",
    height: "26px",
    backgroundColor: "#6FF09C",
    opacity: 1,
    // transition: theme.transitions.create(["background-color", "border"]),
  },

  // Don't remove this empty class.
  checked: {},

  switchRoot: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    cursor: "pointer",
    width: 0,
  },
  // label: {
  //   fontSize: 12,
  //   position: "absolute",
  //   zIndex: 1,
  //   color: theme.palette.common.white,
  //   userSelect: "none",
  //   pointerEvents: "none",
  // },
  left: {
    left: 6,
  },
  right: {
    left: 27,
  },
}));
