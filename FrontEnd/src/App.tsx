import { Toaster } from "@/components/ui/toaster.js";
import { Toaster as Sonner } from "@/components/ui/sonner.js";
import { TooltipProvider } from "@/components/ui/tooltip.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import allReducer from "./Reducers/index.js";
import { createStore, applyMiddleware } from "redux";
import { thunk, ThunkMiddleware } from "redux-thunk";
export type RootState = ReturnType<typeof allReducer>;
const store = createStore(
  allReducer,
  applyMiddleware<ThunkMiddleware<RootState>>(thunk) // Thêm kiểu cho thunk
);

// Pages
import Index from "./pages/Index.js";
import NotFound from "./pages/NotFound.js";
const Login = lazy(() => import("./pages/auth/Login.js"));
const Register = lazy(() => import("./pages/auth/Register.js"));
const Dashboard = lazy(() => import("./pages/Dashboard.js"));
const ChatBot = lazy(() => import("./pages/ChatBot.js"));

const queryClient = new QueryClient();

// Animation wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              }
            >
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              }
            >
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/chatbot"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              }
            >
              <ChatBot />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Provider store={store}>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
