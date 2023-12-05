const db = require('../config/connection');
const { User, Story, Contribution } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const storyData = require('./storyData.json');
const contributionData = require('./contributionData.json');

db.once('open', async () => {
  try {
  await cleanDB('User', 'users');
  await cleanDB('Contribution', 'contributions');
  await cleanDB('Story', 'stories');

  const users = await User.create(userData);
  const story = await Story.create(storyData);
  const contribution = await Contribution.create(contributionData);

  //await Tech.insertMany(techData);

  console.log('Data seeded successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding data:', error);
  process.exit(1); 
}
});
