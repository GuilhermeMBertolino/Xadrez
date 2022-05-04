export function sameLine(x, y)
{
    if( Math.floor(x / 8) == Math.floor(y / 8)) return 1;
    else return 0;
}

export function line_column(casa)
{
    let pos = []
    pos.push(Math.floor(casa / 8));
    pos.push(casa % 8);
    return pos;
}

export function move(tabuleiro, casaAntiga, casaNova)
{
    tabuleiro[casaNova] = tabuleiro[casaAntiga];
    tabuleiro[casaAntiga] = -1;
    return tabuleiro;
}

