
function solve(){
	$(".ex").empty();
	var e = $("#equation").val().replace(" ","");
	var eq=[]
	var unSimply = [];
	var power=1;
	var parts = e.split("=");

	var part1 = simple(parts[0]);
	var part2 = simple(parts[1]);
	$(".ex").append('<div class="row"><div class="col s10 offset-s1 block"><div class="explain"><span class="equ">'+part1+' = '+part2+'</span><span class="why">Simplify Each Side</span></div></div></div><hr>');

	
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
			//unSimply.push(eq[i+1]);
			//i++;
		}

		else if(isLetter(eq[i].charCodeAt(0)) && eq[i+1]=="^"){
			unSimply.push(eq[i]);
			unSimply.push("**");
			i++;
		}

		else if(isLetter(eq[i].charCodeAt(0)) && eq[i+1]=="("){
			unSimply.push(eq[i]);
			unSimply.push("*");
			unSimply.push("(");
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
		

	for (var i = 0; i < s.length; i++) {
		if(s[i].charCodeAt(0) != 32){
			s1+=s[i];
		}
	};
	s = null;
	unSimply = null;
	//end
	
	$(".ex").append('<div class="row"><div class="col s10 offset-s1 block"><div class="explain"><span class="equ">'+format(s1)+' = 0</span><span class="why">Combine Like Terms</span></div></div></div><hr>');



	//split into array again
	var simply = [];

	for (var i = 0; i < s1.length; i++) {


		if(s1[i]=="*"){
			if(s1[i+1]=="*"){
				if(s1[i+2]>power){
					power=s1[i+2];
				}
				simply.push("^");
				i+=2;
			}
			else{
				continue;
			}
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

	
	//account for coefficients
	var begin = 0;
	for (var i = 0; i < simply.length-1; i++) {
		
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

	if(power==1){
		linear(finalEq);
	}

	else if(power==2){
		quadratic(finalEq);
	}

	}


function linear(eq){
	var oneSum = 0;
	var zeroSum = 0;
	var sign = 1;
	var current;

	for(var i=0; i<eq.length; i++){
		if(eq[i]=="="){
			sign*=-1;
			continue;
		}

		current = parseFloat(eq[i]);
		
		if(!isNaN(current)){
			if(i==0){
				if(isLetter(eq[i+1].charCodeAt(0))){
					oneSum+=current*sign;
				}
				else{
					zeroSum+=current*sign;
				}
			}

			else if(i==eq.length-1){
				if(eq[i-1]=="-"){
					current*=-1;
				}
				zeroSum+=current*sign;
			}//end special test cases

			else{
				if(eq[i-1]=="-"){
					current*=-1;
				}
				
				if(isLetter(eq[i+1].charCodeAt(0))){
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

	var frac = ans%1==0?ans:fraction(ans);
	var decimal = ans;

	$(".ex").append('<div class="row"><div class="col s10 offset-s1 block"><div class="explain"><span class="equ">'+frac+' or '+decimal.toFixed(2)+'</span><span class="why">Solve for Variable</span></div></div></div><hr>');

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


function simple(e){

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
			//unSimply.push(eq[i+1]);
			//i++;
		}

		else if(isLetter(eq[i].charCodeAt(0)) && eq[i+1]=="^"){
			unSimply.push(eq[i]);
			unSimply.push("**");
			i++;
		}

		else if(isLetter(eq[i].charCodeAt(0)) && eq[i+1]=="("){
			unSimply.push(eq[i]);
			unSimply.push("*");
			unSimply.push("(");
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

	var s = unSimply.join("");
	s = CQ(s).simplify().toString();

	return format(s);

}

function format(s){
	var result="";
		for (var i = 0; i < s.length; i++) {
		if(s[i]=="*"){
			if(s[i+1]=="*"){
				result+="^";
			}
			else{
				continue;
			}
		}
		else{
			result+=s[i];
		}
	};
	return result;
}