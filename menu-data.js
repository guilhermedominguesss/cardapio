/* =====================================================================
   MAROMBA ESPETINHO — DADOS DO CARDÁPIO
   ---------------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA MUDAR O CARDÁPIO.

   • preco: número com PONTO no lugar da vírgula (19.90 = R$ 19,90).
            Use null para mostrar "Consulte".
   • foto:  caminho da imagem dentro da pasta /img.
            Se o arquivo não existir, aparece um placeholder com a logo.
   • Para adicionar um item, copie um bloco { ... }, cole abaixo e edite.
     Não esqueça a vírgula entre um item e outro.
   ===================================================================== */

const CARDAPIO = {
  /* ---------- Seções normais (na ordem em que aparecem) ---------- */
  categorias: [
    {
      id: "carne",
      titulo: "Espetinhos de Carne",
      menu: "Carne", // nome curto que aparece na barra de categorias
      itens: [
        { nome: "Shape Mignon", preco: 19.90, descricao: "Espetinho de mignon assado na brasa", foto: "img/shapemignon.jpeg" },
        { nome: "Mignon Bombado", preco: 23.90, descricao: "Espetinho de medalhão de mignon e bacon assado na brasa", foto: "img/mignonbombado.jpeg" },
        { nome: "Carne Fit", preco: 17.00, descricao: "Espetinho de alcatra na brasa", foto: "img/carnefit.jpeg" },
        { nome: "Kafta Anabólico", preco: 17.00, descricao: "Espetinho de patinho moído com tempero típico de culinária árabe", foto: "img/kafta.jpeg" },
      ],
    },
    {
      id: "frango",
      titulo: "Espetinhos de Frango",
      menu: "Frango",
      itens: [
        { nome: "Frango de Academia", preco: 16.00, descricao: "Espetinho de frango assado na brasa", foto: "img/frangodeacademia.jpeg" },
        { nome: "Frango Bombado", preco: 23.90, descricao: "Espetinho de medalhão de frango e bacon assado na brasa", foto: "img/frango-bombado.jpg" },
        { nome: "Coração Fibrado", preco: 16.00, descricao: "Espetinho de coração de galinha assado na brasa", foto: "img/coracaofibrado.jpeg" },
      ],
    },
    {
      id: "complementos",
      titulo: "Complementos do Treino",
      menu: "Complementos",
      itens: [
        { nome: "Queijo Trincado", preco: 15.00, descricao: "Espetinho de queijo coalho assado na brasa", foto: "img/queijotrincado.jpeg" },
        { nome: "Medalhão de Mandioca Tradicional", preco: 10.00, descricao: "Espetinho de mandioca com bacon assado na brasa", foto: "img/queijotrincado.jpeg" },
        { nome: "Medalhão de Mandioca com Carne Seca", preco: 12.00, descricao: "Espetinho de mandioca com bacon e carne seca assado na brasa", foto: "img/queijotrincado.jpeg" },
        { nome: "Tilápia", preco: 17.00, descricao: "Espetinho de tilápia assado na brasa", foto: "img/tilapia.jpeg" },
      ],
    },
    {
      id: "lanches",
      titulo: "Lanches",
      menu: "Lanches",
      itens: [
        { nome: "Arnold Schwarzenegger", preco: 29.00, descricao: "Pão, queijo mussarela, dois espetinhos de frango, fatias de bacon, vinagrete e pasta de alho. Delicioso lanche feito na brasa.", foto: "img/arnoldd.jpeg" },
        { nome: "Combo Monstro", preco: 24.00, descricao: "Pão, queijo mussarela e espetinho de alcatra assado na brasa", foto: "img/combo-monstro.jpg" },
        { nome: "The Rock", preco: 35.00, descricao: "Pão, queijo mussarela, dois espetinhos de mignon, fatias de bacon, vinagrete e pasta de alho. Delicioso lanche feito na brasa.", foto: "img/therock.jpeg" },
        { nome: "Pão de Alho Maromba", preco: 22.00, descricao: "Pão de alho com espetinho de alcatra dentro, assado na brasa", foto: "img/paodealho.jpeg" },
        // preco: null => aparece "Consulte". Quando tiver o valor, troque por ex.: preco: 32.00
        { nome: "Hambúrguer Bombado", preco: null, descricao: "2 hambúrgueres mistos, fatias de bacon, queijo mussarela, presunto, vinagrete, tomate, alface e pasta de alho. Delicioso lanche feito na brasa.", foto: "img/lanchebombado.jpeg" },
      ],
    },
  ],

  /* ---------- Seção Açaí e Shakes (sempre a última) ---------- */
  acai: {
    id: "acai",
    titulo: "Açaí e Shakes",
    menu: "Açaí e Shakes",
    foto: "img/acai.jpg", // foto de destaque da seção (já tratada)

    tamanhos: [
      { nome: "300ml", preco: 14.00 },
      { nome: "500ml", preco: 18.00 },
    ],

    adicionais: [
      { nome: "Leite condensado", preco: 5.00 },
      { nome: "Leite em pó", preco: 5.00 },
      { nome: "Ovomaltine", preco: 5.00 },
      { nome: "Paçoca", preco: 5.00 },
      { nome: "Granola", preco: 4.00 },
      { nome: "Confete", preco: 5.00 },
      { nome: "Whey", preco: 9.00 },
    ],

    frutas: [
      { nome: "Banana", preco: 3.00 },
      { nome: "Morango", preco: 3.00 },
    ],

    doseWhey: [
      { nome: "250ml + leite + dose de whey", preco: 12.00 },
      { nome: "Adicional de fruta", preco: 1.00 },
    ],

    shake: {
      nome: "Shake de Whey",
      preco: 20.00,
      descricao: "250ml de leite ou água de coco + 200g de açaí + dose de whey.",
      foto: "img/shake-whey.jpg",
    },
  },
};
