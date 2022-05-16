export const COVID_ENDPOINTS = {
  ALL_DATA: "https://disease.sh/v3/covid-19/all",
  COUNTRY_LIST: "https://disease.sh/v3/covid-19/countries",
  SINGLE_COUNTRY: (countryCode) => `https://disease.sh/v3/covid-19/countries/${countryCode}`,
  SPECIFIC_COUNTRY: (country) =>
    `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`,
  LAST_SEVEN_DAYS: "https://disease.sh/v3/covid-19/historical/all?lastdays=7",
}

export const COLOR_CODES = {
  cases: "#00afbf",
  deaths: "#fc0303",
  recovered: "#29bf00",
}
