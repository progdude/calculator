
function solve(){
	var e = $("#equation").val().replace(" ","");
	var sign = 1;

	var eq=[]
	var unSimply = [];

	
	//split into first array
	for(var i=0; i<e.length; i++){
		if(!(isNumber(e[i]) || e[i]==".")){
			eq.push(e[i]);
		}

		else{
			var start = i;
			while(isNumber(e[i]) || e[i]=="."){
				i++
			}
			eq.push(e.substring(start,i));
			i-=1;
		}
	}

	e = null;
	//end


	//insert exponents and multiplications
	for(var i=0; i<eq.length; i++){
		if(i==eq.length-1){
			unSimply.push(eq[i]);
		}
		else if(isLetter(eq[i].charCodeAt(0)) && isNumber(eq[i+1])){
			unSimply.push(eq[i]);
			unSimply.push("*");
			unSimply.push(eq[i+1]);
			i++;
		}
		else if(isNumber(eq[i]) && isLetter(eq[i+1].charCodeAt(0))){
			unSimply.push(eq[i]);
			unSimply.push("*");
			unSimply.push(eq[i+1]);
			i++;
		}

		else if(isLetter(eq[i].charCodeAt(0)) && eq[i+1]=="^"){
			unSimply.push(eq[i]);
			unSimply.push("**");
			i++;
		}


		else if(isNumber(eq[i]) && eq[i+1]=="^"){
			unSimply.push(eq[i]);
			unSimply.push("**");
			i++;
		}

		else if(eq[i]==")"  && (isNumber(eq[i+1]) || eq[i+1]=="(" || isLetter(eq[i+1].charCodeAt(0)))){
			unSimply.push(eq[i]);
			unSimply.push("*");
		}

		else if(eq[i+1]=="(" && (isNumber(eq[i]) || eq[i]==")" || isLetter(eq[i].charCodeAt(0)))){
			unSimply.push(eq[i]);
			unSimply.push("*");
			unSimply.push(eq[i+1]);
			i++;
		}

		else{
			unSimply.push(eq[i]);
		}
	}

	eq = null;
	//end

	//simplify!!!!!
	var s = unSimply.join("");
	s = CQ(s).simplify().toString();
	var s1="";
	console.log(s);

	for (var i = 0; i < s.length; i++) {
		if(s[i].charCodeAt(0) != 32){
			s1+=s[i];
		}
	};
	s = null;
	unSimply = null;
	//end


	//split into array again
	var simply = [];

	for (var i = 0; i < s1.length; i++) {


		if(s1[i]=="*"){
			continue;
		}

		if(!(isNumber(s1[i]) || s1[i]==".")){
			simply.push(s1[i]);
		}

		else{
			var start = i;
			while(isNumber(s1[i]) || s1[i]=="."){
				i++
			}
			simply.push(s1.substring(start,i));
			i-=1;
		}
	};

	s1=null;
	//end

		//account for division signs	
	for(var j=0; j<simply.length-1; j++){

		if(simply[j]=="/"){
			if(simply[j+1]=="-"){
				simply.splice(j+1,1);
				simply[j]=String((1/parseInt(simply[j+1]*-1)));   
				simply.splice(j+1, 1);
				if(isNumber(simply[j-1])){
					simply[j-1] = simply[j-1]*simply[j];
					simply.splice(j,1);
				}
			}
			else{
			simply[j]=String((1/parseInt(simply[j+1])));   
			simply.splice(j+1, 1);
				if(isNumber(simply[j-1])){
					simply[j-1] = simply[j-1]*simply[j];
					simply.splice(j,1);
				}
			}
			
		}	



	}//end


	for (var i = 0; i < simply.length; i++) {
		if(!(isNumber(simply[i]) || simply[i]==".")){
			if(isLetter(simply[i].charCodeAt(0))){
				if(isOperator(simply[i-1])){
					simply.splice(i,0,1);
				}
			}

			else if(simply[i]=="("){
				if(isOperator(simply[i-1])){
					simply.splice(i,0,1);
				}
			}

		}
	}

	console.log(simply);
	var begin = 0;
	for (var i = 0; i < simply.length; i++) {
		if(isNumber(simply[i]) && isLetter(simply[i+1].charCodeAt(0)) && isNumber(simply[i+2])){
			simply[i] = simply[i]*simply[i+2];
			simply.splice(i+2,1);
		}

		if(simply[i]=="("){
			begin = i;
		}

		if(simply[i]==")" && isNumber(simply[i+1])){
				simply[begin-1] = simply[begin-1]*simply[i+1];
				simply.splice(i+1,1);
		}

	};

	console.log(simply);

	var finalEq = [];
	for(var i=0; i<simply.length; i++){
		if(simply[i] == "("){
				var x = simply[i-1];
				while(simply[i]!=")"){
			        if(isNumber(simply[i])){
			            	finalEq.push(x*simply[i]);
			            }
		            else if(simply[i] != "("){
		            	finalEq.push(simply[i]);
		            	}
		            i++;
	        	}
			
		}
		else{
			if(isNumber(simply[i])){
	    		if(simply[i+1]!="("){
	    			finalEq.push(simply[i]);
	    		}
	    	}
	    	else{
	    		finalEq.push(simply[i]);
	    	}
		}
	}


	console.log(finalEq);
	
}






function isLetter(x) {
 	return ((x >= 65) && (x <= 90)) || ((x >= 97) && (x <= 122));
}

function isNumber(x){
	return !isNaN(parseInt(x));
}

function isOperator(x){
	return x=="/" || x=="+" || x=="-" || x=="*" || x=="(";
}