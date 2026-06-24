import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams')
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {teams.map((team) => (
          <div className="col" key={team._id || team.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
