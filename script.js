const NumberClass = document.querySelectorAll("#basico button")
const PrevisaoDeOperaçaoTexto = document.querySelector("#previsao_de_operaçao")
const atualOperacaoTexto = document.querySelector("#atualOperaçao")


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
        // obter o valor atual e o anterior
        let operacaoValor
        const previsao = +this.PrevisaoDeOperaçaoTexto.innerText
        const atual = +this.atualOperacaoTexto.innerText

        switch(operacao) {
            case "+":
                operacaoValor = previsao + atual
                this.atulizarVisor(operacaoValor, operacao, atual, previsao)
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
        }
    }
}

const calc = new Calculadora(PrevisaoDeOperaçaoTexto, atualOperacaoTexto)

NumberClass.forEach((buttons) => {
    buttons.addEventListener("click", (e) => {
        const value = e.target.innerText

        if (+value >= 0 || value === ".") {
            calc.AdcionarDigito(value)
        } else {
            calc.processarOperacao(value)
        }

    })
})
