function ofakind(check: number, arr: number[]) {
    for (let i = 1; i <= 6; i++) {
        if (arr.filter((n) => {
                return n == i
            }).length == check) {
            return { found: true, i }
        }
    }
    return {found: false}
}
/*the idea of this function is that we start checking the dice for the highest scoring roll conditions first, then we run re-run the 
functions with the dice used in the first conditon filtered out till no more condtions are met and return the score.  , writing it down here so I remember what I was thinking.
*/
function fnScore(dice: number[], score:number) {
    if (dice.length === 6){
        if (ofakind(6,dice)){
            return { score: 3000, remainging: [] }
        }
        if ()
    }
    return {score, remainging: dice}
}

export default fnScore