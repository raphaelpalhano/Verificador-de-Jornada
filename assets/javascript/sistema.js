// PROGRAMA

/* INSTRUÇÕES 

1. O usuário vai inserir o seu nome;
2. O usuário vai inserir a hora de entrada no trabalho bem como a hora de saída (horadesaida - horadeentrada) 
3 == dias = 6x1; trabalha 6 e folga 1;

Hora trabalha no dia: horadia = (saida - entrada)  



JORNADAS: (cada uma variável)

Jornada 5×1: corresponde a cinco dias trabalhados e uma folga. O turno de trabalho dura 7 horas e 20 minutos;

Jornada 5×2: onde há dois dias de folga para cada cinco dias trabalhados. Somaria um período máximo de 8 horas e 48 minutos de trabalho diário. 44 horas semanais e 220 horas mensais

Jornada 6×1: o empregado trabalha seis dias na semana e descansará apenas um, sendo importante seguir as determinações dos acordos coletivos ou sindicais;




ALGORITMO
O usuário irá selecionar sua escala, se a hora diária que é resultado da ( (saida - entrada)- intervalo ) , estiver de acordo com a variável de jornada, retornará verde para situação regular, ou, vermelho para situação irregular.

LÓGICA PARA HORAS

hora semanal == (hora trabalha diárias * quantidade de dias trabalho);
hora mensal == (hora semanal total * quantidade de dias trabalhados na semana);
hora anual === (365 / soma da escala (5x1 == 5+1) * horas semanais totais);
simplificando == (todas semanais que trabalhei no ano / horas totais trabalhadas na semana)

Como o ano tem 365 dias e dividindo esse número pelo ciclo de 7 dias dessa escala (6 dias de trabalho + 1 de folga), teremos 52,14 semanas. 
Além disso, multiplicando a carga horária semanal pelo número de semanas existentes (44:00 hrs X 52,14 semanas), 
teremos uma carga horária anual de 2.294:17 hrs.

FONTE: https://escalasdetrabalho.com.br/como-calcular-a-carga-horaria-das-escalas-de-trabalho/#:~:text=Como%20o%20ano%20tem%20365,anual%20de%202.294%3A17%20hrs.

*/

// VALIDADORES DE JORNADA

// JORNADA 5X1:
const JORNADA5X1 = {hora:7.20, semanal:36, mensal: 180, anual:2190};
const multi5 = 5;

// JORNADA 6X1

const JORNADA6X1 = {hora:8, semanal:44, mensal:264, anual: 2294};
const multi6 = 6 
//cálculo: diário == 7.20, máximo == 8 +4 do sábado;
// semanal: Math.ceil(7.20*6); == 44
// mensal: (44 * 6); == 264
// anual: (365 / 7 ) * 44;


// JORNADA 5X2 
const JORNADA5X2 = {hora:8.48, semanal:44, mensal:220, anual: 2294};



// ao invés de usar let variável = function(parâmetros), utilizei => arrow function como sintaxe mais curta;
let Horadiaria = (entrada, saida, intervalo) => {
   // variavel intervalo
    let inter = 0;
    // variáveis que estão recebendo o valor de entrada do usuário, e removendo os dois pontos : com  split que separa a string
    let comeca = entrada.split(':'); //horário que o usuário vai inserir como início do turno
    let termina = saida.split(':'); // horário da saída do turno que o usuário vai inserir
    let minuto = termina[1]- comeca[1]; //coletando os minutos do saída do turno pela subtração do início do trabalho;

    //INTERVALO
    let pausatext = intervalo.split(':');
    let pausahora = pausatext[0];
    let pausaminute = pausatext[1];
    
    // se o usuário digitar apenas hora inteira no intervalo sem minutos exemplo: 01:00;
    if(pausahora >= 1){
        
        inter = Math.floor(pausahora) + (pausaminute/100);

    //senão, o usuário digitar apenas minutos 00:35 (dividindo por 35/100 == 0.35)
    }else{
        inter = parseFloat(pausaminute) /100;


    }

    // se os minutos de entrada e saída derem menor que zero, quer dizer "a subratação da saída menos entrada for -13, -20, eu vou passar o sinal para positivo e manter o valor"
    if(minuto < 0){
         //TROCANDO SINAL NEGATIVO PARA POSITIVO
         minuto -= minuto + minuto;
         
     }

    // variáveis para encontrar o valor restante: 
    let hour = 0; // variável para verificar a hora;
    let minutofor = 0;  // minuto restante
    let hora = 0; // hora restante
    let horarestante = 0; // resto total (hora com minuto);
    // se o turno for o matutino, quer dizer que a hora de termino vai ser maior que a hora de entrada;
    if(termina[0] > comeca[0]){ // 
        hour = (termina[0])-comeca[0];
    }
    // senão, se for turno noturno, a hora de saída vai ser menor que a entrada. Exemplo: entrei as 22, saí as 05 da manhã;
    // aplica a regra (hora de saída + 24 - hora de entrada); Criei as condições da minha cabeça;
    else if(termina[0] < comeca[0]){
        hour = (Number(termina[0]) + 24) - comeca[0];
        
    }
    // SE O USUÁRIO POSSUIR HORA QUEBRADA:
    if(minuto > 1){
        minutofor = parseFloat(minuto/100) // pegando o valor do minuto e transformando em decimal 0.30, 0.25;
        let verificandoentrada = Number(comeca[1]); // variável usada somente para verificar, não táo necessário, mas visualmente adequado.
        // se o usuário digitou minuto entrada maior que minuto saída
        if(verificandoentrada > termina[1]){
            hora = parseFloat(hour-0.40) - minutofor;
         
        //senão se o usuário digitou a entrada minuto menor que a saída minuto;    
        }
        else{
            hora = parseFloat(hour) + minutofor; //Aqui a lógica é o usuário digitou 11:00 como entrada no serviço e 19:20 como saída, vou apenas subtrair as horas e manter o minuto.
        }
        if(pausahora == 0 && pausaminute >= 1 || pausahora >= 1 && pausaminute >= 1){
            if(pausaminute <= minuto){
                horarestante = (hora) - parseFloat(inter);
            }else{
                horarestante = (hora-0.40) - parseFloat(inter); 
            }
           
        }
        else{
            horarestante = hora - parseFloat(inter);
        }
       // calculo final, hora total com os minutos, menos intervalo
    }

    // SE OS USUÁRIOS NÃO POSSUEM HORA QUEBRADA. Exemplo 11:00 até as 19:00;
    else{
        // se o usuário digitou intervalo em minutos. Exemplo: 00:35, terei que aplica lógica de hora - 0.40 pois será possível diminuir sobre o valor das horas. 
        if(pausahora == 0 && pausaminute >= 1 || pausahora >= 1 && pausaminute >= 1){
            horarestante = (hour-0.40) - parseFloat(inter); //9.0 - 0.40 9.60 - 0.35 == 9.25, caso eu não fizer isso, a hora não será exata.
        }else{
            horarestante = hour - parseFloat(inter);
        }
       
    }

     return (  horarestante).toFixed(2);   // fixed em 2, para pegar os dois primeiro após o ponto .; é necessário para o resultado ser exato.
        
 }

  
/*FUNÇÃO PRINCIPAL */
function relatorio(){
    // DECLRANDO AS VARIÁVEIS DE DOM:
    //pegando os valores por ID
    let nome = document.getElementById("validationText"); 
    let hrent = document.getElementById("validationTime");
    let hrsai = document.getElementById("validationTime1");
    let intervalo = document.getElementById("validationTime2");
    let jornada = document.querySelector("select#jornadatipo");
    let jornadaselecionada = jornada.options[jornada.selectedIndex].value;
    let tituloContent = document.getElementById("titulo");
    let conteudo = document.getElementById("dados");
    
    // --------------------------------------------------//
    //HORA
    let hora = Horadiaria(hrent.value, hrsai.value, intervalo.value);
    let horasemanal = 0;
    let hormensal = 0;
    let horaanual = 0;
    let horaformat = String(hora).replace(".", ":") // aqui é apenas retorno para o usuário, pois ninguem quer ver hora com uso de ponto.
    //------------------------------------------------------//
 
    /*EXPLICAÇÃO DAS CONDIÇÕES ABAIXO
    
    EXISTEM VÁRIAS JORNADAS, 5X1, 5X2, 6X1, E OUTRAS, MAS SELECIONEI AS PRINCIPAIS.

    NO FORMULÁRIO EXISTEM UM SELECT OPTION, QUE POSSUI 3 OPÇÕES, JORNADA 5X1, 6X1, 5X2.

    CADA OPÇÃO VAI INDICAR UMA CONDIÇÃO DIFERENTE:

    5X1 == ESCALA COM HORÁRIO LIMITE DE 7.20 CONFORME A CLT, 5 DIAS DE TRABALHO 1 DE FOLGA;

    6X1 == ESCALA COM HORA LIMITE DE 8HRS COM BASE NO ART. 7 DA CONSTITUIÇÃO;

    5X2 == ESCALA COM HORA LIMITE DE 8.48HRS COM BASE NA CLT E JURISPRUDÊNCIA;

    PORTANTO, QUANDO O USUÁRIO SELECIONAR 5X1, HÁ UM CONST PARA VALIDAR A HORA MÁXIMA.
    SE A HORA MÁXIMA PASSAR 7:20HRS, IRÁ GERAR UMA MENSAGEM SUBLINHADA EM VERMELHO COM INSTRUÇÃO DA IRREGULARIDADE;
    SE A HORA NÃO PASSAR, IRÁ GERAR UMA MENSAGEM SUBLINHADA EM VERDE.
    
    */

    // Verificando qual jornada foi selecionada://
    if(jornadaselecionada == "5x1"){ 
        tituloContent.innerHTML = nome.value;
        horasemanal = (hora * multi5); //horas dias * quantidade de dias trabalhados 5 e 1 de folga
        hormensal = (horasemanal * multi5);
        horaanual = (365 / 6) * horasemanal;
        
        let formatsemanal = String(horasemanal).replace(".", ":");
        let formatmensal = String(hormensal).replace(".", ":");
        let formatanual = String(horaanual).replace(".", ":");
        if(hora > JORNADA5X1.hora){
            conteudo.innerHTML = `Você está trabalhando hrs${horaformat}min por dia.<br> Na semana você está trabalhando ${formatsemanal.slice(0, 2)}hrs por semana. <br> No mês você está trabalhando ${formatmensal.slice(0, 3)}hrs por mês. <br> Por ano você está trabalhando ${formatanual.slice(0, 4)}hrs por ano.<br> <strong> Procure seus direitos, de acordo com a CLT a duração máxima de trabalho não pode ultrapassar 7:20hrs diárias, 36hrs semanais, 180hrs mensais e 2190hrs anuais!</strong>`
            conteudo.style = "background: #ff2626eb; color:#f9f9f9e8; "
        }
        else{
            conteudo.innerHTML = `Você está trabalhando hrs${horaformat}min por dia.<br> Na semana você está trabalhando ${formatsemanal.slice(0, 2)}hrs por semana. <br> No mês você está trabalhando ${formatmensal.slice(0, 3)}hrs por mês. <br> Por ano você está trabalhando ${formatanual.slice(0, 4)}hrs por ano.<br>  Sua situação está regular, fique tranquilo!`
            conteudo.style = "background: #149829eb; color:#f5fbff; "         
        }
        
        
    }
    else if(jornadaselecionada == "6x1"){
        tituloContent.innerHTML = nome.value;
        horasemanal = (hora * multi6); 
        hormensal = (horasemanal * multi6);
        horaanual = (365 / 7) * horasemanal;
        let formatsemanal = String(horasemanal).replace(".", ":");
        let formatmensal = String(hormensal).replace(".", ":");
        let formatanual = String(horaanual).replace(".", ":");
        if(hora > JORNADA6X1.hora){
            conteudo.innerHTML = `Você está trabalhando hrs${horaformat}min por dia.<br> Na semana você está trabalhando ${formatsemanal.slice(0, 2)}hrs por semana. <br> No mês você está trabalhando ${formatmensal.slice(0, 3)}hrs por mês. <br> Por ano você está trabalhando ${formatanual.slice(0, 4)}hrs por ano.<br> <strong>Procure seus direitos, pois de acordo com a Constituição Federal, no seu artigo 7º, a duração máxima de trabalho não pode ultrapassar oito horas diárias!</strong>`
            conteudo.style = "background: #ff2626eb; color:#f9f9f9e8; "
        }
        else{
            conteudo.innerHTML = `Você está trabalhando hrs${horaformat}min por dia.<br> Na semana você está trabalhando ${formatsemanal.slice(0, 2)}hrs por semana. <br> No mês você está trabalhando ${formatmensal.slice(0, 3)}hrs por mês. <br> Por ano você está trabalhando ${formatanual.slice(0, 4)}hrs por ano.<br>  Sua situação está regular, fique tranquilo!`
            conteudo.style = "background: #149829eb; color:#f5fbff; "         
        }

    }

    else if(jornadaselecionada == "5x2"){
        horasemanal = (hora * multi5); //horas dias * quantidade de dias trabalhados 5 e 1 de folga
        hormensal = (horasemanal * multi5);
        horaanual = (365 / 7) * horasemanal;
        
        let formatsemanal = String(horasemanal).replace(".", ":");
        let formatmensal = String(hormensal).replace(".", ":");
        let formatanual = String(horaanual).replace(".", ":");
        if(hora > JORNADA5X2.hora){
            conteudo.innerHTML = `Você está trabalhando hrs${horaformat}min por dia.<br> Na semana você está trabalhando ${formatsemanal.slice(0, 2)}hrs por semana. <br> No mês você está trabalhando ${formatmensal.slice(0, 3)}hrs por mês. <br> Por ano você está trabalhando ${formatanual.slice(0, 4)}hrs por ano.<br> <strong> Procure seus direitos, de acordo com a CLT a duração máxima de trabalho não pode ultrapassar 8:48hrs diárias, 44hrs semanais, 220hrs mensais e 2190hrs anuais!</strong>`
            conteudo.style = "background: #ff2626eb; color:#f9f9f9e8; "
        }
        else{
            conteudo.innerHTML = conteudo.innerHTML = `Você está trabalhando hrs${horaformat}min por dia.<br> Na semana você está trabalhando ${formatsemanal.slice(0, 2)}hrs por semana. <br> No mês você está trabalhando ${formatmensal.slice(0, 3)}hrs por mês. <br> Por ano você está trabalhando ${formatanual.slice(0, 4)}hrs por ano.<br>  Sua situação está regular, fique tranquilo!`
            conteudo.style = "background: #149829eb; color:#f5fbff; "         
        }
    }     

}

//quando o usuário fechar a aba que vai ser gerada pelo formulário, vai recarregar a página para que seja possível entrar com outro formulário
function reload(){
    setInterval(function(){window.location.reload(1);}, 100);
}
