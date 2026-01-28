import React from 'react';

const Login = () => {
  return (
    <div className="card mx-auto shadow" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h3 className="text-center">Login</h3>
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" />
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;