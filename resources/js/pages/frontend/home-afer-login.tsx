import {Head, Link, usePage } from '@inertiajs/react';
import {motion} from 'framer-motion';

import MarketplaceItemCard from '@/components/backend/marketplace-item-card'; 
import UserLayout from '@/layouts/user-layout';
import {type SharedData} from '@/types';

type ResumeKind = 'digital' | 'physical';

interface ResumeItem {
    id: number;
    title: string;
    price: number;
    image: string;
    kind: ResumeKind;
}


return (
<UserLayout>
    
    <Head title="Maketplace" />

    <div className='bg-white pb-16'>
       <div className='container mx-auto px-4 pt-8 md:pt-10'>
            {/*Welcome*/}
            <motion.header 
            initial={{ optiony: 0, y: 12 }} 
            animate={{ optiony: 1, y: 0 }}
            transition={{ duration: 0.4 }} 
            className = "mb-10 md:mb-12"
            >
                <h1 ClassName="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                    Welcome back, {firstName}{''}
                </h1>
            </motion.header>
       </div>
    </div>
    

</UserLayout>
)

