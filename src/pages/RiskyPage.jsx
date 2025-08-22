import { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

// This component will throw an error if the count reaches 3.
function CrashingCounter() {
    const [count, setCount] = useState(0);

    if (count === 3) {
        throw new Error("I've crashed on purpose!");
    }

    return (
        <div className="text-center">
            <p className="text-xl mb-2">Count: {count}</p>
            <button
                onClick={() => setCount(count + 1)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
            >
                Increment
            </button>
            <p className="text-sm text-gray-400 mt-2">(This will crash at 3)</p>
        </div>
    );
}

function RiskyPage() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-4">Error Boundary Test</h1>
            <p className="text-lg text-gray-300 mb-8">
                The component below is wrapped in an Error Boundary. Click the button to increment the counter.
                When it reaches 3, it will throw an error. Notice how the rest of the application (like the sidebar)
                remains interactive and does not crash.
            </p>

            <div className="bg-gray-800 p-8 rounded-lg">
                {/* Wrap the component that might crash in the ErrorBoundary */}
                <ErrorBoundary>
                    <CrashingCounter />
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default RiskyPage;