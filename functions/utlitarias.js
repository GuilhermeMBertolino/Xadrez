//Retora TRUE se ambas as casas estão na mesma linha (horizontal) e FALSE se não
export function sameLine(x, y)
{
    if( Math.floor(x / 8) == Math.floor(y / 8)) return 1;
    else return 0;
}

//Retorna a linha e a coluna de uma certa casa no tabuleiro
export function line_column(casa)
{
    let pos = []
    pos.push(Math.floor(casa / 8));
    pos.push(casa % 8);
    return pos;
}

//Passa uma peça para outra posição
export function move(tabuleiro, casaAntiga, casaNova)
{
    tabuleiro[casaNova] = tabuleiro[casaAntiga];
    tabuleiro[casaAntiga] = -1;
    return tabuleiro;
}


//Função apenas para copiar os elementos de um array para o outro,
//prefiro usar assim para não igualar diretamente um array a outro, 
//pois isso iguala também os endereços e pode dar problemas inesperados
export function arrayCpy(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        this[i] = arr[i];
    }
}

/*Configuração inicial do tabuleiro: 
0 -> Peão preto , 1 -> Peão branco , 2 -> Cavalo preto, 3 -> Cavalo branco
4 -> Bispo preto, 5 -> Bispo branco, 6 -> Torre preta, 7 -> Torre branca
8 -> Rei preto, 9 -> Rei Branco, 10 -> Rainha preta, 11 -> Rainha branca
*/
export function initial_state()
{
    return [6, 2, 4,10, 8, 4, 2, 6,
        0, 0, 0, 0, 0, 0, 0, 0,
       -1,-1,-1,-1,-1,-1,-1,-1,
       -1,-1,-1,-1,-1,-1,-1,-1,
       -1,-1,-1,-1,-1,-1,-1,-1,
       -1,-1,-1,-1,-1,-1,-1,-1,
        1, 1, 1, 1, 1, 1, 1, 1,
        7, 3, 5,11, 9, 5, 3, 7];
}
