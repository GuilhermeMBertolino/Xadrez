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
     7, 3, 5,11, 9, 5, 3, 7]
let config = config_init;
let moveHability = 0;
let movingHouse;
let possibleHouses = [];
let turno = 1;

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
    console.log(config_init);
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

function getPossibleHouses(tabuleiro, casa)
{
    let resposta = [];
    let peca = tabuleiro[casa]; 
    let position = line_column(casa);

    switch(peca)
    {
        //0 e 1 para movimento dos peões
        case 0:
            if(tabuleiro[parseInt(casa) + 8] == -1) resposta.push(parseInt(casa) + 8);
            if(Math.floor(casa/8) == 1 && tabuleiro[parseInt(casa) + 16] == -1) resposta.push(parseInt(casa) + 16);
            if(sameLine(parseInt(casa) + 8), parseInt(casa) + 7)
                if(tabuleiro[parseInt(casa) + 7] != -1 && tabuleiro[parseInt(casa) + 7] % 2 == 1) 
                    resposta.push(parseInt(casa) + 7);
            if(sameLine(parseInt(casa) + 8), parseInt(casa) + 9)
                if(tabuleiro[parseInt(casa) + 9] != -1 && tabuleiro[parseInt(casa) + 9] % 2 == 1) 
                    resposta.push(parseInt(casa) + 9);
            break;
        case 1: 
            if(tabuleiro[parseInt(casa) - 8] == -1) resposta.push(parseInt(casa) - 8);
            if(Math.floor(casa/8) == 6 && tabuleiro[parseInt(casa) - 16] == -1) resposta.push(parseInt(casa) - 16);
            if(sameLine(parseInt(casa) - 8), parseInt(casa) - 7)
                if(tabuleiro[parseInt(casa) - 7] != -1 && tabuleiro[parseInt(casa) - 7] % 2 == 0) 
                    resposta.push(parseInt(casa) - 7);
            if(sameLine(parseInt(casa) - 8), parseInt(casa) - 9)
                if(tabuleiro[parseInt(casa) - 9] != -1 && tabuleiro[parseInt(casa) - 9] % 2 == 0) 
                    resposta.push(parseInt(casa) - 9);
            break;
        case 2:
            resposta = horseMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 3:
            resposta = horseMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
        case 4: 
            resposta = bishopMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 5:
            resposta = bishopMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
        case 6:
            resposta = towerMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 7:
            resposta = towerMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
        case 8:
            resposta = kingMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1)
            });
            break;
        case 9:
            resposta = kingMovement(position, config).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0)
            });
            break;
        case 10:
            resposta = towerMovement(position, config).concat(bishopMovement(position,config)).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 11:
            resposta = towerMovement(position, config).concat(bishopMovement(position,config)).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
    }

    return resposta;
}

function sameLine(x, y)
{
    if( Math.floor(x / 8) == Math.floor(y / 8)) return 1;
    else return 0;
}

function move(tabuleiro, casaAntiga, casaNova)
{
    tabuleiro[casaNova] = tabuleiro[casaAntiga];
    tabuleiro[casaAntiga] = -1;
    return tabuleiro;
}

function line_column(casa)
{
    let pos = []
    pos.push(Math.floor(casa / 8));
    pos.push(casa % 8);

    return pos;
}

function house(position)
{
    return parseInt(8 * position[0]) + parseInt(position[1]);
}

function horseMovement(position, tabuleiro)
{
    let resposta = [];
    let casa = house(position);
    if(position[0] >= 2 && position[1] <= 6) resposta.push(parseInt(casa) - 15);
    if(position[0] >= 1 && position[1] <= 5) resposta.push(parseInt(casa) - 6);
    if(position[0] <= 5 && position[1] <= 6) resposta.push(parseInt(casa) + 17);
    if(position[0] <= 6 && position[1] <= 5) resposta.push(parseInt(casa) + 10);
    if(position[0] <= 5 && position[1] >= 1) resposta.push(parseInt(casa) + 15);
    if(position[0] <= 6 && position[1] >= 2) resposta.push(parseInt(casa) + 6);
    if(position[0] >= 2 && position[1] >= 1) resposta.push(parseInt(casa) - 17);
    if(position[0] >= 1 && position[1] >= 2) resposta.push(parseInt(casa) - 10);

    return resposta;
}

function bishopMovement(position, tabuleiro)
{
    let resposta = [];
    let casa = house(position);

    for(let i = 1; i <= Math.min(position[0], position[1]); i++)
    {
        resposta.push(parseInt(casa) - 9 * i);
        if(tabuleiro[parseInt(casa) - 9 * i] != -1) break;
    }
    for(let i = 1; i <= 7 - Math.max(position[0], position[1]); i++)
    {
        resposta.push(parseInt(casa) + 9 * i);
        if(tabuleiro[parseInt(casa) + 9 * i] != -1) break;
    }
    for(let i = 1; i <= Math.min(position[0], 7 - position[1]); i++)
    {
        resposta.push(parseInt(casa) - 7 * i);
        if(tabuleiro[parseInt(casa) - 7 * i] != -1) break;
    }
    for(let i = 1; i <= Math.min(7 - position[0], position[1]); i++)
    {
        resposta.push(parseInt(casa) + 7 * i);
        if(tabuleiro[parseInt(casa) + 7 * i] != -1) break;
    }

    return resposta;
}

function towerMovement(position, tabuleiro)
{
    let resposta = [];
    let casa = house(position);

    for(let i = 1; i <= 7 - position[0]; i++)
    {
        resposta.push(parseInt(casa) + 8 * i);
        if(tabuleiro[parseInt(casa) + 8 * i] != -1) break;
    }
    for(let i = 1; i <= position[0]; i++)
    {
        resposta.push(parseInt(casa) - 8 * i);
        if(tabuleiro[parseInt(casa) - 8 * i] != -1) break;
    }
    for(let i = 1; i <= 7 - position[1]; i++)
    {
        resposta.push(parseInt(casa) + i);
        if(tabuleiro[parseInt(casa) + i] != -1) break;
    }
    for(let i = 1; i <= position[1]; i++)
    {
        resposta.push(parseInt(casa) - i);
        if(tabuleiro[parseInt(casa) - i] != -1) break;
    }

    return resposta;
}

function kingMovement(position)
{
    let resposta = [];
    let casa = house(position);

    if(position[0] >= 1 && position[1] >= 1) resposta.push(parseInt(casa) - 9);
    if(position[0] >= 1) resposta.push(parseInt(casa) - 8);
    if(position[0] >= 1 && position[1] <= 6) resposta.push(parseInt(casa) - 7);
    if(position[1] <= 6) resposta.push(parseInt(casa) + 1);
    if(position[0] <= 6 && position[1] <= 6) resposta.push(parseInt(casa) + 9);
    if(position[0] <= 6) resposta.push(parseInt(casa) + 8);
    if(position[0] <= 6 && position[1] >=1) resposta.push(parseInt(casa) + 7);
    if(position[1] >= 1) resposta.push(parseInt(casa) - 1);

    return resposta;
}
