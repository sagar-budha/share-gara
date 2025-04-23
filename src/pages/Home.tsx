import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Home - FileShare</title>
      </Helmet>
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-6">
                <div className="text-center lg:text-left md:max-w-2xl md:mx-auto lg:mx-0">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Share files with </span>
                    <span className="block text-primary xl:inline">anyone, anywhere</span>
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Quick, secure, and easy file sharing. Upload files up to 200MB for free, or upgrade to Pro for 10GB file transfers.
                  </p>
                  <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                    {user ? (
                      <Button size="lg" asChild>
                        <Link to="/dashboard">
                          Go to Dashboard
                        </Link>
                      </Button>
                    ) : (
                      <>
                        <Button size="lg" asChild>
                          <Link to="/register">
                            Get Started
                          </Link>
                        </Button>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="mt-3 sm:mt-0 sm:ml-3" 
                          asChild
                        >
                          <Link to="/login">
                            Log in
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-6">
                <div className="lg:pl-8">
                  <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <img
                      className="w-full object-cover"
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt="People collaborating"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to share files effectively
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our platform provides a simple and secure way to share files with anyone.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center bg-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-gray-900">Easy Uploads</h3>
                  <p className="mt-2 text-gray-500">
                    Drag & drop file uploads make sharing content as simple as possible.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center bg-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-gray-900">Link Sharing</h3>
                  <p className="mt-2 text-gray-500">
                    Generate secure links that expire when you want them to.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center bg-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-gray-900">Secure Files</h3>
                  <p className="mt-2 text-gray-500">
                    Your files are encrypted and protected at all times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-primary-foreground">Create an account today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Pricing
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Contact
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Terms
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Privacy
              </a>
            </div>
          </nav>
          <p className="mt-8 text-center text-gray-500">
            &copy; 2025 FileShare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
