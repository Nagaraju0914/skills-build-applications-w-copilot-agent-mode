import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard')
      .then((data) => setEntries(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {entries.map((entry, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || index}>
            <div>
              <h5 className="mb-1">#{index + 1} {entry.userId?.name || 'Unknown user'}</h5>
              <p className="mb-0">{entry.teamId?.name || 'No team'}</p>
            </div>
            <span className="badge bg-success rounded-pill">{entry.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
