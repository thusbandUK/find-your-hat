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
  constructor(field, heightInput, widthInput) {
    this._name = field;
    this._currentArray = 0;
    this._currentPosition = 0;
    this._randomSelection = this.generateField(heightInput, widthInput);
    //this._currentRandomArray = 0;
    //this._currentRandomPosition = 0;
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
/*
  get currentRandomArray() {
    return this._currentRandomArray;
  }

  get currentRandomPosition() {
    return this._currentRandomPosition;
  }
*/
  get randomSelection(){
    return this._randomSelection;
  }

  set currentArray(array) {
    this._currentArray = array;
    //this._name[this._currentArray][this._currentPosition] = pathCharacter;   
    this._randomSelection[this._currentArray][this._currentPosition] = pathCharacter; 
  } 

  set currentPosition(position){
    this._currentPosition = position;
    //this._name[this._currentArray][this._currentPosition] = pathCharacter;    
    this._randomSelection[this._currentArray][this._currentPosition] = pathCharacter;
  }
/*
  set currentRandomArray(array) {
    //console.log('setter went');
    this._currentRandomArray = array;    
    this._randomSelection[this._currentRandomArray][this._currentRandomPosition] = pathCharacter;
  } 

  set currentRandomPosition(position){
    //console.log('setter2 went');
    this._currentRandomPosition = position;    
    this._randomSelection[this._currentRandomArray][this._currentRandomPosition] = pathCharacter;
  }
*/
  /*set pathCharacter(){
    this._name[this._currentArray][this._currentPosition] = pathCharacter;
  }*/
//before that parameter set of brackets was empty
  print(array) {
    let arrayToProcess;
    if (!array){
      arrayToProcess = this._name;
    } else {
      arrayToProcess = array;
    }  
    let string1 = '';
    //array.forEach((x) => {
      arrayToProcess.forEach((x) => {
      return string1 = string1.concat('', x.join(''))+'\n';      
    })
    console.log(string1);
  }

  generateField(enteredHeight, enteredWidth, percentageHole){
    let height = 10;
    let width = 10;
    /*if (!enteredHeight){
      console.log('if 1 triggered');
      height = height + 10;
    }
    if (!enteredWidth){
      //return width = Math.floor(Math.random() * 10);
      console.log('if 2 triggered');
      width = width + 12;
    }*/
    //console.log(height);
    //console.log(width);
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

const gamePlay = (instruction) => {
  let field = myField.randomSelection;
  //let verticalPosition;
 // let horizontalPosition;
  //let randomlyGeneratedField;
  /*if (instruction === 'random'){
    field = myField.randomSelection;
    //verticalPosition = myField.currentRandomArray;
    //horizontalPosition = myField.currentRandomPosition;
  } else {
    field = myField.name;
    //verticalPosition = myField.currentArray;
    //horizontalPosition = myField.currentPosition;
  }*/
  //console.log(verticalPosition);
let gameFinished = false;
//let randomlyGeneratedField = myField.generateField(10, 10);
myField.print(field);
//console.log(field[0]);
//myField.print();
while (!gameFinished){

  const direction = prompt('Which way?');
//console.log('You have selected: ' + direction);
 
 const newCoordinates = findNewCoordinates(direction, myField.currentArray, myField.currentPosition)
 //console.log(verticalPosition);

if ((newCoordinates.newArray === -1) || (newCoordinates.newPosition === -1) || (newCoordinates.newArray >= field[myField.currentArray].length) || (newCoordinates.newPosition >= field.length)){
  console.log('Suck it loser! You lost!')
  return gameFinished = true;
} 
console.log()
if (field[newCoordinates.newArray][newCoordinates.newPosition] === hole.toString()){
  //console.log('gone this way?');
  console.log('You fell in a hole! Unlucky loser!!');
  return gameFinished = true;
}

else if (field[newCoordinates.newArray][newCoordinates.newPosition] === hat) {
  console.log('You won! Woop woop!');
  return gameFinished = true;
} else {

  myField.currentArray = newCoordinates.newArray;
  myField.currentPosition = newCoordinates.newPosition;
  /*
  if (instruction === 'random') {
    myField.currentRandomArray = newCoordinates.newArray;
  myField.currentRandomPosition = newCoordinates.newPosition;
  } else {
  myField.currentArray = newCoordinates.newArray;
  myField.currentPosition = newCoordinates.newPosition;
}*/
  //verticalPosition = newCoordinates.newArray;
  //horizontalPosition = newCoordinates.newPosition;
}
//console.log(myField.currentArray);
//console.log(myField.currentPosition);
  myField.print(field);



}
}

gamePlay('random');
//myField.print(myField.generateField(10, 10));
//console.log(myField.generateField(10, 10));


//const myField2 = new Field(10, 12);

//myField2.print();

//const hello = prompt('Which way?');
//console.log(hello);

//myField.print(myField.randomSelection);

//myField.print(myField.generateField());
//myField.print(myField.randomSelection);