// função para verificar se a página está no index.
window.homepage = function(){
    let verificador = false;
    if(document.location.pathname === "/Verificador-de-Jornada/index.html"){
        verificador = true;
    }
    return verificador;
}

// função para verificar se está na página sistema.html, tive que pesquisar, desconhecia.
window.sistema = function(){
    let verificador = false;
    if(document.location.pathname === "/Verificador-de-Jornada/sistemahora.html"){
        verificador = true;
    }
    return verificador;
}


/* alerta de boa vinda, gerando uma mensagem de instrução quando estiver no index.html*/
function boavinda(){
        let msg = document.getElementById("msg");
        if(homepage()){
            
            msg.innerHTML = `<strong>Seja bem vindo! Acesse agora o sistema e preencha o formulário para verificar se sua Jornada de Trabalho está regularizada.<strong>`;
            msg.style= "color: #084298; background: #b6d3ffd4; padding: 6px; border: 2px solid #b0cdf8;  border-radius: 6px;"
            setTimeout(function() {document.getElementById('msg').innerHTML='';},8000); // vai zerar o texto inserido na variável msg, depois que passar 8seg;
            setTimeout(function() {document.getElementById('msg').style='';},8000); // vai apagar os elementos de style 8seg;
        }
       
    
}

/*alerta modificado de  */
function instrucao(){
    let msgs = document.getElementById("msgs");
    if(sistema()){
        msgs.innerHTML = `<strong> Preencha o formulário abaixo com todas informações corretamente para que o sistema possa verificar sua situação!`;
        msgs.style = "color: #056f3d; background:#e5fbf1cf; padding: 6px; border: 2px solid rgba(138, 184, 159, 0.753); border-radius: 6px;";
        setTimeout(function() {document.getElementById('msgs').innerHTML = '';}, 9000);
        setTimeout(function() {document.getElementById('msgs').style='';}, 9000);

    }

}



//Seja bem vindo! Crie agora sua conta usufrua da nossa plataformar para criar seu primeiro infoproduto!

