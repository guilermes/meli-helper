// src/pages/ProductList.tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import ProductTable from '../components/Table';
import { ProductEditModal } from '../components/EditModal';
import { Product } from '../components/Table'; // Ajuste o import conforme seu projeto

export default function ProductList() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Product | null>(null);
  
  const navigate = useNavigate();

  // 🔒 Centraliza a geração dos Headers com o Token JWT do localStorage
  const obterHeaders = useCallback(() => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  }, []);

  // 🔹 Logout centralizado usando o ecossistema do React Router
  const efetuarLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate('/login'); // Redireciona para a página de login
  }, [navigate]);

  // 🔹 Buscar anúncios da API (GET)
  const buscarAnuncios = useCallback(async () => {
    // 🔒 Bloqueio de segurança caso o token suma misteriosamente
    if (!localStorage.getItem("token")) {
      efetuarLogout();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/anuncios", {
        headers: obterHeaders()
      });

      if (res.status === 401) {
        efetuarLogout();
        return;
      }

      const dados = await res.json();
      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
    } finally {
      setLoading(false);
    }
  }, [obterHeaders, efetuarLogout]);

  // Carregamento automático ao montar a tela
  useEffect(() => {
    buscarAnuncios();
  }, [buscarAnuncios]);

  const lidarComEditarClick = (produto: Product) => {
    setProdutoEmEdicao(produto);
    setModalAberto(true);
  };

  // 🔹 Salvar edição (PUT)
  const salvarAlteracoes = async (produtoAtualizado: Product) => {
    try {
      const res = await fetch(`http://localhost:3000/anuncios/${produtoAtualizado.id}`, {
        method: "PUT",
        headers: obterHeaders(),
        body: JSON.stringify({
          nome: produtoAtualizado.nome,
          marca: produtoAtualizado.marca,
          custo: Number(produtoAtualizado.custo),
          precoVenda: Number(produtoAtualizado.precoVenda),
          freteCalculado: Number(produtoAtualizado.freteCalculado), // Seu backend espera 'frete' no body
          largura: Number(produtoAtualizado.largura),
          altura: Number(produtoAtualizado.altura),
          comprimento: Number(produtoAtualizado.comprimento),
          peso: Number(produtoAtualizado.peso)
        })
      });

      if (res.status === 401) {
        efetuarLogout();
        return;
      }

      if (!res.ok) throw new Error("Erro na atualização do servidor");

      // Atualiza o estado local para poupar uma requisição HTTP extra de recarga
      setProdutos((prev) => 
        prev.map((p) => p.id === produtoAtualizado.id ? produtoAtualizado : p)
      );
      
      setModalAberto(false);
      setProdutoEmEdicao(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar as alterações do anúncio");
    }
  };

  // 🔹 Excluir anúncio (DELETE)
  const lidarComExcluir = async (id: string) => {
    if (!window.confirm("Deseja realmente excluir este anúncio?")) return;

    try {
      const res = await fetch(`http://localhost:3000/anuncios/${id}`, {
        method: "DELETE",
        headers: obterHeaders()
      });

      if (res.status === 401) {
        efetuarLogout();
        return;
      }

      if (!res.ok) throw new Error("Erro ao deletar no servidor");

      // Remove da tabela instantaneamente filtrando o estado
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir o anúncio");
    }
  };

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl" align="flex-end">
        <div>
          <Title order={2} c="white">Lista de Anúncios</Title>
          <Text size="sm" c="slate.400" mt={4}>Gerencie seus produtos, dimensões e margens do Mercado Livre</Text>
        </div>
        <Group>
          <Button onClick={buscarAnuncios} variant="light" color="teal" loading={loading}>
            Atualizar Dados
          </Button>
          <Button onClick={efetuarLogout} variant="subtle" color="red">
            Sair
          </Button>
        </Group>
      </Group>

      <ProductTable 
        produtos={produtos} 
        onEditar={lidarComEditarClick} 
        onExcluir={lidarComExcluir} 
      />

      <ProductEditModal 
        opened={modalAberto}
        onClose={() => {
          setModalAberto(false);
          setProdutoEmEdicao(null);
        }}
        product={produtoEmEdicao}
        onSave={salvarAlteracoes}
      />
    </Container>
  );
}