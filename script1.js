function solve(){
	var e = $("#equation").val().replace(" ", "");
	var sign = 1;

	e = "+"+e;
	var es=[];

	//add 1 as coefficient and split into array
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



}

