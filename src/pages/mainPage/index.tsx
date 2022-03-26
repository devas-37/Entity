import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useStyles } from "./hooks/useStyle";
import { Paper } from "@mui/material";
import { AddDialog } from "../../components/Dialogs/AddDialog";
import { useState } from "react";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export const MainPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={classes.wrapper}>
      <AddDialog open={open} onClose={() => setOpen(false)} />
      <div className={classes.content}>
        <TableContainer component={Paper} style={{ width: 700 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead aria-label="simple table">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Relation to</TableCell>
                <TableCell>Position in</TableCell>
                <TableCell>Client Verified</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow>
                  <TableCell>{Math.round(Math.random() * 150)}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.calories}</TableCell>
                  <TableCell>{row.fat}</TableCell>
                  <TableCell>{row.carbs}</TableCell>
                  <TableCell>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Open
        </Button>
      </div>
    </div>
  );
};
