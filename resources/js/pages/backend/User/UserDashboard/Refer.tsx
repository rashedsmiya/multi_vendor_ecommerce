import React from 'react';

const Refer: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Refer & Earn</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Invite Friends</h2>
                <p className="text-gray-600 mb-4">
                    Share your referral link with friends and earn rewards when they join.
                </p>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Referral Link
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                readOnly
                                value="https://example.com/ref?code=USER123"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Copy
                            </button>
                        </div>
                    </div>
                    
                    <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">How it works:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600">
                            <li>Share your referral link with friends</li>
                            <li>Your friend signs up using your link</li>
                            <li>You both earn rewards when they make their first purchase</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refer;
