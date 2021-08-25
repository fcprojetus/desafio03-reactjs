import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repo, setRepo] = useState([])

  useEffect(() => {
    api.get('repositories').then(resp => setRepo(resp.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        title: `Nodejs - ${Date.now()}`,
        url: "www.github.com",
        techs: ["Node, Reactjs"]
      }
    )
    setRepo([...repo, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepo(()=> repo.filter(item=> item.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.length ?
          repo.map(repo =>
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ) : null}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
