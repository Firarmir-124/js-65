import React from 'react';
import NavBar from "../components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import Pages from "../containers/Pages/Pages";
import {Container} from "@mui/material";

function App() {
  return (
    <>
      <header>
        <NavBar/>
      </header>

      <main>
        <Container>
          <Routes>
            <Route path='/pages/:pagesName' element={(
              <Pages/>
            )}/>
            <Route path='/' element={(
              <Pages/>
            )}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
