import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import PageLayout from "components/LayoutContainers/PageLayout";

function BasicLayout({ image, header, logo, children, xs=11,sm=9,md=5,lg=6,xl=3 }) {
  return (
    <PageLayout>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container width="100%" height="100%" sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
          <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}  >
            <MDBox py={3} textAlign="center">
              <>
                <MDBox mb={1} sx={{ display: "flex", justifyContent: "center" }} >
                  <MDBox
                    width="250px"
                    height="56px"
                    borderRadius="lg"
                    sx={{ backgroundImage: `url(${logo})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
                  />
                </MDBox>
              </>
            </MDBox>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default BasicLayout;
