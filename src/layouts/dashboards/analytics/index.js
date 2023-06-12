import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import VerticalBarChart from 'components/Charts/BarCharts/VerticalBarChart';
import GradientLineChart from 'components/Charts/LineCharts/GradientLineChart';
import { useQuery } from 'react-query';
import {
  getRightLineChartData,
  getLeftBarChartData,
  getDashBoardTopCardsValues,
} from 'services/User.Services';
import ComplexStatisticsCard from 'components/Cards/StatisticsCards/ComplexStatisticsCard';
import { Redirect } from 'react-router-dom';

function Analytics() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const [dateRange, setDateRange] = useState({
    label: 'This Month',
    startDate: firstDay,
    endDate: lastDay,
  });
  const [dateRangeLine, setDateRangeLine] = useState({
    label: 'This Month',
    startDate: firstDay,
    endDate: lastDay,
  });
  const [topChartData, setTopChartData] = useState(null);
  const startDate = dateRange?.startDate?.toISOString();
  const endDate = dateRange?.endDate?.toISOString();

  const startDateForLine = dateRangeLine?.startDate?.toISOString();
  const endDateForLine = dateRangeLine?.endDate?.toISOString();

  const { data: LineChartData } = useQuery(
    ['LeadVolumeForUser', startDateForLine, endDateForLine],
    () => getRightLineChartData(startDateForLine, endDateForLine),
    {
      keepPreviousData: true,
    }
  );

  const { data: BarChartData } = useQuery(
    ['LeadCostForUser', startDate, endDate],
    () => getLeftBarChartData(startDate, endDate),
    {
      keepPreviousData: true,
    }
  );

  const { data, isLoading, isSuccess } = useQuery(
    ['TopCardsValue'],
    () => getDashBoardTopCardsValues(),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setTopChartData(data?.data?.data);
  }, [isSuccess, data]);

  const gradientLineChartData = () => {
    let dates = [];
    let data = [];

    // eslint-disable-next-line array-callback-return
    LineChartData?.data?.data?.map((item) => {
      dates.push(item?.date);
      data.push(item?.count);
    });

    let finalData = {
      labels: dates,
      datasets: [
        {
          label: 'Count',
          color: 'dark',
          data: data,
        },
      ],
    };
    return finalData;
  };

  const verticalBarChartData = () => {
    let dates = [];
    let data = [];

    // eslint-disable-next-line array-callback-return
    BarChartData?.data?.data?.map((item) => {
      dates.push(item?.date);
      data.push(item?.total);
    });
    let finalData = {
      labels: dates,
      datasets: [
        {
          label: 'Total',
          color: 'dark',
          data: data,
        },
      ],
    };
    return finalData;
  };
  const user = JSON.parse(localStorage.getItem('tokenstatus'));
  if (user) return <Redirect from="/dashboard" to="/signup/creditcard" />;
  return (
    <MDBox py={3}>
      <MDBox mt={1.5} mb={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Leads"
                count={topChartData?.todayData || 0}
                percentage={{
                  color: 'success',
                  amount: `${topChartData?.todayPercentage || 0}%`,
                  label: "than yesterday's Leads",
                }}
                isLoading={isLoading}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Weekly Leads"
                count={topChartData?.lastWeekData || 0}
                percentage={{
                  color: 'success',
                  amount: `${topChartData?.pastWeekPercentage || 0}%`,
                  label: 'than last Week Leads',
                }}
                isLoading={isLoading}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Monthly Leads"
                count={topChartData?.monthlyData || 0}
                percentage={{
                  color: 'success',
                  amount: `${topChartData?.monthlyPercentage || 0}%`,
                  label: 'than Previous Month Leads',
                }}
                isLoading={isLoading}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <VerticalBarChart
              dateRange={dateRange}
              setDateRange={setDateRange}
              yearDropDown={true}
              icon={{ color: 'dark', component: 'leaderboard' }}
              title="Lead Cost This Month"
              description="  "
              chart={verticalBarChartData()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <GradientLineChart
              dateRange={dateRangeLine}
              setDateRange={setDateRangeLine}
              yearDropDown={true}
              icon={{ component: 'show_chart' }}
              title=" Lead Volume This Month"
              description="  "
              chart={gradientLineChartData()}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Grid container mt={6}>
        {/* <LeadsRevenue /> */}
      </Grid>
    </MDBox>
  );
}

export default Analytics;

// <Grid item xs={12} md={6} lg={4}>
// <MDBox mb={1.5}>
//   <ComplexStatisticsCard
//   icon="leaderboard"
//     title="Weekly Leads"
//     count={topChartData?.lastWeekData ||0}
//     percentage={{
//       color: "success",
//       amount:`${topChartData?.pastWeekPercentage ||0}%`,
//       label: "than last Week Leads"
//     }}
//     isLoading={isLoading}
//   />
// </MDBox>
// </Grid>
// <Grid item xs={12} md={6} lg={4}>
// <MDBox mb={1.5}>
//   <ComplexStatisticsCard
//     icon="leaderboard"
//     title="Monthly Leads"
//     count={topChartData?.monthlyData || 0}
//     percentage={{
//       color: "success",
//       amount:`${topChartData?.monthlyPercentage ||0}%`,
//       label: "than Previous Month Leads"
//     }}
//     isLoading={isLoading}
//   />
// </MDBox>
// </Grid>
