//takes current coordinates and direction and returns new coordinates

const findNewCoordinates = (direction, startingArray, startingPosition) => {

    let finalArray = startingArray;
    let finalPosition = startingPosition;  
    
    if (direction === 'u') {
        finalArray = finalArray - 1;
      }
     else if (direction === 'd'){                  
        finalArray = finalArray + 1;
      }
    else if (direction === 'l') {
        finalPosition = finalPosition - 1;
      }
    else if (direction === 'r'){
        finalPosition = finalPosition + 1;
      }
    
  
  return {
    newArray: finalArray,
    newPosition: finalPosition  
  }
  
  };
  
  module.exports.findNewCoordinates = findNewCoordinates;