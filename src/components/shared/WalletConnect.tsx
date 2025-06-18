// ConnectWallet.tsx
import React from "react"
import { useAppKit } from "@reown/appkit/react"
import { useAccount } from "wagmi"
import { shortenAddress } from "../../utils"

const ConnectWallet: React.FC = () => {
  const { address, isConnected } = useAccount()
  const { open } = useAppKit()

  const handleConnectWallet = async () => {
    try {
      await open()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnectWallet = async () => {
    await open()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {isConnected && address ? (
        <div className="flex items-center space-x-4 p-3 text-center">
          <p className=" text-16 text-white"></p>
          <button onClick={handleDisconnectWallet}>
            {shortenAddress(address)}
          </button>
        </div>
      ) : (
        <button className="!w-full" onClick={handleConnectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default ConnectWallet
