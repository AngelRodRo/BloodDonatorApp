import React from 'react';
import * as esriLoader from 'esri-loader';
import haversine from 'haversine';
import URI from 'urijs';
import { browserHistory } from 'react-router';

const imageData = "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";
const imgMarker = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMjg2RTIxOUQyNzExMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMjg2RTIxQUQyNzExMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIyODZFMjE3RDI3MTExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIyODZFMjE4RDI3MTExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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";


class Map extends React.Component{

  checkedChoose(){
    return localStorage.isChecked === "true"? true:false;
  }

  constructor(props){
    super(props);

    if(!this.checkedChoose()) return browserHistory.push('/map');

    let uri = new URI(location.href);
    let query = uri.query(true);

    if(query.post) this.props.showMyInfo(query.post);

    this.initEventsSocket();

    this.state = {
      myPosition:{},
      map: "",
      donors: [],
      Point:"",
      SimpleMarkerSymbol:"",
      Graphic:"",
      GraphicsLayer:"",
      isFirstPosition:false,
      myRadius:""
    };

  }

  initEventsSocket(){
    this.socket = this.props.socket;
    this.socket.on('connect', function(){ alert('conectado') });
    this.socket.on('new post',this.newPostEvent);    
    this.socket.on('delete donor',this.deletePostEvent);
    this.socket.on('update post',this.updatePostEvent);
  }

  updatePostEvent(data){
   let {PictureMarkerSymbol} = this.state;

   var symbol = new  PictureMarkerSymbol({
      "angle":0,
      "xoffset":0,
      "yoffset":0,
      "type":"esriPMS",
      "url":"http://static.arcgis.com/images/Symbols/Basic/esriCrimeMarker_86.png",
      "imageData":imgMarker,
      "contentType":"image/png",
      "width":50,"height":50});
    this.addMarker(data.longitude,data.latitude,symbol,{id:data._id});

  }

  addMarker(latitude,longitude, symbol,attributes){
    let { map, Point, PictureMarkerSymbol, Graphic,GraphicsLayer}  = this.state;
    var point = new Point([latitude, longitude]);

    let graphic = "";
    if(attributes){
      map.graphics.remove(attributes);  

      graphic = new Graphic(point,symbol,attributes);
    }else
      graphic = new Graphic(point,symbol);

    map.graphics.add(graphic);  

      // else map.graphics.add(new Graphic(point,symbol,attributes));
  }

  drawMyPosition(latitude,longitude){

    let {PictureMarkerSymbol, map} = this.state;

    var symbol = new  PictureMarkerSymbol({
      "angle":0,
      "xoffset":0,
      "yoffset":0,
      "type":"esriPMS",
      "url":"http://static.arcgis.com/images/Symbols/Basic/esriCrimeMarker_86.png",
      "imageData":imageData,
      "contentType":"image/png",
      "width":24,"height":24});
    debugger;
    this.addMarker(latitude,longitude,symbol);
    
  }

  newPostEvent(data){
    let {PictureMarkerSymbol} = this.state;
    var symbol = new  PictureMarkerSymbol({
      "angle":0,
      "xoffset":0,
      "yoffset":0,
      "type":"esriPMS",
      "url":"http://static.arcgis.com/images/Symbols/Basic/esriCrimeMarker_86.png",
      "imageData":imgMarker,
      "contentType":"image/png",
      "width":50,"height":50});
    console.log(data)
    this.addMarker(data.longitude,data.latitude,symbol,{id:data._id});

  }

  updateDonorEvent(data){

  }

  deletePostEvent(data){
      let { map}  = this.state;
      console.log('Entro aqui')
      map.graphics.remove(data);  

  }

  loadADonator(id){
    fetch("/api/posts/"+id)
      .then((response)=>{
        return response.json().then((data) => {

          this.props.getPost(data.post)

        });

      })
  }
  
  loadAllDonators(){

    var {map} = this.state;

    let position = {
      latitude:this.state.myPosition.latitude,
      longitude:this.state.myPosition.longitude
    }



    var uri = new URI("/api/posts");
    uri.addQuery("latitude",this.state.myPosition.latitude);
    uri.addQuery("longitude",this.state.myPosition.longitude);
    uri.addQuery("radius",this.state.myRadius);

    fetch(uri.toString())
      .then((response) =>{
        return response.json().then((data) => {
          this.setState({donors:data.posts})

          this.drawMyPosition(this.state.myPosition.longitude,this.state.myPosition.latitude);

          for (var i = 0,donor; donor = data.posts[i]; i++) {
            this.newPostEvent(donor);
          }

        });
      })
  }

  getSavedLocation(){

    let rawLocation = localStorage.position,
        myPosition = rawLocation? JSON.parse(rawLocation):"";

    return myPosition;
  }

  saveLocation(position){
    //Save the position as a String Object
    return localStorage.position = JSON.stringify(position);
  }

  getMyLocation(){
    // Get our location with the location API from browser
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let map = this.state.map;

        let mPosition = {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude        
        }

        map.centerAndZoom([mPosition.longitude,mPosition.latitude],15);
        this.drawMyPosition(mPosition.longitude,mPosition.latitude); 

        // Save value and state of my position 
        // Save the location in localStorage for automatically get the last location
        this.saveLocation(mPosition);
        this.setState({myPosition:mPosition});

        setTimeout(()=> {
            this.loadAllDonators();
        },1000)
      });
    }

  }

  onLoadMap(){

  }

  componentDidMount(){

    //Load ArgGIS Script
    esriLoader.bootstrap((err) => {
      if (err) {
        console.error(err);
      } else {
      }
    }, {
      url: '//js.arcgis.com/3.20/'
    });


    // Load Map plugin
    esriLoader.dojoRequire(
      [ "esri/map",        
        "esri/geometry/Point",
        "esri/symbols/Symbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/graphic", 
        "esri/symbols/PictureMarkerSymbol",
        "esri/layers/GraphicsLayer",
        "esri/tasks/query",
        "esri/layers/FeatureLayer",
        "esri/geometry/Extent"
      ], (Map,Point,Symbol, SimpleMarkerSymbol, Graphic, PictureMarkerSymbol, GraphicsLayer,Query,FeatureLayer,Extent) => {

      this.setState({ Point, Symbol, SimpleMarkerSymbol, Graphic, PictureMarkerSymbol, GraphicsLayer,Query });

      let myPosition = this.getSavedLocation();

      let opts = {
        zoom: 15,
        basemap: 'gray'      
      }
      let open = this.props.open;


      //Check if exist a last position for order to get 
      if(myPosition){
        opts.center = [myPosition.longitude,myPosition.latitude];
      } 

      //Get state for order know is a donnor or not
      let isDonor =  localStorage.isDonor === "true"? true:false;
      console.log(isDonor)
      //Load Map from esri modules
      let map = new Map('mapNode', opts); 
      map.on("load",() => {
        this.getMyLocation();      
        this.drawMyPosition(myPosition.latitude,myPosition.longitude);
        //If its not a donnor then it load all pins about donnors 

        map.graphics.on("click",(e)=>{
          if(isDonor)  open();
          else{
            console.log(e)
            this.loadADonator(e.graphic.attributes.id);
          }
        });
      })
      map.on("extent-change",(extent)=>{
        var geo = map.geographicExtent;


        let {PictureMarkerSymbol} = this.state;
        //map.graphics.clear();

        var symbol = new  PictureMarkerSymbol({
          "angle":0,
          "xoffset":0,
          "yoffset":0,
          "type":"esriPMS",
          "url":"http://static.arcgis.com/images/Symbols/Basic/esriCrimeMarker_86.png",
          "imageData":imageData,
          "contentType":"image/png",
          "width":24,"height":24});


          let myPosition = {
            latitude:this.state.myPosition.latitude,
            longitude: this.state.myPosition.longitude
          }

          //Get current radius from viewport of map
          let radius = haversine(myPosition, { latitude: geo.ymin, longitude: geo.xmin});
          this.setState({myRadius: radius})
          this.loadAllDonators();

      });

      //Update state of map
      this.setState({map:map});
    });


  }
  
  render(){

    const style = {
      height: "100vh"
    }

    return (
      <div style={style} id="mapNode"></div>
    );
  }  
}

export default Map;