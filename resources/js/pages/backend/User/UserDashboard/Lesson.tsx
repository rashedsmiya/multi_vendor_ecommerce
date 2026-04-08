import { usePage } from '@inertiajs/react';
import React from 'react';

interface PageProps {
    course: string;
}

export default function Lesson() {
    const { course } = usePage<PageProps>().props;

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Lesson</h1>
                <p className="text-gray-600">Course: {course}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Lesson Content</h2>
                <p className="text-gray-600 mb-4">
                    Your lesson content for {course} will appear here.
                </p>
                
                <div className="flex justify-between items-center">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                        Previous Lesson
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Next Lesson
                    </button>
                </div>
            </div>
        </div>
    );
}
