
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

	console.log(simply);
	s1=null;
	//end


}



function isLetter(x) {
 	return ((x >= 65) && (x <= 90)) || ((x >= 97) && (x <= 122));
}

function isNumber(x){
	return !isNaN(parseInt(x));
}