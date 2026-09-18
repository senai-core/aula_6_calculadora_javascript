const aparelho = document.getElementById("aparelho-estruturado");
const visor = aparelho.querySelector(".visor");
const teclas = aparelho.querySelectorAll(".tecla");

let conta = "";
let mostrandoResultado = false;

function formatarParaVisor(texto) {
    return texto
        .replaceAll("*", "×")
        .replaceAll("/", "÷")
        .replaceAll("-", "−")
        .replaceAll(".", ",");
}

function mostrar(texto) {
    visor.textContent = texto ? formatarParaVisor(texto) : "0";
}

function limpar() {
    conta = "";
    mostrandoResultado = false;
    mostrar(conta);
}

function mostrarErro() {
    conta = "";
    mostrandoResultado = false;
    visor.textContent = "Erro";
}

function digitar(tecla) {
    const ehNumero = !isNaN(tecla) || tecla === ".";

    if (mostrandoResultado && ehNumero) {
        conta = "";
    }

    mostrandoResultado = false;
    conta += tecla;
    mostrar(conta);
}

function resolver() {
    if (conta === "") return;

    try {
        const resultado = Function("return " + conta)();

        if (!Number.isFinite(resultado)) {
            mostrarErro();
            return;
        }

        conta = String(Number(resultado.toFixed(10)));
        mostrandoResultado = true;
        mostrar(conta);
    } catch {
        mostrarErro();
    }
}

function aoClicar(evento) {
    const tecla = evento.currentTarget.dataset.tecla;

    if (tecla === "C") {
        limpar();
    } else if (tecla === "=") {
        resolver();
    } else {
        digitar(tecla);
    }
}

teclas.forEach(function (tecla) {
    tecla.addEventListener("click", aoClicar);
});
