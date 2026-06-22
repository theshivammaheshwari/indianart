'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Global error boundary that catches client-side exceptions and shows a
 * friendly recovery UI instead of a blank "Application error" screen.
 * Placed at the root layout level to catch errors from any page or component.
 */
export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[GlobalErrorBoundary] caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-6 px-4">
          <div className="text-5xl">🎨</div>
          <h1 className="text-2xl font-bold text-center">Something went wrong</h1>
          <p className="text-muted-foreground text-center max-w-md">
            A rendering error occurred. Please refresh the page to continue.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
