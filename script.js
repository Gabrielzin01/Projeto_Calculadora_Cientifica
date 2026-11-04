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

        // Impedir operadores consecutivos após operações científicas
        if (["cos-", "sin-", "tan-", "ln-", "√-"].includes(this.atualOperacaoTexto.innerText) && ["+", "-", "*", "/"].includes(operacao)) {
            return
        }
        // bota o sinal de menos na frente do numero
        if (
            this.atualOperacaoTexto.innerText === "" &&
            this.PrevisaoDeOperaçaoTexto.innerText === "" &&
            operacao === "-"
        ) {
            this.atualOperacaoTexto.innerText = "-"
            return
        }

        // Impedir outro operador enquanto só existe o sinal negativo
        if (
            this.atualOperacaoTexto.innerText === "-" &&
            ["+", "-", "*", "/","x!","%"].includes(operacao)
        ) {
            return
        }
        // deixar o sinal de "-" na frente dessas operacoes
        if(operacao === "-" && ["cos", "sin", "tan", "√", "ln"].includes(this.atualOperacaoTexto.innerText)) {
            this.atualOperacaoTexto.innerText += "-"
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

        //deixa trocar opercaoes fatorial
       if ( this.atualOperacaoTexto.innerText.includes("!") &&
            ["+", "-", "*", "/"].includes(operacao)
        ) {
            const atualSemFatorial = this.atualOperacaoTexto.innerText.replace("!", "")
            this.atualOperacaoTexto.innerText = atualSemFatorial
        }
        //deixa trocar opercaoes raiz quadrada
        if (
            this.atualOperacaoTexto.innerText === "√" && ["+", "-", "*", "/"].includes(operacao)) {
            return
        }
        
        if (
            this.atualOperacaoTexto.innerText.startsWith("√") &&
            ["+", "-", "*", "/"].includes(operacao)
        ) {
            this.atualOperacaoTexto.innerText = this.atualOperacaoTexto.innerText.replace("√", "")
        }
        //deixa trocar opercaoes Pi
        if (this.atualOperacaoTexto.innerText.endsWith("π")) {
            const textoAtual = this.atualOperacaoTexto.innerText

            const quantidade = textoAtual.split("π").length - 1

            const numero = textoAtual.replaceAll("π", "")
            let multiplicador = numero === "" ? 1 : Number(numero)

            for (let i = 1; i < quantidade; i++) {
                multiplicador *= Math.PI
            }

    this.atualOperacaoTexto.innerText = String(multiplicador * Math.PI)
}
        //deixa trocar opercaoes Cosseno
        if(this.atualOperacaoTexto.innerText === "cos" && ["+", "-", "*", "/"].includes(operacao)) {
                return
            }

        if(this.atualOperacaoTexto.innerText.startsWith("cos") && ["+", "-", "*", "/"].includes(operacao)) {
            this.atualOperacaoTexto.innerText = this.atualOperacaoTexto.innerText.replace("cos", "")
            
            
        }
        //deixa trocar opercaoes seno
        if(this.atualOperacaoTexto.innerText === "sin" && ["+", "-", "*", "/"].includes(operacao)) {
                return
            }

        if(this.atualOperacaoTexto.innerText.startsWith("sin") && ["+", "-", "*", "/"].includes(operacao)) {
            this.atualOperacaoTexto.innerText = this.atualOperacaoTexto.innerText.replace("sin", "")
            
            
        }


        //deixa trocar opercaoes tangente
        if(this.atualOperacaoTexto.innerText === "tan" && ["+", "-", "*", "/"].includes(operacao)) {
                return
            }

        if(this.atualOperacaoTexto.innerText.startsWith("tan") && ["+", "-", "*", "/"].includes(operacao)) {
            this.atualOperacaoTexto.innerText = this.atualOperacaoTexto.innerText.replace("tan", "")
            
            
        }

        //deixa trocar opercaoes Logaritimo Natural
         if(this.atualOperacaoTexto.innerText === "ln" && ["+", "-", "*", "/"].includes(operacao)) {
                return
            }

        if(this.atualOperacaoTexto.innerText.startsWith("ln") && ["+", "-", "*", "/"].includes(operacao)) {
            this.atualOperacaoTexto.innerText = this.atualOperacaoTexto.innerText.replace("ln", "")
            
            
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
        const operaçõesPermitidas = ["*", "/", "+", "-", "!","%","√","cos","sin","tan"]

        if (!operaçõesPermitidas.includes(operacao)) return

        const previsaoAtual = this.PrevisaoDeOperaçaoTexto.innerText
        const previsaoSemEspacos = previsaoAtual.trim()
        const ultimoCaractere = previsaoAtual.trim().slice(-1)

        if (["*", "/", "+", "-", "!","%","√","cos","sin","tan"].includes(ultimoCaractere)) {
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

       if (this.atualOperacaoTexto.innerText === "" && ["+", "-", "*", "/"].some(operador => this.PrevisaoDeOperaçaoTexto.innerText.trim().endsWith(operador))) {
            return
        }

        this.processarOperacao(operacao)
    }

}

const calc = new Calculadora(PrevisaoDeOperaçaoTexto, atualOperacaoTexto)

class Cientifica extends Calculadora {
    constructor(PrevisaoDeOperaçaoTexto,atualOperacaoTexto) {
        super(PrevisaoDeOperaçaoTexto,atualOperacaoTexto)


    }

 porcentagemOperacao() {
        if (this.atualOperacaoTexto.innerText === "" || this.atualOperacaoTexto.innerText.includes("%") || this.atualOperacaoTexto.innerText === "-") {
            return
        }
        this.atualOperacaoTexto.innerText += "%"
    }

    
processoIgualOperacao() {
    let atualTexto = this.atualOperacaoTexto.innerText
    const previsaoTexto = this.PrevisaoDeOperaçaoTexto.innerText.trim()
    const numeroPrevisao = +previsaoTexto.replace("%", "")

    if (["cos-", "sin-", "tan-", "ln-", "√-"].includes(atualTexto)) {
    return
}

    // logaritmo natural
    if(atualTexto.startsWith("ln")) {
        if(atualTexto === "ln") {
            return
        }

        let Logaritmo_natural = +atualTexto.replace("ln", "")

         if(Logaritmo_natural <= 0){
            this.atualOperacaoTexto.innerText = "Error"
            return
        }

        let x = Math.log(Logaritmo_natural)

       

        if(this.PrevisaoDeOperaçaoTexto.innerText === "") {
            this.PrevisaoDeOperaçaoTexto.innerText = x.toFixed(10)
            this.atualOperacaoTexto.innerText = ""
            return
        }
        this.atualOperacaoTexto.innerText = x.toFixed(10)
        const resultado = this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[1]
        this.processarOperacao(resultado)
        return
    }


    // tangente
    if(atualTexto.startsWith("tan")) {
        if(atualTexto === "tan") {
            return
        }

        let tangente = +atualTexto.replace("tan", "")
        let x = Math.tan(tangente * Math.PI / 180)

         if((tangente - 90) % 180 === 0){
            this.atualOperacaoTexto.innerText = "Não definido"
            return
        }

        if(this.PrevisaoDeOperaçaoTexto.innerText === "") {
            this.PrevisaoDeOperaçaoTexto.innerText = x.toFixed(10)
            this.atualOperacaoTexto.innerText = ""
            return
        }
        this.atualOperacaoTexto.innerText = x.toFixed(10)
        const resultado = this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[1]
        this.processarOperacao(resultado)
        return
    }


    // Seno
    if(atualTexto.startsWith("sin")) {
        if(atualTexto === "sin") {
            return
        }
        let seno = +atualTexto.replace("sin", "")
        let x = Math.sin(seno * Math.PI / 180)

        if(this.PrevisaoDeOperaçaoTexto.innerText === "") {
            this.PrevisaoDeOperaçaoTexto.innerText = x.toFixed(10)
            this.atualOperacaoTexto.innerText = ""
            return
        }
        this.atualOperacaoTexto.innerText = x.toFixed(10)
        const resultado = this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[1]
        this.processarOperacao(resultado)
        return
    }
   
    // Cosseno
    if(atualTexto.startsWith("cos")) {
        if(atualTexto === "cos") {
            return
        }
        let cosseno = +atualTexto.replace("cos", "")
        let x = Math.cos(cosseno * Math.PI / 180)

        if(this.PrevisaoDeOperaçaoTexto.innerText === "") {
            this.PrevisaoDeOperaçaoTexto.innerText = x.toFixed(10)
            this.atualOperacaoTexto.innerText = ""
            return
        }
        this.atualOperacaoTexto.innerText = x.toFixed(10)
        const resultado = this.PrevisaoDeOperaçaoTexto.innerText.split(" ")[1]
        this.processarOperacao(resultado)
        return
    }

    // PI
    if (atualTexto.includes("π")) {
    const quantidade = atualTexto.split("π").length - 1

    const numero = atualTexto.replaceAll("π", "")
    let resultado = numero === "" ? 1 : Number(numero)

    for (let i = 0; i < quantidade; i++) {
        resultado *= Math.PI
    }

    this.atualOperacaoTexto.innerText = String(resultado)
    atualTexto = this.atualOperacaoTexto.innerText
}


    // Raiz quadrada
    if(atualTexto.startsWith("√")){
        if(atualTexto === "√"){
            return
        }
        let numeroAtual = +atualTexto.replace("√", "")
        const resultado = Math.sqrt(numeroAtual)

        if(numeroAtual < 0){
            this.atualOperacaoTexto.innerText = "Error"
            return
        }

        if(this.PrevisaoDeOperaçaoTexto.innerText === "") {
            this.PrevisaoDeOperaçaoTexto.innerText = resultado
            this.atualOperacaoTexto.innerText = ""
            return
        }
        this.atualOperacaoTexto.innerText = resultado
        this.processoIgualOperacao()
        
    }

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

    // Verificar se o número é negativo
    const negativo = atualOperacaoTexto < 0

    let n = 1

    // Calcular usando o valor absoluto
    for(let i = 1; i <= Math.abs(atualOperacaoTexto); i++) {
        n *= i
    }

    // Recuperar o sinal negativo
    if(negativo) {
        n *= -1
    }

    this.PrevisaoDeOperaçaoTexto.innerText = n
    this.atualOperacaoTexto.innerText = ""
}

   adicionarSimbolo(simbolo) {
    const simbolosPermitidos = ["%", "!","cos","sin","tan"]

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
                if(calc_cientifica.atualOperacaoTexto.innerText === "" && calc_cientifica.PrevisaoDeOperaçaoTexto.innerText !== "") {
                    calc_cientifica.operaçãoDeAlteração("%") 
                } else {
                    calc_cientifica.porcentagemOperacao()
                }
                break;
            case "x!":
                calc_cientifica.processarOperacao(value)
                break;
            case "π":
                calc_cientifica.atualOperacaoTexto.innerText += "π"
                break;
            case "√":
                calc_cientifica.atualOperacaoTexto.innerText = "√"
                break;
            case "cos":
                calc_cientifica.atualOperacaoTexto.innerText = "cos"
                break;
            case "sin":
                calc_cientifica.atualOperacaoTexto.innerText = "sin"
                break;
            case "tan":
                calc_cientifica.atualOperacaoTexto.innerText = "tan"
                break;
            case "ln":
                calc_cientifica.atualOperacaoTexto.innerText = "ln"
                break;
        }
    })
})
