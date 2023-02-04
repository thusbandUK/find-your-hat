//takes an array potentially containing fieldCharacters, one hat and one path character, counts the number of field characters,
//generates a random number of at least 1 but less than the total number of field characters,
//splices in a hole at that Nth position
//outs the new array


//returns total number of field characters

function howMuchHash(array){
    let count = 0;
    array.forEach((x)=>{
        if (x === '░'){
            return count = count + 1;
        }
    })    
    return count;
}

//returns index of Nth hash

function indexNthHash(array, hashNumber){    
    let finalIndex = [];
    let count = 0;
    for (let z = 0; z < array.length; z++){
        if (array[z] === '░'){
            count = count+1;            
        }
        if (count === hashNumber){            
            finalIndex.push(z);            
        }
    }    
    return finalIndex[0];
}

//splices hole for field character in Nth position

function spliceHole(array, hashIndex){
    const hole = 'O';
    let newArray = array;
    newArray.splice(hashIndex, 1, hole);
    return newArray;
}

//console.log(spliceHole(exemplarArray, indexNthHash(exemplarArray, 3)));


function spliceAtRandom(array){
    const numberOfHash = howMuchHash(array);
    const randomNumber = 1 + Math.floor(Math.random() * (numberOfHash - 1));
    const indexToSplice = indexNthHash(array, randomNumber);    
    const splicedArray = spliceHole(array, indexToSplice);
    return splicedArray;
}



module.exports.spliceAtRandom = spliceAtRandom;

//const exemplarArray = ['*','░','o','o','░','o','░','░','o','░','░','o','░']