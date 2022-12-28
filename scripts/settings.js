const settings = document.getElementById("btnSettings");

const inicial = document.getElementById("inicial"); 
const menuButton = document.getElementById("menu-button");

const buttonMeliActivar = document.getElementById("meliSettingActivar");
const buttonMeliDesactivar = document.getElementById("meliSettingDesactivar");

const pMeli = document.getElementById("pMeli");

let bandera = 0

settings.onclick = function settingsMenu(){

    if(bandera == 0){
        inicial.style.display = "none";

        bandera = 1
    }else{
        inicial.style.display = "";
        menuButton.style.display = "none";
        bandera = 0;
    }

};



