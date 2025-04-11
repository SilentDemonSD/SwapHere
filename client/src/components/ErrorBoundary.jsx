// client/src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#fff', textAlign: 'center', padding: '20px' }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;