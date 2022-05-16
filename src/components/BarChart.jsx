import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { VictoryAxis, VictoryChart, VictoryStack, VictoryLegend } from "victory"
import { VictoryBar } from "victory"
import { processChartData, kFormatter } from "../helpers/helpers"
import { COLOR_CODES, COVID_ENDPOINTS } from "../constants"
import { Paper } from "@mui/material"
import "../styles/BarChart.css"

function BarChart({ countryInfo }) {
  const [allData, setData] = useState({
    cases: [],
    deaths: [],
    recovered: [],
  })

  const { label: countryName, value: country } = countryInfo

  const fetchData = () => {
    fetch(COVID_ENDPOINTS.SPECIFIC_COUNTRY(country === "worldwide" ? "all" : country))
      .then((resp) => resp.json())
      .then((data) => {
        const timeline = country === "worldwide" ? data : data.timeline
        const processedData = {
          cases: processChartData(timeline, "cases"),
          deaths: processChartData(timeline, "deaths"),
          recovered: processChartData(timeline, "recovered"),
        }
        setData(processedData)
      })
  }

  useEffect(() => {
    fetchData()
  })

  return (
    <Paper className="chart_wrapper">
      <h1 className="title">Last 30 days - {countryName}</h1>
      {allData.cases.length && allData.deaths.length && allData.recovered.length ? (
        <VictoryChart
          scale={{ x: "time", y: "linear" }}
          domainPadding={{ x: 5 }}
          width={600}
          height={400}>
          <VictoryStack colorScale={Object.values(COLOR_CODES)}>
            <VictoryBar data={allData.cases} />
            <VictoryBar data={allData.recovered} />
            <VictoryBar data={allData.deaths} />
          </VictoryStack>
          <VictoryAxis dependentAxis tickFormat={(t) => kFormatter(t)} />
          <VictoryAxis crossAxis tickFormat={(t) => `${format(t, "dd-LLL")}`} />

          <VictoryLegend
            x={380}
            y={10}
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{
              border: { stroke: "black" },
              title: { fontSize: 10 },
              labels: { fontSize: 8 },
            }}
            data={[
              { name: "Cases", symbol: { fill: COLOR_CODES.cases, type: "square" } },
              { name: "Recovered", symbol: { fill: COLOR_CODES.recovered, type: "square" } },
              { name: "Deaths", symbol: { fill: COLOR_CODES.deaths, type: "square" } },
            ]}
          />
        </VictoryChart>
      ) : null}
    </Paper>
  )
}

export default BarChart
