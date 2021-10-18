import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function SpotPriceList({ data }) {
  return (
    <div className="spotprice-list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} size="small" aria-label="Spotpriser">
          <TableHead>
            <TableRow>
              <TableCell align="right">Datum</TableCell>
              <TableCell align="right">Klockslag</TableCell>
              <TableCell align="right">Spotpris</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.timeStamp} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="right">{row.timeStampDay}</TableCell>
                <TableCell align="right">{row.timeStampHour}</TableCell>
                <TableCell align="right">
                  {row.value} {row.unit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
