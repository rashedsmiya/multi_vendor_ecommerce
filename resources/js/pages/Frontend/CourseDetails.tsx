import FrontendLayout from '@/layouts/frontend-layout';
import { Head } from '@inertiajs/react';

interface CourseDetailsProps {
    course: {
        id: number;
        title: string;
        description: string | null;
        price: number;
        currency: string;
        is_free: boolean;
        average_rating: number | null;
        thumbnail: string | null;
        instructor: string | null;
        category: string | null;
    };
}

export default function CourseDetails({ course }: CourseDetailsProps) {
    return (
        <FrontendLayout>
            <Head title={course.title} />

            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-6 text-3xl font-bold">{course.title}</h1>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        {course.thumbnail && (
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="mb-6 h-64 w-full rounded-lg object-cover"
                            />
                        )}

                        <div className="prose max-w-none">
                            {course.description && (
                                <p className="mb-4 text-gray-600">
                                    {course.description}
                                </p>
                            )}

                            <div className="mt-8">
                                <h3 className="mb-4 text-xl font-semibold">
                                    Course Information
                                </h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <h4 className="mb-2 font-medium">
                                            Price
                                        </h4>
                                        <p className="text-gray-600">
                                            {course.is_free
                                                ? 'Free'
                                                : `${course.price} ${course.currency}`}
                                        </p>
                                    </div>
                                    {course.average_rating && (
                                        <div>
                                            <h4 className="mb-2 font-medium">
                                                Rating
                                            </h4>
                                            <p className="text-gray-600">
                                                {course.average_rating} / 5
                                            </p>
                                        </div>
                                    )}
                                    {course.instructor && (
                                        <div>
                                            <h4 className="mb-2 font-medium">
                                                Instructor
                                            </h4>
                                            <p className="text-gray-600">
                                                {course.instructor}
                                            </p>
                                        </div>
                                    )}
                                    {course.category && (
                                        <div>
                                            <h4 className="mb-2 font-medium">
                                                Category
                                            </h4>
                                            <p className="text-gray-600">
                                                {course.category}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
