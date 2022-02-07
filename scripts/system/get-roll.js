export default function getRoll(rollData) {
  let skillDice = rollData.skillDice;
  let statDice = rollData.statDice;
  let count12 = 0;
  let explodingRoll;
  let roll;

  let totalDiceRoll = skillDice + statDice

  let baseRoll = new Roll(`${totalDiceRoll}da`).evaluate({ async: false });

  let results = baseRoll.terms[0].results;
  results.sort((a, b) => (a.result - b.result));
  baseRoll.terms[0].results = results;

  results.find(v => {
    if (v.result === 12) {
      count12++;
    }
  })
  
  if (count12 > 0) {
    explodingRoll = new Roll(`${count12}db`).evaluate({ async: false })

    let explodingResults = explodingRoll.terms[0].results;
    explodingResults.sort((a, b) => (a.result - b.result));
    explodingRoll.terms[0].results = explodingResults;
    const rolls = [baseRoll, explodingRoll];
    const pool = PoolTerm.fromRolls(rolls);
    roll = Roll.fromTerms([pool])
    roll.type = "PoolTerm";
  } else {
    roll = baseRoll;
  }

  return roll;
}

//  Make function to check for 12s.