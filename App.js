import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { store, persistor } from "./store/store";
import Screenomics from "./Screenomics";
import Network from "./Network";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Screenomics/>
          <Network/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
