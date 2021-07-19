exports.calculatePlayerPositionChange = (lastPosition, currentPosition) => {
    let changePositionValue = parseInt(lastPosition) - parseInt(currentPosition);

    if(changePositionValue > 1){
        return '+' + changePositionValue.toString();
    }
    else{
        return changePositionValue.toString();
    }
}

exports.checkIfUserRankAlreadyExist = (currentUserRank) => {
    if(currentUserRank === undefined){
        return false;
    }
    else{
        return true;
    }
}