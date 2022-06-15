let tabuleiro = [];
let moveHability = 0;
let movingHouse;
let possibleHouses = [];
let turno = 1;
let roque = [true, true, true, true];

const fundo = document.getElementById("tabuleiro");

import {move, arrayCpy, initial_state, paraAlfanum, paraCodDecimal, roqueNovo, executarRoque} from "./functions/utlitarias.js";
let config = initial_state();
Array.prototype.arrayCpy = arrayCpy;
import {getPossibleHouses} from "./functions/casas_compativeis.js";
import {renderize} from "./functions/renderizar.js";
import {xeque, xeque_mate} from "./functions/xeque.js";

let btn = document.getElementById("reiniciar");
let xequeBtn = document.getElementById("xeque");

btn.onclick = function() 
{
    config = initial_state();
    moveHability = 0;
    tabuleiro.arrayCpy(renderize(tabuleiro, config));
}

let turn = document.getElementById("turno");
turn.style.backgroundColor = "white";
turn.innerHTML = "Brancas";

//Inicialização dos elementos do tabuleiro
for(let i = 0; i < 64; i++)
{
    let tab = document.createElement("object");
    if(i % 2 == 0)
    {  
        if(Math.floor(i/8) % 2 == 0)  
            tab.className = "preto";
        else 
            tab.className = "branco";
    }
    else
    {
        if(Math.floor(i/8) % 2 == 0)  
            tab.className = "branco";
        else 
            tab.className = "preto";
    }

    tab.id = i;

    tab.onclick = function(event) 
    {
        if(event.target.title % 2 == turno && !possibleHouses.includes(parseInt(event.target.id)))
        {
            movingHouse = event.target.id
            possibleHouses = getPossibleHouses(config, event.target.id, roque).filter((e) => 
                !xeque(move(config, event.target.id, e), !turno));
            tabuleiro.forEach((peca) => {
                if(possibleHouses.includes(parseInt(peca.id)))
                    peca.style.opacity =  "0.2";
                else
                    peca.style.opacity = "1.0";
            });
            moveHability = 1;
        }
        else if(moveHability == 1 && possibleHouses.includes(parseInt(event.target.id)))
        {
            if(event.target.title == -1 || config[movingHouse] % 2 != event.target.title % 2)
                config.arrayCpy(move(config, movingHouse, event.target.id));
            else
            {
                config.arrayCpy(executarRoque(config, event.target.id));
                console.log("batata");
            }
            roque = roqueNovo(movingHouse, roque);
            tabuleiro.arrayCpy(renderize(tabuleiro, config));

            if(xeque(config, turno))
            {
                xequeBtn.innerHTML = "Xeque";
                xequeBtn.style.display = "inline";
                if(turno)
                {
                    xequeBtn.style.backgroundColor = "black";
                    xequeBtn.style.color = "white";
                    if(xeque_mate(config, turno))
                        alert("Xeque Mate!! As pretas venceram!");
                }
                else
                {
                    xequeBtn.style.backgroundColor = "white";
                    xequeBtn.style.color = "black";
                    if(xeque_mate(config, turno))
                        alert("Xeque Mate!! As brancas venceram!");
                }
            }
            else
                xequeBtn.style.display = "none";

            moveHability = 0;
            possibleHouses.forEach(function(item)
            {
                tabuleiro[item].style.opacity = "1.0"
            });
            turno = !turno;

            if(turno)
            {
                turn.style.backgroundColor = "white";
                turn.innerHTML = "Brancas";
                turn.style.color = "black";
            }
            else
            {
                turn.style.backgroundColor = "black";
                turn.innerHTML = "Pretas";
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