import { connectToDatabase } from './db';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

async function seed() {
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const team = await Team.create({
    name: 'Pixel Pioneers',
    description: 'A team focused on endurance and strength.',
  });

  const users = await User.create([
    {
      name: 'Ava',
      email: 'ava@example.com',
      age: 29,
      fitnessGoal: 'Half marathon',
      teamId: team._id,
    },
    {
      name: 'Noah',
      email: 'noah@example.com',
      age: 34,
      fitnessGoal: 'Strength training',
      teamId: team._id,
    },
  ]);

  await Team.findByIdAndUpdate(team._id, { members: users.map((user) => user._id) });

  await Activity.create([
    { userId: users[0]._id, type: 'Run', durationMinutes: 45, calories: 500, date: new Date() },
    { userId: users[1]._id, type: 'Weight Training', durationMinutes: 60, calories: 400, date: new Date() },
  ]);

  await LeaderboardEntry.create([
    { userId: users[0]._id, username: 'ava', score: 95, teamName: team.name },
    { userId: users[1]._id, username: 'noah', score: 88, teamName: team.name },
  ]);

  await Workout.create([
    { name: 'Morning Run', description: 'Easy jog', durationMinutes: 30, difficulty: 'beginner', category: 'cardio' },
    { name: 'Core Circuit', description: 'Core and mobility', durationMinutes: 25, difficulty: 'intermediate', category: 'strength' },
  ]);

  console.log('Seed data inserted successfully');
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
