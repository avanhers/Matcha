import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
/*
 ******************** CSS STYLE ********************
 */
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));


/*
 ******************** Component ********************
 */
export default function ConnectionModal({
  open,
  handleClose,
  userRequest,
  getUser,
  requestUser,
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [data, setData] = React.useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    console.log(event);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value })
  };

  const onSubmit = () => {
    console.log(data);
    requestUser({});
    const timer = setTimeout(() => {
      axios
        .post("http://localhost/api/auth/inscription", {
          email: "tt@gmail.com",
          password: "asasdwdwdasd",
          username: "toto",
          firstname: "titi",
          name: "tata",
        })
        .then((response) => {
          let err = response.data.error;
          if (err) console.log("Error message", err);
          console.log(response);
          getUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          getUser({ login: "banane" });
        });
    }, 1000);
    // axios
    //   .post("http://localhost:8080/login", {
    //     email: data.email,
    //     password: data.password,
    //   })
    //   .then((response) => {
    //     let err = response.data.error;
    //     if (err) console.log("Error message", err);
    //     console.log(response);
    //     getUser(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  /*
   ******************** Render methods ********************
   */
  const renderTextField = (name, label, type) => {
    return (
      <TextField
        required
        id={name}
        label={label}
        value={data[name]}
        variant="outlined"
        name={name}
        //error={data.showError[name]}
        //helperText={data.error[name]}
        onChange={onInputChange}
        //onBlur={handleBlur}
        type={type}
      // onFocus={handleFocus}
      />
    );
  };

  const renderMdpOublie = () => {
    return (<div>
      <Link component={RouterLink} variant="body2" to="/profil">
        {'mot de passe oublié'}
      </Link>
    </div>)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Connexion</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.formContainer}>
          {renderTextField("email", "Adresse email", "text")}
          {renderTextField("password", "Mdp", "password")}
          {renderMdpOublie()}
        </div>
        {userRequest.isFetching ? (
          <CircularProgress />
        ) : (
            <Button variant="outlined" onClick={onSubmit}>
              Valider
            </Button>
          )}
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onBackdropClick={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
