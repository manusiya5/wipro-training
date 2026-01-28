import React from 'react';

const Contact = () => {
  return (
    <div className="container">
      <h2 className="text-center">Contact Us</h2>

      <form className="mt-3 w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4"></textarea>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
