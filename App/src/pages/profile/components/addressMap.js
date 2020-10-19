import React from "react";
import MyMap from "./myMap.js";
import AddressBloc from "./addressBloc";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const configureUrl = (address) => {
  const apikey = "6b78bee836a544138abee2c3fb172c91";
  const api_url = "https://api.opencagedata.com/geocode/v1/json";
  const request_url =
    api_url +
    "?" +
    "key=" +
    apikey +
    "&q=" +
    encodeURIComponent(address) +
    "&pretty=1" +
    "&no_annotations=1";
  return request_url;
};

const getCoordinateFromAddress = (address, successCallback) => {
  const request_url = configureUrl(address);
  axios
    .get(request_url)
    .then((response) => {
      successCallback(response);
    })
    .catch((error) => {
      console.log("ici catch");
    });
};

function AddressMap() {
  const [dataMap, setData] = React.useState({
    lat: 48.896683,
    lng: 2.318388,
    zoom: 10,
  });

  const successResponse = (response) => {
    if (response.data.results[0]) {
      const latlng = response.data.results[0].geometry;
      setData({ ...dataMap, lat: latlng.lat, lng: latlng.lng });
    }
  };

  const handleSubmit = (address) => {
    getCoordinateFromAddress(address, successResponse);
  };

  return (
    <div>
      <Paper style={{ backgroundColor: "#F9F7F7" }}>
        <AddressBloc handleSubmit={handleSubmit} />
        <MyMap data={dataMap} />
      </Paper>
    </div>
  );
}
export default AddressMap;
