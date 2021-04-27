exports.checkHowManyPointsUserCollectedForCurrentGame = (betResult) => {
    let collectedPoints = 0;
    if(betResult > 12){
        //console.log('User collected no points.');
        collectedPoints = 0;
    }
    else if(betResult <= 12 && betResult > 8){
        //console.log('User collected 2 points.');
        collectedPoints = 2;
    }
    else if(betResult <= 8 && betResult > 4){
        //console.log('User collected 4 points.');
        collectedPoints = 4;
    }
    else if(betResult <= 4 && betResult > 2){
        //console.log('User collected 6 points.');
        collectedPoints = 6;
    }
    else if(betResult === 2 || betResult === 1){
        //console.log('User collected 8 points.');
        collectedPoints = 8;
    }
    else if(betResult === 0){
        //console.log('User collected 10 points.');
        collectedPoints = 10;
    }
    else{
        console.log('Something went wrong');
    }
    return collectedPoints;
}

//this function compares Game results with Bet value and returns number which is an information what is the difference in small points
exports.compareGameResultWithBetValue = (gameResult, BetValue) => {
    return gameResult - BetValue;
}

//this function checks hoem and away team bets and sets object which contains informations about winning team and pointDifference
exports.calculateWinnerValue = (homeTeamPoints, awayTeamPoints) => {
    const calculatedWinnerValue = {};
    let smallPoints = homeTeamPoints - awayTeamPoints;
    if(smallPoints > 0){
        calculatedWinnerValue.winningTeam = 'home';
        calculatedWinnerValue.pointsDifference = smallPoints;
    }
    else if(smallPoints < 0){
        calculatedWinnerValue.winningTeam = 'away';
        calculatedWinnerValue.pointsDifference = Math.abs(smallPoints);
    }
    else if(smallPoints === 0){
        calculatedWinnerValue.winningTeam = 'draw';
        calculatedWinnerValue.pointsDifference = smallPoints;
    }
    return calculatedWinnerValue //if - then we know user bets away team wins, if + user best home team win
}

exports.checkIfBetWasMadeForWinningTeam = (gameWinningTeam, betWinningTeam) => {
    if(gameWinningTeam === betWinningTeam){
        return true;
    }
    else {
        return false;
    }
}

exports.calculateDifferenceBetweenGamePointsAndBetPoints = (gameSmallPoints, betSmallPoints) => {
    return Math.abs(gameSmallPoints - betSmallPoints);
}

exports.checkAndCalculatePointsWhichBetCollectsForCurrentGame = (gameDetails, betDetails) => {
    let pointsCollected = 0;
	let betWinnerTeam = this.calculateWinnerValue(betDetails.homeTeamPoints, betDetails.awayTeamPoints);
	let gameWinnerTeam = this.calculateWinnerValue(gameDetails.homeTeamPoints, gameDetails.awayTeamPoints);
	let isBetMadeForWinningTeam = this.checkIfBetWasMadeForWinningTeam(gameWinnerTeam.winningTeam, betWinnerTeam.winningTeam);
	
    if(isBetMadeForWinningTeam) {
        let pointDifference = this.calculateDifferenceBetweenGamePointsAndBetPoints(gameWinnerTeam.pointsDifference, betWinnerTeam.pointsDifference);
        pointsCollected = this.checkHowManyPointsUserCollectedForCurrentGame(pointDifference);
    }
    return pointsCollected;
}