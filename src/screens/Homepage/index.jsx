import { FormControl } from "@mui/material"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { COVID_ENDPOINTS } from "../../constants"
import { formatOptionsForSelect, sortData } from "../../helpers/helpers"
import Select from "react-select"
import { MenuItem } from "@mui/material"
import InfoBox from "../../components/InfoBox"
import BarChart from "../../components/BarChart"
import { Card } from "@mui/material"
import LineGraph from "../../components/LineGraph"
import { CardContent } from "@mui/material"
import "../../styles/Homepage.css"
import CountryTable from "../../components/CountryTable"
import { NoOptionsMessage } from "../../components/NoOptionsComponent"

const WORLDWIDE_OPTION = {
  label: "Worldwide",
  value: "worldwide",
}

const Homepage = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(WORLDWIDE_OPTION)
  const [selectedInfo, setSelectedInfo] = useState({})
  const [tableData, seTableData] = useState([])

  useEffect(() => {
    fetch(COVID_ENDPOINTS.ALL_DATA)
      .then((response) => response.json())
      .then((data) => setSelectedInfo(data))
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(COVID_ENDPOINTS.COUNTRY_LIST)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            label: country.country,
            value: country.countryInfo.iso2,
          }))
          setCountries([WORLDWIDE_OPTION, ...countries])
          seTableData(sortData(data))
        })
    }

    getCountriesData()
  }, [])

  const onChangeCountryName = async (newVal) => {
    const countryCode = newVal.value

    const url =
      countryCode === "worldwide"
        ? COVID_ENDPOINTS.ALL_DATA
        : COVID_ENDPOINTS.SINGLE_COUNTRY(countryCode)

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(newVal)
        setSelectedInfo(data)
        console.log(data)
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl>
            <Select
              classNamePrefix="react-select"
              id="country-selector"
              value={country}
              options={countries}
              onChange={onChangeCountryName}
              components={{ NoOptionsMessage }}
            />
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={selectedInfo.todayCases}
            total={selectedInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={selectedInfo.todayRecovered}
            total={selectedInfo.recovered}
          />
          <InfoBox
            title="Total deaths"
            cases={selectedInfo.todayDeaths}
            total={selectedInfo.deaths}
          />
        </div>
        <BarChart countryInfo={country} />
      </div>
      <Card>
        <CardContent>
          <CountryTable countries={tableData} />
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  )
}

export default Homepage
