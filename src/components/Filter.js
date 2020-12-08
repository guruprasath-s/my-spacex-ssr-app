import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  tileContainer: {
    display: "flex",
    justifyContent: "center"
  },
  tileButton: {
    margin: theme.spacing(1)
  },
  checked: {
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "darkgreen"
    }
  }
}));

function Filter({ handleFilterChange }) {
  const [state, setState] = useState({ year: "", sLaunch: "", sLand: "" });
  useEffect(() => {
    handleFilterChange(state);
  }, [state]);
  const classes = useStyles();
  const rangeOfYears = (start, end) =>
    Array(end - start + 1)
      .fill(start)
      .map((year, index) => year + index);
  return (
    <div>
      <Typography variant="h6">Filters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center" component="p">
            <b> Launch Year</b>
          </Typography>
          <Grid container spacing={1}>
            {rangeOfYears(2006, 2020).map((item, i) => {
              return (
                <Grid
                  key={i}
                  className={classes.tileContainer}
                  item
                  xs={6}
                  sm={6}
                >
                  <Button
                    className={classNames(classes.tileButton, {
                      [classes.checked]: item === state.year
                    })}
                    key={item}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (item === state.year) setState({ ...state, year: "" });
                      else setState({ ...state, year: item });
                    }}
                  >
                    {item}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" component="p">
            <b>Successful Launch</b>
          </Typography>
          <Grid container spacing={1}>
            {["True", "False"].map((item, i) => {
              return (
                <Grid
                  key={i}
                  className={classes.tileContainer}
                  item
                  xs={6}
                  sm={6}
                >
                  <Button
                    className={classNames(classes.tileButton, {
                      [classes.checked]: item === state.sLaunch
                    })}
                    key={item}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (item === state.sLaunch)
                        setState({ ...state, sLaunch: "" });
                      else setState({ ...state, sLaunch: item });
                    }}
                  >
                    {item}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" component="p">
            <b>Successful Landing</b>
          </Typography>
          <Grid container spacing={1}>
            {["True", "False"].map((item, i) => {
              return (
                <Grid
                  key={i}
                  className={classes.tileContainer}
                  item
                  xs={6}
                  sm={6}
                >
                  <Button
                    className={classNames(classes.tileButton, {
                      [classes.checked]: item === state.sLand
                    })}
                    key={item}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (item === state.sLand)
                        setState({ ...state, sLand: "" });
                      else setState({ ...state, sLand: item });
                    }}
                  >
                    {item}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Filter.propTypes = {
  handleFilterChange: PropTypes.func
};

export default Filter;
