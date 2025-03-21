
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-env-leaf" />
            <span className="text-xl font-display">EcoSense</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="relative mb-8 inline-block">
            <div className="text-[10rem] font-display font-bold text-primary opacity-10 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl font-display font-semibold">Page Not Found</h1>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          
          <Link to="/">
            <Button className="px-6 py-6 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300">
              <Home className="h-5 w-5 mr-2" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
