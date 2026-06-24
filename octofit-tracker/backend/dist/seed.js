"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
async function seed() {
    await (0, db_1.connectToDatabase)();
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.LeaderboardEntry.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const team = await team_1.Team.create({
        name: 'Pixel Pioneers',
        description: 'A team focused on endurance and strength.',
    });
    const users = await user_1.User.create([
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
    await team_1.Team.findByIdAndUpdate(team._id, { members: users.map((user) => user._id) });
    await activity_1.Activity.create([
        { userId: users[0]._id, type: 'Run', durationMinutes: 45, calories: 500, date: new Date() },
        { userId: users[1]._id, type: 'Weight Training', durationMinutes: 60, calories: 400, date: new Date() },
    ]);
    await leaderboard_1.LeaderboardEntry.create([
        { userId: users[0]._id, username: 'ava', score: 95, teamName: team.name },
        { userId: users[1]._id, username: 'noah', score: 88, teamName: team.name },
    ]);
    await workout_1.Workout.create([
        { name: 'Morning Run', description: 'Easy jog', durationMinutes: 30, difficulty: 'beginner', category: 'cardio' },
        { name: 'Core Circuit', description: 'Core and mobility', durationMinutes: 25, difficulty: 'intermediate', category: 'strength' },
    ]);
    console.log('Seed data inserted successfully');
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
