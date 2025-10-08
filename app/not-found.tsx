'use client';


import Button from '@/components/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';


const NotFoundClient = () => {

    return (
    <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl text-center">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
            <p className="text-muted-foreground mb-6">Try going back or head to the homepage.</p>


            <div className="flex items-center justify-center">
                <Button title="Back to Home" redirectedRoute="/" version='redirect'/>
            </div>
        </div>
    </div>
    );
}

export default NotFoundClient;