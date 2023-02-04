const exemplarArray = ['*','░','o','o','░','o','░','░','o','░','░','o','░']

//returns total number of hashes

function howMuchHash(array){
    let count = 0;
    array.forEach((x)=>{
        if (x === '░'){
            return count = count + 1;
        }
    })
    //console.log(`Number of hashes counted: ${count}`);
    return count;

}

//returns index of Nth hash

function indexNthHash(array, hashNumber){
    //console.log('indexNthHash called');
    let finalIndex = [];
    let count = 0;
    for (let z = 0; z < array.length; z++){
        if (array[z] === '░'){
            count = count+1;
            //console.log(array[z]);
            //console.log(count);
        }
        if (count === hashNumber){
            //return finalIndex = z;
            finalIndex.push(z);
            //console.log(array[z]);
        }
    }
    //console.log(`index of nth hash: ${finalIndex}`);  
    return finalIndex[0];
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
    const randomNumber = 1 + Math.floor(Math.random() * (numberOfHash - 1));
    const indexToSplice = indexNthHash(array, randomNumber);
    //console.log(array[indexToSplice-1]);
    const splicedArray = spliceHole(array, indexToSplice);
    return splicedArray;
}

console.log(exemplarArray);
console.log(spliceAtRandom(exemplarArray));

module.exports.spliceAtRandom = spliceAtRandom;