export class EasyMode {
    getMove = (fields, player) => {
        
        let freeNumb = Object.entries(fields).filter(el => el[1] == ' ').map(el => el[0])

        const randomPositionIndex = Math.floor(Math.random() * freeNumb.length);

        return freeNumb[randomPositionIndex]
    }
}