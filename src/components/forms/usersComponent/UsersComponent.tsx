import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { User } from '../../../store/slices/usersSlice';
import { getAll } from '../../../store/thunks/thunksUser';


const UsersComponent = () => {
    const dispatch = useAppDispatch();

    const { users, status, error } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (status === 'idle') {
        dispatch(getAll());
        }
    }, [status, dispatch]);

    const handleUserClick = (user: User) => {
        console.log('Clicked user data:', user);
    };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      
      {status === 'loading' && <div className="loader">Loading...</div>}
      
      {status === 'failed' && (
        <div className="error">
          Error: {error}
          <button onClick={() => dispatch(getAll())}>Retry</button>
        </div>
      )}
      
      {status === 'succeeded' && (
        <ul className="users-list">
          {users.map((user) => (
            <li key={user.id} className="user-item" onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
              <div className="user-info">
                <strong>{user.nickname}</strong>
                <span>@{user.login}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersComponent;