import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload, { UploadedImage } from "@/components/ImageUpload";
import LocationButton from "@/components/LocationButton";
import { validatePhoneNumber, delay } from "@/lib/utils";

const ReportForm: React.FC = () => {
  const navigate = useNavigate();
  const dataId = Date.now().toString();
  const [formData, setFormData] = useState({
    message: "",
    address: "",
    name: "",
    phone: "",
  });
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageCharsLeft, setMessageCharsLeft] = useState(500);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Update character count for message
    if (name === "message") {
      setMessageCharsLeft(500 - value.length);
    }
  };

  const handleLocationFound = (
    address: string,
    locationCoordinates: { latitude: number; longitude: number }
  ) => {
    setFormData((prev) => ({
      ...prev,
      address,
    }));

    setCoordinates(locationCoordinates);

    // Clear error when location is found
    if (errors.address) {
      setErrors((prev) => ({
        ...prev,
        address: "",
      }));
    }
  };

  const handleImagesChange = (newImages: UploadedImage[]) => {
    setImages(newImages);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng mô tả tình hình hiện tại";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ hiện tại";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên người cần hỗ trợ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhoneNumber(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    const imageDataToSend = new FormData();

    // Append text data to formDataToSend
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Append coordinates as numbers if available
    if (coordinates) {
      const location = [coordinates.latitude, coordinates.longitude];
      formDataToSend.append("location", JSON.stringify(location));
    }
    formDataToSend.append("id", dataId);
    imageDataToSend.append("id", dataId);

    // Append images to formDataToSend (gửi đến API chính)
    images.forEach((img) => {
      formDataToSend.append("image", img.file); // Gửi cùng dữ liệu text
    });

    // Append images to imageDataToSend (gửi đến API hình ảnh riêng)
    images.forEach((img, index) => {
      imageDataToSend.append("image", img.file); // Key phân biệt từng ảnh
    });

    try {
      // Gửi dữ liệu (bao gồm text và images) đến API chính
      const textResponse = await fetch("https://chiquoc26.id.vn/api/create", {
        method: "POST",
        body: formDataToSend,
      });

      if (!textResponse.ok) {
        console.log(formDataToSend);
        throw new Error("Text API response was not ok");
      }

      const textData = await textResponse.json();
      console.log("Text API Success:", textData);
      if (
        textData.message ==
        "Chúng tôi nghi ngờ đây là tin giả,bạn vui lòng gủi lại yêu cầu với tình trạng chi tiết hơn"
      ) {
        toast.error(
          "Chúng tôi nghi ngờ đây là tin giả,bạn vui lòng gủi lại yêu cầu với tình trạng chi tiết hơn"
        );
        return;
      }
      // Gửi hình ảnh đến API khác
      let imageResponse = null;
      if (images.length > 0) {
        imageResponse = await fetch(
          "https://byteforce.caohoangphuc.id.vn/python/api/save_image",
          {
            method: "POST",
            body: imageDataToSend,
          }
        );
      }

      // Chuyển hướng sau khi cả hai request thành công
      navigate("/confirmation", {
        state: {
          success: true,
          data: {
            ...formData,
            coordinates,
            images, // Giữ danh sách images để hiển thị
            id: dataId,
            timestamp: new Date().toISOString(),
          },
        },
      });

      await delay(2000); // Nếu vẫn cần delay
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Gửi báo cáo thất bại. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     toast.error("Vui lòng điền đầy đủ thông tin");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // Prepare an array of promises to read images
  //     const imagePromises: Promise<ArrayBuffer>[] = images.map(
  //       (img) =>
  //         new Promise((resolve, reject) => {
  //           const reader = new FileReader();
  //           reader.onloadend = () => {
  //             resolve(reader.result as ArrayBuffer); // Cast to ArrayBuffer
  //           };
  //           reader.onerror = reject;
  //           reader.readAsArrayBuffer(img.file); // Read the file as ArrayBuffer
  //         })
  //     );

  //     // Wait for all images to be read
  //     const binaryImages: ArrayBuffer[] = await Promise.all(imagePromises);

  //     // Prepare the form data
  //     const formDataToSend = new FormData();

  //     // Append text data
  //     Object.entries(formData).forEach(([key, value]) => {
  //       formDataToSend.append(key, value);
  //     });

  //     // Append coordinates if available
  //     if (coordinates) {
  //       formDataToSend.append("latitude", coordinates.latitude.toString());
  //       formDataToSend.append("longitude", coordinates.longitude.toString());
  //     }

  //     // Append binary images
  //     binaryImages.forEach((binaryImage, index) => {
  //       const blob = new Blob([binaryImage]); // Create a blob from the binary data
  //       formDataToSend.append(
  //         `images[${index}]`,
  //         blob,
  //         images[index].file.name
  //       ); // Append blob with original file name
  //     });

  //     // Simulated API call
  //     const response = await fetch("https://chiquoc26.id.vn/api/create", {
  //       method: "POST",
  //       body: formDataToSend,
  //     });
  //     console.log(formDataToSend);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     navigate("/confirmation", {
  //       state: {
  //         success: true,
  //         data: {
  //           ...formData,
  //           coordinates,
  //           images,
  //           id: Date.now().toString(),
  //           timestamp: new Date().toISOString(),
  //         },
  //       },
  //     });

  //     const data = await response.json();
  //     console.log("Success:", data);
  //     await delay(2000);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error("Gửi báo cáo thất bại. Vui lòng thử lại sau.");
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl mx-auto">
      <div className="space-y-1">
        <Label htmlFor="message">Tin nhắn tình hình hiện tại</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Mô tả tình hình hiện tại (ví dụ: Nhà ngập nước, cần cứu hộ gấp)"
          maxLength={500}
          rows={4}
          className={`resize-none min-h-[120px] ${
            errors.message ? "border-error focus:ring-error/30" : ""
          }`}
        />
        <div className="flex justify-between text-xs">
          <p className="text-error">{errors.message}</p>
          <p className="text-gray-500">{messageCharsLeft}/500</p>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="address">Địa chỉ hiện tại</Label>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="flex-1">
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ hiện tại của bạn"
              className={
                errors.address ? "border-error focus:ring-error/30" : ""
              }
            />
            {errors.address && (
              <p className="text-xs text-error mt-1">{errors.address}</p>
            )}
          </div>
          <LocationButton
            onLocationFound={handleLocationFound}
            className="shrink-0"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Tên người cần hỗ trợ</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Tên người cần hỗ trợ (ví dụ: Nguyễn Văn A)"
          maxLength={50}
          className={errors.name ? "border-error focus:ring-error/30" : ""}
        />
        {errors.name && (
          <p className="text-xs text-error mt-1">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Nhập số điện thoại (ví dụ: 0912345678)"
          className={errors.phone ? "border-error focus:ring-error/30" : ""}
        />
        {errors.phone && (
          <p className="text-xs text-error mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label>Gửi hình ảnh</Label>
        <ImageUpload
          onImagesChange={handleImagesChange}
          maxImages={1}
          maxSizeMB={5}
        />
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto min-w-[200px] h-12 mt-4 transition-all duration-300 transform hover:translate-y-[-2px]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Gửi Báo Cáo
          </>
        )}
      </Button>
    </form>
  );
};

export default ReportForm;
