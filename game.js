let tabuleiro = [];
let moveHability = 0;
let movingHouse;
let possibleHouses = [];
let turno = 1;

const fundo = document.getElementById("tabuleiro");

import {move, arrayCpy, initial_state} from "./functions/utlitarias.js";
let config = initial_state();
Array.prototype.arrayCpy = arrayCpy;
import {getPossibleHouses} from "./functions/casas_compativeis.js";
import {renderize} from "./functions/renderizar.js";

document.body.style.backgroundColor = "grey";

let btn = document.createElement("button");
btn.innerHTML = "REINICIAR";
btn.style.position = "absolute";
btn.style.left = "600px";
btn.style.top = "300px";
btn.style.width = "120px";
btn.style.height = "60px";
btn.style.backgroundColor = "0E2B66";
btn.style.fontSize = "18";
btn.style.fontFamily = "Courier New";
btn.style.color = "white";

btn.onclick = function() 
{
    config = initial_state();
    moveHability = 0;
    tabuleiro.arrayCpy(renderize(tabuleiro, config));
}

document.body.appendChild(btn);

let turn = document.createElement("button");
turn.style.width = "75px";
turn.style.height = "75px";
turn.style.position = "absolute";
turn.style.left = "600px";
turn.style.top = "200px";
turn.style.backgroundColor = "white";
turn.innerHTML = "BRANCAS";
turn.style.fontSize = "12";
turn.style.borderRadius = "50%";

document.body.appendChild(turn);

//Inicialização dos elementos do tabuleiro
for(let i = 0; i < 64; i++)
{
    let tab = document.createElement("object");
    if(i % 2 == 0)
    {  
        if(Math.floor(i/8) % 2 == 0)  tab.style.backgroundColor = "17202A"; 
        else tab.style.backgroundColor = "616A6B";
    }
    else
    {
        if(Math.floor(i/8) % 2 == 0)  tab.style.backgroundColor = "616A6B"; 
        else tab.style.backgroundColor = "17202A";
    }
    tab.style.width = "72px";
    tab.style.height = "72px";
    tab.style.position = "absolute";
    tab.style.left =  72 * (i % 8) + "px";
    tab.style.top = 72 * Math.floor(i / 8) + "px";

    tab.id = i;

    tab.onmouseover = function() { tab.style.opacity = "0.5"; }
    tab.onmouseleave = function() { tab.style.opacity = "1.0"; }
    tab.onclick = function(event) {
        if(moveHability == 0 && event.target.title % 2 == turno)
        {
            movingHouse = event.target.id
            possibleHouses = getPossibleHouses(config, event.target.id);
            possibleHouses.forEach(function(item)
            {
                tabuleiro[item].style.opacity = "0.5"
            });
            moveHability = 1;
        }
        else if(possibleHouses.includes(parseInt(event.target.id)))
        {
            config = move(config, movingHouse, event.target.id)
            tabuleiro.arrayCpy(renderize(tabuleiro, config));
            moveHability = 0;
            possibleHouses.forEach(function(item)
            {
                tabuleiro[item].style.opacity = "1.0"
            });
            turno = !turno;

            if(turno)
            {
                turn.style.backgroundColor = "white";
                turn.innerHTML = "BRANCAS";
                turn.style.color = "black";
            }
            else
            {
                turn.style.backgroundColor = "black";
                turn.innerHTML = "PRETAS";
                turn.style.color = "white";
            }
        }
    }

    tabuleiro.push(tab);
}

tabuleiro.arrayCpy(renderize(tabuleiro, config));

tabuleiro.forEach(function (item) {
    fundo.appendChild(item);
});


