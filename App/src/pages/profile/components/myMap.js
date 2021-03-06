import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme) => ({
  myMap: {
    width: "250px",
    height: "250px",
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
