import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Create Your Account
            </h1>
            
            <SignupForm />
            
            <div className="mt-6">
              <div className="text-sm text-center">
                Already have an account?{' '}
                <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Login
                </a>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
