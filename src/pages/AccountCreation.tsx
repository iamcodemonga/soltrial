import { useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import { encode } from 'bs58'
import { Keypair } from '@solana/web3.js'

const AccountCreation = () => {

    const [ pubaddress, setPubAddress ] = useState<string>("")
    const [ privatekey, setPrivatekey ] = useState<string>("")

    const handleCreateWallet = async() => {
        const newKey = Keypair.generate();
        const secretKeyBase58 = encode(newKey.secretKey)
        // const secretKeyBase64 = Buffer.from(newKey.secretKey).toString('base64');
        setPubAddress(newKey.publicKey.toBase58());
        setPrivatekey(secretKeyBase58)
        toast.success("Wallet created successfully 🚀")
        // setSecretKey("Base 64 secretkey:" + secretKeyBase64)
        console.log("PublicKey:" + newKey.publicKey.toBase58());
        console.log("secretkey(base58):" + secretKeyBase58);
        // console.log("secretkey(Base64):" + secretKeyBase64);
        return;
    }

    const handleCopy = async(text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast.info("copied to clipboard!")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-screen bg-gray-900 w-full px-5'>
            <Navbar />
            <section className='h-full w-full flex justify-center items-center'>
                <div className="lg:w-4/12">
                    <button type="button" className='px-10 py-4 rounded-lg bg-purple-900 text-white font-bold w-full' onClick={handleCreateWallet}>Generate wallet</button>
                    <div className="space-y-3 mt-5">
                        <div className="bg-gray-800 py-3 px-3 rounded-lg" onClick={() => handleCopy(pubaddress)}>
                            <p className="text-xs text-gray-300">✅ 🎤  Public key</p> 
                            <p className="text-white">{pubaddress}</p>
                        </div>
                        <div className="bg-gray-800 py-3 px-3 rounded-lg" onClick={() => handleCopy(privatekey)}>
                            <p className="text-xs text-gray-300">✅  Secret key</p> 
                            <p className="text-white break-words">{privatekey}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AccountCreation