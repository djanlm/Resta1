
var x=0; //armazena a coordenada x do botao clicado
var prevX=0; //armazena a coordenada x do botao clicado anteriormente
var y=0;
var prevY=0;
var flag=false;//indica se um botão foi clicado anteriormente
var classe="";
var prevClasse="";
//matriz 13 x 13
/*var matriz = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1], [-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1], 
[-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1], [-1,-1,1,1,1,1,1,1,1,1,1,-1,-1], [-1,-1,1,1,1,1,0,1,1,1,1,-1,-1], [-1,-1,1,1,1,1,1,1,1,1,1,-1,-1,], [-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1], 
[-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,1,1,1,-1,-1,-1,-1,-1], [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];//-1 são espaços inexistentes, 0 os espaços vazios e 1 os espaços ocupados com peças
*/
//matriz 9 x 9
var matriz = [[-1,-1,-1,1,1,1,-1,-1,-1], [-1,-1,-1,1,1,1,-1,-1,-1], 
[-1,-1,-1,1,1,1,-1,-1,-1], [1,1,1,1,1,1,1,1,1], [1,1,1,1,0,1,1,1,1], [1,1,1,1,1,1,1,1,1], [-1,-1,-1,1,1,1,-1,-1,-1], 
[-1,-1,-1,1,1,1,-1,-1,-1],[-1,-1,-1,1,1,1,-1,-1,-1]];//-1 são espaços inexistentes, 0 os espaços vazios e 1 os espaços ocupados com peças

$(document).ready(function(){
  		$("button").click(function(){
  		var coordenada;

  		prevX = x;
  		prevY = y;
  		prevClasse = classe;

  		coordenada = $(this).attr('id').split("_");
  		x = parseInt(coordenada[0]);
  		y = parseInt(coordenada[1]);
  		
  		classe = $(this).attr('class');
  		
  		if(flag){ //no primeiro clique não faz nada, pois nao tinha coordenada do botao anterior
	  		if(classe == "vazio" && prevClasse == "ocupado"){
	  			if(x == (prevX + 2) && y == prevY ){ //move down
	  				if(matriz[x-1][y]==1){

	  					console.log("prevX="+prevX+" prevY="+prevY);
	  					console.log("X="+x+" Y="+y);

	  					matriz[x-1][y]=0;
	  					matriz[x][y]=1;
	  					matriz[prevX][prevY]=0;
	  		
	  					$("#"+(x-1)+"_"+y).removeClass("ocupado").addClass("vazio");
	  					$("#"+x+"_"+y).removeClass("vazio").addClass("ocupado");
	  					$("#"+prevX+"_"+prevY).removeClass("ocupado").addClass("vazio");

	  				}

	  			}else if(x == (prevX -2) && y == prevY){ //move up
	  				if(matriz[x+1][y]==1){

	  					matriz[x+1][y]=0;
	  					matriz[x][y]=1;
	  					matriz[prevX][prevY]=0;
	  				
	  					$("#"+(x+1)+"_"+y).removeClass("ocupado").addClass("vazio");
	  					$("#"+x+"_"+y).removeClass("vazio").addClass("ocupado");
	  					$("#"+prevX+"_"+prevY).removeClass("ocupado").addClass("vazio");

	  				}


	  			}else if(y == (prevY + 2) && x == prevX){ //move to the right
	  				if(matriz[x][y-1]==1){
	  					console.log("prevClasse="+prevClasse);
	  			        console.log("Classe="+classe);
	  					matriz[x][y-1]=0;
	  					matriz[x][y]=1;
	  					matriz[prevX][prevY]=0;
	  					
	  					$("#"+x+"_"+(y-1)).removeClass("ocupado").addClass("vazio");
	  					$("#"+x+"_"+y).removeClass("vazio").addClass("ocupado");
	  					$("#"+prevX+"_"+prevY).removeClass("ocupado").addClass("vazio");

	  				}

	  			}else if(y == prevY - 2 && x == prevX){ //move to the left
	  				if(matriz[x][y+1]==1){
	  					matriz[x][y+1]=0;
	  					matriz[x][y]=1;
	  					matriz[prevX][prevY]=0;
	  					
	  					$("#"+x+"_"+(y+1)).removeClass("ocupado").addClass("vazio");
	  					$("#"+x+"_"+y).removeClass("vazio").addClass("ocupado");
	  					$("#"+prevX+"_"+prevY).removeClass("ocupado").addClass("vazio");

	  				}
	  			}
	  		}
 	   }
 	   flag = true;	
 	});
});
	
