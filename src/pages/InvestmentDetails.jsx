import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, FundCard, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from 'C:/Users/choud/OneDrive/Desktop/upay web3/client/thirdweb-app/assets/index.js';

const InvestmentDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donateToInvestment, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);
   // if(state.principal>amount)
         //return <p>Amount should be more</p>;
    await donateToInvestment(state.pId, amount); 

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Investors" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>

              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">Owner</p>
                
              </div>
            </div>
          </div>

          <div>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Catagory</h4>

<div className="mt-[20px]">
  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.catagory}</p>
</div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Description</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
              </div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Principal</h4>

<div className="mt-[20px]">
  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.principal} MATIC</p>
</div>
<h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Rate</h4>

<div className="mt-[20px]">
  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.rate} %</p>
</div>
<h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Time</h4>

<div className="mt-[20px]">
  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.time} years</p>
</div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Investors</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">Invest in this scheme!!!</p>
                )}
              </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">INVEST NOW</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Invest in {state.title}
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="0.1 MATIC"
                step="0.1"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Invest here to get maximum benefit.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">**Don't invest less than principal {state.principal} MATIC.</p>
              </div>

              <CustomButton 
                btnType="button"
                title="INVEST "
                styles="w-full bg-[#261756]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default InvestmentDetails