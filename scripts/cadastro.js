function cadastrar(){
    if (validarSenha() && isSenhasIguais() && validarCampos()){
        window.location.replace('./fakepage.js')
    }
    else {
        exibirErro()
    }
}

function colorirCriterio(criterio, regExp){
    const senha = getSenha()
    criterio.style.color = senha.match(regExp)? 'green':'red'
}

function verificarCriterios(){
    const senha = getSenha()
    const [upper, lower, numeric, special, length] = 
    getElementos('p#vld-upper', 'p#vld-lower', 'p#vld-numeric', 'p#vld-special', 'p#vld-length')

    colorirCriterio(upper, /[A-Z]/)
    colorirCriterio(lower,/[a-z]/)
    colorirCriterio(numeric, /[0-9]/)
    colorirCriterio(special, /[!\@\#\&\%\$\*\(\)]/)
    colorirCriterio(length, /.{8}/)
}

function isNotValidado(criterio){
    return criterio.style.color !== 'green'
}

function validarSenha(){
    const criterios = getElementos('p#vld-upper', 'p#vld-lower', 'p#vld-numeric', 'p#vld-special', 'p#vld-length')
    for (let criterio of criterios){
        if(isNotValidado(criterio)){
            return false
        }
    }
    return true
}

function isSenhasIguais(){
    const [senha, confSenha] = getValores('input#cad-senha', 'input#conf-senha')
    return senha === confSenha
}


function criarMsgErro(){
    const msgErro = document.createElement('p')
    msgErro.innerHTML = "Favor revise os dados."
    msgErro.setAttribute('id', 'msg-erro')
    return msgErro
}

function exibirErro(){
    if(document.querySelector('#msg-erro') === null){
        getFormulario().appendChild(criarMsgErro())
    }
}

function isCamposPreenchidos(){
    const campos = getValores('#nome, #data-nascimento, #celular, #cad-email')
    for (let campo of campos){
        if (campo === ""){
            return false;
        }
    }
    return true
}

function validarCampos(){
    if (isCamposPreenchidos()){
        const [celular, email] = getValores('#celular', '#cad-email')
        if (isInvalido(celular, /\([0-9]{2}\)[0-9]{9}$/)){
                return false
        }
        if (isInvalido(email, /.@./)){
            return false
        }
        return true
    }
    return false
}

function isInvalido(campo, regExp){
    if(campo.match(regExp)){
        return false
    }
    return true
}

function getFormulario(){
    return document.querySelector('#form-cadastro')
}

function getSenha(){
    return document.querySelector("input#cad-senha").value
}

function getElementos(...elementos){
    return elementos.map(elemento => document.querySelector(elemento))
}

function getValores(...elementos){
    return elementos.map(elemento => document.querySelector(elemento).value)
}

function enter(event){
    if(event.key === 'Enter'){
        cadastrar()
    }
}