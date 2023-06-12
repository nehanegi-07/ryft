import React,{useState} from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FaqCollapse from "./FaqCollapse/index";
import { questions } from "./data"

function FaqPage() {
  const [collapse, setCollapse] = useState(false);

  return (
    <MDBox my={3}>
      <Grid container spacing={3} display="flex" alignItem="center" justifyContent="center">
        <Grid item xs={12} lg={8}>
          <MDBox mt={3} mb={6}>
            <Grid container justifyContent="center" >
              <Grid item xs={12} md={8}>
                <MDTypography variant="h2" align="center" fontWeight="bold" gutterBottom sx={{ position: "sticky", top:0 }} >
                  Frequently Asked Questions
                </MDTypography>
                <MDBox mb={2}>
                  <MDTypography variant="body2" align="center" color="text">
                    {/* A lot of people don&apos;t appreciate the moment until it’s passed. I&apos;m not
                    trying my hardest, and I&apos;m not trying to do */}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={12}>
                {questions.map((solution,index) => {
                  return(
                   <FaqCollapse
                  title={solution.question}
                  open={collapse === index}
                  onClick={() => (collapse === index ? setCollapse(false) : setCollapse(index))}
                >
                 {solution.answer}
                    </FaqCollapse>
                  )
                })}
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>

  );
}

export default FaqPage;
