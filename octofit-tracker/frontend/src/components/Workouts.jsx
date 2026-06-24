import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts')
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {workouts.map((workout) => (
          <div className="col" key={workout._id || workout.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <p className="card-text mb-0"><strong>Focus:</strong> {workout.focus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
