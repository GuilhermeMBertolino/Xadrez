import { sameLine } from "./utlitarias.js";

export function pawnMovement(tabuleiro, casa)
{
    let resposta = [];
    if(!tabuleiro[casa])
    {
        if(tabuleiro[parseInt(casa) + 8] == -1) 
            resposta.push(parseInt(casa) + 8);
        if(Math.floor(casa/8) == 1 && tabuleiro[parseInt(casa) + 16] == -1) 
            resposta.push(parseInt(casa) + 16);
        if(sameLine(parseInt(casa) + 8), parseInt(casa) + 7)
            if(tabuleiro[parseInt(casa) + 7] != -1 && tabuleiro[parseInt(casa) + 7] % 2 == 1) 
                resposta.push(parseInt(casa) + 7);
        if(sameLine(parseInt(casa) + 8), parseInt(casa) + 9)
            if(tabuleiro[parseInt(casa) + 9] != -1 && tabuleiro[parseInt(casa) + 9] % 2 == 1) 
                resposta.push(parseInt(casa) + 9);
    }
    else
    {
        if(tabuleiro[parseInt(casa) - 8] == -1) 
            resposta.push(parseInt(casa) - 8);
        if(Math.floor(casa/8) == 6 && tabuleiro[parseInt(casa) - 16] == -1) 
            resposta.push(parseInt(casa) - 16);
        if(sameLine(parseInt(casa) - 8), parseInt(casa) - 7)
            if(tabuleiro[parseInt(casa) - 7] != -1 && tabuleiro[parseInt(casa) - 7] % 2 == 0) 
                resposta.push(parseInt(casa) - 7);
        if(sameLine(parseInt(casa) - 8), parseInt(casa) - 9)
            if(tabuleiro[parseInt(casa) - 9] != -1 && tabuleiro[parseInt(casa) - 9] % 2 == 0) 
                resposta.push(parseInt(casa) - 9);
    }
    return resposta;
}

export function horseMovement(position)
{
    let resposta = [];
    let casa = house(position);
    if(position[0] >= 2 && position[1] <= 6) 
        resposta.push(parseInt(casa) - 15);
    if(position[0] >= 1 && position[1] <= 5) 
        resposta.push(parseInt(casa) - 6);
    if(position[0] <= 5 && position[1] <= 6) 
        resposta.push(parseInt(casa) + 17);
    if(position[0] <= 6 && position[1] <= 5) 
        resposta.push(parseInt(casa) + 10);
    if(position[0] <= 5 && position[1] >= 1) 
        resposta.push(parseInt(casa) + 15);
    if(position[0] <= 6 && position[1] >= 2) 
        resposta.push(parseInt(casa) + 6);
    if(position[0] >= 2 && position[1] >= 1) 
        resposta.push(parseInt(casa) - 17);
    if(position[0] >= 1 && position[1] >= 2) 
        resposta.push(parseInt(casa) - 10);

    return resposta;
}

export function bishopMovement(position, tabuleiro)
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

export function towerMovement(position, tabuleiro)
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

export function kingMovement(position)
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

export function queenMovement(position, tabuleiro)
{
    return bishopMovement(position, tabuleiro).concat(towerMovement(position, tabuleiro));
}

function house(position)
{
    return parseInt(8 * position[0]) + parseInt(position[1]);
}

