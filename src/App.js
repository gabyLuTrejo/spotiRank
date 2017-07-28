import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import AddSong from './components/AddSong';
import Playlist from './containers/Playlist';

// /////// ES5
//persona= {
// nombre: "nombreDeLaPErsona",
//}
// persona.nombre
// /////// ES6
// {nombre} = persona
// nombre

//Statefull
//Stateless

export default class SpotiRank extends Component {
  constructor(props){
    super(props);

    this.state = {
      playlist: ['Shape of you', 'Shaky Shaky', 'Cool for the summer']
    };
    //this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentDidMount(){
    const config = {
      apiKey: "AIzaSyBnp9nr9Oyn_eu1_OZYQ9103CnOCexwwXo",
      authDomain: "spotirank-ce281.firebaseapp.com",
      databaseURL: "https://spotirank-ce281.firebaseio.com",
      projectId: "spotirank-ce281",
      storageBucket: "spotirank-ce281.appspot.com",
      messagingSenderId: "222039942855"
    };
    const app = firebase.initializeApp(config);
    this.database = app.database();

    const playlistDatabase = this.database.ref('/playlist');

    //lectura
    playlistDatabase.on('value', (snapshot) =>{
      const playlist = snapshot.val();
      this.setState({
        playlist: playlist.songs
      });
    });
  }

  //escribe en base de datos
  savePlaylist(songs){
    const playlistDatabase = this.database.ref('/playlist');

    playlistDatabase.set({
      songs: songs
    });
  }

  addSongToPlaylist= (song)=>{
    let playlist = this.state.playlist;
    playlist.push(song);
    this.setState({
      playlist: playlist
    });
    this.savePlaylist(playlist);
  }

  render() {
    const songs = this.state.playlist;

    return (
      <div>
        <h1>SpotiRank</h1>
        <AddSong addSongToPlaylist={this.addSongToPlaylist}/>
        <Playlist songs={songs} />
      </div>
    );
  }
}
