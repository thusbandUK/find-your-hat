const prompt = require('prompt-sync')({sigint: true});

const {testExport} = require('./logic.js');
const {findNewCoordinates} = require('./coordinates.js');

//testExport(process.argv[2]);

//console.log(findNewCoordinates('u', 0, 0));


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._name = field;
    this._currentArray = 0;
    this._currentPosition = 0;
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

  set currentArray(array) {
    this._currentArray = array;
    this._name[this._currentArray][this._currentPosition] = pathCharacter;
  } 

  set currentPosition(position){
    this._currentPosition = position;
    this._name[this._currentArray][this._currentPosition] = pathCharacter;
  }

  /*set pathCharacter(){
    this._name[this._currentArray][this._currentPosition] = pathCharacter;
  }*/
//before that parameter set of brackets was empty
  print() {   
    let string1 = '';
    //array.forEach((x) => {
    this._name.forEach((x) => {
      return string1 = string1.concat('', x.join(''))+'\n';      
    })
    console.log(string1);
  }

  generateField(height, width, percentageHole){
  const randomNumber = () => {
  return Math.floor(Math.random() * 2);
  }
  
  let completeArray = [];
  for (let z = 0; z < height; z++){
    let arrayUnderConstruction = [];
    for (let y = 0; y < width; y++){
      if (randomNumber() === 0){
        //console.log(randomNumber);
        arrayUnderConstruction.push(fieldCharacter);
      } else if (randomNumber() === 1){
        //console.log(randomNumber);
        arrayUnderConstruction.push(hole);
      } else {
        arrayUnderConstruction.push(fieldCharacter);
      }
    }   
    //console.log(arrayUnderConstruction);
    completeArray.push(arrayUnderConstruction); 
    //console.log(completeArray);
  }
  //console.log(completeArray);
  completeArray[0][0] = pathCharacter;
 
 
  const yCoordinate = () => {
    return Math.floor(Math.random() * height);
  }
  
  const xCoordinate = () => {
    return Math.floor(Math.random() * width);
  }
  //console.log(xCoordinate);
  completeArray[yCoordinate()][xCoordinate()] = hat;
  
   
      
return completeArray;
    }
    
    
  
  }
  
  


const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

//let currentArray = 0;
//let currentPosition = 0;

const gamePlay = (string) => {
  
let gameFinished = false;
let randomlyGeneratedField = myField.generateField(10, 10);
myField.print();
while (!gameFinished){

  const direction = prompt('Which way?');
//console.log('You have selected: ' + direction);
 
 const newCoordinates = findNewCoordinates(direction, myField.currentArray, myField.currentPosition)

if ((newCoordinates.newArray === -1) || (newCoordinates.newPosition === -1) || (newCoordinates.newArray >= myField.name[myField.currentArray].length) || (newCoordinates.newPosition >= myField.name.length)){
  console.log('Suck it loser! You lost!')
  return gameFinished = true;
} 
console.log()
if (myField.name[newCoordinates.newArray][newCoordinates.newPosition] === hole.toString()){
  //console.log('gone this way?');
  console.log('You fell in a hole! Unlucky loser!!');
  return gameFinished = true;
}

else if (myField.name[newCoordinates.newArray][newCoordinates.newPosition] === hat) {
  console.log('You won! Woop woop!');
  return gameFinished = true;
} else {
  myField.currentArray = newCoordinates.newArray;
  myField.currentPosition = newCoordinates.newPosition;
}
//console.log(myField.currentArray);
//console.log(myField.currentPosition);
  myField.print();



}
}

gamePlay('data');
//myField.print(myField.generateField(10, 10));
//myField.generateField(10, 10);


//const hello = prompt('Which way?');
//console.log(hello);