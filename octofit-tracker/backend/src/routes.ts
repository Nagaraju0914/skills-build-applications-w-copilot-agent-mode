import { Router } from 'express';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';
import { apiBaseUrl } from './config';

const router = Router();

router.get('/users/', async (_req, res) => {
  const users = await User.find().populate('teamId', 'name');
  res.json(users);
});

router.post('/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email');
  res.json(teams);
});

router.post('/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('userId', 'name');
  res.json(activities);
});

router.post('/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/leaderboard/', async (_req, res) => {
  const entries = await LeaderboardEntry.find().sort({ score: -1 });
  res.json(entries);
});

router.post('/leaderboard/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.get('/health-url/', (_req, res) => {
  res.json({ apiBaseUrl });
});

export default router;
