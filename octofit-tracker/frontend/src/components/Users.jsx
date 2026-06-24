import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users')
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {users.map((user) => (
          <div className="col" key={user._id || user.email}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="card-text mb-1"><strong>Age:</strong> {user.age}</p>
                <p className="card-text"><strong>Goal:</strong> {user.fitnessGoal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
