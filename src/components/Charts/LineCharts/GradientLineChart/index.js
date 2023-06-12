import { useRef, useEffect, useState, useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";
import { DateRangePicker } from "mui-daterange-picker";
// react-chartjs-2 components
import { Line } from "react-chartjs-2";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 PRO React helper functions
import gradientChartLine from "assets/theme/functions/gradientChartLine";

// GradientLineChart configurations
import configs from "components/Charts/LineCharts/GradientLineChart/configs";

// Material Dashboard 2 PRO React base styles
import colors from "assets/theme/base/colors";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from '@mui/styles';
import "./index.css"

function GradientLineChart({ icon, title, description, height, chart, yearDropDown, dateRange, setDateRange }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0,
        pointRadius: 0,
        borderWidth: 4,
        borderColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        fill: true,
        maxBarThickness: 6,
        backgroundColor: gradientChartLine(
          chartRef.current.children[0],
          colors[dataset.color] ? colors[dataset.color || "dark"].main : colors.dark.main
        ),
      }))
      : [];

    setChartData(configs(chart.labels || [], chartDatasets));
  }, [chart]);

  const toggle = () => setOpen(!open);

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2} sx={{ position: "relative" }}>
      {title || description ? (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0} sx={{ position: "absolute", width: "100%" }}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "info"}
              variant="gradient"
              coloredShadow={icon.color || "info"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}

          <MDBox mt={icon.component ? -2 : 0} display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" width="80%" >
            <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
              {title && <MDTypography variant="h6" sx={{ display: "flex", alignItems: "center" }}>{title}</MDTypography>}
              {/* <MDBox mb={2}>
                <MDTypography variant="button" color="text">
                  {description}
                </MDTypography>
              </MDBox> */}
             <MDBox
                onClick={(e) => setOpen(true)}
                sx={{ background: 'transparent',cursor:"pointer",display:"flex",gap:0.1 }}
                ml={2}

              >
                <MDTypography
                  component="p"
                  variant="h6"
                  color="text"
                  display="flex"
                >
                  Filter by Date
                </MDTypography>
                {open?<MDBox>
                  <Icon>close</Icon>
                </MDBox>:""
                }

              </MDBox>
            </MDBox>
            <MDBox>
              {yearDropDown ? <MDBox mb={2}>
                <Grid item xs={12} sm={12}>
                  <div className="datepiker">
                  <DateRangePicker
                    open={open}
                    initialDateRange={dateRange}
                    toggle={toggle}
                    onChange={(range) => setDateRange(range)}
                  />
                  </div>
                </Grid>
              </MDBox> : null}

            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox ref={chartRef} sx={{ height }}>

             <Line data={data} options={options} />

          </MDBox>
        ),
        [chartData, height]
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of GradientLineChart
GradientLineChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the GradientLineChart
GradientLineChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default GradientLineChart;
