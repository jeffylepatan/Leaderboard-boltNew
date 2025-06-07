import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import Pagination from './Pagination';
import { Calendar } from 'lucide-react';

interface DeductionHistory {
  type: string;
  reason: string;
  date: string;
  points: number;
}

const ITEMS_PER_PAGE = 10;

const PointHistoryList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [history, setHistory] = useState<DeductionHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const scoreSnapshot = await getDocs(collection(db, 'scoreDeductions'));
      const vacationSnapshot = await getDocs(collection(db, 'vacationDeductions'));
      const sickSnapshot = await getDocs(collection(db, 'sickDeductions'));

      const scoreHistory = scoreSnapshot.docs.map(doc => ({
        type: 'Score Deduction',
        reason: doc.data().reason,
        date: doc.data().date,
        points: -doc.data().points,
      }));

      const vacationHistory = vacationSnapshot.docs.map(doc => ({
        type: 'Vacation Deduction',
        reason: doc.data().reason,
        date: doc.data().date,
        points: -doc.data().days,
      }));

      const sickHistory = sickSnapshot.docs.map(doc => ({
        type: 'Sick Deduction',
        reason: doc.data().reason,
        date: doc.data().date,
        points: -doc.data().days,
      }));

      setHistory([...scoreHistory, ...vacationHistory, ...sickHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    fetchHistory();
  }, []);

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = history.slice(startIndex, endIndex);

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-indigo-900 mb-6 border-b border-indigo-100 pb-2">
        Point History
      </h2>

      <div className="space-y-4">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="font-medium text-gray-900">{item.reason}</h3>
                <p className="text-sm text-gray-600">{item.date}</p>
                <p className="text-sm text-gray-500 italic">{item.type}</p> {/* Display deduction type */}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-indigo-600">
                {item.points > 0 ? '+' : ''}{item.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PointHistoryList;