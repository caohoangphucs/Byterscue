
import React, { useState, useRef } from 'react'
import { Camera, X } from 'lucide-react'
import { cn, validateImageFile, generateId } from '@/lib/utils'
import { toast } from 'sonner'

export interface UploadedImage {
  id: string
  file: File
  url: string
}

interface ImageUploadProps {
  maxImages?: number
  maxSizeMB?: number
  onImagesChange: (images: UploadedImage[]) => void
  className?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages = 3,
  maxSizeMB = 5,
  onImagesChange,
  className
}) => {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (images.length >= maxImages) {
      toast.error(`Đã đủ ${maxImages} ảnh`)
      return
    }

    // Calculate how many more images we can add
    const remainingSlots = maxImages - images.length
    const filesToProcess = imageFiles.slice(0, remainingSlots)
    
    // Process each file
    filesToProcess.forEach(file => {
      const validation = validateImageFile(file, maxSizeMB)
      
      if (!validation.valid) {
        toast.error(validation.message)
        return
      }
      
      const newImage: UploadedImage = {
        id: generateId(),
        file,
        url: URL.createObjectURL(file)
      }
      
      setImages(prev => {
        const updatedImages = [...prev, newImage]
        onImagesChange(updatedImages)
        return updatedImages
      })
    })
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (id: string) => {
    setImages(prev => {
      const updatedImages = prev.filter(img => img.id !== id)
      onImagesChange(updatedImages)
      return updatedImages
    })
  }

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={cn(
          "w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
          "hover:border-primary hover:bg-primary/5",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300 bg-gray-50",
          images.length > 0 ? "p-3" : "p-6"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          accept="image/jpeg,image/png,image/jpg"
          className="hidden"
        />
        
        {images.length === 0 ? (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <Camera className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Kéo thả hoặc nhấp để tải ảnh<br />
              <span className="text-xs">(tối đa {maxImages} ảnh, {maxSizeMB}MB/ảnh)</span>
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 w-full">
              {images.map(img => (
                <div 
                  key={img.id} 
                  className="relative group animate-scale-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-20 rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={img.url} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(img.id)
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {images.length < maxImages && (
                <div className="w-full h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-1">
        {maxImages - images.length} ảnh còn lại có thể tải lên
      </p>
    </div>
  )
}

export default ImageUpload
