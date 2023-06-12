import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { DateRangePicker } from 'mui-daterange-picker';
import configs from 'components/Charts/BarCharts/VerticalBarChart/configs';
import colors from 'assets/theme/base/colors';
import MDButton from 'components/MDButton';
import './index.css';

function VerticalBarChart({
  icon,
  title,
  description,
  height,
  chart,
  yearDropDown,
  dateRange,
  setDateRange,
}) {
  const [open, setOpen] = useState(false);
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color || 'dark'].main
          : colors.dark.main,
        fill: false,
        maxBarThickness: 35,
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);
  const toggle = () => setOpen(!open);

  const renderChart = (
    <MDBox
      py={2}
      pr={2}
      pl={icon.component ? 1 : 2}
      sx={{ position: 'relative' }}
    >
      {title || description ? (
        <MDBox
          display="flex"
          px={description ? 1 : 0}
          pt={description ? 1 : 0}
          sx={{ position: 'absolute', width: '100%' }}
        >
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || 'info'}
              variant="gradient"
              coloredShadow={icon.color || 'info'}
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

          <MDBox
            mt={icon.component ? -2 : 0}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            width="80%"
          >
            <MDBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {title && (
                <MDTypography
                  variant="h6"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {title}
                </MDTypography>
              )}
              {/* <MDBox mb={2}>
                <MDTypography variant="button" color="text">
                  {description}
                </MDTypography>
              </MDBox> */}
              <MDBox
                onClick={(e) => setOpen(true)}
                sx={{
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: 0.1,
                }}
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
                {open ? (
                  <MDBox>
                    <Icon>close</Icon>
                  </MDBox>
                ) : (
                  ''
                )}
              </MDBox>
            </MDBox>
            <MDBox>
              {yearDropDown ? (
                <MDBox mb={2}>
                  <Grid item xs={12} sm={12}>
                    <div className="datepiker">
                      <DateRangePicker
                        initialDateRange={dateRange}
                        open={open}
                        toggle={toggle}
                        onChange={(range) => setDateRange(range)}
                      />
                    </div>
                  </Grid>
                </MDBox>
              ) : null}
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox
            height={height}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {data?.datasets[0]?.data?.length ? (
              <Bar data={data} options={options} />
            ) : (
              <>
                <Icon fontSize="medium">error</Icon>
                <MDTypography component="div" variant="button" color="text">
                  Data not Found
                </MDTypography>
              </>
            )}
          </MDBox>
        ),
        [chart, height]
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of VerticalBarChart
VerticalBarChart.defaultProps = {
  icon: { color: 'info', component: '' },
  title: '',
  description: '',
  height: '19.125rem',
};

// Typechecking props for the VerticalBarChart
VerticalBarChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'light',
      'dark',
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
  yearDropDown: PropTypes.bool,
};

export default VerticalBarChart;
