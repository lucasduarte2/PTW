"use strict";

const converterParaDecimal = (coordenadas) => {
    //Extrai os graus, minutos e segundos da string
    const regex = /([NSWE]?\s?-?\d+(?:\.\d+)?)[°º]?\s*(\d+(?:\.\d+)?|)\s*(\d+(?:\.\d+)?|)\s*["'\s]*([NSWE]?)/i;
    const correspondencia = coordenadas.match(regex);
    console.log(correspondencia)

    if (!correspondencia) {
        return "Formato de coordenadas inválido!";
    }

    const graus = parseFloat(correspondencia[1]);
    const minutos = parseFloat(correspondencia[2]);
    const segundos = parseFloat(correspondencia[3]);
    const direcao = correspondencia[4].toUpperCase();

    //Calcula os graus decimais
    let grausDecimais = graus + (minutos / 60) + (segundos / 3600);

    //Verifica a direção e ajusta o sinal
    if (direcao === 'S' || direcao === 'W') {
        grausDecimais = -grausDecimais;
    }

    return grausDecimais.toFixed(6);
};

$('.btn-img').on('click', function() {
  const textoCoordenadas = $('#coordenadas').val().trim();
  console.log("Texto das coordenadas:", textoCoordenadas);

  const coordenadasDecimais = converterParaDecimal(textoCoordenadas);

  const novaLinha = `
      <tr>
          <td>${textoCoordenadas}</td>
          <td>${coordenadasDecimais}</td>
      </tr>
  `;
  $('#tabelaCoordenadas tbody').append(novaLinha);
});




//Limpar textarea
/*function limparTexto() {
  document.getElementById("coordenadas").value = "";
  $('#tabelaCoordenadas').show();
};*/