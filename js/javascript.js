
var x=0; //armazena a coordenada x do botao clicado
var prevX=0; //armazena a coordenada x do botao clicado anteriormente
var y=0;
var prevY=0;
var classe="";
var prevClasse="";
var cont = 44;
//matriz 9 x 9
var matriz = [[-1,-1,-1,1,1,1,-1,-1,-1], [-1,-1,-1,1,1,1,-1,-1,-1], 
[-1,-1,-1,1,1,1,-1,-1,-1], [1,1,1,1,1,1,1,1,1], [1,1,1,1,0,1,1,1,1], [1,1,1,1,1,1,1,1,1], [-1,-1,-1,1,1,1,-1,-1,-1], 
[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1]];//-1 são espaços inexistentes, 0 os espaços vazios e 1 os espaços ocupados com peças
var memoria = []; //vai guardar todas as mudanças do tabuleiro
memoria.push($.extend(true, [], matriz)); //$.extend é uma funcao do jquery que clona objetos, nesse caso a matriz. sem ela ambos arrays apontam para o mesmo lugar.

$(document).ready(function(){
  	$(".peace").click(function(){
  		var coordenada;

  		prevX = x;
  		prevY = y;
  		prevClasse = classe;

  		coordenada = $(this).attr('id').split("_");
  		x = parseInt(coordenada[0]);
  		y = parseInt(coordenada[1]);
  		
  		classe = $(this).attr('class').split(" ")[1];//o attr('class')retorna uma lista com as duas classes do botao [peace ocupado], por isso fiz o split e peguei o elemento de indice 1 que é a segunda classe (ocupado)
  		
  		move();

 	});


  	//efeitos no botão de retorno
 	$(".returnBtn").mousedown(function(){
 		$(this).css({"width":"20px","height":"30px"});
 		if(memoria.length>1){
 			memoria.pop();
 			console.log(memoria);
 			matriz =  $.extend(true, [], memoria[memoria.length-1]);
 			drawTableReturn();

 		} 		
 	});
 	$(".returnBtn").mouseup(function(){
 		$(this).css({"width":"25px","height":"35px"});
 	});
 	$(".returnBtn").mouseleave(function(){
 		$(this).css({"width":"25px","height":"35px"});
 	});
});
	
function move (){
	if(classe == "vazio" && prevClasse == "ocupado"){
	  	if(x == (prevX + 2) && y == prevY ){ //move down
	  				if(matriz[x-1][y]==1){
	  					matriz[x-1][y]=0;
	  					matriz[x][y]=1;
						matriz[prevX][prevY]=0;
						drawTable();
	  				}
	  	}else if(x == (prevX -2) && y == prevY){ //move up
	  				if(matriz[x+1][y]==1){
	  					matriz[x+1][y]=0;
	  					matriz[x][y]=1;
						matriz[prevX][prevY]=0;
						drawTable();
	  				}
	  	}else if(y == (prevY + 2) && x == prevX){ //move to the right
	  				if(matriz[x][y-1]==1){
	  					matriz[x][y-1]=0;
	  					matriz[x][y]=1;
						matriz[prevX][prevY]=0;
						drawTable();
	  					
	  				}
	  	}else if(y == prevY - 2 && x == prevX){ //move to the left
	  				if(matriz[x][y+1]==1){
	  					matriz[x][y+1]=0;
	  					matriz[x][y]=1;
						matriz[prevX][prevY]=0;
						drawTable();
	  				}
	  	}
	  	checaDerrota();
	  	cont -= 1;
	}
}


////////////falta checar o caso em que ficam 3 peças numa fileira só/////////
function checaDerrota(){
	var flag = false;
	for(var i = 0; i<matriz[0].length; i++){
		for(var j = 0; j<matriz[0].length; j++){
			if(matriz[i][j]==1){ //só procura pelos vizinhos se tiver peça
				if(j == 0 && i==0){ //se estiver na primeira coluna e primeira linha
					if(matriz[i+1][j] ==1 || matriz[i][j+1] ==1){
						flag = true;
					}

				}else if(j == matriz[0].length -1 && i==0){ //se estiver na última coluna e primeira linha
					if(matriz[i+1][j] ==1 || matriz[i][j-1]  ==1 ){
						flag = true;
					}
				}else if(j == 0 && i == matriz[0].length -1){//se estiver na primeira coluna e última linha
					if(matriz[i-1][j] == 1  || matriz[i][j+1] ==1  ){
						flag = true;
					}
				}else if(j == matriz[0].length -1 && i == matriz[0].length -1){//se estiver na ultima coluna e última linha
					if(matriz[i-1][j] == 1 ||  matriz[i][j-1]  == 1 ){
						flag = true;
					}
				}else if(i == 0){//se estiver na primeira linha
					if(matriz[i+1][j] ==1 || matriz[i][j+1] ==1 || matriz[i][j-1]  ==1 ){
						flag = true;
					}
				}else if(i == matriz[0].length -1){//se estiver na última linha
					if(matriz[i-1][j] == 1 || matriz[i][j+1] ==1 || matriz[i][j-1]  ==1 ){
						flag = true;
					}
				}else if(j == 0){//se estver na primeira coluna
					if(matriz[i-1][j] == 1 || matriz[i+1][j] ==1 || matriz[i][j+1] ==1){
						flag = true;
					}
				}else if(j == matriz[0].length -1 ){// se estiver na última coluna
					if(matriz[i-1][j] == 1 || matriz[i+1][j] ==1 || matriz[i][j-1]  ==1 ){
						flag = true;
					}
				}else{
					if(matriz[i-1][j] == 1 || matriz[i+1][j] ==1 || matriz[i][j+1] ==1 || matriz[i][j-1]  ==1 ){
						flag = true;
					}
				}
			}
			
		}
		if (flag){
			break;
		}
	}
	if(!flag){
		alert("Fim de Jogo!!!");
		switch(cont){
			case 1:
				alert("Você é o campão!! Você venceu!!!");
				break;
			case 2:
				alert("Você quase chega lá, foi por pouco!!!");
				break;
			case 3:
				alert("Só faltaram 2, foi por pouco!!!");
				break;
			case 4:
				alert("Continue entando, está quase lá.");
				break;
			default:
				alert("Continue tentando...");
		}

	}
}

function drawTable(){
	for(var i = 0; i<matriz[0].length; i++){
		for(var j = 0; j<matriz[0].length; j++){
			if(matriz[i][j]==1){
				$("#"+i+"_"+j).removeClass("vazio").addClass("ocupado");
			}else if(matriz[i][j]==0){
				$("#"+i+"_"+j).removeClass("ocupado").addClass("vazio");
			}
		}
	}
	var matrizAux = $.extend(true, [], matriz); //$.extend é uma funcao do jquery que clona objetos, nesse caso a matriz. sem ela ambos arrays apontam para o mesmo lugar.
	memoria.push(matrizAux);
}
function drawTableReturn(){
	for(var i = 0; i<matriz[0].length; i++){
		for(var j = 0; j<matriz[0].length; j++){
			if(matriz[i][j]==1){
				$("#"+i+"_"+j).removeClass("vazio").addClass("ocupado");
			}else if(matriz[i][j]==0){
				$("#"+i+"_"+j).removeClass("ocupado").addClass("vazio");
			}
		}
	}
	cont += 1;
}
