import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import DataTable from './components/DataTable';

function App() {
  const [selectedAluno, setSelectedAluno] = useState(null);

  const handleSelectedAluno = (aluno) => {
    setSelectedAluno(aluno);
  };

  const refreshData = () => {
    setSelectedAluno(null);
  };

  return (
    <div className="App">
      <h2>CRUD Desenvolvedor Web Cloud AWS</h2>
      <Form selectedAluno={selectedAluno} refreshData={refreshData} />
      <DataTable setSelectedAluno={handleSelectedAluno} />
    </div>
  );
}

export default App;
