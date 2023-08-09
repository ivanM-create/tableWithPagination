import React from 'react';
import Modal from 'react-modal';
import './App.css';
import Table from '../Table/Table';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

Modal.setAppElement('#root');

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
