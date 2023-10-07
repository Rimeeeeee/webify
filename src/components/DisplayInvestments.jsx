import React from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import FundCard from './FundCard';
import { loader } from 'C:/Users/choud/OneDrive/Desktop/upay web3/client/thirdweb-app/assets/index.js';

const DisplayInvestments = ({ title, isLoading, investments }) => {
  const navigate = useNavigate();

  const handleNavigate = (investment) => {
    navigate(`/investment-details/${investment.title}`, { state: investment })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({investments.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && investments.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any investments yet
          </p>
        )}

        {!isLoading && investments.length > 0 && investments.map((investment) => <FundCard 
          key={uuidv4()}
          {...investment}
          handleClick={() => handleNavigate(investment)}
        />)}
      </div>
    </div>
  )
}

export default DisplayInvestments