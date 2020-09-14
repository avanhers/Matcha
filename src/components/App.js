import React from "react";
import "./App.css";
import Menu from "./Menu.js";
import Window from "./window.js";
import CustomDrawer from "./drawer.js";

function App() {
  return (
    <div className="App">
      <Menu />
      <CustomDrawer />
      <Window />
    </div>
  );
}

export default App;
