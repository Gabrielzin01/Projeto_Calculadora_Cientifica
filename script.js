const NumberClass = document.querySelectorAll("#basico button")
const PrevisaoDeOperaçaoTexto = document.querySelector("#previsao_de_operaçao")
const atualOperacaoTexto = document.querySelector("#atualOperaçao")
const operacoesCientificas = document.querySelectorAll("#cientifica button")


class Calculadora {
    constructor(PrevisaoDeOperaçaoTexto,atualOperacaoTexto) {
        this.PrevisaoDeOperaçaoTexto = PrevisaoDeOperaçaoTexto
        this.atualOperacaoTexto = atualOperacaoTexto
        this.AtualOperacao = ""
    }
    // adicionar digito da calculadora no visor
    AdcionarDigito(digit) {
        // Verifique se a operação atual já possui um ponto.
        if(digit === "." && this.atualOperacaoTexto.innerText.includes(".")) {
            return
        }

        this.AtualOperacao = digit
        this.atulizarVisor()
    }

    // processar todas as operações da calculadora
    processarOperacao(operacao) {

        if (operacao === "=") {
            this.processoIgualOperacao()
            return
        }

        // verifique se o atual está vazio
        if(this.atualOperacaoTexto.innerText === "" & operacao !== "C") {
            // operação de alteração
            if(this.PrevisaoDeOperaçaoTexto.innerText !== "") {
                this.operaçãoDeAlteração(operacao === "x!" ? "!" : operacao)
            }
            return;
        }

       if (
            this.atualOperacaoTexto.innerText.includes("!") &&
            ["+", "-", "*", "/"].includes(operacao)
        ) {
            const atualSemFatorial = this.atualOperacaoTexto.innerText.replace("!", "")
            this.atualOperacaoTexto.innerText = atualSemFatorial
        }

        // obter o valor atual e o anterior
        let operacaoValor
        const previsao = +this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[0]
        const atual = +this.atualOperacaoTexto.innerText.replace("%","")

        switch(operacao) {
            case "+":
                operacaoValor = previsao + atual
                this.atulizarVisor(operacaoValor, operacao, atual, previsao)
                break;
            case "-":
                operacaoValor = previsao - atual
                this.atulizarVisor(operacaoValor, operacao, atual, previsao)
                break;
            case "/":
                operacaoValor = previsao / atual
                this.atulizarVisor(operacaoValor, operacao, atual, previsao)
                break;
            case "*":
                operacaoValor = previsao * atual
                this.atulizarVisor(operacaoValor, operacao, atual, previsao)
                break;
            case "DEL":
                this.processorDeletarOperador()
                break;
            case "CE":
                this.processoLimparAtualOperacao()
                break;
            case "C":
                this.processoLimparOperacao()
                break;
             case "=":
                this.processoIgualOperacao()
                break;
            case "x!":
                if (this.atualOperacaoTexto.innerText === "") {
                    this.operaçãoDeAlteração("!")
                } else {
                    this.adicionarSimbolo("!")
                }
                break;
            default:
            return;
            
        }
    }
    // alterar os valores da tela da calculadora
    atulizarVisor(
        operacaoValor = null, 
        operacao = null, 
        atual = null, 
        previsao = null 
    ) {

        if(operacaoValor === null) {
            this.atualOperacaoTexto.innerText += this.AtualOperacao
        } else {
            // Verifique se o valor é zero; se for, basta adicionar o valor atual.
            if(previsao === 0 ) {
                operacaoValor = atual
                
            }
            const n = +operacaoValor.toFixed(10)

            // adicionar o valor atual ao anterior
            this.PrevisaoDeOperaçaoTexto.innerText = `${n} ${operacao}`
            this.atualOperacaoTexto.innerText = "";
        }
    }

    // alterar operação matemática
    operaçãoDeAlteração(operacao) {
        const operaçõesPermitidas = ["*", "/", "+", "-", "!","%"]

        if (!operaçõesPermitidas.includes(operacao)) return

        const previsaoAtual = this.PrevisaoDeOperaçaoTexto.innerText
        const previsaoSemEspacos = previsaoAtual.trim()
        const ultimoCaractere = previsaoAtual.trim().slice(-1)

        if (["*", "/", "+", "-", "!","%"].includes(ultimoCaractere)) {
            this.PrevisaoDeOperaçaoTexto.innerText =
                previsaoSemEspacos.slice(0, -1) + operacao
        } else {
            this.PrevisaoDeOperaçaoTexto.innerText =
                `${previsaoAtual} ${operacao}`
        }
    }
    // exclua o último dígito
    processorDeletarOperador() {
        this.atualOperacaoTexto.innerText = this.atualOperacaoTexto.innerText.slice(0, -1)
    }
    // limpar atual operaçao
    processoLimparAtualOperacao() {
        this.atualOperacaoTexto.innerText = ""

    }
    // limpar toda operaçao
    processoLimparOperacao() {
        this.atualOperacaoTexto.innerText = ""
        this.PrevisaoDeOperaçaoTexto.innerText = ""
    }
    // processar uma operação
    processoIgualOperacao() {
        const operacao = PrevisaoDeOperaçaoTexto.innerText.split(" ")[1]

        this.processarOperacao(operacao)
    }

}

const calc = new Calculadora(PrevisaoDeOperaçaoTexto, atualOperacaoTexto)

class Cientifica extends Calculadora {
    constructor(PrevisaoDeOperaçaoTexto,atualOperacaoTexto) {
        super(PrevisaoDeOperaçaoTexto,atualOperacaoTexto)


    }

 porcentagemOperacao() {
        if (this.atualOperacaoTexto.innerText === "" || this.atualOperacaoTexto.innerText.includes("%")) {
            return
        }
        this.atualOperacaoTexto.innerText += "%"
    }

    
processoIgualOperacao() {
    let atualTexto = this.atualOperacaoTexto.innerText
    const previsaoTexto = this.PrevisaoDeOperaçaoTexto.innerText.trim()
    const numeroPrevisao = +previsaoTexto.replace("%", "")

    if (previsaoTexto.endsWith("%") && atualTexto === "") {
        this.PrevisaoDeOperaçaoTexto.innerText = numeroPrevisao / 100
        return

}


    // Fatorial no visor atual: exemplo 6!
    if (atualTexto.includes("!")) {
        this.operacaoFatorial()
        return
    }

    // Fatorial na previsão: exemplo 720 !
    if (previsaoTexto.endsWith("!")) {
        const numero = Number(previsaoTexto.replace("!", "").trim())
        if (numero > 170) {
            this.PrevisaoDeOperaçaoTexto.innerText = "Infinity"
            this.atualOperacaoTexto.innerText = ""
            return
    }
        let resultado = 1

        for (let i = 1; i <= numero; i++) {
            resultado *= i
        }

        this.PrevisaoDeOperaçaoTexto.innerText = String(resultado)
        this.atualOperacaoTexto.innerText = ""
        return
    }

    // Porcentagem
    if (atualTexto.includes("%")) {
        const numeroAtual = +atualTexto.replace("%", "")

        if (this.PrevisaoDeOperaçaoTexto.innerText !== "") {
            const previsao = +this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[0]
            const operador = this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[1]
            const valorPorcentagem = (previsao * numeroAtual) / 100
            let resultado

            if (operador === "+") {
                resultado = previsao + valorPorcentagem
            } else if (operador === "-") {
                resultado = previsao - valorPorcentagem
            } else if (operador === "*" ) {
                resultado = valorPorcentagem
            } else if (operador === "/") {
                resultado = previsao / (numeroAtual / 100)
            }

            this.PrevisaoDeOperaçaoTexto.innerText = resultado
            this.atualOperacaoTexto.innerText = ""
            return
        } else {
            this.atualOperacaoTexto.innerText = numeroAtual / 100
            return
        }
    }

    super.processoIgualOperacao()
}


    operacaoFatorial() {

        const atualOperacaoTexto = +this.atualOperacaoTexto.innerText.replace("!", "")
        if (atualOperacaoTexto > 170) {
            this.PrevisaoDeOperaçaoTexto.innerText = "Infinity"
            this.atualOperacaoTexto.innerText = ""
            return
}
        let n = 1

        for(let i = 1; i <= atualOperacaoTexto; i++) {
            n *= i
        }

        this.PrevisaoDeOperaçaoTexto.innerText = n
        this.atualOperacaoTexto.innerText = ""
    }

   adicionarSimbolo(simbolo) {
    const simbolosPermitidos = ["%", "!"]

    if (!simbolosPermitidos.includes(simbolo)) {
        return
    }

    // Se o visor atual estiver vazio, verificar a previsão
    if (
        this.atualOperacaoTexto.innerText === "" &&
        simbolo === "!" &&
        this.PrevisaoDeOperaçaoTexto.innerText !== ""
    ) {
        const previsao = this.PrevisaoDeOperaçaoTexto.innerText.split(" ")

        // Recuperar o número e cancelar o operador
        this.atualOperacaoTexto.innerText = previsao[0]
        this.PrevisaoDeOperaçaoTexto.innerText = ""

    }

    if (this.atualOperacaoTexto.innerText === "") {
        return
    }

    if (this.atualOperacaoTexto.innerText.includes(simbolo)) {
        return
    }

    this.atualOperacaoTexto.innerText += simbolo
}
   
}

const calc_cientifica = new Cientifica(PrevisaoDeOperaçaoTexto, atualOperacaoTexto)

NumberClass.forEach((buttons) => {
    buttons.addEventListener("click", (e) => {
        const value = e.target.innerText

        if (+value >= 0 || value === ".") {
            calc_cientifica.AdcionarDigito(value)
        } else {
            calc_cientifica.processarOperacao(value)
        }

    })
})

operacoesCientificas.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        switch(value){
            case "%":
                if(calc_cientifica.atualOperacaoTexto.innerText === "") {
                    calc_cientifica.operaçãoDeAlteração("%") 
                } else {
                    calc_cientifica.porcentagemOperacao()
                }
                break;
            case "x!":
                calc_cientifica.processarOperacao(value)
                break;
        }
    })
})
