import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';

import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { type SharedData } from '@/types';

export default function Community() {
    return (
        <UserDashboardLayout>
            <Head title="Community" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Community</h1>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Users className="h-8 w-8 text-blue-600" />
                        <h2 className="text-xl font-medium text-gray-900">Community Hub</h2>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                        Connect with fellow learners, share experiences, and grow together in our vibrant community.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h3 className="font-medium text-gray-900 mb-2">Discussion Forums</h3>
                            <p className="text-sm text-gray-600">Join conversations about courses and topics</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h3 className="font-medium text-gray-900 mb-2">Study Groups</h3>
                            <p className="text-sm text-gray-600">Form or join study groups for collaborative learning</p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h3 className="font-medium text-gray-900 mb-2">Events & Meetups</h3>
                            <p className="text-sm text-gray-600">Discover and participate in community events</p>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
