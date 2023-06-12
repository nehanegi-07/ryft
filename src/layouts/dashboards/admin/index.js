import React, { useState } from "react"
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import VerticalBarChart from "components/Charts/BarCharts/VerticalBarChart";
import GradientLineChart from "components/Charts/LineCharts/GradientLineChart";
import { useQuery } from "react-query";
import { getRightLineChartData, getLeftBarChartData } from "services/User.Services";
import { FullScreen, useFullScreenHandle } from "react-full-screen";


function AdminHomePage() {
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const [dateRange, setDateRange] = useState({ label: "This Month", startDate: firstDay, endDate: lastDay });
  const [dateRangeLine, setDateRangeLine] = useState({ label: "This Month", startDate: firstDay, endDate: lastDay });

  const startDate = dateRange?.startDate?.toISOString()
  const endDate = dateRange?.endDate?.toISOString()

  const startDateForLine = dateRangeLine?.startDate?.toISOString()
  const endDateForLine = dateRangeLine?.endDate?.toISOString()


  const { data: LineChartData } = useQuery(
    ['LeadVolume', startDateForLine, endDateForLine],
    () => getRightLineChartData(startDateForLine, endDateForLine),
    {
      keepPreviousData: true,
    }
  );


  const { data: BarChartData } = useQuery(
    ['LeadCost', startDate, endDate],
    () => getLeftBarChartData(startDate, endDate),
    {
      keepPreviousData: true,
    }
  );

  const gradientLineChartData = () => {
    let dates = [];
    let data = [];

    // eslint-disable-next-line array-callback-return
    LineChartData?.data?.data?.map((item) => {
      dates.push(item?.date)
      data.push(item?.count)
    })

    let finalData = {
      labels: dates,
      datasets: [
        {
          label: "Count",
          color: "dark",
          data: data,
        },
      ],
    }
    return finalData
  }


  const verticalBarChartData = () => {
    let dates = [];
    let data = [];

    // eslint-disable-next-line array-callback-return
    BarChartData?.data?.data?.map((item) => {
      dates.push(item?.date)
      data.push(item?.total)
    })

    let finalData = {
      labels: dates,
      datasets: [
        {
          label: "Total",
          color: "dark",
          data: data,
        },
      ],
    }
    return finalData
  };
  const handle = useFullScreenHandle();
  return (
    <MDBox py={3}>
       {/* <button onClick={handle.enter}>
        Enter fullscreen
      </button><br/><br/> */}
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          <FullScreen handle={handle}>
            <VerticalBarChart
              dateRange={dateRange}
              setDateRange={setDateRange}
              yearDropDown={true}
              icon={{ color: "dark", component: "leaderboard" }}
              title="Lead Cost This Month"
              description="  "
              chart={verticalBarChartData()}
            />
            </FullScreen>
          </Grid>
          <Grid item xs={12} md={6}>
            <GradientLineChart
              dateRange={dateRangeLine}
              setDateRange={setDateRangeLine}
              yearDropDown={true}
              icon={{ component: "show_chart" }}
              title=" Lead Volume This Month"
              description="  "
              chart={gradientLineChartData()}
            />
          </Grid>
        </Grid>
      </MDBox>
      {/* <Grid container mt={6}>
        <LeadsRevenue />
      </Grid> */}
    </MDBox>
  );
}

export default AdminHomePage;
