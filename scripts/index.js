const btnCompra = document.getElementById("compra");
btnCompra.onclick = precioCompra;

const btnVenta = document.getElementById("venta");
btnVenta.onclick = actualizacioncambio;

const aCripto = document.getElementById("aCripto");

const divCripto = document.getElementById("divCripto");

const actualizar = document.getElementById("actualizar");
actualizar.onclick = cambioAutomatico;

async function precioCompra() {
  const h2Blue = document.getElementById("blue");
  const h2Oficial = document.getElementById("oficial");
  const h2Cripto = document.getElementById("cripto");

  let cripto2 = Number(cripto).toFixed(0);

  h2Blue.innerText = `Dolar Blue: $${await blueCompra}`;
  h2Oficial.innerText = `Dolar Oficial: $${await oficialCompra}`;
  h2Cripto.innerText = `Dolar Cripto: $${
    (await (await criptoCompra).precioCompra[0]) ||
    listaPreciosCriptoCompra.value
  }`;
  aCripto.href = `https://p2p.binance.com/es/advertiserDetail?advertiserNo=${await (
    await criptoCompra
  ).userNo[0]}`;

  localStorage.setItem("modo", "compra");

  let listaPreciosCriptoCompra = document.createElement("select");
  listaPreciosCriptoCompra.id = "listaPreciosCripto";
  listaPreciosCriptoCompra = document.getElementById("listaPreciosCripto");

  Object.entries(await criptoCompra)[1][1].map((e, index) => {
    listaPreciosCriptoCompra.options[index].innerText = e;
  });

  h2Cripto.innerText = `Dolar Cripto: $${
    listaPreciosCriptoCompra.options[listaPreciosCriptoCompra.selectedIndex]
      .innerText
  }`;
  aCripto.href = `https://p2p.binance.com/es/advertiserDetail?advertiserNo=${
    Object.entries(await criptoCompra)[0][1][
      listaPreciosCriptoCompra.selectedIndex
    ]
  }`;
}

async function listaCompra() {
  let listaPreciosCriptoCompra = document.createElement("select");
  listaPreciosCriptoCompra.id = "listaPreciosCripto";

  if (document.getElementById("listaPreciosCripto") == null) {
    divCripto.appendChild(listaPreciosCriptoCompra);
    listaPreciosCriptoCompra.style.position = "relative";
    listaPreciosCriptoCompra.style.left = "215px";
    listaPreciosCriptoCompra.style.top = "-35px";
    listaPreciosCriptoCompra.style.borderRadius = "10px";
    listaPreciosCriptoCompra.style.border = "none";
    listaPreciosCriptoCompra.style.color = "#0ecc8d";

    listaPreciosCriptoCompra = document.getElementById("listaPreciosCripto");

    Object.entries(await criptoCompra)[1][1].forEach((element, index) => {
      listaPreciosCriptoCompra.options[
        listaPreciosCriptoCompra.options.length
      ] = new Option(element);
    });
  }
}

async function listaVenta() {
  let listaPreciosCriptoCompra = document.createElement("select");
  listaPreciosCriptoCompra.id = "listaPreciosCripto";

  if (document.getElementById("listaPreciosCripto") == null) {
    divCripto.appendChild(listaPreciosCriptoCompra);
    listaPreciosCriptoCompra.style.position = "relative";
    listaPreciosCriptoCompra.style.left = "215px";
    listaPreciosCriptoCompra.style.top = "-35px";
    listaPreciosCriptoCompra.style.borderRadius = "10px";
    listaPreciosCriptoCompra.style.border = "none";
    listaPreciosCriptoCompra.style.color = "#0ecc8d";

    listaPreciosCriptoCompra = document.getElementById("listaPreciosCripto");

    Object.entries(await criptoVenta)[1][1].forEach((element, index) => {
      listaPreciosCriptoCompra.options[
        listaPreciosCriptoCompra.options.length
      ] = new Option(element);
    });
  }
}

let criptoVenta = fetch("https://criptoya.com/api/binancep2p/sell/usdt/ars/20")
  .then((res) => res.json())
  .then((data) => {
    objectDatosVenta = {
      userNo: [],
      precioVenta: [],
    };
    for (i = 0; i < 19; i++) {
      objectDatosVenta.userNo.push(data.data[i].advertiser.userNo);
      objectDatosVenta.precioVenta.push(data.data[i].adv.price);
    }
    return objectDatosVenta;
  });

let criptoCompra = fetch("https://criptoya.com/api/binancep2p/buy/usdt/ars/20")
  .then((res) => res.json())
  .then((data) => {
    objectDatosCompra = {
      userNo: [],
      precioCompra: [],
    };
    for (i = 0; i < 19; i++) {
      objectDatosCompra.userNo.push(data.data[i].advertiser.userNo);
      objectDatosCompra.precioCompra.push(data.data[i].adv.price);
    }
    return objectDatosCompra;
  });

/// Blue

let blueVenta = fetch("https://api.bluelytics.com.ar/v2/latest")
  .then((datos) => datos.json())
  .then((response) => {
    return response.blue.value_sell;
  });

let blueCompra = fetch("https://api.bluelytics.com.ar/v2/latest")
  .then((datos) => datos.json())
  .then((response) => {
    return response.blue.value_buy;
  });

// Oficial

let oficialVenta = fetch("https://api.bluelytics.com.ar/v2/latest")
  .then((datos) => datos.json())
  .then((response) => {
    return response.oficial.value_sell;
  });

let oficialCompra = fetch("https://api.bluelytics.com.ar/v2/latest")
  .then((datos) => datos.json())
  .then((response) => {
    return response.oficial.value_buy;
  });

async function actualizacioncambio() {
  const h2Blue = document.getElementById("blue");
  const h2Oficial = document.getElementById("oficial");
  const h2Cripto = document.getElementById("cripto");

  let cripto2 = Number(cripto).toFixed(0);

  h2Blue.innerText = `Dolar Blue: $${await blueVenta}`;
  h2Oficial.innerText = `Dolar Oficial: $${await oficialVenta}`;

  localStorage.setItem("modo", "venta");

  let listaPreciosCriptoCompra = document.createElement("select");
  listaPreciosCriptoCompra.id = "listaPreciosCripto";
  listaPreciosCriptoCompra = document.getElementById("listaPreciosCripto");

  Object.entries(await criptoVenta)[1][1].map((x, index) => {
    listaPreciosCriptoCompra.options[index].innerText = x;
  });

  h2Cripto.innerText = `Dolar Cripto: $${
    listaPreciosCriptoCompra.options[listaPreciosCriptoCompra.selectedIndex]
      .innerText
  }`;
  aCripto.href = `https://p2p.binance.com/es/advertiserDetail?advertiserNo=${
    Object.entries(await criptoVenta)[0][1][
      listaPreciosCriptoCompra.selectedIndex
    ]
  }`;
}

actualizacioncambio();

if (localStorage.getItem("modo") == "compra") {
  precioCompra();
  setTimeout(() => {
    listaCompra();
  }, 650);
} else {
  actualizacioncambio();
  setTimeout(() => {
    listaVenta();
  }, 650);
}

async function cambioAutomatico() {
  const h2Cripto = document.getElementById("cripto");
  let listaPreciosCriptoCompra = document.createElement("select");
  listaPreciosCriptoCompra.id = "listaPreciosCripto";
  listaPreciosCriptoCompra = document.getElementById("listaPreciosCripto");

  if (localStorage.getItem("modo") == "compra") {
    h2Cripto.innerText = `Dolar Cripto: $${
      listaPreciosCriptoCompra.options[listaPreciosCriptoCompra.selectedIndex]
        .innerText
    }`;
    aCripto.href = `https://p2p.binance.com/es/advertiserDetail?advertiserNo=${
      Object.entries(await criptoCompra)[0][1][
        listaPreciosCriptoCompra.selectedIndex
      ]
    }`;
  } else {
    h2Cripto.innerText = `Dolar Cripto: $${
      listaPreciosCriptoCompra.options[listaPreciosCriptoCompra.selectedIndex]
        .innerText
    }`;
    aCripto.href = `https://p2p.binance.com/es/advertiserDetail?advertiserNo=${
      Object.entries(await criptoVenta)[0][1][
        listaPreciosCriptoCompra.selectedIndex
      ]
    }`;
  }
}
