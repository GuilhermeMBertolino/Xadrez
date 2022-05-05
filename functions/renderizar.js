//Aplica a imagem correspondente a cada peça do tabuleiro (recebidas na configuração do tabuleiro)
export function renderize(tabuleiro, config)
{
    let resposta = tabuleiro.map((item, indice) => {
        item.title = config[indice];
        switch(config[indice])
        {
            case 0: 
                item.data = "imagens/peao_preto.png";
                break;
            case 1: 
                item.data = "imagens/peao_branco.png"; 
                break;
            case 2: 
                item.data = "imagens/cavalo_preto.png"; 
                break;
            case 3: 
                item.data = "imagens/cavalo_branco.png"; 
                break;
            case 4: 
                item.data = "imagens/bispo_preto.png"; 
                break;
            case 5: 
                item.data = "imagens/bispo_branco.png"; 
                break;
            case 6: 
                item.data = "imagens/torre_preta.png"; 
                break;
            case 7: 
                item.data = "imagens/torre_branca.png"; 
                break;
            case 8: 
                item.data = "imagens/rei_preto.png"; 
                break;
            case 9: 
                item.data = "imagens/rei_branco.png"; 
                break;
            case 10: 
                item.data = "imagens/rainha_preta.png"; 
                break;
            case 11: 
                item.data = "imagens/rainha_branca.png"; 
                break;
            default: 
                item.data = "imagens/fundo.png";
        }
        return item;
    });
    return resposta;
}