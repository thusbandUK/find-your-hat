const prompt = require('prompt-sync')({sigint: true});

const {testExport} = require('./logic.js');
const {findNewCoordinates} = require('./coordinates.js');
const {spliceAtRandom} = require('./insertHole.js');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field, heightInput, widthInput) {
    this._name = field;
    this._currentArray = 0;
    this._currentPosition = 0;
    
    this._selectedHeight = heightInput;
    this._selectedWidth = widthInput;
    this._randomSelection = this.generateField(this._selectedHeight, this._selectedWidth);
  }
  get name() {
   return this._name;
  } 

  get currentArray() {
    return this._currentArray;
  }

  get currentPosition() {
    return this._currentPosition;
  }

  get randomSelection(){
    return this._randomSelection;
  }

  get selectedHeight(){
    return this._selectedHeight;
  }

  get selectedWidth() {
    return this._selectedWidth;
  }

  set selectedHeight(height) {
    this._selectedHeight = height;
  }

  set selectedWidth(width) {
    this._selectedWidth = width;
  }

  set currentArray(array) {
    this._currentArray = array;    
    this._randomSelection[this._currentArray][this._currentPosition] = pathCharacter; 
  } 

  set currentPosition(position){
    this._currentPosition = position;    
    this._randomSelection[this._currentArray][this._currentPosition] = pathCharacter;
  }

  print(array) {
    let arrayToProcess;
    if (!array){
      arrayToProcess = this._name;
    } else {
      arrayToProcess = array;
    }  
    let string1 = '';
    
      arrayToProcess.forEach((x) => {
      return string1 = string1.concat('', x.join(''))+'\n';      
    })
    console.log(string1);
  }

  generateField(enteredHeight, enteredWidth, percentageHole){
   
    const height = enteredHeight ? enteredHeight : 10;
    const width = enteredWidth ? enteredWidth : 10;
    
    const randomNumber = () => {
      return Math.floor(Math.random() * 2);
      }
      
      let completeArray = [];
      for (let z = 0; z < height; z++){
        let arrayUnderConstruction = [];
        for (let y = 0; y < width; y++){                     
            arrayUnderConstruction.push(fieldCharacter);          
        }
        completeArray.push(arrayUnderConstruction);        
      }
    
      //add asterisk top left for pathCharacter
  completeArray[0][0] = pathCharacter; 
 
  //generate random coordinates to place hat and then insert hat there

  const yCoordinate = () => {
    return Math.floor(Math.random() * height);
  }
  
  const xCoordinate = () => {
    return Math.floor(Math.random() * width);
  }
  
  completeArray[yCoordinate()][xCoordinate()] = hat;

  //determine number of holes to add from specified proportion

  const defaultManagedPercentageHole = percentageHole ? percentageHole : 10;
  const numberOfHolesToAdd = defaultManagedPercentageHole / 100 * height * width;
  for (let w = 0; w < numberOfHolesToAdd; w++){
    let randomY = Math.floor(Math.random() * height);
    const updatedArray = spliceAtRandom(completeArray[randomY]);
    completeArray.splice(randomY, 1, updatedArray);

  }
      
  return completeArray;

//insert here
/*
    const randomNumber = () => {
      return Math.floor(Math.random() * 2);
      }
      
      let completeArray = [];
      for (let z = 0; z < height; z++){
        let arrayUnderConstruction = [];
        for (let y = 0; y < width; y++){
          if (randomNumber() === 0){
            
            arrayUnderConstruction.push(fieldCharacter);
          } else if (randomNumber() === 1){
            
            arrayUnderConstruction.push(hole);
          } else {
            arrayUnderConstruction.push(fieldCharacter);
          }
        }   
        
        completeArray.push(arrayUnderConstruction); 
        
      }
      */
//insertion ends here


    }      
  
  }
  
  


const gamePlay = (enteredHeight, enteredWidth) => {
  
  const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ], enteredHeight, enteredWidth);  

  let field = myField.randomSelection;
  
let gameFinished = false;

myField.print(field);

while (!gameFinished){

  const direction = prompt('Which way?');
 
 const newCoordinates = findNewCoordinates(direction, myField.currentArray, myField.currentPosition) 

if ((newCoordinates.newArray === -1) || (newCoordinates.newPosition === -1) || (newCoordinates.newArray >= field[myField.currentArray].length) || (newCoordinates.newPosition >= field.length)){
  console.log('Suck it loser! You lost!')
  return gameFinished = true;
} 
console.log()
if (field[newCoordinates.newArray][newCoordinates.newPosition] === hole.toString()){  
  console.log('You fell in a hole! Unlucky loser!!');
  return gameFinished = true;
}

else if (field[newCoordinates.newArray][newCoordinates.newPosition] === hat) {
  console.log('You won! Woop woop!');
  return gameFinished = true;
} else {

  myField.currentArray = newCoordinates.newArray;
  myField.currentPosition = newCoordinates.newPosition;
  
}

  myField.print(field);

}
}

//gamePlay(process.argv[2],process.argv[3]);
gamePlay(10,10);
