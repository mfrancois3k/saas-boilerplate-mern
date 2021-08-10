import { BrowserRouter } from "react-router-dom";

//import screens for app (routes)
import Routes from "./views/Routes";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
