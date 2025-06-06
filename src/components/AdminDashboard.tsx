import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const DEFAULT_ADMIN = {
  username: 'gm_admin',
  password: 'goldrush',
};

const AdminDashboard: React.FC = () => {
  const [auth, setAuth] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    playerName: '',
    points: '',
    vacationLeaveCredits: '',
    sickLeaveCredits: '',
    regularizationDate: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeForm, setActiveForm] = useState<'player' | 'score' | 'vacation' | 'sick'>('player');
  const [scoreForm, setScoreForm] = useState({
    points: '',
    date: '',
    quarter: '',
    playerId: '',
    reason: '',
  });
  const [vacationForm, setVacationForm] = useState({
    days: '',
    date: '',
    quarter: '',
    playerId: '',
    reason: '',
  });
  const [sickForm, setSickForm] = useState({
    days: '',
    date: '',
    quarter: '',
    playerId: '',
    reason: '',
  });
  const [players, setPlayers] = useState<{ id: string; playerName: string; firstName: string; lastName: string }[]>([]);
  const [editPlayerId, setEditPlayerId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    playerName: '',
    points: '',
    vacationLeaveCredits: '',
    sickLeaveCredits: '',
    regularizationDate: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      auth.username === DEFAULT_ADMIN.username &&
      auth.password === DEFAULT_ADMIN.password
    ) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await addDoc(collection(db, 'players'), {
        firstName: form.firstName,
        lastName: form.lastName,
        playerName: form.playerName,
        totalPoints: parseInt(form.points, 10) || 0,
        vacationLeaveCredits: parseInt(form.vacationLeaveCredits, 10) || 0,
        sickLeaveCredits: parseInt(form.sickLeaveCredits, 10) || 0,
        alias: form.playerName,
        level: 1,
        regularizationDate: form.regularizationDate,
      });
      setSuccess('Player added successfully!');
      setForm({
        firstName: '',
        lastName: '',
        playerName: '',
        points: '',
        vacationLeaveCredits: '',
        sickLeaveCredits: '',
        regularizationDate: '',
      });
    } catch (err) {
      setError('Failed to add player.');
    }
  };

  React.useEffect(() => {
    // Fetch players for the dropdown
    import('firebase/firestore').then(({ collection, getDocs }) => {
      getDocs(collection(db, 'players')).then(snapshot => {
        setPlayers(snapshot.docs.map(doc => ({
          id: doc.id,
          playerName: doc.data().playerName || '',
          firstName: doc.data().firstName || '',
          lastName: doc.data().lastName || '',
        })));
      });
    });
  }, []);

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setScoreForm({ ...scoreForm, [e.target.name]: e.target.value });
  };

  const handleVacationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setVacationForm({ ...vacationForm, [e.target.name]: e.target.value });
  };

  const handleSickChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSickForm({ ...sickForm, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddScoreDeduction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await addDoc(collection(db, 'scoreDeductions'), {
        points: parseInt(scoreForm.points, 10) || 0,
        date: scoreForm.date,
        quarter: parseInt(scoreForm.quarter, 10) || 0,
        playerId: scoreForm.playerId,
        reason: scoreForm.reason,
        createdAt: new Date().toISOString(),
      });
      setSuccess('Score deduction added successfully!');
      setScoreForm({ points: '', date: '', quarter: '', playerId: '', reason: '' });
    } catch (err) {
      setError('Failed to add score deduction.');
    }
  };

  const handleAddVacationDeduction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await addDoc(collection(db, 'vacationDeductions'), {
        days: parseInt(vacationForm.days, 10) || 0,
        date: vacationForm.date,
        quarter: parseInt(vacationForm.quarter, 10) || 0,
        playerId: vacationForm.playerId,
        reason: vacationForm.reason,
        createdAt: new Date().toISOString(),
      });
      setSuccess('Vacation leave deduction added successfully!');
      setVacationForm({ days: '', date: '', quarter: '', playerId: '', reason: '' });
    } catch (err) {
      setError('Failed to add vacation leave deduction.');
    }
  };

  const handleAddSickDeduction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await addDoc(collection(db, 'sickDeductions'), {
        days: parseInt(sickForm.days, 10) || 0,
        date: sickForm.date,
        quarter: parseInt(sickForm.quarter, 10) || 0,
        playerId: sickForm.playerId,
        reason: sickForm.reason,
        createdAt: new Date().toISOString(),
      });
      setSuccess('Sick leave deduction added successfully!');
      setSickForm({ days: '', date: '', quarter: '', playerId: '', reason: '' });
    } catch (err) {
      setError('Failed to add sick leave deduction.');
    }
  };

  const handleEditPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const playerRef = (await import('firebase/firestore')).doc(db, 'players', editPlayerId!);
      await (await import('firebase/firestore')).updateDoc(playerRef, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        playerName: editForm.playerName,
        totalPoints: parseInt(editForm.points, 10) || 0,
        vacationLeaveCredits: parseInt(editForm.vacationLeaveCredits, 10) || 0,
        sickLeaveCredits: parseInt(editForm.sickLeaveCredits, 10) || 0,
        alias: editForm.playerName,
        regularizationDate: editForm.regularizationDate,
      });
      setSuccess('Player updated successfully!');
      setEditPlayerId(null);
      setEditForm({
        firstName: '',
        lastName: '',
        playerName: '',
        points: '',
        vacationLeaveCredits: '',
        sickLeaveCredits: '',
        regularizationDate: '',
      });
      // Refresh players list
      getDocs(collection(db, 'players')).then(snapshot => {
        setPlayers(snapshot.docs.map(doc => ({ id: doc.id, playerName: doc.data().playerName })));
      });
    } catch (err) {
      setError('Failed to update player.');
    }
  };

  const startEditPlayer = async (id: string) => {
    setEditPlayerId(id);
    const playerDoc = (await import('firebase/firestore')).doc(db, 'players', id);
    const playerSnap = await (await import('firebase/firestore')).getDoc(playerDoc);
    const data = playerSnap.data() || {};
    setEditForm({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      playerName: data.playerName || '',
      points: data.totalPoints?.toString() || '',
      vacationLeaveCredits: data.vacationLeaveCredits?.toString() || '',
      sickLeaveCredits: data.sickLeaveCredits?.toString() || '',
      regularizationDate: data.regularizationDate || '',
    });
  };

  const resetAllPlayerScores = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'players'));
      const batch = (await import('firebase/firestore')).writeBatch(db);
      snapshot.forEach(doc => {
        batch.update(doc.ref, { totalPoints: 5 });
      });
      await batch.commit();
      setSuccess('All player scores have been reset to 5!');
    } catch (err) {
      setError('Failed to reset player scores.');
    }
  };

  // Helper to check if today is a reset date
  function isQuarterResetDate(date = new Date()) {
    const month = date.getMonth(); // 0-indexed: 0=Jan, 3=Apr, 6=Jul, 9=Oct
    const day = date.getDate();
    return (
      (month === 0 && day === 1) ||
      (month === 3 && day === 1) ||
      (month === 6 && day === 1) ||
      (month === 9 && day === 1)
    );
  }

  React.useEffect(() => {
    if (isQuarterResetDate()) {
      resetAllPlayerScores();
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Admin Login</h2>
          <input
            className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
            type="text"
            name="username"
            placeholder="Username"
            value={auth.username}
            onChange={e => setAuth({ ...auth, username: e.target.value })}
            required
          />
          <input
            className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
            type="password"
            name="password"
            placeholder="Password"
            value={auth.password}
            onChange={e => setAuth({ ...auth, password: e.target.value })}
            required
          />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors" type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            className={`px-3 py-2 rounded font-semibold text-sm mr-2 ${activeForm === 'player' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveForm('player')}
          >Add Player</button>
          <button
            className={`px-3 py-2 rounded font-semibold text-sm mr-2 ${activeForm === 'score' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveForm('score')}
          >Score Deduction</button>
          <button
            className={`px-3 py-2 rounded font-semibold text-sm mr-2 ${activeForm === 'vacation' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveForm('vacation')}
          >Vacation Leave Deduction</button>
          <button
            className={`px-3 py-2 rounded font-semibold text-sm ${activeForm === 'sick' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setActiveForm('sick')}
          >Sick Leave Credit Deduction</button>
          <button
            className="px-3 py-2 rounded font-semibold text-sm bg-red-600 text-white ml-2"
            onClick={resetAllPlayerScores}
            type="button"
          >Reset All Scores to 5</button>
        </div>
        {activeForm === 'player' && (
          <>
            <form onSubmit={handleAddPlayer}>
              <h2 className="text-xl font-bold mb-4 text-gray-100">Add New Player</h2>
              <input
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <input
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                type="text"
                name="playerName"
                placeholder="Player Name"
                value={form.playerName}
                onChange={handleChange}
                required
              />
              <input
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                type="number"
                name="points"
                placeholder="Points"
                value={form.points}
                onChange={handleChange}
                required
              />
              <input
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                type="number"
                name="vacationLeaveCredits"
                placeholder="Vacation Leave Credits"
                value={form.vacationLeaveCredits}
                onChange={handleChange}
                required
              />
              <input
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                type="number"
                name="sickLeaveCredits"
                placeholder="Sick Leave Credits"
                value={form.sickLeaveCredits}
                onChange={handleChange}
                required
              />
              <input
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                type="date"
                name="regularizationDate"
                placeholder="Regularization Date"
                value={form.regularizationDate || ''}
                onChange={handleChange}
                required
              />
              {success && <div className="text-green-400 mb-2">{success}</div>}
              {error && <div className="text-red-400 mb-2">{error}</div>}
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors" type="submit">Add Player</button>
            </form>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-200 mb-2">Edit Player</h3>
              <select
                className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600"
                value={editPlayerId || ''}
                onChange={e => e.target.value ? startEditPlayer(e.target.value) : setEditPlayerId(null)}
              >
                <option value="">Select Player to Edit</option>
                {players.map(p => (
                  <option key={p.id} value={p.id}>{`${p.playerName} (${p.firstName} ${p.lastName})`}</option>
                ))}
              </select>
              {editPlayerId && (
                <form onSubmit={handleEditPlayer} className="mt-2">
                  <input
                    className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    type="text"
                    name="playerName"
                    placeholder="Player Name"
                    value={editForm.playerName}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    type="number"
                    name="points"
                    placeholder="Points"
                    value={editForm.points}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    type="number"
                    name="vacationLeaveCredits"
                    placeholder="Vacation Leave Credits"
                    value={editForm.vacationLeaveCredits}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    type="number"
                    name="sickLeaveCredits"
                    placeholder="Sick Leave Credits"
                    value={editForm.sickLeaveCredits}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    type="date"
                    name="regularizationDate"
                    placeholder="Regularization Date"
                    value={editForm.regularizationDate}
                    onChange={handleEditChange}
                    required
                  />
                  <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded transition-colors" type="submit">Update Player</button>
                </form>
              )}
            </div>
          </>
        )}
        {activeForm === 'score' && (
          <form onSubmit={handleAddScoreDeduction}>
            <h2 className="text-xl font-bold mb-4 text-gray-100">Score Deduction</h2>
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="number"
              name="points"
              placeholder="Point Deduction"
              value={scoreForm.points}
              onChange={handleScoreChange}
              required
            />
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="date"
              name="date"
              placeholder="Date"
              value={scoreForm.date}
              onChange={handleScoreChange}
              required
            />
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="number"
              name="quarter"
              placeholder="Quarter"
              value={scoreForm.quarter}
              onChange={handleScoreChange}
              required
            />
            <select
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600"
              name="playerId"
              value={scoreForm.playerId}
              onChange={handleScoreChange}
              required
            >
              <option value="">Deduction for Player</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>{`${p.playerName} (${p.firstName} ${p.lastName})`}</option>
              ))}
            </select>
            <textarea
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              name="reason"
              placeholder="Reason for Deduction"
              value={scoreForm.reason}
              onChange={handleScoreChange}
              required
              rows={3}
            />
            {success && <div className="text-green-400 mb-2">{success}</div>}
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors" type="submit">Add Score Deduction</button>
          </form>
        )}
        {activeForm === 'vacation' && (
          <form onSubmit={handleAddVacationDeduction}>
            <h2 className="text-xl font-bold mb-4 text-gray-100">Vacation Leave Deduction</h2>
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="number"
              name="days"
              placeholder="Days Deducted"
              value={vacationForm.days}
              onChange={handleVacationChange}
              required
            />
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="date"
              name="date"
              placeholder="Date"
              value={vacationForm.date}
              onChange={handleVacationChange}
              required
            />
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="number"
              name="quarter"
              placeholder="Quarter"
              value={vacationForm.quarter}
              onChange={handleVacationChange}
              required
            />
            <select
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600"
              name="playerId"
              value={vacationForm.playerId}
              onChange={handleVacationChange}
              required
            >
              <option value="">Deduction for Player</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>{`${p.playerName} (${p.firstName} ${p.lastName})`}</option>
              ))}
            </select>
            <textarea
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              name="reason"
              placeholder="Reason for Deduction"
              value={vacationForm.reason}
              onChange={handleVacationChange}
              required
              rows={3}
            />
            {success && <div className="text-green-400 mb-2">{success}</div>}
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors" type="submit">Add Vacation Leave Deduction</button>
          </form>
        )}
        {activeForm === 'sick' && (
          <form onSubmit={handleAddSickDeduction}>
            <h2 className="text-xl font-bold mb-4 text-gray-100">Sick Leave Credit Deduction</h2>
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="number"
              name="days"
              placeholder="Days Deducted"
              value={sickForm.days}
              onChange={handleSickChange}
              required
            />
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="date"
              name="date"
              placeholder="Date"
              value={sickForm.date}
              onChange={handleSickChange}
              required
            />
            <input
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              type="number"
              name="quarter"
              placeholder="Quarter"
              value={sickForm.quarter}
              onChange={handleSickChange}
              required
            />
            <select
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600"
              name="playerId"
              value={sickForm.playerId}
              onChange={handleSickChange}
              required
            >
              <option value="">Deduction for Player</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>{`${p.playerName} (${p.firstName} ${p.lastName})`}</option>
              ))}
            </select>
            <textarea
              className="w-full mb-3 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              name="reason"
              placeholder="Reason for Deduction"
              value={sickForm.reason}
              onChange={handleSickChange}
              required
              rows={3}
            />
            {success && <div className="text-green-400 mb-2">{success}</div>}
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors" type="submit">Add Sick Leave Deduction</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
