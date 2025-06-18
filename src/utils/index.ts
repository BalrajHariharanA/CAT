import { ethers } from "ethers";

export function shortenAddress(address: string, chars = 4) {
  try {
    const parsed = address
    const addressLength = address.length
    return address
      ? `${parsed.substring(0, chars)}...${parsed.substring(Math.abs(addressLength - chars))}`
      : ""
  } catch (error) {
    console.log("Invalid address parameter error", error)
    return ""
  }
}

export function weiToEther(value: string){
  try{
   return parseFloat(ethers.formatEther(parseInt(value) > 0 ? parseInt(value) : 0))
  } catch (error){
       console.log("Invalid value param error", error)
      return ""
  }
}