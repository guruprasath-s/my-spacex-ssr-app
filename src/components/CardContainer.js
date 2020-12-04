import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    height: "250px"
  },
  paper: {
    height: "100%"
  }
}));

function CardContainer({ launches }) {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {launches.length > 0 &&
        launches.map((launch, i) => {
          return (
            <Grid item key={i} xs={12} sm={6} lg={3}>
              <Card classes={{ root: classes.paper }}>
                <CardContent>
                  <img
                    className={classes.img}
                    src={launch.links.mission_patch}
                    alt="image_"
                  />
                  <Typography variant="h6" color="primary">
                    {launch.mission_name}
                  </Typography>
                  <Typography component="p">
                    <b>Mission ID's: </b>
                    <ul>
                      {launch.mission_id.map((id) => (
                        <li key={id}>{id}</li>
                      ))}
                    </ul>
                  </Typography>
                  <Typography component="p">
                    <b>Launching Year:</b> {launch.launch_year}
                  </Typography>
                  <Typography component="p">
                    <b> Succesful Launch:</b>{" "}
                    {launch.launch_success ? "true" : "false"}
                  </Typography>
                  <Typography component="p">
                    <b>Succesful Landing:</b>{" "}
                    {launch.rocket.first_stage.cores[0].land_success
                      ? "true"
                      : "false"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

CardContainer.propTypes = {
  launches: PropTypes.array.isRequired
};

export default CardContainer;
