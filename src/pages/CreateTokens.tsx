import Navbar from '../components/Navbar'
import TokenForm from '../components/TokenForm'

const CreateTokens = () => {
    return (
        <div className='h-screen bg-gray-900 w-full px-5'>
            <Navbar />
            <section className='h-full w-full flex justify-center items-center'>
                <TokenForm />
            </section>
        </div>
    )
}

export default CreateTokens