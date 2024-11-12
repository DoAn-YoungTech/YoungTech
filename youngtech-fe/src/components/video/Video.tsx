import React from 'react'

export const Video = () => {
  return (
    <div className="w-[30%] hidden lg:block">
          <div className="h-[700px]">
            <video className="w-full h-full" autoPlay loop muted>
              <source src="/video/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
  )
}
