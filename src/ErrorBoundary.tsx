import { Component } from "react";
import Error from "./Error";
interface ErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
  fallbackRender?: (args: { error: Error }) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallbackRender) {
        return (
          <div>
            {this.props.fallbackRender({ error: this.state.error })}
            <button onClick={this.handleReset}>Retry</button>
          </div>
        );
      }
      return <Error error={this.state.error.message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
