import { makeStyles, createStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      "& th": {
        fontWeight: 600,
      },
    },
    content: {},
  })
);
