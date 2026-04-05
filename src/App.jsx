import { useState } from 'react'
import logoChocolate from '/bolo2kg.png' 
import './App.css'
import { Analytics } from "@vercel/analytics/react";


function App() {
  const [carrinho, setCarrinho] = useState([]); 
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [metodoEntrega, setMetodoEntrega] = useState('retirada'); 
  const [categoriaAtiva, setCategoriaAtiva] = useState('Bolo'); // Começa em 'Todos'
  const [formaPagamento, setFormaPagamento] = useState('Pix'); // Estado para o pagamento
  
  const [cliente, setCliente] = useState({ 
    nome: '', endereco: '', data: '',
    massaBolo: 'Pão de ló Baunilha', 
    massaCupcake: 'Chocolate' 
  });
                                                              3
  const restaurante = { 
    nome: "Confeitaria Sabores", 
    fone: "5511971128269",
    cor: "#fb6f92" 
  };

  const imagensCategorias = {
    "Bolo": "/bolo1kg.jpeg",
    "Docinho": "/doce-festa.png",
    "Docinho Gourmet": "/doce-gourmet.png",
    "Cupcake": "/capcake.jpeg",
    "Sobremesas": "/bombom-uva.png"
  };s

  const produtos = [
    { id: 101,  nome: "Bolo Ninho com Morango", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Bolo ninho com morango." },
    { id: 102,  nome: "Bolo Beijinho com Morango", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Bolo beijinho com morango." },
    { id: 103,  nome: "Bolo Brigadeiro com Morango", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Brigadeiro com morango." },
    { id: 104,  nome: "Bolo Abacaxi com doce de leite", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Bolo abacaxi com doce de leite." },
    { id: 105,  nome: "Bolo Brigadeiro Branco", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Bolo brigadeiro branco." },
    { id: 106,  nome: "Bolo Brigadeiro e ninho", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Brigadeiro com ninho.", },
    { id: 107,  nome: "Bolo Mousse de chocolate ao leite e brigadeiro", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Mousse de chocolate e brigadeiro." },
    { id: 108,  nome: "Bolo Abacaxi com doce de leite e Brigadeiro branco", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Abacaxi, doce de leite e brig. branco.", },
    { id: 109,  nome: "Bolo de Brigadeiro branco com morango", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Brigadeiro branco com morango." },
    { id: 110,  nome: "Bolo Brigadeiro", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Bolo clássico de brigadeiro." },
    { id: 111,  nome: "Bolo Brigadeiro com maracujá", precos: {"1Kg":100.00, "2Kg":200.00, "3Kg":300.00}, categoria: "Bolo", desc: "Brigadeiro com toque de maracujá.", },
    { id: 150,  nome: "Brigadeiro Tradicional", precos: {"1 cento":130.00, "meio cento":65.00}, categoria: "Docinho", desc: "Brigadeiro tradicional." },
    { id: 151,  nome: "Beijinho", precos: {"1 cento":150.00, "meio cento":75.00}, categoria: "Docinho", desc: "Beijinho clássico." },
    { id: 152,  nome: "Brigadeiro Branco", precos: {"1 cento":130.00, "meio cento":75.00}, categoria: "Docinho", desc: "Brigadeiro Branco." },
    { id: 153,  nome: "Casadinho", precos: {"1 cento":130.00, "meio cento":75.00}, categoria: "Docinho", desc: "Casadinho (Preto e Branco)." },
    { id: 160,  nome: "Romeu e Julieta", precos: {"1 cento":172.00, "meio cento":86.00}, categoria: "Docinho Gourmet", desc: "Queijo com goiabada." },
    { id: 161,  nome: "Churros", precos: {"1 cento":140.00, "meio cento":70.00}, categoria: "Docinho Gourmet", desc: "Doce de leite e canela."},
    { id: 162,  nome: "Surpresa de Uva", precos: {"1 cento":172.00, "meio cento":86.00}, categoria: "Docinho Gourmet", desc: "Uva coberta com brigadeiro branco." },
    { id: 163,  nome: "Ninho com Nutella", precos: {"1 cento":180.00, "meio cento":90.00}, categoria: "Docinho Gourmet", desc: "Ninho original com Nutella."},
    { id: 300,  nome: "Cupcake Brigadeiro", precos: {"12un":36.00, "25un":75.00, "50un":150.00, "100un":300.00 }, categoria: "Cupcake", desc: "Cupcake de Brigadeiro." },
    { id: 301,  nome: "Cupcake Ninho", precos: {"12un":36.00, "25un":75.00, "50un":150.00, "100un":300.00}, categoria: "Cupcake", desc: "Cupcake de Ninho." },
    { id: 201,  nome: "Pudim pequeno", precoFixo: 65.00, categoria: "Sobremesas", desc: "Pudim caseiro." },
    { id: 202,  nome: "Pudim grande", precoFixo: 130.00, categoria: "Sobremesas", desc: "Pudim para família." },
    { id: 203,  nome: "Bombom de uva", precoFixo: 95.00, categoria: "Sobremesas", desc: "Uvas na travessa." },
    { id: 204,  nome: "Pavê", precoFixo: 70.00, categoria: "Sobremesas", desc: "Pavê tradicional de baunilha." },
    { id: 205,  nome: "Bombom de morango", precoFixo: 120.00, categoria: "Sobremesas", desc: "Morangos com creme e chocolate." },
  ];

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  const adicionarAoCarrinho = (produto, variante = null) => {
    let nomeFinal = produto.nome;
    let precoFinal = produto.precoFixo || 0;

    if (variante) {
      nomeFinal += ` (${variante})`;
      precoFinal = produto.precos[variante];
    }

    if (produto.categoria === "Bolo") nomeFinal += ` | Massa: ${cliente.massaBolo}`;
    if (produto.categoria === "Cupcake") nomeFinal += ` | Massa: ${cliente.massaCupcake}`;

    const novoItem = { id_unico: Date.now(), nome: nomeFinal, preco: precoFinal };
    setCarrinho([...carrinho, novoItem]);
  };

  const enviarWhatsApp = () => {
    if (!cliente.nome || !cliente.data) {
      alert("Preencha Nome e Data!");
      return;
    }

    // Formata a data de AAAA-MM-DD para DD/MM/AAAA
    const dataFormatada = cliente.data.split('-').reverse().join('/');

    const itensPedido = carrinho.map(item => `- ${item.nome}: R$ ${item.preco.toFixed(2)}`).join('\n');
    const msgEntrega = metodoEntrega === 'entrega' ? `*Endereço:* ${cliente.endereco}` : `*Retirada na Loja*`;
    
    const mensagem = encodeURIComponent(
      `*PEDIDO - ${restaurante.nome}*\n\n` +
      `*Cliente:* ${cliente.nome}\n` +
      `*Data:* ${dataFormatada}\n` + // Agora envia no formato brasileiro
      `*Pagamento:* ${formaPagamento}\n` + 
      `*Entrega:* ${metodoEntrega}\n${msgEntrega}\n\n` +
      `*Itens:*\n${itensPedido}\n\n` +
      `*TOTAL: R$ ${total.toFixed(2)}*`
    );

    window.open(`https://wa.me/${restaurante.fone}?text=${mensagem}`, '_blank');
    
    setCarrinho([]);
    setCarrinhoAberto(false);
  };

  return (
    <div className="container">
    <Analytics/>
      
      <header className="header-dinamico">
        <div className="header-content">
          <img src={logoChocolate} alt="Logo" className="logo-header" />
          <h1>{restaurante.nome}</h1>
          <div className="carrinho-header" onClick={() => setCarrinhoAberto(true)}>
            🛒 <span>{carrinho.length}</span>
          </div>
        </div>
      </header>

      <nav className="categorias-nav">
        {['Bolo', 'Docinho', 'Docinho Gourmet', 'Cupcake', 'Sobremesas'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setCategoriaAtiva(cat)} 
            className={categoriaAtiva === cat ? 'btn-categoria ativo' : 'btn-categoria'}
          >
            {cat}
          </button>
        ))}
      </nav>

      <main className="container-cardapio">
        {(categoriaAtiva === 'Bolo' || categoriaAtiva === 'Cupcake') && (
            <section className="config-massas">
              <div className="massa-box">
                <h4>Escolha a massa:</h4>
                <select onChange={(e) => setCliente({...cliente, [categoriaAtiva === 'Bolo' ? 'massaBolo' : 'massaCupcake']: e.target.value})}>
                  <option>Baunilha</option>
                  <option>Chocolate</option>
                </select>
              </div>
            </section>
        )}

        {/* Lógica para mostrar as categorias individuais ou todas juntas */}
        {['Bolo', 'Docinho', 'Docinho Gourmet', 'Cupcake', 'Sobremesas'].map(cat => (
          (categoriaAtiva === 'Todos' || categoriaAtiva === cat) && (
            <section key={cat} className="grupo-categoria">
                <h2>{cat}</h2>
                {categoriaAtiva !== 'Todos' && <img src={imagensCategorias[cat]} alt={cat} className="img-categoria-demonstracao" />}
                <div className="lista-produtos">
                {produtos.filter(p => p.categoria === cat).map(p => (
                    <div key={p.id} className="card-produto-compacto">
                    <div className="info-texto">
                        <h3>{p.nome}</h3>
                        <p>{p.desc}</p>
                    </div>
                    <div className="botoes-precos">
                        {p.precos ? (
                        Object.keys(p.precos).map(v => (
                            <button key={v} onClick={() => adicionarAoCarrinho(p, v)}>
                            {v}: R$ {p.precos[v].toFixed(2)}
                            </button>
                        ))
                        ) : (
                        <button onClick={() => adicionarAoCarrinho(p)}>
                            Adicionar: R$ {p.precoFixo.toFixed(2)}
                        </button>
                        )}
                    </div>
                    </div>
                ))}
                </div>
            </section>
          )
        ))}
      </main>     

      {carrinhoAberto && (
        <div className="modal-carrinho">
          <div className="revisao-pedido">
            <button className="btn-fechar" onClick={() => setCarrinhoAberto(false)}>X</button>
            <h3>Meu Pedido</h3>
            <ul className="itens-revisao">
              {carrinho.map(item => (
                <li key={item.id_unico} className="item-carrinho-linha">
                  <span>{item.nome}</span>
                  <strong>R$ {item.preco.toFixed(2)}</strong>
                  <button onClick={() => setCarrinho(carrinho.filter(i => i.id_unico !== item.id_unico))}>🗑️</button>
                </li>
              ))}
            </ul>
            <div className="dados-entrega">
              <input type="text" placeholder="Seu Nome" onChange={(e) => setCliente({...cliente, nome: e.target.value})} />
              
              <label style={{fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--marrom)', marginTop: '5px'}}>Pagamento:</label>
              <select onChange={(e) => setFormaPagamento(e.target.value)}>
                <option value="Pix">Pix</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>

              <select onChange={(e) => setMetodoEntrega(e.target.value)}>
                <option value="retirada">Vou retirar na loja</option>
                <option value="entrega">Quero Entrega</option>
              </select>
              <input type="date" onChange={(e) => setCliente({...cliente, data: e.target.value})} />
              {metodoEntrega === 'entrega' && <input type="text" placeholder="Endereço completo" onChange={(e) => setCliente({...cliente, endereco: e.target.value})} />}
            </div>
            <div className="total-final">
              <span>Total: R$ {total.toFixed(2)}</span>
              <button className="btn-pedido" onClick={enviarWhatsApp}>Pedir via WhatsApp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App