
function solve(){
	var e = $("#equation").val().replace(" ","");
	var es = e.split("");
	var sign = 1;

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
				if(es[i+1]=="x"){
					oneSum+=current*sign;
				}
				else{
					zeroSum+=current*sign;
				}
			}//end special test case

			else{
				if(es[i-1]=="-"){
					current*=-1;
				}

				if(es[i+1]=="x"){
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
