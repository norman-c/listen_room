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

export default class MusicPlayer extends Component {
    constructor(props) {
      super(props);
    }

    pauseSong() {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch("/spotify/pause", requestOptions);
    }
  
    playSong() {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch("/spotify/play", requestOptions);
    }

    nextSong(){
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch("/spotify/next", requestOptions);
    }

    prevSong(){
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      fetch("/spotify/prev", requestOptions);
    }
    
  
    render() {
      const songProgress = (this.props.time / this.props.duration) * 100;
  
      return (
        <div>
        <Card >
          <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
              <img src={this.props.image_url} height="120px" width="120px" />
            </Grid>
            <Grid item align="center" xs={8}>
              <Typography component="h5" variant="h5">
                {this.props.title}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                {this.props.artist}
              </Typography>
              <div>
                <IconButton>
                  <SkipPrevIcon 
                    onClick={() => {
                      this.prevSong();
                    }}
                  />
                </IconButton>
              
                <IconButton 
                  onClick={() => {
                    this.props.is_playing ? this.pauseSong() : this.playSong();
                  }}
                >
                
                  {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton>
                  <SkipNextIcon 
                    onClick={() => {
                      this.nextSong();
                    }}
                  />
                </IconButton>
                
              </div>
            </Grid>
          </Grid>
          <LinearProgress variant="determinate" value={songProgress} />
        </Card>
        </div>
      );
    }
  }