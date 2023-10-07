import React from 'react';

import { tagType, thirdweb } from 'C:/Users/choud/OneDrive/Desktop/upay web3/client/thirdweb-app/assets/index.js';
import { daysLeft } from '../utils';

const FundCard = ({ owner, title, description,principal,rate,time, target, deadline, amountCollected, image,catagory, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
</svg>

          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">{catagory.toString()}</p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title.toString()}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#a4a9f1] text-left leading-[18px] truncate">{description.toString()}</p>
          <p className="mt-[5px] font-epilogue font-normal text-[#eeeeef] text-left leading-[18px] truncate">Principal----{principal.toString()}MATIC</p>
          <p className="mt-[5px] font-epilogue font-normal text-[#eeeff3] text-left leading-[18px] truncate">Rate----{rate.toString()}%</p>
          <p className="mt-[5px] font-epilogue font-normal text-[#eeeff3] text-left leading-[18px] truncate">Time----{time.toString()}YRS</p>
        
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#defa4e] leading-[22px]">{amountCollected.toString()}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of {target.toString()}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#defa4e] leading-[22px]">{remainingDays.toString()}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>

          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner.toString()}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard