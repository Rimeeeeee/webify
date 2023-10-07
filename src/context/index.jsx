import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';


const StateContext = createContext();


export const StateContextProvider = ({ children }) => {
  const {contract} = useContract('0xbA9489Fb374fC8E241b376fb04c287c29Fa7100d');
  const { mutateAsync: createInvestment } = useContractWrite(contract, 'createInvestment');

  const address = useAddress();
  const connect = useMetamask();

  const publishInvestment = async (form) => {
    try {
      const data = await createInvestment({
				args: [
					address, // owner
					form.title, // title
					form.description,
          form.principal,
          form.rate,
          form.time,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
           
                    
					form.catagory,
					
					
                   
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getInvestments = async () => {
    const investments = await contract.call('getInvestments');

    const parsedInvestments = investments.map((investment, i) => ({
      owner: investment.owner,
      title: investment.title,
      description: investment.description,
      principal:(investment.principal.toString()),
      rate:(investment.rate.toString()),
      time:(investment.time.toString()),

      target: ethers.utils.formatEther(investment.target.toString()),
      deadline: investment.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(investment.amountCollected.toString()),
      image: investment.image,
      catagory:investment.catagory,
      pId: i
    }));

    return parsedInvestments;
  }
  const getUserInvestments = async () => {
    const allInvestments = await getInvestments();

    const filteredInvestments = allInvestments.filter((investment) => investment.owner === address);

    return filteredInvestments;
  }

  const donateToInvestment = async (pId, amount) => {
    const data = await contract.call('donateToInvestment', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }
  const getInvestmentByCatagory = async (catagory) => {
    const investments = await contract.call('getInvestmentByCatagory');
     const filteredInvestments=investments.filter((investmento)=>investmento.catagory==catagory);
    const parsedInvestments = filteredInvestments.map((investment, i) => ({
      owner: investment.owner,
      title: investment.title,
      description: investment.description,
      principal:ethers.utils.formatEther(investment.principal.toString()),
      rate:ethers.utils.formatEther(investment.rate.toString()),
      time:ethers.utils.formatEther(investment.time.toString()),

      target: ethers.utils.formatEther(investment.target.toString()),
      deadline: investment.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(investment.amountCollected.toString()),
      image: investment.image,
      catagory:investment.catagory,
      pId: i
    }));

    return parsedInvestments;
  }
  
  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }
  const requestAmount = async (pId, res) => {
    const data = await contract.call('requestAmount', [pId]);
    data.response=res;

    return data;
  }
  const payback = async (pId) => {
    const data = await contract.call('payback', [pId]);

    return data;
  }
  

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createInvestment: publishInvestment,
        getInvestments,
        getUserInvestments,
        donateToInvestment,
        getInvestmentByCatagory,
        getDonations,
        requestAmount,
        payback
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);