
var pickedCards = new Array();
//var pickedCards = [];

function initiateGame()
{
	gameCleanup();
	
	var dealerScore = setDealerHand();
	var playerScore = setPlayerHand();
	
}

function generateRandomNumber(minValue, maxValue)
{
	var temp = 0;
	
	temp = Math.random() * maxValue + minValue;
	temp = Math.floor(temp);
	
	if(pickedCards.indexOf(temp) == -1){
		pickedCards.push(temp);
	
		return temp;
	}
	else{
		pickedCards.push(temp);
		return generateRandomNumber(minValue, maxValue);
	}
}

function setCardImage(imgId)
{
	var rnd = generateRandomNumber(1, 52);
	var cardValue = getCardValue(rnd);
	document.getElementById(imgId).src = "img/" + rnd + ".png";
	document.getElementById(imgId).setAttribute("val",cardValue);
}

function setDealerHand()
{
	var score;
	setCardImage("dCardImage1");
	setCardImage("dCardImage2");
	score = updateScore("dScore","dealerCard");
		
	return score;
}

function setPlayerHand()
{
	var score;
	setCardImage("pCardImage1");
	setCardImage("pCardImage2");
	score = updateScore("pScore","playerCard");
	
	return score;
}

function getCardValue(val){
	
	var result;
	var tmp = val % 13;
	switch(tmp){
		case 0:
		case 11:
		case 12:
			result = 10;
			break;
		case 1:
			result = 11;
			break;
		default:
			result = tmp;
	}
	
	return result;
}

function updateScore(target,source){
	var cards = document.getElementsByClassName(source);
	var score = 0;

	for (i=0;i<cards.length;i++){
		score += parseInt(cards[i].getAttribute("val"));
	}
	
	document.getElementById(target).innerHTML = score;
	
	if((target == "pScore") && (score >= 21)){
		var playerScore,dealerScore;
		playerScore = parseInt(document.getElementById("pScore").innerHTML);
		dealerScore = parseInt(document.getElementById("dScore").innerHTML);
		
		disableButtons();
		
//		if(score > 21){
			setWinner(playerScore,dealerScore);
//		}
	}
	
	return score;
}

function setWinner(pScore,dScore){
	var headers;
	var backColor = "green";
	
	if(pScore > 21){
		headers = document.getElementsByClassName("dHeader");
	}
	else if(dScore > 21){
		//highlight Player name
		headers = document.getElementsByClassName("pHeader");
	}
	else if(pScore > dScore){
		//highlight Player name
		headers = document.getElementsByClassName("pHeader");
	}
	else if(pScore == dScore){
		backColor = "yellow";
		headers = document.getElementsByClassName("headers");
	}
	else{
		//highlight Dealer name
		headers = document.getElementsByClassName("dHeader");
	}
	
	for(i=0;i<headers.length;i++)
	{
		headers[i].classList.add(backColor);
	}
}

function addCard(target,scoreLabelId,cardClass){
	var img = document.createElement("img");
	var cardSection = document.getElementById(target);
	var rnd = generateRandomNumber(1, 52);
	var cardValue = getCardValue(rnd);
	
	img.src = "img/" + rnd + ".png";
	img.classList.add("cardSize");
	img.classList.add("addedCard");
	img.classList.add(cardClass);
	img.setAttribute("val", cardValue);
	
	cardSection.appendChild(img);
	score = updateScore(scoreLabelId,cardClass);
}

function playerStand(){
	var playerScore,dealerScore;
		
	disableButtons();

	completeDealerHand();
	
	playerScore = parseInt(document.getElementById("pScore").innerHTML);
	dealerScore = parseInt(document.getElementById("dScore").innerHTML);
	setWinner(playerScore,dealerScore);
}

function completeDealerHand(){

	var score = parseInt(document.getElementById("dScore").innerHTML);
	if(score < 17){
		addCard('dealerCards','dScore','dealerCard');
		return completeDealerHand();
	}
	return;
}

function disableButtons(){
	document.getElementById("AddPlayerCard").disabled = true;
	document.getElementById("PlayerStand").disabled = true;
}
function enableButtons(){
	document.getElementById("AddPlayerCard").disabled = false;
	document.getElementById("PlayerStand").disabled = false;
}

function gameCleanup(){
	pickedCards = [];
	enableButtons();
	
	var cards = document.getElementsByClassName("addedCard");
	for(i=0; i<cards.length; i++){
		var img = cards[i];
		img.parentNode.removeChild(img);
		i--;
	}
	var headers = document.getElementsByClassName("headers");
	for(i=0; i<headers.length; i++){
		headers[i].classList.remove("green","yellow");
	}
}











