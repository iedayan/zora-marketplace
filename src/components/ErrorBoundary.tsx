import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
      <div className="card max-w-md w-full mx-4 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Something went wrong</h2>
        <p className="text-slate-600 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>
        
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 transition-colors">
            Show error details
          </summary>
          <pre className="mt-2 p-3 bg-slate-100 rounded-lg text-xs overflow-auto max-h-32 text-red-600">
            {error.message}
          </pre>
        </details>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetError}
            className="btn-primary flex-1"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary flex-1"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
