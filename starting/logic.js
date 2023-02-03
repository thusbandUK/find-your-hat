const testArray = [
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//let currentArray = 0;
//let currentPosition = 0;

const testExport = (direction, array, currentArray, currentPosition) => {
  
  //console.log(`Current Position: ${currentPosition}\n Current Array: ${currentArray}`);
  
  const lose = () => {
    console.log('You have lost the game')
    };
  if (direction === 'up'){
    if (currentArray === 0){
      lose();
    } else {
      currentArray = currentArray - 1;
    }
  } else if (direction === 'down'){
    if (currentArray >= testArray.length){
      lose();
    } else {
      currentArray = currentArray + 1;
    }
  } else if (direction === 'left'){
    if (currentPosition === 0){
      lose();
    } else {
      currentPosition = currentPosition - 1;
    }
  } else if (direction === 'right'){
    if (currentPosition >= currentArray.length){
      lose();
    } else {
      currentPosition = currentPosition + 1;
    }
  }

// tests new coordinates
const currentLocation = array[currentArray][currentPosition];

if (currentLocation === hole){
  lose();
} else if (currentLocation === hat){
  console.log('You have won the game! Congratulations!')
} else {
  array[currentArray][currentPosition] = pathCharacter;
}

return {
  updatedArray: array, 
  updatedCoordinates: {
    updatedCurrentLocation: currentLocation,
    updatedCurrentArray: currentArray    
  }
};

};








module.exports.testExport = testExport; 

//module.exports = 'Hello world';