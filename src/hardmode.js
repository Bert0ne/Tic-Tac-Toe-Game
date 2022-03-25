import { winningConditions } from "./winningConditions";
export class HardMode {
    getMove = (fields, player) => {

        for(let i = 0; i<= winningConditions.length -1; i++) {
            const [posA, posB, posC] = winningConditions[i];
            const value1 = fields[posA];
            const value2 = fields[posB];
            const value3 = fields[posC];
    

            if(value1 === value2 && value1 !== ' ' && value3 === ' ') {
                return posC;
            }

            if(value1 === value3 && value1 !== ' ' && value2 === ' ') {
                return posB;
            }

            if(value2 === value3 && value2 !== ' ' && value1 === ' ') {
                return posA;
            }
        } 

        
        let freeNumb = Object.entries(fields).filter(el => el[1] == ' ').map(el => el[0])
        const randomPositionIndex = Math.floor(Math.random() * freeNumb.length);

        return freeNumb[randomPositionIndex]
    }
}