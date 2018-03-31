import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Signin from './components/Signin/Signin';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'ec277d8de0eb4afb889a220a80d64c7f'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      input:'',
      imageUrl: '',
      box:{},
      route:'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    // console.log(event.target.value);
    //this updates
    this.setState({input:event.target.value})
  }

  // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // console.log("click");
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route:route});
  }

  render() {
    return (
      <div className="App">
       <Particles className='particles'
              params={particlesOptions}
            />
      <Navigation onRouteChange={this.onRouteChange}/>
      { this.state.route === 'signin'
      ? <Signin onRouteChange={this.onRouteChange}/>
      : <div>
          <Logo />
          <Rank />
          <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition
          box={this.state.box}
          imageUrl={this.state.imageUrl} />
      </div>
      }
      </div>
    );
  }
}

export default App;
