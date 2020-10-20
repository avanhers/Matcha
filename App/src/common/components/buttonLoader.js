import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
function ButtonLoader({ fetching, handleClick, buttonText }) {
  {
    return (
      <div>
        {fetching ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
  }
}
export default ButtonLoader;
