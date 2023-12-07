const db = require('../config/connection');
const { User, Story, Contribution } = require('../models');

const userData = require('./userData.json');
const storyData = require('./storyData.json');
const contributionData = require('./contributionData.json');

const seedDatabase = async () => {
  try {
  
    const users = await User.create(userData);
    const stories = await Story.create(storyData);
    const contributions = await Contribution.create(contributionData);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

db.once('open', seedDatabase);
