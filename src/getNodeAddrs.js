import { ethers, Contract } from "ethers";
//import * as dotenv from 'dotenv';
//dotenv.config();

export default async function getNodeOperatorAddress(providerURL) {
  const provider = new ethers.JsonRpcProvider(providerURL);
  let contract_address = "0x3556A5005D5411603e0115efD9B875FdFb3ad7E9";
  let abi = [
      "function symbol() view returns (string)",
      "function decimals() view returns (uint)",
      "function _CCDBAddress() view returns (string)"
  ];

  // Create a contract
  let contract = new Contract(contract_address, abi, provider);

  try {
    let ccdbadd = await contract._CCDBAddress();

    return ccdbadd;
  } catch (error) {
    console.error('Error fetching CCDBAddress:', error);
    return '';
  }
}


//async function main() {
//    
//    const providerUrl = process.env.PROVIDER_URL;
//
//    if(providerUrl){
//        try {
//            const nodeAddress: string = await getNodeOperatorAddress(providerUrl);
//            console.log('Greeting from contract:', nodeAddress);
//        } catch (error) {
//            console.error('Error:', error);
//        }
//    } else {
//        console.error("couldn't get provider from the .env")
//    }
//}
//
//main();
