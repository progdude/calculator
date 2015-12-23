
function solve(){
	var e = $("#equation").val().replace(" ","");
	var sign = 1;

	e = "+"+e;
	var es=[];
	for(var k=0; k<e.length; k++){
		
		if(!isNumber(e[k])){
			if(isLetter(e[k].charCodeAt(0))){
				if(isOperator(e[k-1])){
					es.push("1");
				}
			}

			else if(e[k]=="("){
				if(isOperator(e[k-1])){
					es.push("1");
				}
			}

			es.push(e[k])
		}

		else{
			var start = k;
			while(isNumber(e[k])){
				k++
			}
			es.push(e.substring(start,k));
			k-=1;
		}
	}


	for(var j=0; j<es.length; j++){
		if(es[j]=="1" && isLetter(es[j+1].charCodeAt(0)) && isNumber(es[j+2])){
			es[j] = es[j+2];
			es.splice(j+2,1);
		}
	}

	console.log(es);

	var eq = [];

	for(var i=0; i<es.length; i++){
	    if(es[i]=="("){

	        var x = es[i-1];
	        i++;
	        while(es[i]!=")"){
	        	console.log(es[i]);
	            if(isNumber(es[i])){
	            	eq.push(x*es[i]);
	            }
	            else{
	            	eq.push(es[i]);
	            }
	            i++;
	        }
	    }
	}

	console.log(eq);


	var oneSum = 0;
	var zeroSum = 0;

	var current;

	for(var i=0; i<es.length; i++){
		if(es[i]=="="){
			sign*=-1;
			continue;
		}

		current = parseInt(es[i]);
		
		if(!isNaN(current)){
			if(i==0){
				if(isLetter(es[i+1].charCodeAt(0))){
					oneSum+=current*sign;
				}
				else{
					zeroSum+=current*sign;
				}
			}

			else if(i==es.length-1){
				if(es[i-1]=="-"){
					current*=-1;
				}
				zeroSum+=current*sign;
			}//end special test cases

			else{
				if(es[i-1]=="-"){
					current*=-1;
				}
				
				if(isLetter(es[i+1].charCodeAt(0))){
					oneSum+=current*sign;
				}
				else{
					zeroSum+=current*sign;
				}

			}
		}
	}//end for

	zeroSum*=-1;
	var ans = zeroSum/oneSum;
	console.log(ans%1==0?ans:fraction(ans));
	console.log(ans);
}


function isLetter(code) {
 	return ((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122));
}

function isNumber(x){
	return !isNaN(parseInt(x));
}

function isOperator(x){
	return x=="/" || x=="+" || x=="-" || x=="*" || x=="(";
}

function fraction(x) {
	var negative = false;
	if(x<0){
		negative = true;
		x=Math.abs(x);
	}
    var tolerance = 1.0E-6;
    var h1=1; 
    var h2=0;
    var k1=0; 
    var k2=1;
    var b = x;
    do {
        var a = Math.floor(b);
        var aux = h1; h1 = a*h1+h2; h2 = aux;
        aux = k1; k1 = a*k1+k2; k2 = aux;
        b = 1/(b-a);
    } while (Math.abs(x-h1/k1) > x*tolerance);
    
    if(negative){
    	return h1*-1+"/"+k1;
    }
    return h1+"/"+k1;
}
