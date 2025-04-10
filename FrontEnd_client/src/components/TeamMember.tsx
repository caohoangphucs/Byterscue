
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface TeamMemberProps {
  name: string
  role: string
  description: string
  contribution: string
  avatar: string
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  description, 
  contribution,
  avatar
}) => {
  return (
    <Card className="h-full hover:shadow-md transition-all border-gray-200">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
              {avatar}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-lg">{name}</h3>
          <span className="text-blue-600 font-medium text-sm">{role}</span>
        </div>
        
        <p className="text-gray-700 mb-3 text-sm text-center">{description}</p>
        <p className="text-gray-600 text-sm font-medium text-center italic">
          {contribution}
        </p>
      </CardContent>
    </Card>
  )
}

export default TeamMember
