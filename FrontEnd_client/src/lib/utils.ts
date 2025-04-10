
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to get current location
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    }
  })
}

// Function to reverse geocode coordinates to address
export const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    )
    const data = await response.json()
    
    if (data && data.display_name) {
      return data.display_name
    }
    return `${latitude}, ${longitude}`
  } catch (error) {
    console.error("Error reverse geocoding:", error)
    return `${latitude}, ${longitude}`
  }
}

// Function to validate phone number (Vietnam format)
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)(\d{9,10})$/
  return phoneRegex.test(phone)
}

// Function for delaying transitions
export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

// Function to generate a random ID
export const generateId = (): string => 
  Math.random().toString(36).substring(2, 10)

// Function to check file size in MB
export const getFileSizeInMB = (file: File): number => 
  file.size / (1024 * 1024)

// Function to validate image file (type and size)
export const validateImageFile = (file: File, maxSizeMB = 5): { valid: boolean; message?: string } => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!validTypes.includes(file.type)) {
    return { valid: false, message: "Chỉ hỗ trợ JPG/PNG" }
  }
  
  // Check file size
  if (getFileSizeInMB(file) > maxSizeMB) {
    return { valid: false, message: `Ảnh vượt quá ${maxSizeMB}MB` }
  }
  
  return { valid: true }
}
