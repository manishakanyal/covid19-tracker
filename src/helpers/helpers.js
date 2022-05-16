export const processChartData = (data, casestypes = "cases") => {
  const chartData = []
  let lastDataPoint
  for (let date in data[casestypes]) {
    if (lastDataPoint >= 0) {
      const newDataPoint = {
        x: new Date(Date.parse(date)),
        y: data[casestypes][date] - lastDataPoint,
      }
      chartData.push(newDataPoint)
    }
    lastDataPoint = data[casestypes][date]
  }
  return chartData
}

export const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num)
}

export const sortData = (data) => {
  const sortedData = [...data]
  return sortedData.sort((a, b) => b.cases - a.cases)
}
