import Navbar from './Navbar'
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { encode, decode } from 'bs58'
import { useState } from 'react'
import * as bip39 from "bip39";
// import { generateMnemonic } from 'bip39'
 
const CreateWallet = () => {

    const [ pKey, setpKey ] = useState<string>("")
    const [ secretKey, setSecretKey ] = useState<string>("")
    const [ words, setWords ] = useState<string>("")
    // const [ pattern, setPattern ] = useState<string>("money")
    // const [ address, setAddress ] = useState<string>("")

    const getAirdrop = async(address: PublicKey) => {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed")
        const signature = await connection.requestAirdrop(address, LAMPORTS_PER_SOL)
        const result = await connection.confirmTransaction(signature)
        console.log("airdrop result: "+ result)
        return;
    }

    // const acount2 = {
    //     publicKey: "BM4CguPRweA6dmHD7k32kwKPZiJAUGn4WVFFrAgesegX",
    //     secretKey: "9342ZBoGntWunFgscNeSVnErKBcUafqtT9MR1q9cfEQojXTkBuNQoJqbiPxEzKYMX2tHXGAif3MQCWLMuazA5Km"
    // }

    const newWallet = () => {
        const newKey = Keypair.generate();
        const secretKeyBase58 = encode(newKey.secretKey)
        getAirdrop(newKey.publicKey)
        // const secretKeyBase64 = Buffer.from(newKey.secretKey).toString('base64');
        setpKey(newKey.publicKey.toBase58());
        setSecretKey(secretKeyBase58)
        // setSecretKey("Base 64 secretkey:" + secretKeyBase64)
        console.log("PublicKey:" + newKey.publicKey.toBase58());
        console.log("secretkey(base58):" + secretKeyBase58);
        // console.log("secretkey(Base64):" + secretKeyBase64);
        return;
    }

    const restoreWallet = (secret: string) => {
        // const secretKeyUint8Array = Uint8Array.from(Buffer.from(secret, 'base64'));
        // const keypair = Keypair.fromSecretKey(secretKeyUint8Array);
        // console.log(secretKeyUint8Array);
        // console.log(keypair.publicKey.toBase58());
        // console.log(Buffer.from(keypair.secretKey).toString('base64'));
        const keypair = Keypair.fromSecretKey(decode(secret));
        console.log(keypair.publicKey.toBase58());
        // console.log(Buffer.from(keypair.secretKey).toString('base64'));
        return;
    }

    const validatePublicKey = (pk: string) => {
        const key = new PublicKey(pk);
        console.log(PublicKey.isOnCurve(key.toBytes()));
        return;
    }

    const createMnemonic = () => {
        const mnemonic = bip39.generateMnemonic(256);
        setWords(mnemonic)
        console.log(mnemonic);
        return;
    }

    const getMnemonic = (phrases: string) => {
        const seed = bip39.mnemonicToSeedSync(phrases, "")
        const keypair = Keypair.fromSeed(seed.slice(0, 32))
        console.log(encode(keypair.secretKey));
        return;
    }

    // const vanityAddress = async(name: string) => {
    //     let keypair: Keypair;
    //     let publicKey: string;

    //     do {
    //         keypair = Keypair.generate();
    //         publicKey = keypair.publicKey.toBase58();
    //     } while (!publicKey.startsWith(name));

    //     setAddress(publicKey);
    //     console.log('Vanity Address:', publicKey);
        
    //     return;
    // }

    return (
        <div className='h-screen bg-gray-900 w-full px-5'>
            <Navbar />
            <section className='h-full w-full flex justify-center items-center'>
                <div className='border border-gray-300 rounded-2xl p-14 w-1/2 flex justify-center'>
                    <div className=''>
                        <button type='button' className='py-3 px-5 bg-green-600 rounded-2xl mb-5 hover:bg-green-400' onClick={() => newWallet()}>Create wallet</button>
                        <button type='button' className='py-3 px-5 bg-blue-600 rounded-2xl mt-5 mb-5 hover:bg-green-400' onClick={() => restoreWallet(secretKey)}>restore Wallet</button>
                        <button type='button' className='py-3 px-5 bg-yellow-600 rounded-2xl mt-5 mb-5 hover:bg-green-400' onClick={() => validatePublicKey(pKey)}>Validate public key</button>
                        <button type='button' className='py-3 px-5 bg-teal-600 rounded-2xl mt-5 mb-5 hover:bg-teal-400' onClick={() => createMnemonic()}>Generate seed Phrase</button>
                        <button type='button' className='py-3 px-5 bg-pink-600 rounded-2xl mt-5 mb-5 hover:bg-teal-400' onClick={() => getMnemonic(words)}>get keypair</button>
                        {/* <button type='button' className='py-3 px-5 bg-pink-600 rounded-2xl mt-5 mb-5 hover:bg-teal-400' onClick={() => vanityAddress(pattern)}>special address</button> */}
                        <p className='text-white text-xl text-center'>{pKey ? pKey : "No key yet!"}</p>
                        {/* <p className='text-white text-xl text-center'>{address}</p> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CreateWallet