import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleHelp } from "lucide-react";
interface UploadedImage {
  id: string;
  url: string;
}

interface LocationState {
  success: boolean;
  data?: {
    id: string;
    message: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    } | null;
    name: string;
    phone: string;
    images: UploadedImage[];
    timestamp: string;
  };
}

const ReportConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [done, setDone] = useState("ưaiting");
  const [suggest, setSuggest] = useState("");
  // Kiểm tra sessionStorage để khôi phục dữ liệu nếu có
  const initialState =
    JSON.parse(sessionStorage.getItem("reportConfirmation")) || null;
  const [state, setState] = useState<LocationState | null>(initialState);
  // Nếu không có dữ liệu trong state, kiểm tra location.state
  useEffect(() => {
    if (location.state) {
      setState(location.state);
      sessionStorage.setItem(
        "reportConfirmation",
        JSON.stringify(location.state)
      );
    } else if (!state) {
      navigate("/");
    }
  }, [location.state, navigate, state]);

  useEffect(() => {
    const checkData = async (dataId: string) => {
      try {
        const response = await fetch(
          "https://byteforce.caohoangphuc.id.vn/python/api/get_request_status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: dataId }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.text();
        console.log("ok");
        console.log("API response:", res); // Log toàn bộ phản hồi để kiểm tra
        if (res === "Finished") {
          setDone("finished");
        } else if (res === "Accepted") {
          setDone("accepted");
        } else if (res === "Waiting") {
          setDone("waiting");
        } else {
          console.warn("Unexpected status:", res); // Cảnh báo nếu status không hợp lệ
        }
      } catch (error) {
        console.error("Error fetching request status:", error);
      }
    };

    if (state?.data?.id) {
      checkData(state.data.id);
    }
  }, [state]);

  useEffect(() => {
    const takeSuggest = async (dataId: string) => {
      try {
        const response = await fetch(
          "https://byteforce.caohoangphuc.id.vn/python/api/get_recomment_action_client",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: dataId }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.text();
        console.log("ok");
        console.log("API response:", res); // Log toàn bộ phản hồi để kiểm tra
        setSuggest(res);
      } catch (error) {
        console.error("Error fetching request status:", error);
      }
    };
    if (state?.data?.id) {
      takeSuggest(state.data.id);
    }
    // eslint-disable-next-line
  }, []);
  if (!state || !state.data) {
    return null; // Will redirect to home via the useEffect
  }

  const { success, data } = state;
  const { images, timestamp, coordinates } = data;

  const formattedTime = new Date(timestamp).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(done);
  return (
    <>
      <Helmet>
        <title>{success ? "Báo Cáo Thành Công" : "Báo Cáo Thất Bại"}</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto staggered-animation">
          <div className="mb-10 animate-fade-in">
            {success ? (
              <div className="flex flex-col items-center mb-8 text-center">
                <CheckCircle className="w-16 h-16 text-success mb-4 animate-scale-in" />
                <h1 className="text-2xl sm:text-3xl font-bold text-success mb-2">
                  {done === "waiting" && "Yêu cầu của bạn đang được xử lý!"}
                  {done === "accepted" && "Yêu cầu của bạn đã được nhận!"}
                  {done === "finished" && "Đơn hàng của bạn đã hoàn thành!"}
                </h1>
                <p className="text-gray-600">
                  Thông tin và hình ảnh đã được gửi thành công. Vui lòng giữ
                  liên lạc qua số điện thoại bạn cung cấp.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center mb-8 text-center">
                <XCircle className="w-16 h-16 text-error mb-4 animate-scale-in" />
                <h1 className="text-2xl sm:text-3xl font-bold text-error mb-2">
                  Yêu cầu không được nhận!
                </h1>
                <p className="text-gray-600">
                  Vui lòng thử lại (kiểm tra kết nối hoặc định dạng ảnh).
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 glassmorphism animate-fade-in">
              <h2 className="text-lg font-semibold mb-4">
                Trạng thái yêu cầu của bạn
              </h2>

              <div className="flex flex-wrap gap-4 mb-6">
                {done === "finished" && (
                  <div className="flex items-center px-4 py-2 bg-success text-success-foreground rounded-md shadow-sm animate-slide-in">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Đã hoàn thành: {formattedTime}</span>
                  </div>
                )}
                {done === "accepted" && (
                  <div className="flex items-center px-4 py-2 bg-warning text-warning-foreground rounded-md shadow-sm animate-slide-in">
                    <Clock className="w-5 h-5 mr-2 animate-pulse-subtle" />
                    <span>Yêu cầu của bạn đã được nhận! {formattedTime}</span>
                  </div>
                )}
                {done === "waiting" && (
                  <div className="flex items-center px-4 py-2 bg-error text-error-foreground rounded-md shadow-sm animate-slide-in">
                    <Clock className="w-5 h-5 mr-2 animate-pulse-subtle" />
                    <span>Đang xử lý {formattedTime}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Mã yêu cầu
                  </p>
                  <p className="font-medium">{data.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tên người cần hỗ trợ
                  </p>
                  <p>{data.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Số điện thoại
                  </p>
                  <p>{data.phone}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
                  <p>{data.address}</p>
                </div>

                {coordinates && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                      Tọa độ
                    </p>
                    <p className="font-mono text-sm">
                      {coordinates.latitude.toFixed(6)},{" "}
                      {coordinates.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Tin nhắn</p>
                  <p className="bg-gray-50 p-3 rounded-md text-gray-700">
                    {data.message}
                  </p>
                </div>
                <div>
                  <p
                    className="text-lg font-bold text-gray-500 cursor-pointer flex items-center "
                    // onClick={() => handleSuggest(state.data.id)}
                  >
                    <CircleHelp size={18} strokeWidth={2} /> Gợi ý
                  </p>
                  <p className="bg-gray-200 p-3 rounded-md text-gray-700 break-words">
                    {suggest}
                  </p>
                </div>
              </div>
            </Card>

            {images.length > 0 && (
              <Card className="p-6 glassmorphism animate-fade-in">
                <h2 className="text-lg font-semibold mb-4">
                  Hình ảnh đính kèm: {images.length}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <div className="w-full aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={img.url}
                          alt="Uploaded"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in">
              <Button variant="outline" size="lg" asChild className="flex-1">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay về trang chủ
                </Link>
              </Button>

              {!success && (
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  <Link to="/">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Gửi lại yêu cầu
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportConfirmation;
