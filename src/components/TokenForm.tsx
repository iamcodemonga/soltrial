// import * as Token from '@solana/spl-token';
// import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"


const TokenForm = () => {
    // const { createMint } = Token;
    // const wallet = useWallet()
    // const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    // console.log(wallet);
    
    // const keypair: Keypair = Keypair.fromSecretKey(decode("2cnoQDkWcNnWnYrfbQ6YCoXmctbPDbtapjWKNV7obKYekCftmWPHVarxivHrUEAQGaercGDkNTBczZi3fbVLL71Q"));
    // form states
    const [ tokenName, setTokenName ] = useState<string>("")
    const [ symbol, setSymbol ] = useState<string>("")
    const [ decimal, setDecimal ] = useState<string>("")
    const [ supply, setSupply ] = useState<string>("")
    // result states
    const [ mintAuthority, setMintAuthority ] = useState<string>("")
    const [ tokenMintAddress, setTokenMintAddress ] = useState<string>("")
    const [ associateTokenAccount, setAssociateTokenAccount ] = useState<string>("")

    const [ loading, setLoading ] = useState<boolean>(false)
    // const secretKeyUint8Array = decode("2cnoQDkWcNnWnYrfbQ6YCoXmctbPDbtapjWKNV7obKYekCftmWPHVarxivHrUEAQGaercGDkNTBczZi3fbVLL71Q");
    // const keypair = Keypair.fromSecretKey(secretKeyUint8Array);
    // console.log(keypair.secretKey);
    // console.log(keypair.publicKey);
    

    const handleCopy = async(text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            toast.info("copied to clipboard!")
        } catch (error) {
            console.log(error);
        }
        return;
    }

    const createToken = async() => {
        if (!tokenName || !symbol || !decimal || !supply) {
            toast.error("❌ please fill in all fields")
            return;
        }
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:4000", { name: tokenName, symbol: symbol, decimal: Number(decimal), supply: Number(supply) })
            setMintAuthority(response.data.authority)
            setTokenMintAddress(response.data.token_address)
            setAssociateTokenAccount(response.data.associate_account)
            toast.success("Token created successfully!")
            console.log(response.data.link);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return;
    }
    
    return (
            <form action="" method="post" className="lg:w-4/12" onSubmit={(e) => {
                e.preventDefault();
                createToken()
            }}>
                <h3 className="text-2xl mb-5 text-white text-center">Token creator</h3>
                <div className="mb-3">
                    <label className="text-gray-400 text-xs ml-1">Name</label>
                    <input type="text" placeholder="input token name" className="w-full text-sm py-2 px-3 rounded-lg outline-none bg-gray-600 text-white" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="text-gray-400 text-xs ml-1">Symbol</label>
                    <input type="text" placeholder="Add symbol" className="w-full text-sm py-2 px-3 rounded-lg outline-none bg-gray-600 text-white" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="text-gray-400 text-xs ml-1">Decimals</label>
                    <input type="number" placeholder="add decimals" className="w-full text-sm py-2 px-3 rounded-lg outline-none bg-gray-600 text-white" value={decimal} onChange={(e) => setDecimal(e.target.value)} />
                </div>
                <div className="mb-7">
                    <label className="text-gray-400 text-xs ml-1">Supply</label>
                    <input type="number" placeholder="add supply" className="w-full text-sm py-2 px-3 rounded-lg outline-none bg-gray-600 text-white" value={supply} onChange={(e) => setSupply(e.target.value)} />
                </div>
                <div>
                    <button type="submit" className="py-3 w-full bg-purple-500 rounded-lg font-bold">{loading ? "Loading" : "Submit"}</button>
                </div>
                <div className="space-y-3 mt-5">
                    <div className="bg-gray-800 py-3 px-3 rounded-lg" onClick={() => handleCopy(tokenMintAddress)}>
                        <p className="text-xs text-gray-300">✅  💠  Token mint address</p> 
                        <p className="text-white">{tokenMintAddress}</p>
                    </div>
                    <div className="bg-gray-800 py-3 px-3 rounded-lg" onClick={() => handleCopy(mintAuthority)}>
                        <p className="text-xs text-gray-300">✅ 🏦  Mint authority</p> 
                        <p className="text-white">{mintAuthority}</p>
                    </div>
                    <div className="bg-gray-800 py-3 px-3 rounded-lg" onClick={() => handleCopy(associateTokenAccount)}>
                        <p className="text-xs text-gray-300">✅ 😎  Associate token account</p> 
                        <p className="text-white">{associateTokenAccount}</p>
                    </div>
                </div>
            </form>
    )
}

export default TokenForm