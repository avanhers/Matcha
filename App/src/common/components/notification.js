import React from "react";
// import { makeStyles, useTheme } from "@material-ui/core";

import NotificationPopover from "./notificationPopover.js";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useApiCall } from "../../api/api_request.js";
import { GET_NOTIFICATIONS, LOG_OUT_ROUTE } from "../../api/routes.js";

const apiCallNotifConfig = {
  route: GET_NOTIFICATIONS,
  method: "GET",
};

const apiCallPutNotifConfig = {
  route: GET_NOTIFICATIONS,
  method: "PUT",
};

//TODO : Using Redux to open component
function Notification({ socket }) {
  const [nbNotif, setNbNotif] = React.useState(0);
  const [hasLoadedNotifs, setHasLoadedNotifs] = React.useState(false);
  const [listNotif, setListNotif] = React.useState([]);
  const apiCallNotif = useApiCall(apiCallNotifConfig);
  const apiCallReadNotif = useApiCall(apiCallPutNotifConfig);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const addToNotifs = (data) => {
    const newNotif = [...listNotif, ...data];
    setListNotif(newNotif);
    setNbNotif(newNotif.length);
  };

  const successNotif = (response) => {
    console.log("notifs: ", response.data.notifs);
    addToNotifs(response.data.notifs);
  };
  React.useEffect(() => {
    if (!hasLoadedNotifs && socket) {
      apiCallNotif(null, successNotif);
      setHasLoadedNotifs(true);
    }
    return () => console.log("headbar demount");
  }, [socket]);

  React.useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        console.log("data de notif: ", data);
        addToNotifs([data]);
      });
    }
    return () => console.log("headbar demount");
  }, [listNotif]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const successRead = () => {
    setNbNotif(0);
  };

  const handleClickOnNotif = (event) => {
    if (listNotif.length !== 0) {
      setAnchorEl(event.currentTarget);
      apiCallReadNotif({}, successRead);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOnNotif} color="inherit">
        <Badge badgeContent={nbNotif} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <NotificationPopover
        anchorEl={anchorEl}
        handleClose={handleClose}
        notifs={listNotif}
      ></NotificationPopover>
    </div>
  );
}

export default Notification;
