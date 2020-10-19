import React, { createRef } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme) => ({
  myMap: {
    width: "300px",
    height: "300px",
  },
}));

function MyMap({ data, setData }) {
  const classes = useStyles();

  const position = [data.lat, data.lng];

  //Use for Marker shown
  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
    //Requete Forward convertir
    //getCoordinateFromAddress(successResponse);

    // setData({ ...data, lat: latlng.lat, lng: latlng.lng });
  }, []);

  window.navigator.geolocation.getCurrentPosition(console.log, console.log);

  return (
    <div>
      <Map className={classes.myMap} center={position} zoom={data.zoom}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}></Marker>
      </Map>
    </div>
  );
}

export default MyMap;
