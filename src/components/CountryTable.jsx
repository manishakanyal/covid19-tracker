import React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import "../styles/CountryTable.css"

function CountryTable({ countries }) {
  return (
    <>
      <h1 className="title">Cases by Country</h1>
      <TableContainer className="table">
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Cases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.country}>
                <TableCell component="th" scope="row">
                  {country.country}
                </TableCell>

                <TableCell align="right">{country.active}</TableCell>
                <TableCell align="right">{country.cases}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CountryTable
