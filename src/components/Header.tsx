import React from 'react'
import { Disclosure } from '@headlessui/react'
import ConnectWallet from './shared/WalletConnect'

const Header: React.FC = () => {
  return (
    <Disclosure as="nav" className="bg-white border-b-1 border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center text-blue-500 font-bold text-2xl">
             C.A.T
            </div>
          </div>
          <div className="-mr-2 flex items-center ">
             <ConnectWallet/>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Header