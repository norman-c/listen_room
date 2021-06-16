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
        <Card style={{backgroundColor:'#1a1a1a'}}>
          <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
              <img src={this.props.image_url} height="120px" width="120px" />
            </Grid>
            <Grid item align="center" xs={8}>
              <Typography component="h5" variant="h5" style={{color:'white'}}>
                {this.props.title}
              </Typography>
              <Typography color="textSecondary" variant="subtitle1" style={{color:'white'}}> 
                {this.props.artist}
              </Typography>
              <LinearProgress style={{color:'white', marginRight:'20px', marginLeft:'20px'}} variant="determinate" value={songProgress} />
              <div>
                <IconButton>
                  <SkipPrevIcon style={{color:'white'}}
                    onClick={() => {
                      this.prevSong();
                    }}
                  />
                </IconButton>
              
                <IconButton style={{color:'white'}}
                  onClick={() => {
                    this.props.is_playing ? this.pauseSong() : this.playSong();
                  }}
                >
                
                  {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton>
                  <SkipNextIcon style={{color:'white'}}
                    onClick={() => {
                      this.nextSong();
                    }}
                  />
                </IconButton>
                
              </div>
            </Grid>
          </Grid>
        </Card>
        </div>
      );
    }
  }