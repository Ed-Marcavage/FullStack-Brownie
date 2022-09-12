import React from "react";
import { ChainId, DAppProvider } from "@usedapp/core";
import { Header } from "./components/Header";
import { Container } from "@material-ui/core";
import { Main } from "./components/main";

function App() {
  return (
    <DAppProvider
      config={{
        supportedChains: [ChainId.Kovan, ChainId.Rinkeby],
      }}
    >
      <Header />
      <Container maxWidth="md">
        <div>Hello.</div>
        <Main />
      </Container>
    </DAppProvider>
  );
}

export default App;
