//import modules / packages

const prompt = require('prompt-sync')({sigint: true});
const {findNewCoordinates} = require('./coordinates.js');
const {spliceAtRandom} = require('./insertHole.js');

//define game characters

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//define parent class with constructor

class Field {
  constructor(field, heightInput, widthInput, percentageHoleInput) {
    this._name = field;
    this._currentArray = 0;
    this._currentPosition = 0;    
    this._selectedHeight = heightInput;
    this._selectedWidth = widthInput;
    this._selectedPercentageHole = percentageHoleInput;
    this._randomSelection = this.generateField(this._selectedHeight, this._selectedWidth, this._selectedPercentageHole);
  }

  //getters

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

  get percentageHole() {
    return this._selectedPercentageHole;
  }

  //setters

  set percentageHole(percentage) {
    this._selectedPercentageHole = percentage;
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

  //takes all arrays used to generate field, joins them as strings and prints each string on a new line, ie: prints field to console
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

  //randomly generates field, supplying default values for height, width and percentage hole if not specified
  generateField(enteredHeight, enteredWidth, percentageHole){
   
    //manages default values for height and width if not specified
    const height = enteredHeight ? enteredHeight : 10;
    const width = enteredWidth ? enteredWidth : 10;
    
    //generates a blank field to the specified dimension consisting entirely of field characters
      
      let completeArray = [];
      for (let z = 0; z < height; z++){
        let arrayUnderConstruction = [];
        for (let y = 0; y < width; y++){                     
            arrayUnderConstruction.push(fieldCharacter);          
        }
        completeArray.push(arrayUnderConstruction);        
      }
    
  //adds asterisk top left for pathCharacter
  completeArray[0][0] = pathCharacter; 
 
  //generates random coordinates to place hat and then inserts hat there

  const yCoordinate = () => {
    return Math.floor(Math.random() * height);
  }
  
  const xCoordinate = () => {
    return Math.floor(Math.random() * width);
  }
  
  completeArray[yCoordinate()][xCoordinate()] = hat;

  //manages default value for percentage of holes if not specified
    
  const defaultManagedPercentageHole = percentageHole ? percentageHole : 10;

  //determines number of holes to add from default managed percentage of holes

  const numberOfHolesToAdd = defaultManagedPercentageHole / 100 * height * width;
  
  //splices a hole for a field character in a randomised position the specified number oftimes

  for (let w = 0; w < numberOfHolesToAdd; w++){
    
    let randomY = Math.floor(Math.random() * height);
    
    const updatedArray = spliceAtRandom(completeArray[randomY]);
    
    completeArray.splice(randomY, 1, updatedArray);

  }
      
  return completeArray;

    }      
  
  }
  
  


const gamePlay = (enteredHeight, enteredWidth, percentageHole) => {
  
  //generates new instance of Field to specified / default settings
  const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ], enteredHeight, enteredWidth, percentageHole);  

//defines field for the game

let field = myField.randomSelection;
  
//logs field to the console

myField.print(field);

//establishes loop to continue until either the player loses or wins

let gameFinished = false;

while (!gameFinished){

 //manages user input

 const direction = prompt('Which way?');
 
 //determines new coordinates based on user input

 const newCoordinates = findNewCoordinates(direction, myField.currentArray, myField.currentPosition) 

 //determines whether games continues, or player loses or wins


 //determines if user strays off field
if ((newCoordinates.newArray === -1) || (newCoordinates.newPosition === -1) || (newCoordinates.newArray >= field.length) || (newCoordinates.newPosition >= field[myField.currentArray].length)){
  console.log('Suck it loser! You lost!')
  return gameFinished = true;
} 

//determines if player falls in hole

if (field[newCoordinates.newArray][newCoordinates.newPosition] === hole.toString()){  
  console.log('You fell in a hole! Unlucky loser!!');
  return gameFinished = true;
}

//determines if player finds hat

else if (field[newCoordinates.newArray][newCoordinates.newPosition] === hat) {
  console.log('You won! Woop woop!');
  return gameFinished = true;
} else {
  //sets pathCharacter in new position
  myField.currentArray = newCoordinates.newArray;
  myField.currentPosition = newCoordinates.newPosition;
  
}

  myField.print(field);

}
}

//gamePlay(process.argv[2],process.argv[3], process.argv[4]);
gamePlay(10,80,20);
