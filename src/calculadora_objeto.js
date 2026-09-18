class Calculadora {
    constructor(aparelho) {
        this.visor = aparelho.querySelector(".visor");
        this.teclas = aparelho.querySelectorAll(".tecla");
        this.conta = "";
        this.mostrandoResultado = false;

        this.ligarTeclas();
        this.mostrar(this.conta);
    }

    ligarTeclas() {
        this.teclas.forEach((tecla) => {
            tecla.addEventListener("click", () => this.pressionar(tecla.dataset.tecla));
        });
    }

    pressionar(tecla) {
        if (tecla === "C") {
            this.limpar();
        } else if (tecla === "=") {
            this.resolver();
        } else {
            this.digitar(tecla);
        }
    }

    formatarParaVisor(texto) {
        return texto
            .replaceAll("*", "×")
            .replaceAll("/", "÷")
            .replaceAll("-", "−")
            .replaceAll(".", ",");
    }

    mostrar(texto) {
        this.visor.textContent = texto ? this.formatarParaVisor(texto) : "0";
    }

    limpar() {
        this.conta = "";
        this.mostrandoResultado = false;
        this.mostrar(this.conta);
    }

    mostrarErro() {
        this.conta = "";
        this.mostrandoResultado = false;
        this.visor.textContent = "Erro";
    }

    digitar(tecla) {
        const ehNumero = !isNaN(tecla) || tecla === ".";

        if (this.mostrandoResultado && ehNumero) {
            this.conta = "";
        }

        this.mostrandoResultado = false;
        this.conta += tecla;
        this.mostrar(this.conta);
    }

    resolver() {
        if (this.conta === "") return;

        try {
            const resultado = Function("return " + this.conta)();

            if (!Number.isFinite(resultado)) {
                this.mostrarErro();
                return;
            }

            this.conta = String(Number(resultado.toFixed(10)));
            this.mostrandoResultado = true;
            this.mostrar(this.conta);
        } catch {
            this.mostrarErro();
        }
    }
}

const calculadoraObjeto = new Calculadora(document.getElementById("aparelho-objeto"));
