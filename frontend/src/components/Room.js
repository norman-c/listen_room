import React, { Component} from 'react';
import {Container, Grid, Button, Typography} from '@material-ui/core';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import SearchBar from "./SearchBar";
import SavedSongs from './SavedSongs';


export default class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {},
            savedSongs: {},
        };
        this.roomCode = this.props.match.params.roomCode;
        this.leaveRoom = this.leaveRoom.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getSavedSongs = this.getSavedSongs.bind(this);
        this.getRoomDetails();
    }

    componentDidMount() {
      this.interval = setInterval(this.getCurrentSong, 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    getCurrentSong() {
      fetch("/spotify/current-song")
        .then((response) => {
          if (!response.ok) {
            return {};
          } else {
            return response.json();
          }
        }) 
        .then((data) => {
          this.setState({ song: data });
          // console.log(data);
        });
    }

    getSavedSongs(){
      fetch("/spotify/saved")
        .then((response) => {
          if (!response.ok) {
            return {};
          } else {
            return response.json();
          }
        }) 
        .then((data) => {
          this.setState({ savedSongs: data });
          console.log(data);
        });
    }

    getRoomDetails() {
      return fetch("/api/get-room" + "?code=" + this.roomCode)
        .then((response) => {
          if (!response.ok) {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
          }
          return response.json();
        })
        .then((data) => {
          this.setState({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
          });
          if(this.state.isHost){
            this.authenticateSpotify();
          }
        });
    }

    authenticateSpotify() {
      fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ spotifyAuthenticated: data.status });
          if (!data.status) {
            fetch("/spotify/get-auth-url")
              .then((response) => response.json())
              .then((data) => {
                window.location.replace(data.url);
              });
          }
        });
    }


    leaveRoom(){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      fetch("/api/leave-room", requestOptions).then((_response) => {
        this.props.leaveRoomCallback();
        this.props.history.push("/");
      });
    }

    updateShowSettings(value){
      this.setState({
        showSettings: value
      });
    }

    renderSettings() {
      return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <CreateRoomPage
              update={true}
              votesToSkip={this.state.votesToSkip}
              guestCanPause={this.state.guestCanPause}
              roomCode={this.roomCode}
              updateCallback={this.getRoomDetails}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              onClick={() => this.updateShowSettings(false)}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      );
    }

    renderSettingsButton(){
      return(
        <Grid item xs={12} align="left">
          <Button variant="contained" onClick={()=> this.updateShowSettings(true)}>
          Settings
          </Button>
        </Grid>
      );
    }

    render() {
      if (this.state.showSettings){
        return this.renderSettings();
      }
      return (
        <div >
          
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <Typography variant="h4" component="h4">
                Listen Room Code: {this.roomCode}
              </Typography>
              {/* <SearchBar/> */}
            </Grid>
            
            <SavedSongs {...this.state.SavedSongs} />
            

            

            {this.state.isHost ? this.renderSettingsButton() : null}
            <Grid item xs={12} align="left">
              <Button
                variant="contained"
                onClick={this.leaveRoom}
              >
                Leave Room
              </Button>
            </Grid>           

          </Grid>
          <div className = "music">
            <MusicPlayer {...this.state.song}/>
          </div>
          
        </div>
      );
    }
  }