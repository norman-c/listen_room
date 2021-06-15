import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

export default class SearchBar extends Component {
  constructor() {
    super();
    // const params = this.getHashParams();
    // const token = params.access_token;
    // this.state = {
    //   token: token,
    //   loggedIn: token ? true : false,
    //   searchResults: [],
    // };
  }

//   getHashParams() {
//     var hashParams = {};
//     var e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     e = r.exec(q);
//     while (e) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//       e = r.exec(q);
//     }
//     return hashParams;
//   }

render() {
    
    return (
        <div>

        <SearchIcon />
        <InputBase
          placeholder="Search…"

          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    );
  }
}
