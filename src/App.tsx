import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
