import React, { useRef, useEffect } from "react";
// import { makeStyles, useTheme } from "@material-ui/core";

import NotificationPopover from "./notificationPopover.js";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useApiCall } from "../../api/api_request.js";
import { GET_NOTIFICATIONS } from "../../api/routes.js";

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
  const [listNotif, setListNotif] = React.useState([])
  const apiCallNotif = useApiCall(apiCallNotifConfig);
  const apiCallReadNotif = useApiCall(apiCallPutNotifConfig);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMounted = useRef(false);
  const refNbNotif = useRef(nbNotif);

  //useEffect call once to enable listening on notification
  useEffect(() => {
    isMounted.current = true;
    if (socket && isMounted.current) {
      socket.on("notification", notifHandler);
    }
    return () => {
      if (socket) {
        isMounted.current = false
        socket.off("notification", notifHandler)
      }
    }
  }, [socket]);

  //UseEffect call once to obtain NbNotif 
  useEffect(() => {
    apiCallNotif(null, successNotif);
  }, []);

  // UseEffect call everytime to change reference value
  useEffect(() => {
    refNbNotif.current = nbNotif;
  });

  const notifHandler = (data) => {
    setNbNotif(refNbNotif.current + 1);
  }

  const successNotif = (response) => {
    setNbNotif(response.data.notifs.length);
    //
  }

  const handleClickOnNotif = (event) => {
    if (nbNotif !== 0) {
      setAnchorEl(event.currentTarget);
      setNbNotif(0);
      apiCallNotif(null, successObtainNotif);
      apiCallReadNotif({}, null);
    }
  };

  const successObtainNotif = (response) => {
    setListNotif(response.data.notifs)

  }
  const handleClose = () => {
    setAnchorEl(null);
    setListNotif([]);
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
