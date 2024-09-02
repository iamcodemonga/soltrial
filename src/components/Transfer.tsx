import { useState } from "react"
import Navbar from "./Navbar"
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
// import { decode } from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";

const Transfer = () => {

    // const sender = {
    //     publicKey: "BM4CguPRweA6dmHD7k32kwKPZiJAUGn4WVFFrAgesegX",
    //     secretKey: "9342ZBoGntWunFgscNeSVnErKBcUafqtT9MR1q9cfEQojXTkBuNQoJqbiPxEzKYMX2tHXGAif3MQCWLMuazA5Km"
    // }

    const {publicKey, sendTransaction} = useWallet()

    const [ recipient, setRecipient ] = useState<string>("");
    const [ amount, setAmount ] = useState<number>(0);

    const sendSol = async() => {
        if (!publicKey) {
            console.log("No wallet connected");
            return;
        }

        const connection = new Connection('https://api.devnet.solana.com');
        const recipientKey = new PublicKey(recipient);
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientKey,
                lamports: amount*1000000000
            })
        )

        try {
            const signature = await sendTransaction(transaction, connection)
            await connection.confirmTransaction(signature, "processed");
            console.log(signature);
        } catch (error) {
            console.log(error);
            
        }
        return;

    }


    return (
        <div className='h-screen bg-gray-900 w-full px-5'>
            <Navbar />
            <section className='h-full w-full flex justify-center items-center'>
                <div className='border border-gray-300 rounded-2xl p-14 w-1/2 flex justify-center'>
                    <div className=''>
                        <form action="" method="post">
                            <div className="space-y-1">
                                <label htmlFor="" className="text-gray-300 text-sm">Recipients address</label>
                                <input type="text" name="" id="" placeholder="Recipient address" className="w-full px-3 py-2 rounded-lg bg-transparent border border-white text-white" onChange={(e) => setRecipient(e.target.value)} value={recipient} />
                            </div>
                            <div className="space-y-1 mt-4">
                                <label htmlFor="" className="text-gray-300 text-sm">Amount (in SOL)</label>
                                <input type="number" name="" id="" placeholder="Amount" className="w-full px-5 py-2 rounded-lg bg-transparent border border-white text-white" onChange={(e) => setAmount(Number(e.target.value))} value={amount} />
                            </div>
                            <button type='button' className='w-full py-3 px-5 bg-green-600 rounded-lg mt-5 hover:bg-green-400' onClick={() => sendSol()}>Send Funds</button>
                        </form>
                        {/* <button type='button' className='py-3 px-5 bg-pink-600 rounded-2xl mt-5 mb-5 hover:bg-teal-400' onClick={() => vanityAddress(pattern)}>special address</button> */}
                        {/* <p className='text-white text-xl text-center'>{address}</p> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Transfer