const exemplarArray = ['#','#','o','o','#','o','#','#','o','#','#','o','#']

//returns total number of hashes

function howMuchHash(array){
    let count = 0;
    array.forEach((x)=>{
        if (x === '#'){
            return count = count + 1;
        }
    })
    return count;

}

//returns index of Nth hash

function indexNthHash(array, hashNumber){
    let finalIndex;
    let count = 0;
    for (let z = 0; z < array.length; z++){
        if (array[z] === '#'){
            count = count+1;            
        }
        if (count === hashNumber){
            return finalIndex = z;
        }
    }  
    return finalIndex;
}

//splices hole for hash in Nth position

function spliceHole(array, hashIndex){
    const hole = 'O';
    let newArray = array;
    newArray.splice(hashIndex, 1, hole);
    return newArray;
}

//console.log(spliceHole(exemplarArray, indexNthHash(exemplarArray, 3)));


function spliceAtRandom(array){
    const numberOfHash = howMuchHash(array);
    const randomNumber = Math.floor(Math.random() * numberOfHash);
    const indexToSplice = indexNthHash(array, randomNumber);
    const splicedArray = spliceHole(array, indexToSplice);
    return splicedArray;
}

module.exports.spliceAtRandom = spliceAtRandom;