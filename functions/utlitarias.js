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
    let tabuleiro_ = [];
    tabuleiro_.arrayCpy(tabuleiro);
    tabuleiro_[casaNova] = tabuleiro_[casaAntiga];
    tabuleiro_[casaAntiga] = -1;
    return tabuleiro_;
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
    // return [6, -1, -1, -1, 8, -1, -1, 6, 
    //     -1, -1, -1, -1, -1, -1, -1, -1,
    //     -1, -1, -1, -1, -1, -1, -1, -1,
    //     -1, -1, -1, -1, -1, -1, -1, -1,
    //     -1, -1, -1, -1, -1, -1, -1, -1,
    //     -1, -1, -1, -1, -1, -1, -1, -1,
    //     -1, -1, -1, -1, -1, -1, -1, -1,
    //     7, -1, -1, -1, 9, -1, -1, 7];
}

//Converte o número da casa do tabuleiro para o algoritmo alfanumérico
export function paraAlfanum(casa)
{
    let vet = [];
    switch(line_column(casa)[1])
    {
        case 0:
            vet[0] = 'A';
            break;
        case 1:
            vet[0] = 'B';
            break;
        case 2:
            vet[0] = 'C';
            break;
        case 3:
            vet[0] = 'D';
            break;
        case 4:
            vet[0] = 'E';
            break;
        case 5:
            vet[0] = 'F';
            break;
        case 6:
            vet[0] = 'G';
            break;
        case 7:
            vet[0] = 'H';
            break;
    }
    vet[1] = 8 - line_column(casa)[0];
    return vet.join("");
}

//Converte o código alfanumérico para o respectivo número de casa no tabuleiro
export function paraCodDecimal(alfanum)
{
    let vetor = alfanum.split("");
    switch(vetor[0])
    {
        case 'A':
            return 8 * (8 - vetor[1]) + 0;
        case 'B':
            return 8 * (8 - vetor[1]) + 1;
        case 'C':
            return 8 * (8 - vetor[1]) + 2;
        case 'D':
            return 8 * (8 - vetor[1]) + 3;
        case 'E':
            return 8 * (8 - vetor[1]) + 4;
        case 'F':
            return 8 * (8 - vetor[1]) + 5;
        case 'G':
            return 8 * (8 - vetor[1]) + 6;
        case 'H':
            return 8 * (8 - vetor[1]) + 7;
    }
}

//Retorna o array falando quais roques ainda são válidos
export function roqueNovo(casa, roque)
{
    if(['0', '4'].includes(casa))
        roque[0] = false;
    if(['4', '7'].includes(casa))
        roque[1] = false;
    if(['60', '56'].includes(casa))
        roque[2] = false;
    if(['63', '60'].includes(casa))
        roque[3] = false;
    return roque;
}

//Aplica o movimento de roque
export function executarRoque(config, tipoRoque)
{
    if(tipoRoque == 0)
        return move(move(config, 4, 2), 0, 3);
    else if(tipoRoque == 7)
        return move(move(config, 4, 6), 7, 5);
    else if(tipoRoque == 56)
        return move(move(config, 60, 58), 56, 59);
    else if(tipoRoque == 63)
        return move(move(config, 60, 62), 63, 61);
}