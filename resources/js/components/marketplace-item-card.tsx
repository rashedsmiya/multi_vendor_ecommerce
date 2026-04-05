import { motion } from 'framer-motion';
import { Star, Clock, Users } from 'lucide-react';

interface MarketplaceItemCardProps {
    image: string;
    providerImage: string;
    title: string;
    description: string;
    providerName: string;
    rating: number;
    reviewCount: number;
    price: number;
    verified: boolean;
    duration?: string;
    sessionType?: string;
    courseLength?: string;
    pacing?: string;
    delay?: number;
}

export default function MarketplaceItemCard({
    image,
    providerImage,
    title,
    description,
    providerName,
    rating,
    reviewCount,
    price,
    verified,
    duration,
    sessionType,
    courseLength,
    pacing,
    delay = 0,
}: MarketplaceItemCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {verified && (
                    <div className="absolute left-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                        Verified
                    </div>
                )}
            </div>
            
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <img
                        src={providerImage}
                        alt={providerName}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{description}</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{providerName}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
                </div>
                
                {(duration || courseLength) && (
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        {duration && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {duration}
                            </div>
                        )}
                        {sessionType && (
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {sessionType}
                            </div>
                        )}
                        {courseLength && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {courseLength}
                            </div>
                        )}
                        {pacing && (
                            <div className="text-sm text-gray-600">{pacing}</div>
                        )}
                    </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-900">${price}</span>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                        Book Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
