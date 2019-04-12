var picas;
var fijas;
var numAleatorio;
var inputNumber;

function aleatorio() {
  var numero = [];
  var numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  function alea(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  for (var i = 1; i < 5; i++) {
    numero.push(numeros.splice(alea(0, numeros.length), 1).pop().toString());
  }
  return numero;
}

function compara(inputNumber) {
  picas = 0;
  fijas  = 0;
  numAleatorio.forEach(function(item, index) {
    if (item === inputNumber[index]) {
      fijas++;
    } else if (inputNumber.indexOf(item) !== -1) {
      picas++;
    }
  });
}

function validateNumber(numero) {
  if (numero.length !== 4) {
    return false;
  } else {
    return (new Set(numero)).size === numero.length;
  }
}

function initialize() {
  numAleatorio = aleatorio();
  console.log(numAleatorio.join(""));
  $("#gana").addClass("invisible");
  $("#intentos").remove();
  var template = Handlebars.compile($('#intentos-template').html());
  $("#table").append(template());
}

$(document).ready(function() {
  initialize();
});

$("#input-numero").keypress(function(e) {

  $("#valid").removeClass("text-danger");
  $("#input-numero").removeClass("is-invalid");

  if (e.which == 13) {
    inputNumber = $(this).val().split("");

    if (validateNumber(inputNumber)) {
      compara(inputNumber);
      $(this).val("");

      if (fijas === numAleatorio.length) {
        $("#gana").removeClass("invisible");
      } else {
        var rowTemplate = Handlebars.compile($('#intentos-row-template').html());
        $("#intentos > tbody").prepend(rowTemplate({ numero: inputNumber.join(""), picas: picas, fijas: fijas }));
      }
    } else {
      $("#valid").addClass("text-danger");
      $("#input-numero").addClass("is-invalid");
    }
  }
});

$("#repetir").click(function() {
  initialize();
});
