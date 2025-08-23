import React, {ErrorInfo} from 'react';

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    // The `Error` type is a built-in JavaScript type.
    error: Error | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: ErrorBoundaryState) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI.
            return (
                <div className="bg-red-900 border border-red-400 text-white p-4 rounded-lg" role="alert">
                    <h2 className="font-bold text-lg mb-2">Something went wrong.</h2>
                    <p>This part of the application has crashed. Please try refreshing the page.</p>
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
        return this.props.children;
    }
}

export default ErrorBoundary;