import {
  Button,
  IconButton,
  Menu,
  MenuItem,
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
import { IPayload } from "../../Interfaces";
import { MoreVert } from "@mui/icons-material";
import { ActionBtn } from "../../components/Action";
export const MainPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const [records, setRecords] = useState<IPayload[]>([]);
  return (
    <div className={classes.wrapper}>
      <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={(record) => {
          setRecords((old) => [...old, record]);
          setOpen(false);
        }}
        allIds={records.map((record) => record.clientId)}
      />
      <div className={classes.content}>
        <div style={{ textAlign: "right", margin: "16px 0" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add new record
          </Button>
        </div>
        <TableContainer component={Paper} style={{ width: 800 }}>
          <Table>
            <TableHead aria-label="simple table">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Client ID</TableCell>
                <TableCell>Relation to</TableCell>
                <TableCell>Position in</TableCell>
                <TableCell>Client Verified</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{record.clientId}</TableCell>
                  <TableCell>{record.relation}</TableCell>
                  <TableCell>{record.position}</TableCell>
                  <TableCell>{"true"}</TableCell>
                  <TableCell>
                    <ActionBtn
                      id={record.clientId}
                      menuElements={[
                        {
                          label: "Delete",
                          callback: (id) => {
                            setRecords((old) => [
                              ...old.filter((old) => old.clientId !== id),
                            ]);
                          },
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
