// ==========================================
// CONFIGURAÇÕES
// ==========================================

const PRECO = 4.00;

// Número do WhatsApp
// 55 = Brasil
// 85 = Ceará
const TELEFONE = "558586553888";


// ==========================================
// SABORES
// ==========================================

const sabores = {

    "Maracuja": 0,

    "Ninho com Chocolates": 0,

    "Oreo": 0,

    "Coco": 0,

    "Morango com Calda de Chocolate": 0,

    "Pudim": 0

};


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade(sabor, quantidade) {

    sabores[sabor] += quantidade;

    // Nunca permitir quantidade negativa
    if (sabores[sabor] < 0) {
        sabores[sabor] = 0;
    }

    atualizarTela();

}


// ==========================================
// CRIAR ID
// ==========================================

function criarId(sabor) {

    return sabor
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "-");

}


// ==========================================
// ATUALIZAR QUANTIDADES NA TELA
// ==========================================

function atualizarTela() {

    let totalItens = 0;

    let valorTotal = 0;


    // Atualiza cada sabor

    Object.keys(sabores).forEach(sabor => {

        const quantidade = sabores[sabor];

        const id = "qtd-" + criarId(sabor);

        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.textContent = quantidade;
        }

        totalItens += quantidade;

        valorTotal += quantidade * PRECO;

    });


    // Atualiza total

    document.getElementById("total").textContent =
        formatarMoeda(valorTotal);


    atualizarListaPedido();

}


// ==========================================
// LISTA DO PEDIDO
// ==========================================

function atualizarListaPedido() {

    const lista =
        document.getElementById("listaPedido");


    let html = "";

    let temPedido = false;


    Object.keys(sabores).forEach(sabor => {

        const quantidade = sabores[sabor];


        if (quantidade > 0) {

            temPedido = true;

            const subtotal =
                quantidade * PRECO;


            html += `

                <div class="item-pedido">

                    <div>

                        <div class="item-nome">
                            ${sabor}
                        </div>

                        <div class="item-quantidade">
                            ${quantidade} x R$ 4,00
                        </div>

                    </div>

                    <strong>
                        ${formatarMoeda(subtotal)}
                    </strong>

                </div>

            `;

        }

    });


    if (!temPedido) {

        html = `

            <div class="pedido-vazio">

                <span>🍧</span>

                <p>
                    Você ainda não escolheu nenhum dindin.
                </p>

            </div>

        `;

    }


    lista.innerHTML = html;

}


// ==========================================
// FORMATAR DINHEIRO
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================
// ENVIAR PARA WHATSAPP
// ==========================================

function enviarWhatsApp() {

    let totalItens = 0;

    let valorTotal = 0;

    let mensagem =
        "Olá! 😊 Gostaria de fazer um pedido no Dindin da Ge.%0A%0A";


    // Nome

    const nome =
        document.getElementById("nome").value.trim();


    if (nome) {

        mensagem +=
            "👤 Nome: " +
            encodeURIComponent(nome) +
            "%0A%0A";

    }


    mensagem +=
        "🍧 *MEU PEDIDO*%0A%0A";


    // Sabores

    Object.keys(sabores).forEach(sabor => {

        const quantidade = sabores[sabor];


        if (quantidade > 0) {

            const subtotal =
                quantidade * PRECO;


            totalItens += quantidade;

            valorTotal += subtotal;


            mensagem +=
                "• " +
                quantidade +
                "x " +
                encodeURIComponent(sabor) +
                " - " +
                encodeURIComponent(
                    formatarMoeda(subtotal)
                ) +
                "%0A";

        }

    });


    // Verifica se escolheu alguma coisa

    if (totalItens === 0) {

        alert(
            "🍧 Escolha pelo menos um sabor antes de enviar o pedido!"
        );

        document
            .getElementById("sabores")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    // Observação

    const observacao =
        document
            .getElementById("observacao")
            .value
            .trim();


    mensagem +=
        "%0A💰 *TOTAL: " +
        encodeURIComponent(
            formatarMoeda(valorTotal)
        ) +
        "*%0A";


    if (observacao) {

        mensagem +=
            "%0A📝 Observação:%0A" +
            encodeURIComponent(observacao);

    }


    mensagem +=
        "%0A%0AObrigado! ❤️";


    // Criar URL

    const url =
        "https://wa.me/" +
        TELEFONE +
        "?text=" +
        mensagem;


    // Abrir WhatsApp

    window.open(url, "_blank");

}


// ==========================================
// BOTÃO FLUTUANTE
// ==========================================

function irParaPedido() {

    document
        .getElementById("pedido")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarTela();