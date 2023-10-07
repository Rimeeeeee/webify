import React, { useState, useEffect } from 'react'

import { DisplayInvestments } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [investments, setInvestments] = useState([]);

  const { address, contract, getUserInvestments } = useStateContext();

  const fetchInvestments = async () => {
    setIsLoading(true);
    const data = await getUserInvestments();
    setInvestments(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchInvestments();
  }, [address, contract]);

  return (
    <DisplayInvestments 
      title="All Investments"
      isLoading={isLoading}
      investments={investments}
    />
  )
}

export default Profile