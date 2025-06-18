// "use client"
import { type ReactNode } from "react"
import { wagmiAdapter, projectId, config, chains } from "../config"
import { createAppKit } from "@reown/appkit/react"

import { WagmiProvider } from "wagmi"

if (!projectId) {
  throw new Error("Project ID is not defined")
}

const metadata = {
  name: "C.A.T",
  description:
    "Scan your asset portfolio",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains,
  metadata,
  allowUnsupportedChain: true,
  features: {
    swaps: false,
    onramp: false,
    analytics: true,
  },
})


const AppKitProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  )
}

export default AppKitProvider;


