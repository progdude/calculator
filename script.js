
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
	alert(zeroSum/oneSum);
}
