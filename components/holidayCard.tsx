import React from 'react';
import Image from 'next/image';
import testImage from "@/public/image/images.jpeg"
import { Card } from '@/components/ui/card'
import { Bookmark } from 'iconsax-react';
import { H4 } from './ui/typography';


interface HolidayCardProps {
  title: string;
  likes: number;
}

const HolidayCard: React.FC<HolidayCardProps> = ({ title, likes }) => {
  return (
    <Card className='relative w-full overflow-hidden shadow-none'>
      <div className="relative h-full w-full">
      <Image src={testImage} alt={`banner cover`} layout="fill" objectFit="cover" />
      <div className="absolute bottom-4 flex w-full justify-between px-4">
            <div className='flex items-center space-x-1 text-center'>
              <div className='bg-[#ffff] rounded py-4 px-3'>
                <span>Logo</span>
              </div>
              <H4 className='text-[#ffff]'>{title}</H4>
            </div>
            <div className='flex items-center text-gray-900 space-x-1'>
              <div className="rounded-full p-2 bg-gray-500">
                  <Bookmark className="w-10 h-9 " color="#ffff" />
              </div>
                <span className="text-sm font-semibold text-white">{likes.toLocaleString()}</span>
            </div>
      </div>
      </div>
    </Card>
  )
};

export default HolidayCard;
