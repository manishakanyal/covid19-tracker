import React from "react"
import { Card, CardContent, Typography } from "@mui/material"
import "../styles/InfoBox.css"

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography color="textSecoundary">{title}</Typography>
        <h2>{cases}</h2>
        <Typography color="textSecoundary">{total} Total</Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
