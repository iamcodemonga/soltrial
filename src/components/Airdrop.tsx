import { useState } from "react"
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";


const Airdrop = () => {
    const { connected, publicKey } = useWallet();
    const [ amount, setAmount ] = useState<number>(1);
    const [ address, setAddress ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false)

    const handleGetAirdrop = async(quantity: number) => {
        const wallet = connected ? publicKey : new PublicKey(address)
        const connection = new Connection("https://api.devnet.solana.com", "confirmed")
        setLoading(true)
        try {
            const signature = await connection.requestAirdrop(wallet as PublicKey, quantity*LAMPORTS_PER_SOL)
            const result = await connection.confirmTransaction(signature)
            toast.success("Airdropped successful")
            console.log("airdrop result: "+ result)
            return;
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <form action="" method="post" className="lg:w-4/12" onSubmit={(e) => {
            e.preventDefault()
            handleGetAirdrop(amount)
            }}>
            <h3 className="text-2xl mb-5 text-white text-center">Request Airdrop</h3>
            <div className="mb-3">
                <label className="text-gray-400 text-xs ml-1">Amount</label>
                <input type="number" placeholder="add amount" className="w-full text-sm py-2 px-3 rounded-lg outline-none bg-gray-600 text-white" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="mb-7">
                <label className="text-gray-400 text-xs ml-1">Address(Public key)</label>
                <input type="text" placeholder="add account public key" className="w-full text-sm py-2 px-3 rounded-lg outline-none bg-gray-600 text-white" disabled={connected ? true : false} value={connected ? publicKey?.toBase58() : address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <button type="submit" className="py-3 w-full bg-purple-500 rounded-lg font-bold">{loading ? "Loading" : "Submit"}</button>
            </div>
        </form>
    )
}

export default Airdrop