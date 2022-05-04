let tabuleiro = [];
/*Configuração inicial do tabuleiro: 
0 -> Peão preto , 1 -> Peão branco , 2 -> Cavalo preto, 3 -> Cavalo branco
4 -> Bispo preto, 5 -> Bispo branco, 6 -> Torre preta, 7 -> Torre branca
8 -> Rei preto, 9 -> Rei Branco, 10 -> Rainha preta, 11 -> Rainha branca
*/
const config_init = 
    [6, 2, 4,10, 8, 4, 2, 6,
     0, 0, 0, 0, 0, 0, 0, 0,
    -1,-1,-1,-1,-1,-1,-1,-1,
    -1,-1,-1,-1,-1,-1,-1,-1,
    -1,-1,-1,-1,-1,-1,-1,-1,
    -1,-1,-1,-1,-1,-1,-1,-1,
     1, 1, 1, 1, 1, 1, 1, 1,
     7, 3, 5,11, 9, 5, 3, 7];
let config = config_init;
let moveHability = 0;
let movingHouse;
let possibleHouses = [];
let turno = 1;

import {move} from "./functions/utlitarias.js";
import {getPossibleHouses} from "./functions/casas_compativeis.js";

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

btn.onclick = function() {
    config = [6, 2, 4,10, 8, 4, 2, 6,
              0, 0, 0, 0, 0, 0, 0, 0,
              -1,-1,-1,-1,-1,-1,-1,-1,
              -1,-1,-1,-1,-1,-1,-1,-1,
              -1,-1,-1,-1,-1,-1,-1,-1,
              -1,-1,-1,-1,-1,-1,-1,-1,
               1, 1, 1, 1, 1, 1, 1, 1,
               7, 3, 5,11, 9, 5, 3, 7]
    moveHability = 0;
    renderize();
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

    //eventos
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
            renderize();
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

renderize();

tabuleiro.forEach(function (item) {
    document.body.appendChild(item);
});

function renderize()
{
    tabuleiro.forEach(function(item, indice) {
        item.title = config[indice];
        switch(config[indice])
        {
            case 0: item.data = "imagens/peao_preto.png"; break;
            case 1: item.data = "imagens/peao_branco.png"; break;
            case 2: item.data = "imagens/cavalo_preto.png"; break;
            case 3: item.data = "imagens/cavalo_branco.png"; break;
            case 4: item.data = "imagens/bispo_preto.png"; break;
            case 5: item.data = "imagens/bispo_branco.png"; break;
            case 6: item.data = "imagens/torre_preta.png"; break;
            case 7: item.data = "imagens/torre_branca.png"; break;
            case 8: item.data = "imagens/rei_preto.png"; break;
            case 9: item.data = "imagens/rei_branco.png"; break;
            case 10: item.data = "imagens/rainha_preta.png"; break;
            case 11: item.data = "imagens/rainha_branca.png"; break;
            default: item.data = "imagens/fundo.png";
        }
    });
}



