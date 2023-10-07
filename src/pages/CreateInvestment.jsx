import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from 'C:/Users/choud/OneDrive/Desktop/upay web3/client/thirdweb-app/assets/index.js';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateInvestment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createInvestment } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    principal:'',
    rate:'',
    time:'',
    target: '', 
    deadline: '',
    image: '',
    catagory:''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createInvestment({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#ee40ce] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create Investment Scheme</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Owner Name *"
            placeholder="SB Bank"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Investment Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
          
        </div>

        <FormField 
            labelName="Description*"
            placeholder="Let the investors know why they should invest in it."
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#161a55] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">Create Today. Secure Tommorrow.</h4>
        </div>
        
        <div className="flex flex-wrap gap-[40px]">
        <FormField 
            labelName="Principal *"
            placeholder="0.50 MATIC"
            inputType="text"
            value={form.principal}
            handleChange={(e) => handleFormFieldChange('principal', e)}
          />
          <FormField 
            labelName="Rate *"
            placeholder="2 % p.a."
            inputType="text"
            value={form.rate}
            handleChange={(e) => handleFormFieldChange('rate', e)}
          />
          <FormField 
            labelName="Time *"
            placeholder="2 yrs"
            inputType="text"
            value={form.time}
            handleChange={(e) => handleFormFieldChange('time', e)}
          />
          <FormField 
            labelName="Goal *"
            placeholder="0.50 MATIC"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Investment image *"
            placeholder="Place image URL of investment"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
          <FormField 
            labelName="Investment Catagory *"
            placeholder="Catagorize the investment to low/medium/high based in risk factor"
            inputType="text"
            value={form.catagory}
            handleChange={(e) => handleFormFieldChange('catagory', e)}
          />
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit Investment"
              styles="bg-[#161a55]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateInvestment