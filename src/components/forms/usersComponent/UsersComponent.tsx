import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectUserError,
  selectUserStatus,
  User,
} from "../../../store/slices/usersSlice";
import { getAll } from "../../../store/thunks/thunksUser";

const UsersComponent = () => {
  const dispatch = useAppDispatch();
  debugger;
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAll());
    }
  }, [status, dispatch]);

  return (
    <div className="users-container">
      <h2>Users List</h2>

      {status === "loading" && <div className="loader">Loading...</div>}

      {status === "failed" && (
        <div className="error">
          Error: {error}
          <button onClick={() => dispatch(getAll())}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default UsersComponent;
