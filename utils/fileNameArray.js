
import * as path from 'path';

// console.log(path.extname(fileName2)) -> for file extention, e.g. ".txt"

const fileName1 = 'C:\\Users\\user2020\\CodeFiles\\harmonode\\fetchAsync\\client\\index.js';
const fileName2 = 'harmonode\\fetchAsync\\client\\index.txt';
const indexPath = 'C:\\projects\\app\\index.ts';  // example path

const pathParts = indexPath.split(path.sep);
let last = pathParts.at(-1);    
if (last.includes('.')) pathParts[pathParts.length - 1]= last.slice(0, last.indexOf('.')) 

console.log(pathParts);