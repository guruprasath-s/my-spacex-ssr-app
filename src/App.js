import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Filter from "./components/Filter";
import CardContainer from "./components/CardContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column"
  },
  toolBar: {
    justifyContent: "center"
  },
  main: {
    padding: theme.spacing(2)
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 100px)"
  },
  notFound: {
    textAlign: "center"
  }
}));

function App() {
  const classes = useStyles();
  const [launches, setLaunches] = useState([]);
  const [state, setState] = useState({ year: "", sLaunch: "", sLand: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${
          state.year
        }&launch_success=${state.sLaunch.toLowerCase()}&land_success=${state.sLand.toLowerCase()}`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setLaunches(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [state]);
  const handleFilterChange = (state) => {
    setState(state);
  };
  return (
    <>
      <CssBaseline />
      <div className={classes.app}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h5" className={classes.title}>
              SpaceX Launch Program
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={2}>
              <Filter handleFilterChange={handleFilterChange} />
            </Grid>
            <Grid item xs={12} sm={8} lg={10}>
              {loading ? (
                <div className={classes.loader}>
                  <CircularProgress />
                </div>
              ) : launches.length === 0 &&
                (state.year || state.sLand || state.sLaunch) ? (
                <Typography
                  variant="h5"
                  color="error"
                  className={classes.notFound}
                >
                  Oops sorry, !No Launches...
                </Typography>
              ) : (
                <CardContainer launches={launches} />
              )}
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  );
}

export default App;
