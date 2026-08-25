// ==========================================================
// 1. DADOS E VARIÁVEIS GLOBAIS (Não altere os IDs)
// ==========================================================
const produtos = [
  { id: "1", nome: "Caviar Polanco 1", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "2", nome: "Caviar Polanco 2", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "3", nome: "Caviar Polanco 3", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "4", nome: "Caviar Polanco 4", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "5", nome: "Caviar Polanco 5", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "6", nome: "Caviar Polanco 6", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "7", nome: "Caviar Polanco 7", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "8", nome: "Caviar Polanco 8", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" },
  { id: "9", nome: "Caviar Polanco 9", preco: 150.00, img: "../images/caviar-polanco-siberian-reserve-30g_04f8f731-f5cb-4720-80b7-49af5675303b_1200x.webp" }
];

// Array que guarda os itens adicionados ao carrinho
let itensCarrinho = [];

// Variável para guardar o termo de pesquisa atual
let termoPesquisaAtivo = ""; 

/* Manipulação dos painéis laterais */
// Declaramos as variáveis fora das funções para que sejam acessíveis globalmente
const carteira = document.getElementById("saldo");
const carrinho = document.getElementById("carrinho");
const cards = document.getElementById('primeiro');

// ==========================================================
// 2. INICIALIZAÇÃO (Roda quando a página carrega)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Configura o escutador do input de pesquisa
  inicializarPesquisa();
  
  // Desenha todos os produtos inicialmente na tela
  card(produtos); 
  
  // Atualiza o estado visual do carrinho (badge, etc.)
  atualizarHTMLCarrinho();
});

// ==========================================================
// 3. FUNÇÕES PRINCIPAIS (Renderização e Pesquisa)
// ==========================================================

// Configura o input de pesquisa para filtrar ao digitar
function inicializarPesquisa() {
  const inputPesquisar = document.getElementById("inputPesquisar");
  
  if (inputPesquisar) {
    // Escuta o evento 'input' (dispara a cada tecla digitada)
    inputPesquisar.addEventListener("input", (evento) => {
      // Pega o texto e padroniza em minúsculas
      termoPesquisaAtivo = evento.target.value.toLowerCase();
      
      // Filtra o array original 'produtos'
      const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termoPesquisaAtivo)
      );
      
      // Desenha APENAS os produtos filtrados
      card(produtosFiltrados);
    });
  }
}

// Desenha os cards de produtos na tela
// RECEBE: Uma lista de produtos (completa ou filtrada)
function card(listaDeProdutos) {
  const containerCards = document.querySelector("#primeiro");
  if (!containerCards) return;

  containerCards.innerHTML = "";

  // Caso a pesquisa não retorne resultados, mostra mensagem
  if (listaDeProdutos.length === 0) {
    containerCards.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center; color: #666; margin-top: 30px; font-size: 1.1em;">
        Nenhum produto encontrado para "${termoPesquisaAtivo}".
      </p>`;
    return;
  }

  // Itera sobre a lista recebida e cria o HTML
  listaDeProdutos.forEach(produto => {
    containerCards.innerHTML += `
      <div class="DivCard">
          <img src="${produto.img}" class="fotoCard" alt="${produto.nome}">
          <p class="texto">${produto.nome}</p>
          <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
          <button class="butcard" onclick="adicionarCarrinho('${produto.id}')">Adicionar</button>
      </div>`;
  });
}

// ==========================================================
// 4. FUNÇÕES DO CARRINHO (Lógica e Visual)
// ==========================================================

// Adiciona um produto ao carrinho ou aumenta a quantidade
function adicionarCarrinho(idProduto) {
  const produtoEncontrado = produtos.find(p => p.id === idProduto);
  if (!produtoEncontrado) return;

  const itemExistente = itensCarrinho.find(item => item.id === idProduto);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    itensCarrinho.push({ ...produtoEncontrado, quantidade: 1 });
  }

  atualizarHTMLCarrinho();
}

// Atualiza todos os elementos visuais do carrinho
function atualizarHTMLCarrinho() {
  const txtCarrinho = document.getElementById("txtCarrinho");
  const meiocarrinho = document.getElementById("meiocarrinho");
  const baixoCarrinho = document.getElementById("baixoCarrinho");
  const contadorCarrinho = document.getElementById("contador-carrinho");

  const totalItens = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  // 1. Atualiza o badge vermelho (bolinha) no topo
  if (contadorCarrinho) {
    contadorCarrinho.innerText = totalItens;
  }

  // 2. Atualiza o cabeçalho do painel lateral ("X itens")
  if (txtCarrinho) {
    txtCarrinho.innerHTML = `
      <h2>Carrinho</h2>
      <p>${totalItens} ${totalItens === 1 ? 'item' : 'itens'}</p>
    `;
  }

  // 3. Atualiza a lista de produtos no meio do carrinho
  if (meiocarrinho) {
    if (itensCarrinho.length === 0) {
      meiocarrinho.innerHTML = `
        <p>Seu carrinho está vazio</p>
        <small>"Adicione um produto para começar."</small>
      `;
    } else {
      meiocarrinho.innerHTML = "";
      itensCarrinho.forEach(item => {
        meiocarrinho.innerHTML += `
          <div style="display:flex; justify-content:space-between; align-items:center; padding: 10px; border-bottom: 1px solid #ddd;">
            <div style="text-align:left;">
              <p style="font-weight:bold; margin:0;">${item.nome}</p>
              <small>R$ ${item.preco.toFixed(2)} x ${item.quantidade}</small>
            </div>
          </div>
        `;
      });
    }
  }

  // 4. Atualiza o valor total em dinheiro
  if (baixoCarrinho) {
    const elementoPreco = baixoCarrinho.querySelector("h3");
    if (elementoPreco) {
      elementoPreco.innerText = `R$ ${valorTotal.toFixed(2)}`;
    }
  }
}

// Esvazia o carrinho e atualiza a tela
function cancelarCompra() {
  if (itensCarrinho.length === 0) {
    alert("O carrinho já está vazio!");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja cancelar a compra e esvaziar o carrinho?");

  if (confirmar) {
    itensCarrinho = [];
    atualizarHTMLCarrinho();
    alert("Compra cancelada e carrinho esvaziado com sucesso.");
  }
}

// ==========================================================
// 5. MANIPULAÇÃO DA INTERFACE (Menus e Painéis)
// ==========================================================

// Ajusta o grid de produtos quando os painéis laterais abrem
function atualizarcards() {
  // Verificação de segurança caso os elementos não existam na página
  if (!carteira || !carrinho || !cards) return;

  const carteiraAberta = window.getComputedStyle(carteira).display !== "none";
  const carrinhoAberto = window.getComputedStyle(carrinho).display !== "none";

  // Adiciona/remove classe CSS para mudar o número de colunas
  if (carteiraAberta || carrinhoAberto) {
    cards.classList.add("painel-aberto");
  } else {
    cards.classList.remove("painel-aberto");
  }
}

// Abre/fecha o painel da Carteira
function toggleCarteira() {
  if (!carteira) return;

  const atual = window.getComputedStyle(carteira).display;
  /* Alterna entre flex e none sem interferir no carrinho */
  carteira.style.display = (atual === "none") ? "flex" : "none";
  atualizarcards();
}

// Abre/fecha o painel do Carrinho
function toggleCarrinho() {
  if (!carrinho) return;

  const atual = window.getComputedStyle(carrinho).display;
  /* Alterna entre block e none sem interferir na carteira */
  carrinho.style.display = (atual === "none") ? "block" : "none";
  atualizarcards();
}

// Abre/fecha o menu lateral (Drawer)
function traitMenu() {
  const menu = document.getElementById("lado");
  const overlay = document.getElementById("overlay");

  if (menu && overlay) {
    menu.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
  }
}

// ==========================================================
// 6. MODAL DE PAGAMENTO
// ==========================================================

// Abre o modal de pagamento
function finalizarPagamento(){
  if(itensCarrinho.length === 0){
    alert("Seu carrinho está vazio!");
    return;
  }
  
  // Atualiza o valor total no modal antes de abrir
  const valorTotal = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const modalValorTotal = document.getElementById("modalValorTotal");
  if (modalValorTotal) {
    modalValorTotal.innerText = `R$ ${valorTotal.toFixed(2)}`;
  }

  const modal = document.getElementById("modalPagamento");
  if(modal){
    modal.style.display = "flex";
  }
}

// Fecha o modal de pagamento
function fecharModalPagamento(){
  const modal = document.getElementById("modalPagamento")
  if(modal){
    modal.style.display = "none";
  }
}

// Processa o pagamento, limpa o carrinho e fecha painéis
function processarPagamento(){
  const opcaoSelecionada = document.querySelector('input[name="formaPagamento"]:checked');

  if(!opcaoSelecionada){
    alert("Por favor, selecione uma forma de pagamento!");
    return;
  }

  // 1. Esvazia o carrinho
  itensCarrinho = [];
  
  // 2. Atualiza a tela do carrinho
  atualizarHTMLCarrinho();

  // 3. Força a limpeza direta de elementos HTML do carrinho (garantia extra)
  const listaCarrinho = document.getElementById("meiocarrinho");
  if (listaCarrinho) {
    listaCarrinho.innerHTML = `
        <p>Seu carrinho está vazio</p>
        <small>"Adicione um produto para começar."</small>
      `;
  }

  // Força o valor total a zerar na tela
  const precoTotal = document.querySelector("#baixoCarrinho h3");
  if (precoTotal) {
    precoTotal.innerText = "R$ 0,00";
  }

  // 4. Fecha Modal e Esconde Painel do Carrinho
  fecharModalPagamento();
  if (carrinho) {
    carrinho.style.display = "none";
  }
  
  // Ajusta o grid de produtos
  atualizarcards();
  
  alert("Pagamento processado com sucesso!");
}