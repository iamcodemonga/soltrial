import { useMemo } from 'react'
import './App.css'
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTokens from './pages/CreateTokens';
import AccountCreation from './pages/AccountCreation';
// require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endPoint = useMemo(() => clusterApiUrl(network), [network]);
  // const { connected, publicKey } = useWallet()
  // console.log(publicKey);
  
  // const endPoint = "https://api-devnet.helius.xyz"
  const wallets = useMemo(() => [], [])

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
           <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/createtokens' element={<CreateTokens />} />
              <Route path='/createwallet' element={<AccountCreation />} />
           </Routes>
           <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              // transition: Bounce
              />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
