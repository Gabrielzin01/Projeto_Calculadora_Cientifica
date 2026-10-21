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
        // verifique se o atual está vazio
        if(this.atualOperacaoTexto.innerText === "" & operacao !== "C") {
            // operação de alteração
            if(this.PrevisaoDeOperaçaoTexto.innerText !== "") {
                this.operaçãoDeAlteração(operacao)
            }
            return;
        }

        // obter o valor atual e o anterior
        let operacaoValor
        const previsao = +this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[0]
        const atual = +this.atualOperacaoTexto.innerText

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

            // adicionar o valor atual ao anterior
            this.PrevisaoDeOperaçaoTexto.innerText = `${operacaoValor} ${operacao}`
            this.atualOperacaoTexto.innerText = "";
        }
    }

    // alterar operação matemática
    operaçãoDeAlteração(operacao) {
        const operaçãoMatemática = ["*", "/","+", "-"]

        if(!operaçãoMatemática.includes(operacao)) {
            return
        }

        this.PrevisaoDeOperaçaoTexto.innerText = this.PrevisaoDeOperaçaoTexto.innerText.slice(0, -1) + operacao
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

        
        if (atualTexto.includes("%")) {
            const numeroAtual = +atualTexto.replace("%", "")
            
            if (this.PrevisaoDeOperaçaoTexto.innerText !== "") {
                const previsao = +this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[0]
                const operador = this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[1]

                
                const valorPorcentagem = (previsao * numeroAtual) / 100

                if (operador === "+") {
                    this.atualOperacaoTexto.innerText = previsao + valorPorcentagem
                } else if (operador === "-") {
                    this.atualOperacaoTexto.innerText = previsao - valorPorcentagem
                } else if (operador === "*" || operador === "/") {
                    this.atualOperacaoTexto.innerText = valorPorcentagem
                }

                this.PrevisaoDeOperaçaoTexto.innerText = ""
                return;
            } else {
                
                this.atualOperacaoTexto.innerText = numeroAtual / 100
                return;
            }
        }

        
        super.processoIgualOperacao()
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
                calc_cientifica.porcentagemOperacao()
                break;
        }
    })
})
