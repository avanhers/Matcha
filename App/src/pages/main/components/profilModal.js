import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import GoogleMapReact from "google-map-react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  //   paper: {
  //     backgroundColor: theme.palette.background.paper,
  //     border: "2px solid #000",
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(2, 4, 3),
  //   },
  card: {
    width: "30%",
    height: "auto",
  },
}));

export default function ProfilModal({ open, handleClose, user }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        onBackdropClick={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          {/* <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div> */}
          <Card className={classes.card}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={user.avatar}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user.age} ans
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {user.username}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {user.description}
              </Typography>
            </CardContent>
          </Card>
        </Zoom>
      </Modal>
    </div>
  );
}
