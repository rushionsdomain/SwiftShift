import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Authentication from "./components/Authentication";
import InventoryChecklist from "./components/InventoryChecklist";
import LocationInput from "./components/LocationInput";
import QuoteApproval from "./components/QuoteApproval";
import Notification from "./components/Notification";

const App = () => (
  <Provider store={store}>
    <div>
      <h1>Welcome to Movers App</h1>
      <Authentication />
      <InventoryChecklist />
      <LocationInput />
      <QuoteApproval />
      <Notification />
    </div>
  </Provider>
);

export default App;
