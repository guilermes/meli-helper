import ProductTable from '../components/Table.tsx';

export default function Home() {
    return (
        <>
        <div className="home-page">
            <h1 className="text-white text-4xl font-bold mb-4">Bem-vindo ao Meli Helper</h1>
            <p className="text-white text-lg mb-6">Sua ferramenta definitiva para otimizar suas vendas no Mercado Livre.</p>
            <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Faça Login para Começar
            </a>
        </div>

        <ProductTable produtos={[]} />
        </>
    )
}