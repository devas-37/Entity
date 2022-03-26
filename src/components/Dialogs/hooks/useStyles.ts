import { makeStyles, createStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      "&>div": {
        marginTop: 20,
      },
    },
  })
);
