function enviar(){
    if (isEmail()){
        refreshFormulario()
    }
    else {
        exibirErro(isCampoEmailPreenchido()? "E-mail inválido." : "Campo vazio.")
    }
}

function enter(event){
    if(event.key == 'Enter'){
        enviar()
    }
}

function refreshFormulario(){
    const mensagemEnvio = criarMensagemEnvio()
    const botaoVoltar = criarBotaoVoltar()
    limparFormulario()
    adicionarNoFormulario(mensagemEnvio, botaoVoltar)
}

function criarMensagemEnvio(){
    const mensagem = document.createElement('h2')
    mensagem.setAttribute('id', 'msg-reset')
    mensagem.innerHTML = `Reset de senha enviado para <em>${getEmail()}</em>`
    return mensagem
}

function criarBotaoVoltar(){
    const btn = document.createElement('input')
    btn.setAttribute('type', 'button')
    btn.setAttribute('value', 'Voltar')
    btn.setAttribute('onclick', 'voltar()')
    return btn
}

function limparFormulario(){
    getFormulario().innerHTML = ''
}

function criarMsgErro(mensagem){
    const msgErro = document.createElement('p')
    msgErro.innerHTML = mensagem
    msgErro.setAttribute('id', 'msg-erro')
    return msgErro
}

function exibirErro(mensagem){
    if(getMsgErro() === null){
        const msgErro = criarMsgErro(mensagem)
        adicionarNoFormulario(msgErro)
    }
    else if (getMsgErro().innerHTML !== mensagem) {
        getMsgErro().innerHTML = mensagem
    }
}

function adicionarNoFormulario(...elementos){
    elementos.forEach(elemento => {
        getFormulario().appendChild(elemento)
    })
}

// getters

function isCampoEmailPreenchido(){
    return getEmail() !== ""
}

function isEmail(){
    return getEmail().match(/.@./)? true: false
}

function getFormulario(){
    return document.querySelector( '#form-reset')
}

function getEmail(){
    return document.querySelector('#reset-email').value
}

function voltar(){
    document.location.replace('./index.html')
}

function getMsgErro(){
    return document.querySelector('#msg-erro')
}
