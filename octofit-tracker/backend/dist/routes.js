"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const config_1 = require("./config");
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res) => {
    const users = await user_1.User.find().populate('teamId', 'name');
    res.json(users);
});
router.post('/users/', async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/teams/', async (_req, res) => {
    const teams = await team_1.Team.find().populate('members', 'name email');
    res.json(teams);
});
router.post('/teams/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/activities/', async (_req, res) => {
    const activities = await activity_1.Activity.find().populate('userId', 'name');
    res.json(activities);
});
router.post('/activities/', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/leaderboard/', async (_req, res) => {
    const entries = await leaderboard_1.LeaderboardEntry.find().sort({ score: -1 });
    res.json(entries);
});
router.post('/leaderboard/', async (req, res) => {
    const entry = await leaderboard_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await workout_1.Workout.find();
    res.json(workouts);
});
router.post('/workouts/', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
router.get('/health-url/', (_req, res) => {
    res.json({ apiBaseUrl: config_1.apiBaseUrl });
});
exports.default = router;
