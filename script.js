/* =====================================================================
   MAROMBA ESPETINHO — CONFIGURAÇÕES (edite aqui)
   ===================================================================== */

// Número do WhatsApp: 55 + DDD + número, só dígitos. Ex.: 5511987654321
const WHATSAPP_NUMERO = "5500000000000";
const WHATSAPP_MENSAGEM = "Olá! Vim pelo cardápio digital e quero fazer um pedido.";

// Instagram e localização do rodapé
const INSTAGRAM_USUARIO = "marombaespetinho"; // sem o @
const ENDERECO_TEXTO = "Endereço da academia";
const LINK_MAPA = "https://maps.google.com/?q=Maromba+Espetinho"; // cole aqui o link do Google Maps

/* =====================================================================
   A PARTIR DAQUI NÃO PRECISA MEXER
   ===================================================================== */

const formatarPreco = (valor) =>
  typeof valor === "number"
    ? valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "Consulte";

const escapar = (texto = "") =>
  String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Foto com placeholder: o fundo já mostra a logo apagada; se a imagem
   carregar, cobre o placeholder. Se falhar, a <img> é removida. */
function htmlFoto(foto, nome, extraClasse = "") {
  const img = foto
    ? `<img src="${escapar(foto)}" alt="${escapar(nome)}" loading="lazy" decoding="async"
         onload="this.parentNode.classList.add('foto--ok')" onerror="this.remove()">`
    : "";
  return `<div class="foto ${extraClasse}">${img}</div>`;
}

function htmlCard(item) {
  const consulte = typeof item.preco !== "number";
  return `
    <article class="card revelar">
      ${htmlFoto(item.foto, item.nome)}
      <div class="card__corpo">
        <h3 class="card__nome">${escapar(item.nome)}</h3>
        <p class="card__desc">${escapar(item.descricao)}</p>
        <p class="preco${consulte ? " preco--consulte" : ""}">${formatarPreco(item.preco)}</p>
      </div>
    </article>`;
}

function htmlLista(itens) {
  return `<ul class="lista">${itens
    .map((i) => `<li><span>${escapar(i.nome)}</span><span class="lista__preco">${formatarPreco(i.preco)}</span></li>`)
    .join("")}</ul>`;
}

function htmlAcai(a) {
  return `
    <section class="secao secao--acai" id="${a.id}" aria-labelledby="t-${a.id}">
      <div class="secao__cabeca">
        <h2 class="secao__titulo" id="t-${a.id}">${escapar(a.titulo)}</h2>
        <p class="secao__sub">Monte o seu do jeito que o treino pede.</p>
      </div>

      <div class="acai">
        <div class="acai__bloco acai__bloco--tamanhos revelar">
          ${htmlFoto(a.foto, "Tigela de açaí cremoso com morango, banana e kiwi", "acai__foto")}
          <div class="acai__tamanhos-corpo">
          <h3 class="acai__titulo"><span class="acai__num">1</span> Escolha o tamanho</h3>
          <div class="tamanhos">
            ${a.tamanhos
              .map(
                (t) => `
              <div class="tamanho">
                <div class="tamanho__info">
                  <span class="tamanho__nome">${escapar(t.nome)}</span>
                  <span class="preco">${formatarPreco(t.preco)}</span>
                </div>
              </div>`
              )
              .join("")}
          </div>
          </div>
        </div>

        <div class="acai__bloco revelar">
          <h3 class="acai__titulo"><span class="acai__num">2</span> Adicionais</h3>
          ${htmlLista(a.adicionais)}
        </div>

        <div class="acai__bloco revelar">
          <h3 class="acai__titulo"><span class="acai__num">3</span> Frutas</h3>
          ${htmlLista(a.frutas)}
        </div>

        <div class="acai__bloco revelar">
          <h3 class="acai__titulo"><span class="acai__icone" aria-hidden="true">⚡</span> Dose de Whey</h3>
          ${htmlLista(a.doseWhey)}
        </div>

        <article class="acai__bloco shake revelar">
          ${htmlFoto(a.shake.foto, a.shake.nome, "foto--quadrada")}
          <div class="shake__corpo">
            <span class="selo">Pós-treino</span>
            <h3 class="card__nome">${escapar(a.shake.nome)}</h3>
            <p class="card__desc">${escapar(a.shake.descricao)}</p>
            <p class="preco">${formatarPreco(a.shake.preco)}</p>
          </div>
        </article>
      </div>
    </section>`;
}

function renderizar() {
  const { categorias, acai } = CARDAPIO;
  const todas = [...categorias, acai];

  // Barra de categorias
  document.getElementById("categorias").innerHTML = todas
    .map((c) => `<a class="chip${c.id === "acai" ? " chip--acai" : ""}" href="#${c.id}" data-alvo="${c.id}">${escapar(c.menu || c.titulo)}</a>`)
    .join("");

  // Seções
  document.getElementById("cardapio").innerHTML =
    categorias
      .map(
        (c) => `
      <section class="secao" id="${c.id}" aria-labelledby="t-${c.id}">
        <div class="secao__cabeca"><h2 class="secao__titulo" id="t-${c.id}">${escapar(c.titulo)}</h2></div>
        <div class="grade">${c.itens.map(htmlCard).join("")}</div>
      </section>`
      )
      .join("") + htmlAcai(acai);
}

/* Destaca a categoria visível e mantém o chip ativo à vista na barra */
function iniciarCategoriaAtiva() {
  const chips = [...document.querySelectorAll(".chip")];
  const trilho = document.getElementById("categorias");
  const secoes = chips.map((c) => document.getElementById(c.dataset.alvo));
  let atual = null;

  function ativar(id) {
    if (id === atual) return;
    atual = id;
    chips.forEach((c) => {
      const ativo = c.dataset.alvo === id;
      c.classList.toggle("chip--ativo", ativo);
      if (ativo) {
        c.setAttribute("aria-current", "true");
        const alvo = c.offsetLeft - (trilho.clientWidth - c.offsetWidth) / 2;
        trilho.scrollTo({ left: alvo, behavior: "smooth" });
      } else {
        c.removeAttribute("aria-current");
      }
    });
  }

  function verificar() {
    const linha = window.innerHeight * 0.3; // seção que cruza 30% da tela é a ativa
    let id = secoes[0].id;
    for (const s of secoes) if (s.getBoundingClientRect().top <= linha) id = s.id;
    // chegou no fim da página: ativa a última
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) id = secoes.at(-1).id;
    ativar(id);
  }

  let pendente = false;
  window.addEventListener(
    "scroll",
    () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(() => {
        verificar();
        pendente = false;
      });
    },
    { passive: true }
  );
  verificar();
}

/* Fade-in suave ao rolar */
function iniciarRevelar() {
  const itens = document.querySelectorAll(".revelar");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    itens.forEach((el) => el.classList.add("visivel"));
    return;
  }
  const obs = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  itens.forEach((el) => obs.observe(el));
}

function configurarLinks() {
  document.getElementById("botao-whatsapp").href =
    `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;
  document.getElementById("link-instagram").href = `https://instagram.com/${INSTAGRAM_USUARIO}`;
  document.getElementById("texto-instagram").textContent = "@" + INSTAGRAM_USUARIO;
  document.getElementById("link-mapa").href = LINK_MAPA;
  document.getElementById("texto-endereco").textContent = ENDERECO_TEXTO;
  document.getElementById("ano").textContent = new Date().getFullYear();
}

renderizar();
configurarLinks();
iniciarCategoriaAtiva();
iniciarRevelar();
