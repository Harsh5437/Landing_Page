import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

import { lazy, Suspense } from "react";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import { Skeleton } from "@/components/ui/skeleton";

const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const Insights = lazy(() => import("@/components/Insights"));
const NewsEventsPage = lazy(() => import("@/components/NewsEventsPage"));
const Team = lazy(() => import("@/components/Team"));
const Projects = lazy(() => import("@/components/Projects"));
const Clients = lazy(() => import("@/components/Clients"));
const WhyUs = lazy(() => import("@/components/WhyUs"));
const Contact = lazy(() => import("@/components/Contact"));
const StaffLogin = lazy(() => import("@/components/StaffLogin"));

const SectionFallback = () => (
  <div className="w-full py-20 px-6 max-w-7xl mx-auto space-y-8">
    <div className="space-y-4">
      <Skeleton className="h-12 w-48" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Landing Page with isolated layout (hidden navlinks) */}
          <Route path="/" element={<Landing />} />

          {/* Main Layout containing persistent Header and Footer */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={
              <Suspense fallback={<SectionFallback />}><About /></Suspense>
            } />
            <Route path="/services" element={
              <Suspense fallback={<SectionFallback />}><Services /></Suspense>
            } />
            <Route path="/insights" element={
              <Suspense fallback={<SectionFallback />}><Insights /></Suspense>
            } />
            <Route path="/news" element={
              <Suspense fallback={<SectionFallback />}><NewsEventsPage /></Suspense>
            } />
            <Route path="/team" element={
              <Suspense fallback={<SectionFallback />}><Team /></Suspense>
            } />
            <Route path="/projects" element={
              <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
            } />
            <Route path="/clients" element={
              <Suspense fallback={<SectionFallback />}><Clients /></Suspense>
            } />
            <Route path="/why-us" element={
              <Suspense fallback={<SectionFallback />}><WhyUs /></Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
            } />
            <Route path="/staff-login" element={
              <Suspense fallback={<SectionFallback />}><StaffLogin /></Suspense>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
