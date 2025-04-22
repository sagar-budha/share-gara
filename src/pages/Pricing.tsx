import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { toast } from "../components/ui/use-toast";
import { Check } from "lucide-react";

export default function Pricing() {
  const { user, upgradeAccount } = useAuth();
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    if (!user) {
      navigate("/register");
      return;
    }
    
    // In a real app, this would redirect to a payment page
    upgradeAccount();
    toast({
      title: "Success",
      description: "Your account has been upgraded to Pro!",
    });
    
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pricing - FileShare</title>
      </Helmet>
      <Navbar />
      
      <main className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Choose the plan that's right for you
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 lg:gap-x-8 justify-items-center">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden lg:flex-1 w-full max-w-md transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="px-6 py-8 sm:p-10">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Free</h3>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">$0</span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  </div>
                  <p className="mt-4 text-gray-500">
                    Perfect for occasional file sharing needs.
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Up to 200MB per file</p>
                  </div>
                  <div className="mt-4 flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Unlimited file transfers</p>
                  </div>
                  <div className="mt-4 flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">7-day link expiration</p>
                  </div>
                </div>
              </div>
              <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10">
                {user && !user.isPro ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Current Plan
                  </Button>
                ) : !user ? (
                  <Button
                    className="w-full"
                    onClick={() => navigate("/register")}
                  >
                    Get started
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant="outline"
                    disabled
                  >
                    Downgrade
                  </Button>
                )}
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden lg:flex-1 w-full max-w-md border-2 border-primary transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute top-0 right-0 pt-2 pr-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                  Popular
                </span>
              </div>
              <div className="px-6 py-8 sm:p-10">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Pro</h3>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">$9.99</span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  </div>
                  <p className="mt-4 text-gray-500">
                    For professionals who need to share large files.
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Up to 10GB per file</p>
                  </div>
                  <div className="mt-4 flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Unlimited file transfers</p>
                  </div>
                  <div className="mt-4 flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">30-day link expiration</p>
                  </div>
                  <div className="mt-4 flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Password protected links</p>
                  </div>
                  <div className="mt-4 flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Priority support</p>
                  </div>
                </div>
              </div>
              <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10">
                {user && user.isPro ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleUpgrade}
                  >
                    {user ? "Upgrade to Pro" : "Sign up for Pro"}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Can I cancel my subscription at any time?
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your current billing period.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    What happens to my files if I downgrade?
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Your files stay intact, but you won't be able to upload files larger than 200MB. Existing larger files will still be available.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Do you offer team accounts?
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Not at the moment, but we're working on team plans. Contact us for custom solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
