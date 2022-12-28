function run(){

    const precios = document.querySelectorAll("span.price-tag-fraction");
    const signoPeso = document.querySelectorAll("span.price-tag-symbol");

    let blueVenta = fetch("https://api.bluelytics.com.ar/v2/latest")
    .then(datos => datos.json())
    .then(response => {
        return response.blue.value_sell;
    }); 

    window.onload = function  cargarValores(){
        precios.forEach(async (element, index) => {
                let precio = Number(element.outerText.replace(/\./g,''));
                let precioDolar = ` $USD ${(precio / await blueVenta).toFixed(2)}`;
                signoPeso[index].innerHTML = signoPeso[index].outerText.fontsize("3");
                element.innerHTML = `${await element.outerText.fontcolor("black").fontsize("3")} ${" - ".fontcolor("black").fontsize("3")} ${await precioDolar.fontcolor("#0ecc8d").fontsize("3")}`;
        });
    }; 

    function repetir(){
        precios.forEach(async (element, index) => {
            let precio = Number(element.outerText.replace(/\./g,''));
            let precioDolar = ` $USD ${(precio / await blueVenta).toFixed(2)}`;
            signoPeso[index].innerHTML = signoPeso[index].outerText.fontsize("3");
            element.innerHTML = `${await element.outerText.fontcolor("black").fontsize("3")} ${" - ".fontcolor("black").fontsize("3")} ${await precioDolar.fontcolor("#0ecc8d").fontsize("3")}`;
        });
    };

    setTimeout(function revision(){
        const revisar = precios[0].innerText; 

        if(revisar?.includes("USD") == true){
            console.log("Funciono");

        }if(revisar?.includes("USD") == false){
            repetir();
            console.log("Habia fallado. Arreglado.");
        }
    },3000);
};

const headerMeli = document.getElementsByClassName("nav-header nav-header-plus"); 

const changeButton = document.createElement("button"); 

changeButton.style.textDecoration = "none"; 
changeButton.style.borderColor= "yellow"; 
changeButton.style.backgroundColor = "#0ecc8d"; 
changeButton.style.margin = "auto"; 
changeButton.style.borderRadius = "10px"; 
changeButton.style.position = "relative"; 
changeButton.style.top = "-50%";
changeButton.style.left = "1%";
changeButton.style.color = "white"


changeButton.innerText = "Precio en dolares";

headerMeli[0].appendChild(changeButton); 

changeButton.onclick = function buttonFunction() {


    if(localStorage.getItem("Dolar") == "activado"){
        localStorage.setItem("Dolar", "desactivado"); 
        changeButton.style.backgroundColor = "red";
        changeButton.style.color = "white";
        location.reload();

    }else{
        localStorage.setItem("Dolar", "activado");
        changeButton.style.backgroundColor = "#0ecc8d";
        run()
    }

}

if(localStorage.getItem("Dolar") == "activado"){
    changeButton.style.backgroundColor = "#0ecc8d"; 
    run()
};
if(localStorage.getItem("Dolar") == "desactivado"){
    changeButton.style.backgroundColor = "red"; ;
};
