function isEmailPreenchido(){
    return getEmail().match(/.@./)? true: false
}

function enviar(){
    if (isEmailPreenchido()){
        refreshFormulario()
    }
    else {
        exibirErro()
    }
}

function refreshFormulario(){
    const mensagemEnvio = criarMensagemEnvio()
    limparFormulario()
    getFormulario().appendChild(mensagemEnvio)
    getFormulario().appendChild(criarBotaoVoltar())
}

function criarMensagemEnvio(){
    const mensagem = document.createElement('h2')
    mensagem.setAttribute('id', 'msg-reset')
    mensagem.innerHTML = `Reset de senha enviado para <em>${getEmail()}</em>`
    return mensagem
}

function limparFormulario(){
    getFormulario().innerHTML = ''
}

function criarBotaoVoltar(){
    const btn = document.createElement('input')
    btn.setAttribute('type', 'button')
    btn.setAttribute('value', 'Voltar')
    btn.setAttribute('onclick', 'voltar()')
    return btn
}

function criarMsgErro(){
    const msgErro = document.createElement('p')
    msgErro.innerHTML = "E-mail inválido."
    msgErro.setAttribute('id', 'msg-erro')
    return msgErro
}

function exibirErro(){
    if(document.querySelector('#msg-erro') === null){
        getFormulario().appendChild(criarMsgErro())
    }
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

