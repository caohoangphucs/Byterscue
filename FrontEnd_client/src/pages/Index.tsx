
import React from 'react'
import { Helmet } from 'react-helmet'
import { Ambulance } from 'lucide-react'
import ReportForm from '@/components/ReportForm'

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Báo Cáo Tình Trạng Khẩn Cấp | ByteForce</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto glassmorphism rounded-2xl shadow-elevation p-6 sm:p-10">
          <div className="staggered-animation">
            <div className="flex items-center justify-center sm:justify-start mb-6 sm:mb-8">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mr-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-error"
                >
                  <path
                    d="M3 10H1.5V8.5C1.5 7.67 2.17 7 3 7H9L9.69 4.92C9.89 4.38 10.41 4 11 4H13C13.59 4 14.11 4.38 14.31 4.92L15 7H21C21.83 7 22.5 7.67 22.5 8.5V16.5C22.5 17.33 21.83 18 21 18H19.5M6 18H18M6 18C4.34 18 3 16.66 3 15V10M6 18L6 15M18 18C19.66 18 21 16.66 21 15V10M18 18L18 15M3 10V15M21 10V15M6 15H18M6 15C4.34 15 3 13.66 3 12V10M18 15C19.66 15 21 13.66 21 12V10M3 10V12C3 13.66 4.34 15 6 15M21 10V12C21 13.66 19.66 15 18 15M10.5 12H13.5M12 13.5V10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-red-600">Báo Cáo Tình Trạng Khẩn Cấp</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <ReportForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
