const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 13",
      preco: 3999.90,
      categoria: "Celulares",
      imagem: "imgs/iphone.png",
      descricao: "Celular Apple com ótimo desempenho.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Samsung Galaxy A54",
      preco: 1899.90,
      categoria: "Celulares",
      imagem: "imgs/samsung.png",
      descricao: "Celular Samsung com boa câmera.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell",
      preco: 3499.90,
      categoria: "Notebooks",
      imagem: "imgs/dell.png",
      descricao: "Notebook para estudos e trabalho.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "Notebook Lenovo",
      preco: 2899.90,
      categoria: "Notebooks",
      imagem: "imgs/lenovo.png",
      descricao: "Notebook leve e rápido.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 129.90,
      categoria: "Acessórios",
      imagem: "imgs/Mouse.png",
      descricao: "Mouse com iluminação RGB.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 249.90,
      categoria: "Acessórios",
      imagem: "imgs/Teclado.png",
      descricao: "Teclado mecânico para jogos.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Controle Xbox",
      preco: 399.90,
      categoria: "Games",
      imagem: "imgs/Xbox.png",
      descricao: "Controle sem fio para PC e Xbox.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "Headset Gamer",
      preco: 199.90,
      categoria: "Games",
      imagem: "imgs/headset.png",
      descricao: "Headset com microfone.",
      emEstoque: false
    }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);

  card.style.border = "1px solid #ccc";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.innerHTML = produto.nome;

  const price = document.createElement("p");
  price.innerHTML = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.innerHTML = produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.innerHTML = "Ver detalhes";

  btnDetails.addEventListener("click", function () {
    showProductDetails(produto);
  });

  const btnHighlight = document.createElement("button");
  btnHighlight.innerHTML = "Destacar";

  btnHighlight.addEventListener("click", function () {
    card.classList.add("highlight");
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  for (let produto of produtos) {
    const card = createProductCard(produto);
    productList.appendChild(card);
  }

  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    console.log("Card renderizado com data-id:", card.getAttribute("data-id"));
    card.style.transition = "0.3s";
  });
}

function renderCategories() {
  categorySelect.innerHTML = "";

  const optionTodas = document.createElement("option");
  optionTodas.setAttribute("value", "Todas");
  optionTodas.innerHTML = "Todas";
  categorySelect.appendChild(optionTodas);

  const categorias = [];

  for (let produto of data.produtos) {
    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  }

  for (let categoria of categorias) {
    const option = document.createElement("option");
    option.setAttribute("value", categoria);
    option.innerHTML = categoria;
    categorySelect.appendChild(option);
  }
}

function showProductDetails(produto) {
  const estoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> ${estoque}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  const filtrados = data.produtos.filter(function (produto) {
    const nomeCombina = produto.nome.toLowerCase().includes(texto);
    const categoriaCombina = categoria === "Todas" || produto.categoria === categoria;

    return nomeCombina && categoriaCombina;
  });

  return filtrados;
}

searchInput.addEventListener("input", function () {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);