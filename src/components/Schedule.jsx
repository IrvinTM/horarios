import { useState } from "react";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "day", label: "Día", minWidth: 1 },
  { id: "start_time", label: "Inicio", minWidth: 1 },
  { id: "end_time", label: "Fin", minWidth: 1, align: "center" },
  { id: "calendar", label: "Google Calendar", minWidth: 1, align: "center" }
];

function createData(day, start_time, end_time) {
  return { day, start_time, end_time };
}

function transformScheduleData(groups) {
  const rows = [];
  groups.forEach(group => {
    group.schedule.forEach(schedule => {
      rows.push(createData(schedule.day, schedule.start_time, schedule.end_time));
    });
  });
  return rows;
}

function StickyHeadTable({ subject }) {
  const [selectedGroup, setSelectedGroup] = useState(subject.groups[0]);

  const rows = transformScheduleData([selectedGroup]);

  const handleButtonClick = (group) => {
    setSelectedGroup(group);
  };

  const handleAddToCalendar = (row) => {
    const eventTitle = `${subject.name} ${subject.code} - Grupo ${selectedGroup.group}`;
    // Establecer las fechas de inicio y fin fijas
    const startDate = '20240725'; // 25 de julio de 2024
    const endDate = '20241231'; // 31 de diciembre de 2024
  
    const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=Clase&location=&trp=true&recur=RRULE:FREQ=DAILY`;
    window.open(calendarLink, '_blank');
  };

  return (
    <div>
      <div className="text-center flex flex-row gap-2 justify-center content-center items-center">
        {subject.groups.map((group, index) => (
          <Button key={index} onClick={() => handleButtonClick(group)} variant="outlined">
            Grupo {group.group}
          </Button>
        ))}
      </div>
      <Paper sx={{ width: "full", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="text-nowrap"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.start_time + row.day}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "calendar" ? (
                            <Button variant="contained" color="primary" onClick={() => handleAddToCalendar(row)}>
                              Agregar
                            </Button>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export function Schedule({ subject }) {
  return (
    <div className="text-center flex flex-col gap-2 justify-center content-center items-center pt-4">
      
        <Typography className=" px-6" variant="h4">
          {subject.name} {subject.code}
        </Typography>
        <div className="mx-2 my-2">
          <StickyHeadTable subject={subject} />
        </div>
      
    </div>
  );
}