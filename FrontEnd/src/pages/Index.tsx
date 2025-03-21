import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Leaf,
  Cloud,
  Droplets,
  TreePine,
  Wind,
  MessageSquare,
  Sun,
  Factory,
} from "lucide-react";
import { useSelector } from "react-redux";
const Index = () => {
  const isLogin = useSelector((state) => state.IsLogin);
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-blue-50">
      <div className="container-custom py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Leaf className="h-6 w-6 text-env-leaf" />
            <span className="text-xl font-display font-medium">ByteForce</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4"
          >
            <Link to="/login">
              <Button variant="ghost" className="font-medium">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary text-white shadow-sm hover:shadow-md transition-all duration-300">
                Đăng ký
              </Button>
            </Link>
          </motion.div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col max-w-lg"
          >
            <div className="text-xs uppercase tracking-wider text-env-ocean font-medium mb-2">
              Dự án Hackathon UTE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 tracking-tight">
              Chào mừng đến với ByteForce!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              ByteForce là nhóm sáng tạo gồm 4 thành viên tài năng, tham gia
              cuộc thi Hackathon UTE với mục tiêu xây dựng ứng dụng theo dõi và
              dự báo thời tiết hiệu quả và chính xác.
            </p>
            <div className="flex gap-4">
              {isLogin ? (
                <Link to="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    Trải nghiệm Dashboard
                  </Button>
                </Link>
              ) : (
                <></>
              )}
              <Link to="/chatbot">
                <Button
                  variant="outline"
                  className="px-8 py-6 rounded-lg border-2 hover:bg-accent/50 transition-all duration-300"
                >
                  Chat với AI
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card p-2 md:p-4 rounded-2xl overflow-hidden w-full max-w-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
                alt="Earth visualization"
                className="w-full h-auto rounded-lg object-cover aspect-video"
              />
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
              className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl shadow-lg flex items-center gap-3"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <Droplets className="h-5 w-5 text-env-ocean" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Chất lượng nước
                </div>
                <div className="font-medium">94% Sạch</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3,
              }}
              className="absolute -top-4 right-8 glass-card p-4 rounded-xl shadow-lg flex items-center gap-3"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <TreePine className="h-5 w-5 text-env-leaf" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Diện tích rừng
                </div>
                <div className="font-medium">+2.4%</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="py-16"
        >
          <h2 className="text-3xl font-display font-semibold mb-8 text-center">
            Đội ngũ của chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Quách Tài Lợi"
              role="Phát triển ứng dụng & Quản lý dự án"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
              letter="Q"
            />
            <TeamMember
              name="Phan Thiện Khởi"
              role="Lập trình viên chính, Chuyên gia API"
              image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
              letter="P"
            />
            <TeamMember
              name="Lê Chí Quốc"
              role="Chuyên viên thiết kế UX/UI"
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2074&auto=format&fit=crop"
              letter="L"
            />
            <TeamMember
              name="Nguyễn Hoàng Phúc"
              role="Chuyên gia AI và Chatbot"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2487&auto=format&fit=crop"
              letter="N"
            />
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="py-16"
        >
          <h2 className="text-3xl font-display font-semibold mb-2 text-center">
            Tính năng ứng dụng
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ứng dụng của chúng tôi cung cấp nhiều tính năng hữu ích giúp bạn
            theo dõi và phân tích dữ liệu môi trường một cách dễ dàng
          </p>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto mb-8">
              <TabsTrigger value="dashboard" className="text-center">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="text-center">
                Chatbot AI
              </TabsTrigger>
              <TabsTrigger value="api" className="text-center">
                Weather API
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <div className="glass-card p-4 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                      alt="Dashboard visualization"
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-display font-medium mb-4">
                    Thống kê dữ liệu thời tiết
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Dashboard hiển thị các thống kê thời tiết như nhiệt độ, độ
                    ẩm, lượng mưa qua các biểu đồ trực quan và dễ hiểu.
                  </p>
                  <ul className="space-y-3">
                    <FeatureItem
                      icon={<Sun />}
                      text="Theo dõi nhiệt độ và độ ẩm theo thời gian thực"
                    />
                    <FeatureItem
                      icon={<Cloud />}
                      text="Dự báo thời tiết trong 7 ngày tới"
                    />
                    <FeatureItem
                      icon={<Factory />}
                      text="Thống kê chất lượng không khí và mức độ ô nhiễm"
                    />
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chatbot" className="mt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <div className="glass-card p-4 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
                      alt="AI Chatbot"
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-display font-medium mb-4">
                    Chatbot AI thông minh
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Chatbot AI của chúng tôi giúp giải đáp mọi thắc mắc về thời
                    tiết và môi trường thông qua giao diện trò chuyện đơn giản.
                  </p>
                  <ul className="space-y-3">
                    <FeatureItem
                      icon={<MessageSquare />}
                      text="Trả lời câu hỏi về thời tiết và môi trường"
                    />
                    <FeatureItem
                      icon={<Wind />}
                      text="Cung cấp cảnh báo sớm về hiện tượng thời tiết cực đoan"
                    />
                    <FeatureItem
                      icon={<Droplets />}
                      text="Tư vấn về bảo vệ môi trường và sử dụng năng lượng hiệu quả"
                    />
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <div className="glass-card p-4 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1480506132288-68f7705954bd?q=80&w=2070&auto=format&fit=crop"
                      alt="Weather API"
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-display font-medium mb-4">
                    Weather API chính xác
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Chúng tôi kết nối với các nguồn dữ liệu thời tiết uy tín
                    nhất để đảm bảo thông tin luôn chính xác và cập nhật.
                  </p>
                  <ul className="space-y-3">
                    <FeatureItem
                      icon={<Cloud />}
                      text="Dữ liệu từ các trạm khí tượng quốc tế"
                    />
                    <FeatureItem
                      icon={<Sun />}
                      text="Cập nhật liên tục mỗi 30 phút"
                    />
                    <FeatureItem
                      icon={<TreePine />}
                      text="Thông tin chi tiết về các hiện tượng thời tiết"
                    />
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Hackathon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="py-16"
        >
          <div className="glass-card rounded-2xl overflow-hidden p-8 md:p-12">
            <h2 className="text-3xl font-display font-semibold mb-6">
              Tham gia cuộc thi Hackathon UTE
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              Đội ngũ ByteForce tham gia cuộc thi Hackathon UTE với mục tiêu tạo
              ra một giải pháp tích hợp AI để theo dõi và phân tích dữ liệu môi
              trường, giúp người dùng nâng cao nhận thức về biến đổi khí hậu và
              đưa ra các quyết định thông minh hơn.
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              <Card className="flex-1 border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-medium mb-4">
                    Mục tiêu dự án
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-1">
                        <Leaf className="h-4 w-4 text-env-leaf" />
                      </div>
                      <p>
                        Xây dựng nền tảng theo dõi và phân tích dữ liệu môi
                        trường toàn diện
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-1">
                        <Leaf className="h-4 w-4 text-env-leaf" />
                      </div>
                      <p>
                        Tích hợp trí tuệ nhân tạo để cá nhân hóa trải nghiệm
                        người dùng
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-1">
                        <Leaf className="h-4 w-4 text-env-leaf" />
                      </div>
                      <p>
                        Nâng cao nhận thức về biến đổi khí hậu và bảo vệ môi
                        trường
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="flex-1 border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-medium mb-4">
                    Thành tựu
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-1">
                        <Cloud className="h-4 w-4 text-env-ocean" />
                      </div>
                      <p>
                        Phát triển thành công ứng dụng web với nhiều tính năng
                        thiết thực
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-1">
                        <Cloud className="h-4 w-4 text-env-ocean" />
                      </div>
                      <p>
                        Tích hợp API dữ liệu thời tiết từ nhiều nguồn khác nhau
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-1">
                        <Cloud className="h-4 w-4 text-env-ocean" />
                      </div>
                      <p>
                        Xây dựng chatbot thông minh có khả năng học và phát
                        triển
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-5 w-5 text-env-leaf" />
              <span className="text-lg font-display">ByteForce</span>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Trang chủ
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Giới thiệu
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tính năng
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Liên hệ
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 ByteForce. Đã đăng ký bản quyền.
            </div>
            <div className="flex gap-4">
              <a
                href="mailto:contact@byteforce.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                contact@byteforce.com
              </a>
              <a
                href="tel:+84123456789"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +84 123 456 789
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ name, role, image, letter }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="flex flex-col items-center text-center"
  >
    <Avatar className="h-24 w-24 mb-4 shadow-md">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{letter}</AvatarFallback>
    </Avatar>
    <h3 className="text-lg font-display font-medium">{name}</h3>
    <p className="text-sm text-muted-foreground">{role}</p>
  </motion.div>
);

// Feature Item Component
const FeatureItem = ({ icon, text }) => (
  <li className="flex items-start gap-3">
    <div className="bg-blue-100 p-2 rounded-full mt-0.5">
      {React.cloneElement(icon, { className: "h-4 w-4 text-env-ocean" })}
    </div>
    <span>{text}</span>
  </li>
);

export default Index;
