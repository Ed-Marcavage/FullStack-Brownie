import React from "react";
import { ChainId, DAppProvider, Goerli } from "@usedapp/core";
import { Header } from "./components/Header";
import { Container } from "@material-ui/core";
import { Main } from "./components/Main";

// const config: Config = {
//   readOnlyChainId: Goerli.chainId,
//   readOnlyUrls: {
//     [Goerli.chainId]: getDefaultProvider("goerli"),
//   },
// };

function App() {
  return (
    <Container maxWidth="md">
      <Header />
      <Main />
    </Container>
  );
}

export default App;
