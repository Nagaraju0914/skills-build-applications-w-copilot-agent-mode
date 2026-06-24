"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
async function seed() {
    console.log('Seed the octofit_db database with test data');
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
        description: 'A team focused on endurance, strength, and consistency.',
    });
    const users = await user_1.User.create([
        {
            name: 'Ava Patel',
            email: 'ava.patel@example.com',
            age: 29,
            fitnessGoal: 'Prepare for a half marathon',
            teamId: team._id,
        },
        {
            name: 'Noah Kim',
            email: 'noah.kim@example.com',
            age: 34,
            fitnessGoal: 'Build strength and mobility',
            teamId: team._id,
        },
        {
            name: 'Mina Chen',
            email: 'mina.chen@example.com',
            age: 27,
            fitnessGoal: 'Improve endurance',
            teamId: team._id,
        },
    ]);
    await team_1.Team.findByIdAndUpdate(team._id, { members: users.map((user) => user._id) });
    await activity_1.Activity.create([
        {
            userId: users[0]._id,
            type: 'Run',
            durationMinutes: 45,
            calories: 520,
            date: new Date('2026-06-20T07:00:00.000Z'),
        },
        {
            userId: users[1]._id,
            type: 'Weight Training',
            durationMinutes: 60,
            calories: 410,
            date: new Date('2026-06-21T18:30:00.000Z'),
        },
        {
            userId: users[2]._id,
            type: 'Cycling',
            durationMinutes: 35,
            calories: 300,
            date: new Date('2026-06-22T06:45:00.000Z'),
        },
    ]);
    await leaderboard_1.LeaderboardEntry.create([
        { userId: users[0]._id, username: 'ava', score: 95, teamName: team.name },
        { userId: users[1]._id, username: 'noah', score: 88, teamName: team.name },
        { userId: users[2]._id, username: 'mina', score: 91, teamName: team.name },
    ]);
    await workout_1.Workout.create([
        {
            name: 'Morning Run',
            description: 'A steady jog to build endurance.',
            durationMinutes: 30,
            difficulty: 'beginner',
            category: 'cardio',
        },
        {
            name: 'Core Circuit',
            description: 'A focused core and mobility routine.',
            durationMinutes: 25,
            difficulty: 'intermediate',
            category: 'strength',
        },
        {
            name: 'Cycling Intervals',
            description: 'Short bursts to improve stamina.',
            durationMinutes: 40,
            difficulty: 'intermediate',
            category: 'cardio',
        },
    ]);
    console.log('Seed data inserted successfully');
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
