import { getPossibleHouses } from "./casas_compativeis.js";
import { move } from "./utlitarias.js";

export function xeque(tabuleiro, turno)
{
    let reiPreto = tabuleiro.indexOf(8);
    let reiBranco = tabuleiro.indexOf(9);
    let xqpreto = false;
    let xqbranco = false;

    tabuleiro.forEach((peca, indice) =>
    {
        if(peca != -1)
        {
            if(peca % 2 == 0)
            {
                if(getPossibleHouses(tabuleiro, indice).includes(parseInt(reiBranco)))
                    xqbranco = true;
            }
            else
            {
                if(getPossibleHouses(tabuleiro, indice).includes(parseInt(reiPreto)))
                    xqpreto = true;
            }
        }
    });
    if(turno)
        return xqpreto;
    else
        return xqbranco;
}

export function xeque_mate(tabuleiro, turno)
{
    let arrXq = [];
    tabuleiro.forEach((e, index) => 
    {
        if(e != -1 && ((turno && e % 2 == 0) || (!turno && e % 2 == 1)))
        {
            getPossibleHouses(tabuleiro, index).forEach((casa) =>
            {
                arrXq.push(xeque(move(tabuleiro, index, casa), turno))
            });
        }
    });
    return arrXq.reduce((a, b) => a && b);
}