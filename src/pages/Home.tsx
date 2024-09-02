// import { PublicKey } from '@solana/web3.js'
import Airdrop from '../components/Airdrop'
import Navbar from '../components/Navbar'

const Home = () => {

  return (
    <div className='h-screen bg-gray-900 w-full px-5'>
        <Navbar />
        <section className='h-full w-full flex justify-center items-center'>
            <Airdrop />
        </section>
    </div>
  )
}

export default Home