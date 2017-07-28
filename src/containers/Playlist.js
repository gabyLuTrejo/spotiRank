import React, {Component} from 'react';
import Song from '../components/Song';

export default class Playlist extends Component {
  render() {
    //let---loop, concatenacion
    const playlist = this.props.songs;

    return(
      <ul>
        {playlist.map((title, i)=> <Song key={i} name={title} />)}
      </ul>
    )
  }
}
