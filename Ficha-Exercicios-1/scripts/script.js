"use strict";
$(document).ready(function () {
  // Função para atualizar a imagem e mudar a cor do botão selecionado
  function updateImageAndButtonColor() {
    var totalPoints = 0;

    // Somar os pontos dos botões de idade selecionados
    $(".age-button.selected").each(function () {
        totalPoints += parseInt($(this).data("points"));
    });

    // Somar os pontos dos botões de IMC selecionados
    $(".imc-button.selected").each(function () {
        totalPoints += parseInt($(this).data("points"));
    });

    // Somar os pontos dos botões de estresse selecionados
    $(".stress-button.selected").each(function () {
        totalPoints += parseInt($(this).data("points"));
    });

    console.log("Total de pontos: " + totalPoints);

    // Atualizar a imagem conforme o total de pontos
    if (totalPoints >= 0 && totalPoints <= 5) {
        $("#risk-image").attr("src", "risco/risco-nulo.jpg");
        $("#risk-image").css("border-color", "green");
    } else if (totalPoints >= 6 && totalPoints <= 12) {
        $("#risk-image").attr("src", "risco/risco-moderado.jpg");
        $("#risk-image").css("border-color", "orange");
    } else if (totalPoints >= 13) {
        $("#risk-image").attr("src", "risco/risco-alto.jpg");
        $("#risk-image").css("border-color", "red");
    }
}


// Função para gerar botões de estresse com base no número de níveis
function generateStressButtons(numLevels) {
    $(".stress.section").empty();
    var stressPoints = [0, 2, 4, 6, 8, 10]; // Pontuações de estresse
    for (var i = 1; i <= numLevels; i++) {
        var points = stressPoints[i - 1]; // Obter os pontos do nível de estresse atual
        var button = $("<button/>", {
            id: "stress-button-" + i,
            "data-points": points, // Associar pontos com base no índice
            class: "stress-button",
            text: "Nível " + i // Adicionar pontos ao texto do botão
        });
        $(".stress.section").append(button);

        // Imprimir pontos no console
        console.log("Nível " + i + " - Pontos: " + points);
    }
}



  // Ao clicar em um botão de idade
  $(".age-button").on("click", function () {
    var $this = $(this);

    // Remover a classe 'selected' de todos os botões de idade
    $(".age-button").removeClass("selected");

    // Adicionar a classe 'selected' ao botão clicado
    $this
      .addClass("selected")
      .css("background-color", "green")
      .siblings()
      .css("background-color", "grey");

    // Atualizar a imagem e a cor do botão
    updateImageAndButtonColor();
  });

  // Ao clicar em um botão de IMC
  $(".imc-button").on("click", function () {
    var $this = $(this);

    // Remover a classe 'selected' de todos os botões de IMC
    $(".imc-button").removeClass("selected");

    // Adicionar a classe 'selected' ao botão clicado
    $this
      .addClass("selected")
      .css("background-color", "green")
      .siblings()
      .css("background-color", "grey");

    // Atualizar a imagem e a cor do botão
    updateImageAndButtonColor();
  });

  // Ao clicar em um botão de estresse
$(document).on("click", ".stress-button", function () {
    var $this = $(this);

    // Obter os pontos do botão de estresse clicado
    var points = $this.data("points");

    // Imprimir os pontos no console
    console.log("Pontos: " + points);

    // Remover a classe 'selected' de todos os botões de estresse
    $(".stress-button").removeClass("selected");

    // Adicionar a classe 'selected' ao botão clicado
    $this.addClass("selected").css("background-color", "green").siblings().css("background-color", "grey");

    // Atualizar a imagem e a cor do botão
    updateImageAndButtonColor();
});


  // Ao clicar no botão de reiniciar
  $("#reset-button").on("click", function () {
    // Remover a classe 'selected' de todos os botões
    $(".age-button, .imc-button, .stress-button")
      .removeClass("selected")
      .css("background-color", "grey");

    // Atualizar a imagem para a imagem inicial e o contorno cinza
    $("#risk-image")
      .attr("src", "risco/risco.jpg")
      .css("border-color", "rgb(169, 169, 169)");
  });

  // Ao mudar o valor do campo de entrada de número de níveis de estresse
  $("#stress-levels").on("change", function () {
    var numStressLevels = parseInt($(this).val());

    // Verificar se o número está dentro do intervalo permitido
    if (
      !isNaN(numStressLevels) &&
      numStressLevels >= 3 &&
      numStressLevels <= 6
    ) {
      generateStressButtons(numStressLevels);
    } else {
      alert(
        "Por favor, insira um número válido de níveis de estresse (entre 3 e 6)."
      );
    }
  });
});
