// app/components/ErrorBoundary.js
"use client";

import React, { Component } from "react";
import styles from "./ErrorBoundary.module.scss";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                this.props.fallback || (
                    <div className={styles.errorContainer}>
                        <h2>Something went wrong</h2>
                        <p>Please try again later</p>
                        <button
                            className={styles.retryButton}
                            onClick={() => this.setState({ hasError: false })}
                        >
                            Try again
                        </button>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
