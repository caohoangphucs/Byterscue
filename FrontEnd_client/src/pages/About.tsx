
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Ambulance, MapPin, Image, Check, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Giới Thiệu | ByteForce Team</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070" 
            alt="Emergency services background" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
          
          <div className="max-w-4xl mx-auto relative text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-sans tracking-tight">
                ByteForce
              </h1>
              <p className="text-2xl text-white font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                Giải pháp báo cáo tình trạng khẩn cấp thông minh
              </p>
              
              <Link to="/report">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-lg gap-2 px-8 py-6 rounded-xl shadow-lg">
                  <Ambulance className="w-5 h-5" />
                  Báo Cáo Khẩn Cấp
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="max-w-4xl mx-auto py-16 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Hệ Thống Báo Cáo Tình Trạng Khẩn Cấp</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Giải pháp web hiện đại giúp người dùng báo cáo tình trạng khẩn cấp một cách 
              nhanh chóng, trực quan và hiệu quả.
            </p>
          </div>

          <Separator className="my-12" />

          {/* Key features */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">Tính Năng Chính</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-neu-sm hover:shadow-neu transition-all">
                <div className="flex gap-4 items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Báo Cáo Vị Trí</h4>
                    <p className="text-gray-600">Gửi thông tin vị trí chính xác với tọa độ GPS và địa chỉ để đội cứu hộ dễ dàng tìm thấy.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-neu-sm hover:shadow-neu transition-all">
                <div className="flex gap-4 items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Image className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Gửi Hình Ảnh</h4>
                    <p className="text-gray-600">Đính kèm hình ảnh hiện trường giúp đội cứu hộ hiểu rõ tình hình trước khi đến nơi.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-neu-sm hover:shadow-neu transition-all">
                <div className="flex gap-4 items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Phản Hồi Tức Thì</h4>
                    <p className="text-gray-600">Nhận xác nhận ngay lập tức khi báo cáo được gửi thành công và đang được xử lý.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-neu-sm hover:shadow-neu transition-all">
                <div className="flex gap-4 items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Theo Dõi Trạng Thái</h4>
                    <p className="text-gray-600">Cập nhật liên tục về tiến độ xử lý báo cáo và thời gian dự kiến hỗ trợ.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 p-10 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bắt Đầu Ngay</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Hệ thống báo cáo khẩn cấp ByteForce luôn sẵn sàng hỗ trợ 24/7 khi bạn cần.
            </p>
            
            <Link to="/report">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-lg gap-2">
                <Ambulance className="w-5 h-5" />
                Báo Cáo Khẩn Cấp
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-6 px-4">
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} ByteForce Team – UTE Hackathon 2025</p>
        </footer>
      </div>
    </>
  )
}

export default About
