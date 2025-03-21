import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { Button } from "@/components/ui/button.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.js";
import {
  Leaf,
  LogOut,
  Thermometer,
  Cloud,
  Droplets,
  Wind,
  Sun,
  MessageSquare,
  Layout,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  TreePine,
  Factory,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast.js";
import { useDispatch } from "react-redux";
import LogoutAction from "../Actions/LogoutAction.js";
import { useNavigate } from "react-router-dom";
// Mock data for charts
const temperatureData = [
  { name: "Jan", value: 4.5 },
  { name: "Feb", value: 5.2 },
  { name: "Mar", value: 7.3 },
  { name: "Apr", value: 10.2 },
  { name: "May", value: 14.1 },
  { name: "Jun", value: 17.8 },
  { name: "Jul", value: 19.3 },
  { name: "Aug", value: 18.9 },
  { name: "Sep", value: 15.7 },
  { name: "Oct", value: 12.2 },
  { name: "Nov", value: 8.1 },
  { name: "Dec", value: 5.3 },
];

const co2EmissionData = [
  { name: "Transport", value: 34 },
  { name: "Energy", value: 29 },
  { name: "Industry", value: 21 },
  { name: "Agriculture", value: 9 },
  { name: "Buildings", value: 7 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const waterQualityData = [
  { name: "Excellent", value: 65 },
  { name: "Good", value: 23 },
  { name: "Moderate", value: 8 },
  { name: "Poor", value: 4 },
];

const rainFallData = [
  { name: "Jan", value: 70 },
  { name: "Feb", value: 65 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 85 },
  { name: "May", value: 60 },
  { name: "Jun", value: 45 },
  { name: "Jul", value: 30 },
  { name: "Aug", value: 35 },
  { name: "Sep", value: 55 },
  { name: "Oct", value: 75 },
  { name: "Nov", value: 90 },
  { name: "Dec", value: 85 },
];

// Mock real-time data
const realtimeItems = [
  {
    icon: Thermometer,
    value: "24°C",
    label: "Temperature",
    trend: "up",
    change: "+1.2°C",
  },
  {
    icon: Droplets,
    value: "68%",
    label: "Humidity",
    trend: "down",
    change: "-3%",
  },
  {
    icon: Cloud,
    value: "12%",
    label: "Cloud Cover",
    trend: "up",
    change: "+5%",
  },
  {
    icon: Wind,
    value: "8 km/h",
    label: "Wind Speed",
    trend: "down",
    change: "-2 km/h",
  },
];

// Mock alert data
const alertsData = [
  {
    id: 1,
    title: "Air Quality Alert",
    description: "Moderate air quality in Seattle region.",
    type: "warning",
    time: "1 hour ago",
  },
  {
    id: 2,
    title: "Heavy Rain Expected",
    description: "Prepare for heavy rainfall in the next 24 hours.",
    type: "info",
    time: "3 hours ago",
  },
  {
    id: 3,
    title: "Heat Wave Warning",
    description: "Temperatures expected to rise significantly.",
    type: "critical",
    time: "5 hours ago",
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    dispatch(LogoutAction());
    navigate("/login");
    // In a real app, this would handle actual logout logic
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-env-leaf" />
            <span className="text-xl font-display">EcoSense</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                className={`flex items-center gap-2 ${
                  activeTab === "overview" ? "text-primary" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <Layout className="h-4 w-4" />
                <span>Overview</span>
              </Button>
              <Button
                variant="ghost"
                className={`flex items-center gap-2 ${
                  activeTab === "alerts" ? "text-primary" : ""
                }`}
                onClick={() => setActiveTab("alerts")}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Alerts</span>
              </Button>
              <Link to="/chatbot">
                <Button variant="ghost" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>EcoChat</span>
                </Button>
              </Link>
            </nav>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-display font-semibold mb-1">
                  Environmental Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Monitor real-time environmental metrics and insights.
                </p>
              </div>

              <TabsList className="md:hidden">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="overview"
              className="space-y-8 animate-in fade-in-50"
            >
              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {realtimeItems.map((item, index) => (
                  <StatCard
                    key={index}
                    icon={<item.icon className="h-5 w-5 text-primary" />}
                    value={item.value}
                    label={item.label}
                    trend={item.trend}
                    change={item.change}
                    delay={index * 0.1}
                  />
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Temperature Trends (Monthly Average)</CardTitle>
                    <CardDescription>
                      Average temperature measurements over the past year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={temperatureData}>
                          <defs>
                            <linearGradient
                              id="colorTemp"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#0ea5e9"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#0ea5e9"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                          />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value}°C`, "Temperature"]}
                            contentStyle={{
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0ea5e9"
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Rainfall Distribution</CardTitle>
                    <CardDescription>
                      Monthly rainfall measurements in millimeters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={rainFallData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                          />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value} mm`, "Rainfall"]}
                            contentStyle={{
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Bar
                            dataKey="value"
                            fill="#0ea5e9"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pie charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>CO₂ Emission Sources</CardTitle>
                    <CardDescription>
                      Distribution of carbon dioxide emissions by sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="h-80 w-full max-w-md">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={co2EmissionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {co2EmissionData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Percentage"]}
                            contentStyle={{
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Water Quality Assessment</CardTitle>
                    <CardDescription>
                      Distribution of water quality ratings across monitored
                      sources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="h-80 w-full max-w-md">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={waterQualityData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {waterQualityData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  index === 0
                                    ? "#10b981"
                                    : index === 1
                                    ? "#0ea5e9"
                                    : index === 2
                                    ? "#f59e0b"
                                    : "#ef4444"
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Percentage"]}
                            contentStyle={{
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Environmental insights */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-env-leaf" />
                    <span>Environmental Insights</span>
                  </CardTitle>
                  <CardDescription>
                    Notable changes and insights based on current environmental
                    data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InsightCard
                      icon={<Factory className="h-5 w-5 text-env-ocean" />}
                      title="Carbon Emissions"
                      content="Carbon emissions have decreased by 12% compared to last year, primarily due to reduced industrial activity."
                    />
                    <InsightCard
                      icon={<TreePine className="h-5 w-5 text-env-leaf" />}
                      title="Reforestation Progress"
                      content="Local reforestation efforts have successfully planted 15,000 new trees, exceeding the annual target by 20%."
                    />
                    <InsightCard
                      icon={<Sun className="h-5 w-5 text-env-sunset" />}
                      title="Solar Energy Production"
                      content="Solar energy production has increased by 33% in the region, contributing to a significant reduction in fossil fuel dependence."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="alerts"
              className="space-y-6 animate-in fade-in-50"
            >
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span>Environmental Alerts</span>
                  </CardTitle>
                  <CardDescription>
                    Recent alerts and notifications about environmental changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {alertsData.map((alert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AlertCard alert={alert} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>
                    Configure which types of alerts you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-red-100 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Critical Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            Severe weather, natural disasters, and emergencies
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">Warning Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            Moderate risk events like air quality warnings
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Informational Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            General updates about environmental conditions
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10">
        <div className="flex justify-around items-center py-3">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "text-primary" : ""}
          >
            <Layout className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("alerts")}
            className={activeTab === "alerts" ? "text-primary" : ""}
          >
            <AlertTriangle className="h-5 w-5" />
          </Button>
          <Link to="/chatbot">
            <Button variant="ghost">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ icon, value, label, trend, change, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
      <div
        className={`flex items-center ${
          trend === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        <span className="text-sm font-medium">{change}</span>
        {trend === "up" ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </div>
    <div className="mt-3">
      <div className="text-2xl font-display font-semibold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </motion.div>
);

// Insight Card Component
const InsightCard = ({ icon, title, content }) => (
  <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
    <div className="flex items-center gap-2 mb-3">
      <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
      <h3 className="font-display font-medium">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{content}</p>
  </div>
);

// Alert Card Component
const AlertCard = ({ alert }) => {
  const getAlertStyles = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getAlertIconStyles = (type) => {
    switch (type) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getAlertStyles(alert.type)}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${getAlertIconStyles(alert.type)}`}>
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-medium">{alert.title}</h4>
            <span className="text-xs text-muted-foreground">{alert.time}</span>
          </div>
          <p className="text-sm mt-1 text-muted-foreground">
            {alert.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
