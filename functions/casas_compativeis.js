import { horseMovement, bishopMovement, towerMovement, kingMovement, pawnMovement, queenMovement } from "./movimentos.js";
import { line_column } from "./utlitarias.js";

export function getPossibleHouses(tabuleiro, casa)
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
        case 8:
            resposta = kingMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 1)
            });
            break;
        case 9:
            resposta = kingMovement(position, tabuleiro).filter(function(house) {
                return (tabuleiro[house] == -1 || tabuleiro[house] % 2 == 0)
            });
            break;
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

    return resposta;
}