import {
  Autocomplete,
  Box,
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
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import { IPosition, IRelation } from "../../Interfaces";
import { API_URI, ICompanyQueryType } from "../../constans";
import { usePositionQuery, useRelationQuery } from "./query";
import Popper from "@mui/base/PopperUnstyled";
interface IProps {
  open: boolean;
  onClose: () => {} | void;
}

export const AddDialog: React.FC<IProps> = ({ onClose, open }) => {
  const classes = useStyles();
  const [entityValue, setEntityValue] = useState<string>("individual");
  const [positionsResult, state] = usePositionQuery();
  const [relationsResult, relState] = useRelationQuery();
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [relations, setRelations] = useState<IRelation[]>([]);
  const handleChange = useCallback((event: SelectChangeEvent) => {
    setEntityValue(event.target.value);
  }, []);
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
                onChange={handleChange}
              >
                <MenuItem value={"individual"}>Individual</MenuItem>
                <MenuItem value={"company"}>Company</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="clientId">Client ID</InputLabel>
              <Select id="clientId" size="medium" label="Client ID">
                <MenuItem value={"individual"}>Individual</MenuItem>
                <MenuItem value={"company"}>Company</MenuItem>
              </Select>
            </FormControl>
            {entityValue == "individual" ? (
              <>
                <TextField label="First Name"></TextField>
                <TextField label="Last Name"></TextField>
              </>
            ) : (
              <>
                <TextField label="Company name"></TextField>
              </>
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
            />

            <CustomAutoComplete
              options={positions}
              id="position"
              onAddNew={(option) => setPositions((old) => [...old, option])}
            />
          </div>
        </Paper>
      </DialogContent>
      <DialogActions style={{ padding: 25 }}>
        <Button variant="contained" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
