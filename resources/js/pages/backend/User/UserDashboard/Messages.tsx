import React from 'react';

export default function Messages() {
    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Messages
                </h1>
                
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <div className="text-center py-12">
                        <div className="text-gray-500 dark:text-gray-400">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No messages yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Your messages will appear here when you start conversations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
