import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = ({ selectedAluno, refreshData }) => {
  const [aluno, setAluno] = useState({
    id: '',
    nome: '',
    idade: '',
    notaPrimeiroSemestre: '',
    notaSegundoSemestre: '',
    nomeProfessor: '',
    numeroSala: ''
  });

  useEffect(() => {
    if (selectedAluno) {
      setAluno(selectedAluno);
    } else {
      setAluno({
        id: '',
        nome: '',
        idade: '',
        notaPrimeiroSemestre: '',
        notaSegundoSemestre: '',
        nomeProfessor: '',
        numeroSala: ''
      });
    }
  }, [selectedAluno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertendo tipos
    const alunoToSend = {
      ...aluno,
      idade: parseInt(aluno.idade, 10), // Convertendo idade para inteiro
      notaPrimeiroSemestre: parseFloat(aluno.notaPrimeiroSemestre), // Convertendo para decimal
      notaSegundoSemestre: parseFloat(aluno.notaSegundoSemestre) // Convertendo para decimal
    };

    console.log('Dados enviados:', alunoToSend); // Verifique o que está sendo enviado

    try {
      if (alunoToSend.id) {
        await axios.put(`http://localhost:8080/api/alunos/${alunoToSend.id}`, alunoToSend);
      } else {
        await axios.post('http://localhost:8080/api/alunos', alunoToSend);
      }
      // Reset após sucesso
      setAluno({
        id: '',
        nome: '',
        idade: '',
        notaPrimeiroSemestre: '',
        notaSegundoSemestre: '',
        nomeProfessor: '',
        numeroSala: ''
      });
      refreshData();
    } catch (error) {
      console.error("There was an error saving the aluno!", error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/alunos/${aluno.id}`);
      setAluno({
        id: '',
        nome: '',
        idade: '',
        notaPrimeiroSemestre: '',
        notaSegundoSemestre: '',
        nomeProfessor: '',
        numeroSala: ''
      });
      refreshData();
    } catch (error) {
      console.error("There was an error deleting the aluno!", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>ID do aluno</label>
      <input
        name="id"
        type="text"
        value={aluno.id}
        onChange={handleChange}
        placeholder="ID"
        readOnly
      />

      <label>Nome do aluno</label>
      <input
        name="nome"
        type="text"
        value={aluno.nome}
        onChange={handleChange}
        placeholder="Nome"
        required
      />

      <label>Idade do aluno</label>
      <input
        name="idade"
        type="text"
        value={aluno.idade}
        onChange={handleChange}
        placeholder="Idade"
        required
      />

      <label>Nota do primeiro semestre</label>
      <input
        name="notaPrimeiroSemestre"
        type="text"
        value={aluno.notaPrimeiroSemestre}
        onChange={handleChange}
        placeholder="Nota 1"
        required
      />

      <label>Nota do segundo semestre</label>
      <input
        name="notaSegundoSemestre"
        type="text"
        value={aluno.notaSegundoSemestre}
        onChange={handleChange}
        placeholder="Nota 2"
        required
      />

      <label>Nome do Professor</label>
      <input
        name="nomeProfessor"
        type="text"
        value={aluno.nomeProfessor}
        onChange={handleChange}
        placeholder="Nome do Professor"
        required
      />

      <label>Número da Sala</label>
      <input
        name="numeroSala"
        type="text"
        value={aluno.numeroSala}
        onChange={handleChange}
        placeholder="Número"
        required
      />

      <div className="form-buttons">
        <button type="submit">Salvar</button>
        {aluno.id && (
          <button type="button" onClick={handleDelete}>Excluir</button>
        )}
        <button
          type="reset"
          onClick={() => setAluno({
            id: '',
            nome: '',
            idade: '',
            notaPrimeiroSemestre: '',
            notaSegundoSemestre: '',
            nomeProfessor: '',
            numeroSala: ''
          })}
        >
          Limpar
        </button>
      </div>
    </form>
  );
};

export default Form;
