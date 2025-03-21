import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  Send,
  Leaf,
  User,
  ChevronLeft,
  CornerDownLeft,
  Loader2,
  Info,
  LayoutDashboard,
  RefreshCw,
  MoreHorizontal,
  Download,
  Copy,
  Share2,
  Trash2,
  Moon,
  Wind,
  SunMedium,
  Cloud,
  CloudRain,
  Waves,
  ThermometerSnowflake,
  ThermometerSun,
  TreePine,
} from "lucide-react";

// Mock initial messages
const initialMessages = [
  {
    id: 1,
    content:
      "Hello! I'm EcoChat, your environmental assistant. I can help you with questions about climate change, sustainability, conservation, and more. How can I assist you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60).toISOString(),
  },
];

// Mock suggestion topics
const suggestionTopics = [
  { icon: <Cloud className="h-4 w-4" />, text: "Air quality in my area" },
  { icon: <Waves className="h-4 w-4" />, text: "Ocean conservation" },
  { icon: <TreePine className="h-4 w-4" />, text: "Deforestation impact" },
  {
    icon: <ThermometerSun className="h-4 w-4" />,
    text: "Climate change basics",
  },
  { icon: <Wind className="h-4 w-4" />, text: "Renewable energy" },
  { icon: <SunMedium className="h-4 w-4" />, text: "Carbon footprint" },
];

// Sample environmental facts for the typing animation
const environmentalFacts = [
  "Every minute, one garbage truck of plastic is dumped into our oceans.",
  "Planting trees remains one of the most cost-effective ways to reduce carbon.",
  "The Great Barrier Reef lost half of its coral between 1995 and 2017.",
  "Renewable energy now accounts for over 25% of global electricity generation.",
  "A single tree can absorb up to 48 pounds of carbon dioxide per year.",
  "Electric vehicles emit 43% less carbon dioxide than diesel vehicles.",
];

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // Initial messages can be added here if needed.
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  // Auto scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowSuggestions(false);

    // Call API to get AI response
    try {
      const botResponse = await fetchChatbotResponse(inputValue);
      if (botResponse) {
        addBotMessage(botResponse);
      } else {
        addBotMessage("Xin lỗi, tôi không thể trả lời câu hỏi này.");
      }
    } catch (error) {
      addBotMessage("Lỗi khi gọi API. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm gọi API chatbot
  const fetchChatbotResponse = async (message) => {
    try {
      const res = await fetch(
        "https://byteforce.caohoangphuc.id.vn/python/getchatbotanswer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      // Trích xuất giá trị từ khóa "Chat answer:" trong dữ liệu trả về
      return data["Chat answer:"] || "Không có phản hồi từ chatbot.";
    } catch (error) {
      console.error("Lỗi API:", error);
      return null;
    }
  };

  // Hàm thêm tin nhắn chatbot vào chat
  const addBotMessage = (content) => {
    const botMessage = {
      id: messages.length + 2,
      content,
      sender: "bot",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const clearChat = () => {
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset.",
    });
    setMessages([]); // Reset chat history
    setShowSuggestions(true); // Show suggestions if needed
  };

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
            <Link to="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar - only on larger screens */}
        <div className="hidden md:block w-72 border-r p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="font-display font-medium">EcoChat Assistant</h2>
            </div>

            <Button
              variant="secondary"
              className="w-full justify-start gap-2"
              onClick={clearChat}
            >
              <RefreshCw className="h-4 w-4" />
              <span>New Conversation</span>
            </Button>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">About EcoChat</h3>
              <p className="text-sm text-muted-foreground">
                EcoChat provides information on environmental topics,
                sustainability practices, and climate data. Ask anything about
                our environment!
              </p>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Quick Facts</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-green-100 p-1 rounded-full mt-0.5">
                    <TreePine className="h-3 w-3 text-env-leaf" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Forests absorb 2.6 billion tons of CO₂ annually
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                    <Waves className="h-3 w-3 text-env-ocean" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Oceans absorb 25% of all CO₂ emissions
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-yellow-100 p-1 rounded-full mt-0.5">
                    <SunMedium className="h-3 w-3 text-env-sunset" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Solar energy costs have fallen 89% since 2010
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col max-h-[calc(100vh-60px)]">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-0">
            <div className="max-w-3xl mx-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex mb-4 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8 mt-1">
                        {message.sender === "bot" ? (
                          <>
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-muted">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>

                      <div>
                        <div
                          className={`px-4 py-2.5 rounded-xl ${
                            message.sender === "bot"
                              ? "bg-muted text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground pl-2">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex mb-4 justify-start"
                >
                  <div className="flex gap-3 max-w-[85%]">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="px-4 py-3 rounded-xl bg-muted text-foreground">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <TypingAnimation facts={environmentalFacts} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggestion chips - shown when chat is empty or reset */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="bg-muted/50 rounded-xl p-4 border">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span>Suggested topics to explore</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestionTopics.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="rounded-full flex items-center gap-1 text-sm bg-background"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                        >
                          {suggestion.icon}
                          <span>{suggestion.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 border-t bg-background">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <div className="relative flex-1">
                  <Textarea
                    placeholder="Ask about climate, sustainability, conservation..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="min-h-[56px] resize-none py-3 pr-12 bg-background border border-input pl-4"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <div className="absolute right-3 top-[14px] text-xs text-muted-foreground">
                    <kbd className="border border-border rounded px-1.5 py-0.5 bg-muted">
                      ⏎
                    </kbd>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </form>

              {/* Mobile action buttons */}
              <div className="md:hidden flex justify-center mt-4 gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={clearChat}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>New Chat</span>
                </Button>

                <Button variant="outline" size="sm" className="rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Typing animation component
const TypingAnimation = ({ facts }) => {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [facts]);

  return (
    <span className="text-sm italic text-muted-foreground">
      Did you know? {facts[factIndex]}
    </span>
  );
};

export default ChatBot;
