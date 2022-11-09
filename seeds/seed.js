const userData = require('./userSeeds');
const thoughtData = require('./thoughtSeeds');
const rxnData = require('./reactionSeeds')

const connection = require('../config/connection')
const {User, Thought, Reaction} = require('../models')

//const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)]

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

  await Reaction.deleteMany({});

  await User.collection.insertMany(userData)

  // await Thought.collection.insertMany(thoughtData)

  // await Reaction.collection.insertMany(rxnData)

  // console.table(userData)
  console.info('Seeding Complete')
  process.exit(0)
});