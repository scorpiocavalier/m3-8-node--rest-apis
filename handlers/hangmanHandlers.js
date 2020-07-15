const { words } = require('../data/words');

const handleWord_Get_Test = (req, res) => {
  const { id } = req.params
  const word = words.filter(word => id === word.id)
  res.status(200).send(word)
}

const handleWord_Get = (req, res) => {
  const index = Math.floor(Math.random() * words.length)
  const { id, letterCount } = words[index]
  res.status(200).send({ id, letterCount })
}

const handleGuess_Get = (req, res) => {
  const { id, letter } = req.params
  const wordObj = words.filter(word => id === word.id)[0]
  const { word, letterCount } = wordObj
  const index = word.indexOf(letter)
  
  if (index >= 0) {
    const size = Number(letterCount)
    let booleanArray = new Array(size)
    booleanArray.fill(false)
    booleanArray[index] = true
    res.status(200).send(booleanArray)
  } else {
    res.status(304).send('Guessed wrong.')
  }
}

module.exports = {
  handleWord_Get_Test,
  handleWord_Get,
  handleGuess_Get
}