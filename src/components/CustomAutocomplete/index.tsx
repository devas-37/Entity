import {
  Autocomplete,
  AutocompleteChangeReason,
  Button,
  FormControl,
  IconButton,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import { useStyles } from "./hooks/useStyles";
import { Add, ArrowBack, Clear } from "@mui/icons-material";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface IProps {
  options: { id: string; name: string }[];
  relation?: boolean;
  id: string;
  onSelect?: (option: { id: string; name: string }) => void;
  onAddNew?: (option: { id: string; name: string }) => void;
}
export const CustomAutoComplete: React.FC<IProps> = ({
  options,
  relation = false,
  id,
  onSelect,
  onAddNew,
}) => {
  const classes = useStyles();
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const newInput = useRef<HTMLInputElement>(null);
  const generateId = useMemo(() => Math.round(Math.random() * 99000) + "D", []);
  useEffect(() => {
    const ref = (e: MouseEvent) => {
      if (!(e.target as HTMLDivElement).closest(`#${id}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", ref);
    return () => {
      document.removeEventListener("mousedown", ref);
    };
  });

  return (
    <div id={id}>
      <Autocomplete
        filterOptions={(options) => {
          return options.filter((e) => RegExp(filterText, "ig").test(e));
        }}
        value={newValue}
        open={isOpen}
        onOpen={(e) => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        onChange={(e, val, reason) => {
          if (reason == "clear") {
            setFilterText("");
            setNewValue("");
            setIsOpen(true);
          }
          if (reason == "selectOption") {
            onSelect &&
              val &&
              onSelect({
                id: Date.now().toString(),
                name: val,
              });
          }
        }}
        ListboxComponent={(props) => {
          return (
            <ul {...props} style={{ ...props.style, maxHeight: 36 * 5 }}>
              {props.children}
            </ul>
          );
        }}
        PaperComponent={(props) => {
          return (
            <Paper
              {...props}
              elevation={10}
              sx={{ mb: 2 }}
              style={{
                height: "fit-content",
                borderRadius: 12,
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {props.children}
              <div className={classes.wrapper}>
                <div className={classes.applet}>
                  {!newOpen ? (
                    <Button
                      onClick={() => setNewOpen(true)}
                      size={"large"}
                      fullWidth
                      color="primary"
                      startIcon={<Add />}
                    >
                      Add
                    </Button>
                  ) : (
                    <div style={{ padding: "0 16px" }}>
                      <div className={classes.titleBar}>
                        <IconButton onClick={() => setNewOpen(false)}>
                          <ArrowBack fontSize="medium" />
                        </IconButton>
                        <Typography variant="h6">
                          Add new {relation ? "Relation" : "Position"}
                        </Typography>
                        <IconButton>
                          <Clear fontSize="medium" />
                        </IconButton>
                      </div>
                      <FormControl style={{ width: "100%", margin: "16px 0" }}>
                        <TextField
                          inputRef={newInput}
                          style={{ width: "100%" }}
                          label={
                            relation
                              ? "Relation to the company"
                              : `Position in the company`
                          }
                        ></TextField>
                      </FormControl>
                      <div style={{ textAlign: "right" }}>
                        <Button
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            let val = newInput.current?.value || "";
                            onAddNew &&
                              onAddNew({
                                id: Date.now().toString(),
                                name: val,
                              });
                            setNewValue(val);
                            setIsOpen(false);
                          }}
                        >
                          ADD
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          );
        }}
        options={options.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              relation ? "Relation to the company" : "Position in the company"
            }
            inputProps={{
              ...params.inputProps,
              onBlur: (e) => {},
              onInput: (e) => {
                setFilterText((e.target as HTMLInputElement).value);
              },
            }}
          />
        )}
      />
    </div>
  );
};
