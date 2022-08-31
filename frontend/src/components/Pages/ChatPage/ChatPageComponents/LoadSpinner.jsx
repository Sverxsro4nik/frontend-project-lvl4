import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadSpinner = () => (
  <div className="d-flex justify-content-center h-100 col-12">
    <Spinner animation="border" variant="primary" size="lg">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadSpinner;
