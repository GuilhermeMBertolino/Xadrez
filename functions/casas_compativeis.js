import { horseMovement, bishopMovement, towerMovement, kingMovement, pawnMovement, queenMovement } from "./movimentos.js";
import { line_column } from "./utlitarias.js";

//Retorna as possíveis casas para as quais uma peça pode se movimentar
export function getPossibleHouses(tabuleiro, casa, roque = [1, 1, 1, 1])
{
    let resposta = [];
    let peca = tabuleiro[casa];
    let position = line_column(casa);
    switch(peca)
    {
        //0 e 1 para movimento dos peões
        case 0:
        case 1: 
            resposta = pawnMovement(tabuleiro, casa);
            break;
        //2 e 3 para movimento dos cavalos
        case 2:
            resposta = horseMovement(position, tabuleiro).filter(function(house) {
            return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 3:
            resposta = horseMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
        //4 e 5 para movimento dos bispos
        case 4: 
            resposta = bishopMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 5:
            resposta = bishopMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
        //6 e 7 para movimento das torres
        case 6:
            resposta = towerMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 7:
            resposta = towerMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
        //8 e 9 para movimento dos reis
        case 8:
            resposta = kingMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1)
            });
            if(roque[0] && tabuleiro[1] == -1 && tabuleiro[2] == -1 && tabuleiro[3] == -1)
                resposta.push(0);
            if(roque[1] && tabuleiro[5] == -1 && tabuleiro[6] == -1)
                resposta.push(7);
            break;
        case 9:
            resposta = kingMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0)
            });
            if(roque[2] && tabuleiro[57] == -1 && tabuleiro[58] == -1 && tabuleiro[59] == -1)
                resposta.push(56);
            if(roque[3] && tabuleiro[62] == -1 && tabuleiro[61] == -1)
                resposta.push(63);
            break;
        //10 e 11 para movimento das rainhas
        case 10:
            resposta = queenMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1);
            });
            break;
        case 11:
            resposta = queenMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0);
            });
            break;
    }
    //array com todas as casas válidas do tabuleiro
    return resposta;
}