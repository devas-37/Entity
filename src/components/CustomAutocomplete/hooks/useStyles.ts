import { makeStyles, createStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    wrapper: {
      padding: "10px 0",
      width: "100%",
    },
    applet: {
      padding: "16px 0 8px 0",
      borderTop: "1px solid silver",
    },
    titleBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);
