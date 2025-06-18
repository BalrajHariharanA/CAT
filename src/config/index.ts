import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { mainnet, bsc } from "@reown/appkit/networks"

console.log(import.meta.env.VITE_COINGECKO_API_ENDPOINT)

export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECTID

if (!projectId) {
  throw new Error("Project ID is not defined")
}

export const chains = [mainnet, bsc] as any

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks: chains,
})

export const config = wagmiAdapter.wagmiConfig
