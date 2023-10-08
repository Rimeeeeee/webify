// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Mutualfund {
    struct InvestmentScheme{
        address owner;//the organistation that owns
        string title;
        string description;
        uint256 principal;
        uint256 rate;//formulated monthly basis
        uint256 time;
        uint256 target;//target amount to be collected
        uint256 deadline;//time period of collection
        uint256 amountCollected;
        string image;// image releted to investment
        string catagory;// determining the risk factor
        address[]donators;
        uint256[]donations;
        bool response;// how many want to withdraw money 
        address[]requestors;// person want to withdraw money
        uint[]requestime;//stores timestamp of transaction
    }
    mapping(uint256=>InvestmentScheme)public investments;
    uint256 public numberOfInvestments=0;
     uint256 public numberOfRequests=0;
    
    function createInvestment(address _owner,string memory _title,string memory _description,uint256 _principal,uint256 _rate,uint256 _time,uint256 _target,uint256 _deadline, string memory _image,string memory _catagory)public returns(uint256){
        InvestmentScheme storage investment=investments[numberOfInvestments];
        require(investment.deadline<block.timestamp,"The deadline should be a date in future");
        investment.owner=_owner;
        investment.title=_title;
        investment.description=_description;
        investment.principal=_principal;
        investment.rate=_rate;
        investment.time=_time;
        investment.target=_target;
        investment.deadline=_deadline;
        investment.amountCollected=0;
        investment.image=_image;
        investment.catagory=_catagory;
        numberOfInvestments++;
        return numberOfInvestments-1;
    }

function donateToInvestment(uint256 _id)public payable{
    uint256 amount=msg.value;
   
    InvestmentScheme storage investment=investments[_id];
     require(amount>=investment.principal,"The deposited money should be more than the token principal");
    investment.donators.push(msg.sender);
    investment.donations.push(amount);
    investment.requestime.push(block.timestamp);
    (bool sent,)=payable(investment.owner).call{value:amount}("");
    if(sent){
        investment.amountCollected=investment.amountCollected+amount;
    }
}
function getDonators(uint256 _id)view public returns(address[]memory,uint256[]memory){
    return(investments[_id].donators,investments[_id].donations);
}
function requestAmount(uint256 _id,bool res)public returns(uint256)
{
    InvestmentScheme storage investment=investments[_id];
    investment.response=true;
 require(investment.response==res,"Check whether want to withdraw amt");
 investment.requestors.push(msg.sender);
 numberOfRequests++;
 return numberOfRequests-1;

}
function payback(uint256 _id) public payable{
    InvestmentScheme storage investment=investments[_id];
    require(investment.owner==msg.sender,"Accessible only by owner");
    for(uint i=0;i<investment.requestors.length;i++)
    {
         for(uint j=0;j<investment.donators.length;j++){
            require(investment.donators[j]==investment.requestors[i],"Requestor must be a donator");
            uint t=(block.timestamp-(investment.requestime[j]))/(3600*24*30);

           // require(t>=investment.time,"Time duration must be satisfied");
            uint256 payto=investment.principal*(((((1+(investment.rate))**t)-1)/(investment.rate))/(1+(investment.rate)));
            (bool sent,)=payable(investment.requestors[i]).call{value:payto}("");
            if(sent){
        investment.amountCollected=investment.amountCollected-payto;
    }
         }
    }
}
function getInvestments()public view returns(InvestmentScheme[]memory){
    InvestmentScheme[]memory allInvestments=new InvestmentScheme[](numberOfInvestments);
    for(uint i=0;i<numberOfInvestments;i++){
        InvestmentScheme storage item=investments[i];
        allInvestments[i]=item;
    }
   
    return allInvestments;
}
function getInvestmentByCatagory(string memory _catagory)public view returns(InvestmentScheme[]memory){
               InvestmentScheme[]memory investmentc=new InvestmentScheme[](numberOfInvestments);
               for(uint i=0;i<numberOfInvestments;i++){
                InvestmentScheme storage item=investments[i];
                require (keccak256(abi.encodePacked(item.catagory)) == keccak256(abi.encodePacked(_catagory)));
                investmentc[i]=item;
               }
               return investmentc;
    }
}
