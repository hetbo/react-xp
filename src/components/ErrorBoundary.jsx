import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // This lifecycle method is called when an error is thrown in a child component.
    // It should return a new state object to trigger a re-render with the fallback UI.
    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    // This lifecycle method is used for logging the error information.
    componentDidCatch(error, errorInfo) {
        // In a real application, you would log this to an error reporting service
        // like Sentry, LogRocket, or your own logging endpoint.
        console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI.
            return (
                <div className="bg-red-900 border border-red-400 text-white p-4 rounded-lg" role="alert">
                    <h2 className="font-bold text-lg mb-2">Something went wrong.</h2>
                    <p>This part of the application has crashed. Please try refreshing the page.</p>
                    {/* Optionally display error details during development */}
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-4 text-sm">
                            <summary>Error Details</summary>
                            <pre className="mt-2 whitespace-pre-wrap">
                {this.state.error && this.state.error.toString()}
              </pre>
                        </details>
                    )}
                </div>
            );
        }

        // If there's no error, just render the children as normal.
        return this.props.children;
    }
}

export default ErrorBoundary;