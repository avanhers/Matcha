import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import BlockIcon from "@material-ui/icons/Block";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import WarningIcon from "@material-ui/icons/Warning";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
function ActionBloc(user, clickLike, clickBlock, clickReport) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={user.isLiked}
                onClick={clickLike}
              />
            }
            label="Like"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<BlockIcon />}
                cheked={user.isBlocked}
                onClick={clickBlock}
              />
            }
            label="Bloque"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<WarningIcon />}
                checkedIcon={<ReportProblemIcon />}
                cheked={user.isReported}
                onClick={clickReport}
              />
            }
            label="signaler "
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ActionBloc;
