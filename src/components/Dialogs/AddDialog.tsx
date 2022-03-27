import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { CustomAutoComplete } from "../CustomAutocomplete";
import { useStyles } from "./hooks/useStyles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useCallback, useEffect, useState } from "react";
import { IPayload, IPosition, IRelation } from "../../Interfaces";
import { usePositionQuery, useRelationQuery } from "./query";
interface IProps {
  open: boolean;
  onClose: () => {} | void;
  onAdd: (data: IPayload) => {} | void;
  allIds: string[];
}

export const AddDialog: React.FC<IProps> = ({
  onClose,
  open,
  onAdd,
  allIds,
}) => {
  const classes = useStyles();
  const [entityValue, setEntityValue] = useState<string>("individual");
  const [positionsResult, state] = usePositionQuery();
  const [relationsResult, relState] = useRelationQuery();
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [relations, setRelations] = useState<IRelation[]>([]);
  const [clientIdError, setClientIdError] = useState<boolean>(false);
  const [formData, setFormData] = useState<IPayload>({
    clientId: "",
    firstName: "",
    lastName: "",
    relation: "",
    position: "",
    companyName: "",
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        ...{ [event.target.name]: event.target.value },
      });
    },
    [formData]
  );

  useEffect(() => {
    setPositions(positionsResult as IPosition[]);
    setRelations(relationsResult as IRelation[]);
  }, [positionsResult, relationsResult]);
  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>Add</DialogTitle>
      <DialogContent>
        <Paper style={{ padding: 16 }} elevation={1}>
          <Typography variant="h6">Details</Typography>

          <div className={classes.form}>
            <FormControl>
              <InputLabel id="entity">Entity</InputLabel>
              <Select
                id="entity"
                size="medium"
                label="Entity"
                value={entityValue}
                onChange={(e) => setEntityValue(e.target.value)}
              >
                <MenuItem value={"individual"}>Individual</MenuItem>
                <MenuItem value={"company"}>Company</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              value={formData.clientId || ""}
              onKeyDown={(e) => {
                if (!/(\d.?\d*$)|(backspace|enter|tab)/gi.test(e.key)) {
                  e.preventDefault();
                }
              }}
              name="clientId"
              label="Client ID"
              error={clientIdError}
              helperText={
                clientIdError
                  ? "Недопустимый идентификатор клиента"
                  : "Требуется"
              }
              onChange={handleChange}
            ></TextField>
            {entityValue == "individual" ? (
              <>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                ></TextField>
              </>
            ) : (
              <TextField
                label="Company name"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
              ></TextField>
            )}
          </div>
        </Paper>
        <Paper style={{ padding: 16 }} elevation={1}>
          <div className={classes.form}>
            <CustomAutoComplete
              options={relations}
              relation
              id="relation"
              onAddNew={(option) => setRelations((old) => [...old, option])}
              onSelect={(option) =>
                setFormData({ ...formData, relation: option.name })
              }
            />
            <CustomAutoComplete
              options={positions}
              id="position"
              onAddNew={(option) => setPositions((old) => [...old, option])}
              onSelect={(option) =>
                setFormData({ ...formData, position: option.name })
              }
            />
          </div>
        </Paper>
      </DialogContent>
      <DialogActions style={{ padding: 25 }}>
        <Button variant="contained" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (allIds.includes(formData.clientId) || !formData.clientId) {
              setClientIdError(true);
            } else {
              setClientIdError(false);
              onAdd(formData);
            }
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
