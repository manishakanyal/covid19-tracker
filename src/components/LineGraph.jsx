import React, { useEffect, useState } from "react"
import { VictoryAxis, VictoryChart, VictoryLine } from "victory"
import { FormControl, InputLabel } from "@mui/material"
import { MenuItem } from "@mui/material"
import { Select } from "@mui/material"
import { COVID_ENDPOINTS, COLOR_CODES } from "../constants"
import { kFormatter, processChartData } from "../helpers/helpers"
import { format } from "date-fns"

const availableTypes = ["cases", "recovered", "deaths"]

function LineGraph() {
  const [data, setData] = useState([])
  const [rawData, setRawData] = useState({})
  const [selectedType, setSelectedType] = useState("cases")

  const handleChange = (event) => {
    setSelectedType(event.target.value)
  }

  const fetchData = async () => {
    fetch(COVID_ENDPOINTS.LAST_SEVEN_DAYS)
      .then((reponse) => reponse.json())
      .then((data) => {
        setRawData(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedType && Object.keys(rawData)) {
      setData(processChartData(rawData, selectedType))
    }
  }, [selectedType, rawData])

  return (
    <>
      <hr className="spacer" />

      <h1 className="title">Worldwide Info</h1>
      <div className="spacer"></div>
      <FormControl fullWidth>
        <InputLabel id="worldwide-case-type-selector-label">Case Type</InputLabel>
        <Select
          labelId="worldwide-case-type-selector-label"
          id="worldwide-case-type-selector"
          value={selectedType}
          label="Case Type"
          onChange={handleChange}>
          {availableTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <VictoryChart
        style={{
          background: { fill: COLOR_CODES[selectedType], opacity: 0.1 },
        }}
        animate={{ duration: 2000 }}>
        {data.length ? (
          <VictoryLine
            style={{
              data: { stroke: COLOR_CODES[selectedType] },
            }}
            data={data}
          />
        ) : null}
        <VictoryAxis dependentAxis tickFormat={(t) => kFormatter(t)} />
        <VictoryAxis crossAxis tickFormat={(t) => `${format(t, "dd-LLL")}`} />
      </VictoryChart>
    </>
  )
}

export default LineGraph
