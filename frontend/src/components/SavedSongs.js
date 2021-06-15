import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPrevIcon from "@material-ui/icons/SkipPrevious";

export default class SavedSongs extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Card>
          <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
              <img src={this.props.image_url} height="100%" width="100%" />
            </Grid>
          </Grid>
        </Card>
      );
    }
  }