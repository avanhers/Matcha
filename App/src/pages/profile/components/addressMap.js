import React, { useEffect } from "react";
import MyMap from "./myMap.js";
import AddressBloc from "./addressBloc";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { apiCallGet, apiCallPost } from "../../../api/api_request.js";
import { LOCATION_ROUTE } from "../../../api/routes.js";
/*
 **********************************  FUNCTION CALL API***************************************************************************
 */
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
const getIp = (successCallback) => {
  apiCallGet(
    "https://ipapi.co/json/",
    successCallback,
    null,
    null,
    null,
    false
  );
};

const getLngLatFromIp = (ip, successCallback) => {
  const request_url =
    "http://api.ipstack.com/" +
    ip +
    "?access_key=8cf41a94491a79cca14c42935af16abc";
  apiCallGet(request_url, successCallback, null, null, null, false);
};

/*
 *******************************COMPONENT********************************
 */
function AddressMap() {
  const [dataMap, setData] = React.useState({
    lat: 48.896683,
    lng: 2.318388,
    zoom: 10,
  });

  const successIp = (response) => {
    let ip = response.data.ip;
    getLngLatFromIp(ip, succesStealAddress);
  };
  const succesStealAddress = (response) => {
    setData({
      ...dataMap,
      lat: response.data.latitude,
      lng: response.data.longitude,
    });
  };
  const successCallApi = (response) => {
    if (response.data.lng === 0 && response.data.lat === 0) {
      getIp(successIp);
    } else {
      setData({
        ...dataMap,
        lat: response.data.lat,
        lng: response.data.lng,
      });
    }
  };

  useEffect(() => {
    apiCallGet(LOCATION_ROUTE, successCallApi, null, null, null);
  }, []);

  const successResponseAddress = (response) => {
    if (response.data.results[0]) {
      const latlng = response.data.results[0].geometry;
      setData({ ...dataMap, lat: latlng.lat, lng: latlng.lng });
      apiCallPost(
        LOCATION_ROUTE,
        { lat: latlng.lat, lng: latlng.lng },
        null,
        null,
        null,
        null
      );
    }
  };

  const handleSubmit = (address) => {
    getCoordinateFromAddress(address, successResponseAddress);
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
