import MDBox from "components/MDBox";
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  console.log("version-v27")
  const { size } = typography;

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="center"
      alignItems="center"
    // px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        Copyright © 2023. NMG. All rights reserved
      </MDBox>
    </MDBox>
  );
}

export default Footer;
