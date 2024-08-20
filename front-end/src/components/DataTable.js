import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = ({ setSelectedAluno }) => {
  const [alunos, setAlunos] = useState([]);

  const fetchAlunos = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/alunos');
      setAlunos(result.data);
    } catch (error) {
      console.error("There was an error fetching the alunos!", error);
    }
  };

  useEffect(() => {
    fetchAlunos(); // Initial fetch
    const intervalId = setInterval(fetchAlunos, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const handleEdit = (aluno) => {
    setSelectedAluno(aluno);
  };

  return (
    <section className="data-table">
      <h3>Lista de Alunos</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Nota1</th>
            <th>Nota2</th>
            <th>Professor</th>
            <th>Sala</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.idade}</td>
              <td>{aluno.notaPrimeiroSemestre}</td>
              <td>{aluno.notaSegundoSemestre}</td>
              <td>{aluno.nomeProfessor}</td>
              <td>{aluno.numeroSala}</td>
              <td>
                <button onClick={() => handleEdit(aluno)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DataTable;
