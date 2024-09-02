import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from '@solana/wallet-adapter-react'


const Navbar = () => {

    const { connected } = useWallet();
    const walletBtnStyle = {
        padding: "0 20px",
        fontSize: "14px",
        // border: "2px solid indigo",
        // backgroundColor: "transparent"
      }

    return (
        <nav className='fixed top-0 left-0 bg-transparent px-5 py-3 flex justify-between items-center w-full'>
            <a href="" className='text-2xl text-sky-600'>Logo</a>
            <div className="space-x-7 text-gray-300">
                <a href="/" className='hover:text-white'>Solana airdrop</a>
                <a href="/createtokens" className='hover:text-white'>Create tokens</a>
                <a href="create" className='hover:text-white'>Balance</a>
            </div>
            <div className="flex items-center">
                <a href="/createwallet" className="px-5 py-3 text-white">Create wallet</a>
                <WalletMultiButton style={walletBtnStyle}>{!connected && "Import wallet"}</WalletMultiButton>
            </div>
        </nav>
    )
}

export default Navbar