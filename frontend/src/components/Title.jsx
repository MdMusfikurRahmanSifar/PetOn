import React from 'react'

const Title = ({title, subTitle, align, titleColor = "text-white", subTitleColor = "text-[#FFD369]"}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${
        align === "left" && "md:items-start md:text-left"
      }`}>
      <h1 className={`font-semibold ${titleColor} text-4xl md:text-[40px]`}>{title}</h1>
      <p className={`text-sm md:text-base ${subTitleColor} mt-2 max-w-156`}>
        {subTitle}
      </p>
    </div>
  )
}

export default Title