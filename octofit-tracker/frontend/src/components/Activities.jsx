import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities')
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {activities.map((activity) => (
          <div className="list-group-item" key={activity._id}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="mb-1">{activity.type}</h5>
                <p className="mb-1">{activity.userId?.name || 'Unknown user'}</p>
                <small>{new Date(activity.date).toLocaleDateString()}</small>
              </div>
              <span className="badge bg-primary rounded-pill">{activity.durationMinutes} min</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
