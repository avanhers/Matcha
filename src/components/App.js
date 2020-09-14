import React from "react";
import "./App.css";
import Menu from "./Menu.js";
import Window from "./window.js";
import CustomDrawer from "./drawer.js";
import PersistentDrawerLeft from "./newMenu.js";

function App() {
  return (
    <div className="App">
      <PersistentDrawerLeft />
    </div>
  );
}

export default App;
