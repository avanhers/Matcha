import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
function ChatText() {
  const [data, setData] = React.useState("");
  const handleChange = (e) => {
    setData(e.value);
  };
  const handleSubmit = () => {
    console.log("submit");
  };

  const renderTextField = (name, label) => {
    return (
      <TextField
        style={{ width: "70%" }}
        required
        id={name}
        rows={4}
        label={label}
        multiline={true}
        value={data}
        onChange={handleChange}
      />
    );
  };

  return (
    <form>
      {renderTextField()}
      <div>
        <Button variant="contained" onClick={handleSubmit}>
          Valider
        </Button>
      </div>
    </form>
  );
}

export default ChatText;
