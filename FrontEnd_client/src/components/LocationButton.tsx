
import React, { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCurrentLocation, reverseGeocode } from '@/lib/utils'
import { toast } from 'sonner'

interface LocationButtonProps {
  onLocationFound: (address: string, coordinates: {latitude: number, longitude: number}) => void
  className?: string
}

const LocationButton: React.FC<LocationButtonProps> = ({ 
  onLocationFound,
  className 
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetLocation = async () => {
    setIsLoading(true)
    
    try {
      const position = await getCurrentLocation()
      const { latitude, longitude } = position.coords
      
      toast.promise(
        reverseGeocode(latitude, longitude),
        {
          loading: 'Đang lấy địa chỉ...',
          success: (address) => {
            onLocationFound(address, { latitude, longitude })
            return 'Đã lấy địa chỉ thành công'
          },
          error: 'Không thể lấy địa chỉ'
        }
      )
    } catch (error) {
      console.error('Error getting location:', error)
      toast.error('Không thể lấy vị trí. Vui lòng kiểm tra quyền truy cập.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={handleGetLocation}
      disabled={isLoading}
      className={className}
    >
      <MapPin className="w-4 h-4 mr-2" />
      {isLoading ? 'Đang lấy vị trí...' : 'Lấy vị trí hiện tại'}
    </Button>
  )
}

export default LocationButton
