'use client';
import { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import exercisesData from '@/data/exercises.json';
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function getAllLogs() {
  if (typeof window === 'undefined') return {};
  return JSON.parse(localStorage.getItem('routineLogs') || '{}');
}

function getLogsByDate(date: string) {
  const allLogs = getAllLogs();
  const logs: { routineName: string; log: any }[] = [];
  const routines = JSON.parse(localStorage.getItem('routines') || '[]');
  Object.entries(allLogs).forEach(([routineId, logsArr]: any) => {
    const routine = routines.find((r: any) => r.id === routineId);
    if (!routine) return;
    logsArr.forEach((log: any) => {
      if (log.date === date) {
        logs.push({ routineName: routine.name, log });
      }
    });
  });
  return logs;
}

function getCompletionStatus(routineId: string, date: string) {
  const allLogs = getAllLogs();
  const logsArr = allLogs[routineId] || [];
  const log = logsArr.find((l: any) => l.date === date);
  return log && log.completed ? true : false;
}

function Calendar({ selected, onSelect, currentMonth, onMonthChange }: {
  selected: string,
  onSelect: (date: string) => void,
  currentMonth: dayjs.Dayjs,
  onMonthChange: (month: dayjs.Dayjs) => void
}) {
  const startDay = currentMonth.startOf('week');
  const endDay = currentMonth.endOf('month').endOf('week');
  const days: dayjs.Dayjs[] = [];
  let day = startDay;
  while (day.isBefore(endDay)) {
    days.push(day);
    day = day.add(1, 'day');
  }
  return (
    <div className="bg-[#18191c] rounded-xl p-6 shadow-lg mb-8 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => onMonthChange(currentMonth.subtract(1, 'month'))} className="text-white text-2xl px-2">&#8592;</button>
        <div className="text-white text-2xl font-bold">{currentMonth.format('MMMM YYYY')}</div>
        <button onClick={() => onMonthChange(currentMonth.add(1, 'month'))} className="text-white text-2xl px-2">&#8594;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="text-xs text-gray-400 mb-1">{d}</div>
        ))}
        {days.map(d => {
          const isSelected = d.format('YYYY-MM-DD') === selected;
          return (
            <button
              key={d.format('YYYY-MM-DD')}
              onClick={() => onSelect(d.format('YYYY-MM-DD'))}
              className={`rounded-lg py-2 text-sm font-semibold transition-colors
                ${d.month() !== currentMonth.month() ? 'text-gray-600' : isSelected ? 'bg-blue-600 text-white' : 'text-gray-200 hover:bg-blue-900'}`}
            >
              {d.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [logs, setLogs] = useState<{ routineName: string; log: any, routineId: string }[]>([]);
  const [mounted, setMounted] = useState(false);

  // Calculate completed routines for the current month
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  // Sync calendar's currentMonth with analytics
  const handleMonthChange = (month: dayjs.Dayjs) => setCurrentMonth(month);

  useEffect(() => {
    setMounted(true);
  }, []);

  // All code that uses localStorage or window should be inside useEffect or after mounted
  const completedCount = useMemo(() => {
    if (!mounted) return 0;
    const allLogs = getAllLogs();
    let count = 0;
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed && dayjs(log.date).isSame(currentMonth, 'month')) {
          count++;
        }
      });
    });
    return count;
  }, [currentMonth, mounted]);

  const last7DaysCount = useMemo(() => {
    if (!mounted) return 0;
    const allLogs = getAllLogs();
    let count = 0;
    const today = dayjs();
    const start = today.subtract(6, 'day').startOf('day');
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        const logDate = dayjs(log.date);
        if (log.completed && logDate.isSameOrAfter(start) && logDate.isSameOrBefore(today)) {
          count++;
        }
      });
    });
    return count;
  }, [logs, currentMonth, mounted]);

  const daysInMonth = currentMonth.daysInMonth();
  const workedOutDaysSet = useMemo(() => {
    if (!mounted) return new Set();
    const allLogs = getAllLogs();
    const days = new Set();
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed && dayjs(log.date).isSame(currentMonth, 'month')) {
          days.add(log.date);
        }
      });
    });
    return days;
  }, [currentMonth, logs, mounted]);
  const workedOutDays = workedOutDaysSet.size;
  const notWorkedOutDays = daysInMonth - workedOutDays;
  const pieData = {
    labels: ['Worked Out', 'Not Worked Out'],
    datasets: [
      {
        data: [workedOutDays, notWorkedOutDays],
        backgroundColor: [
          '#38bdf8', // sci-fi blue
          '#0ea5e9'  // deeper blue
        ],
        borderColor: [
          '#38bdf8',
          '#0ea5e9'
        ],
        borderWidth: 2,
      },
    ],
  };
  const pieOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: '#fff',
          font: { size: 12 },
          boxWidth: 18,
          boxHeight: 18,
          usePointStyle: true,
        }
      }
    }
  };

  // Pie chart for last 7 days
  const today = dayjs();
  const last7DaysArr = Array.from({ length: 7 }, (_, i) => today.subtract(6 - i, 'day').format('YYYY-MM-DD'));
  const workedOutLast7DaysSet = useMemo(() => {
    if (!mounted) return new Set();
    const allLogs = getAllLogs();
    const days = new Set();
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed && last7DaysArr.includes(log.date)) {
          days.add(log.date);
        }
      });
    });
    return days;
  }, [logs, currentMonth, mounted]);
  const workedOutLast7Days = workedOutLast7DaysSet.size;
  const notWorkedOutLast7Days = 7 - workedOutLast7Days;
  const pieData7 = {
    labels: ['Worked Out', 'Not Worked Out'],
    datasets: [
      {
        data: [workedOutLast7Days, notWorkedOutLast7Days],
        backgroundColor: [
          '#38bdf8', // sci-fi blue
          '#0ea5e9'  // deeper blue
        ],
        borderColor: [
          '#38bdf8',
          '#0ea5e9'
        ],
        borderWidth: 2,
      },
    ],
  };

  // Calculate streak: consecutive days with at least one completed routine
  const streak = useMemo(() => {
    if (!mounted) return 0;
    const allLogs = getAllLogs();
    // Get all unique days with at least one completed routine
    const completedDays = new Set<string>();
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed) {
          completedDays.add(log.date);
        }
      });
    });
    // Start from today, count consecutive days backwards
    let count = 0;
    let day = dayjs();
    while (completedDays.has(day.format('YYYY-MM-DD'))) {
      count++;
      day = day.subtract(1, 'day');
    }
    return count;
  }, [logs, currentMonth, mounted]);

  // Calculate total miles ran across all time
  const totalMiles = useMemo(() => {
    if (!mounted) return 0;
    const allLogs = getAllLogs();
    // Build a map of all cardio exercise IDs
    const cardioIds = exercisesData.muscleGroups
      .flatMap((mg: any) => mg.exercises)
      .filter((ex: any) => ex.equipment === 'bodyweight' && ex.musclesWorked?.includes('heart'))
      .map((ex: any) => ex.id);
    let miles = 0;
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed && Array.isArray(log.exercises)) {
          log.exercises.forEach((ex: any) => {
            if (cardioIds.includes(ex.id) && Array.isArray(ex.sets)) {
              ex.sets.forEach((set: any) => {
                const dist = parseFloat(set.sets);
                if (!isNaN(dist)) miles += dist;
              });
            }
          });
        }
      });
    });
    return miles;
  }, [mounted, logs]);

  // Calculate workouts missed (days with no completed logs in current month up to today)
  const missedWorkouts = useMemo(() => {
    if (!mounted) return 0;
    const allLogs = getAllLogs();
    const today = dayjs();
    const startOfMonth = currentMonth.startOf('month');
    const endDay = today.month() === currentMonth.month() && today.year() === currentMonth.year()
      ? today
      : currentMonth.endOf('month');
    let missed = 0;
    for (let d = startOfMonth; d.isSameOrBefore(endDay, 'day'); d = d.add(1, 'day')) {
      let found = false;
      Object.values(allLogs).forEach((logsArr: any) => {
        if (logsArr.some((log: any) => log.completed && dayjs(log.date).isSame(d, 'day'))) {
          found = true;
        }
      });
      if (!found) missed++;
    }
    return missed;
  }, [currentMonth, mounted, logs]);

  // Calculate longest streak ever
  const longestStreak = useMemo(() => {
    if (!mounted) return 0;
    const allLogs = getAllLogs();
    // Get all unique days with at least one completed routine
    const completedDays = new Set<string>();
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed) {
          completedDays.add(log.date);
        }
      });
    });
    if (completedDays.size === 0) return 0;
    // Convert to sorted array
    const sortedDays = Array.from(completedDays).sort();
    let maxStreak = 1;
    let currentStreak = 1;
    for (let i = 1; i < sortedDays.length; i++) {
      const prev = dayjs(sortedDays[i - 1]);
      const curr = dayjs(sortedDays[i]);
      if (curr.diff(prev, 'day') === 1) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 1;
      }
    }
    return maxStreak;
  }, [logs, mounted]);

  // Get running PR from localStorage
  const runningPR = useMemo(() => {
    if (typeof window === 'undefined') return '';
    try {
      const prs = JSON.parse(localStorage.getItem('exercisePRs') || '{}');
      return prs['running'] || '';
    } catch {
      return '';
    }
  }, [mounted]);

  // Calculate longest distance ran in a single set
  const longestDistance = useMemo(() => {
    if (!mounted) return 0;
    const allLogs = getAllLogs();
    const cardioIds = exercisesData.muscleGroups
      .flatMap((mg: any) => mg.exercises)
      .filter((ex: any) => ex.equipment === 'bodyweight' && ex.musclesWorked?.includes('heart'))
      .map((ex: any) => ex.id);
    let maxDist = 0;
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed && Array.isArray(log.exercises)) {
          log.exercises.forEach((ex: any) => {
            if (cardioIds.includes(ex.id) && Array.isArray(ex.sets)) {
              ex.sets.forEach((set: any) => {
                const dist = parseFloat(set.sets);
                if (!isNaN(dist) && dist > maxDist) maxDist = dist;
              });
            }
          });
        }
      });
    });
    return maxDist;
  }, [mounted, logs]);

  // Line graph: Workouts/week over time
  const workoutsPerWeekData = useMemo(() => {
    if (!mounted) return { labels: [], data: [] };
    const allLogs = getAllLogs();
    const weekMap: { [weekStart: string]: number } = {};
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed) {
          const date = dayjs(log.date);
          const weekStart = date.startOf('week').format('YYYY-MM-DD');
          weekMap[weekStart] = (weekMap[weekStart] || 0) + 1;
        }
      });
    });
    const sortedWeeks = Object.keys(weekMap).sort();
    return {
      labels: sortedWeeks,
      data: sortedWeeks.map(week => weekMap[week])
    };
  }, [mounted, logs]);

  // Pie chart: Muscle category group focus
  const muscleGroupPie = useMemo(() => {
    if (!mounted) return { labels: [], data: [], colors: [] };
    const allLogs = getAllLogs();
    // Build a map of exerciseId -> muscleGroupName
    const exToGroup: { [exId: string]: string } = {};
    exercisesData.muscleGroups.forEach((mg: any) => {
      mg.exercises.forEach((ex: any) => {
        exToGroup[ex.id] = mg.name;
      });
    });
    // Count completed exercises per muscle group
    const groupCounts: { [group: string]: number } = {};
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed && Array.isArray(log.exercises)) {
          log.exercises.forEach((ex: any) => {
            const group = exToGroup[ex.id];
            if (group) groupCounts[group] = (groupCounts[group] || 0) + 1;
          });
        }
      });
    });
    const labels = Object.keys(groupCounts);
    const data = labels.map(l => groupCounts[l]);
    // Generate sci-fi blue/cyan palette
    const palette = [
      '#38bdf8', '#0ea5e9', '#2563eb', '#1e40af', '#0e7490', '#06b6d4', '#0891b2', '#0e7490', '#0284c7', '#0369a1', '#7dd3fc', '#bae6fd', '#38bdf8', '#0ea5e9', '#2563eb', '#1e40af'
    ];
    const colors = labels.map((_, i) => palette[i % palette.length]);
    return { labels, data, colors };
  }, [mounted, logs]);

  // Pie chart: Average Completion Rate per Routine (This Month)
  const avgCompletionPie = useMemo(() => {
    if (!mounted) return { completed: 0, skipped: 0 };
    const allLogs = getAllLogs();
    let totalRatio = 0;
    let count = 0;
    Object.values(allLogs).forEach((logsArr: any) => {
      logsArr.forEach((log: any) => {
        if (log.completed && dayjs(log.date).isSame(currentMonth, 'month') && Array.isArray(log.exercises)) {
          const total = log.exercises.length;
          const completed = log.exercises.filter((ex: any) => ex.completed).length;
          if (total > 0) {
            totalRatio += completed / total;
            count++;
          }
        }
      });
    });
    const avg = count > 0 ? totalRatio / count : 0;
    return {
      completed: Math.round(avg * 100),
      skipped: 100 - Math.round(avg * 100)
    };
  }, [mounted, logs, currentMonth]);

  useEffect(() => {
    if (!mounted) return;
    const allLogs = getAllLogs();
    const routines = JSON.parse(localStorage.getItem('routines') || '[]');
    const logsArr: { routineName: string; log: any, routineId: string }[] = [];
    Object.entries(allLogs).forEach(([routineId, logsArrRaw]: any) => {
      const routine = routines.find((r: any) => r.id === routineId);
      if (!routine) return;
      logsArrRaw.forEach((log: any) => {
        if (log.date === selectedDate) {
          logsArr.push({ routineName: routine.name, log, routineId });
        }
      });
    });
    setLogs(logsArr);
  }, [selectedDate, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#111215]" />;
  }

  return (
    <main className="min-h-screen p-8 bg-[#111215]">
      <div className="max-w-6xl w-full mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Progress</h1>
        <section className="mb-10">
          <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_2px_16px_rgba(56,189,248,0.7)] tracking-wide sci-fi-heading">Analytics</h2>
          <div className="relative rounded-3xl p-8 md:p-10 shadow-2xl text-gray-200 text-lg flex flex-col gap-8 min-w-0 overflow-x-auto border border-cyan-500/30 bg-gradient-to-br from-[#181c2b]/80 via-[#18191c]/90 to-[#1a1a2e]/80 backdrop-blur-xl glassy-analytics before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] before:from-cyan-800/20 before:via-transparent before:to-transparent before:blur-2xl before:pointer-events-none">
            {/* Sci-fi glow border */}
            <div className="absolute -inset-1 rounded-3xl pointer-events-none border-2 border-cyan-400/20 shadow-[0_0_40px_10px_rgba(56,189,248,0.15)] z-0" aria-hidden="true"></div>
            {/* Stats Section */}
            <div className="flex flex-col md:flex-row gap-8 mb-4 w-full">
              {/* Left: Streaks */}
              <div className="flex flex-col gap-4 items-start min-w-[220px]">
                <div className="flex items-center justify-between w-full bg-gradient-to-r from-green-500/10 to-transparent p-3 rounded-lg border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <span className="text-3xl font-bold text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">{streak}</span>
                  <span className="text-lg text-gray-200">day streak</span>
                </div>
                <div className="flex items-center justify-between w-full bg-gradient-to-r from-yellow-500/10 to-transparent p-3 rounded-lg border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  <span className="text-3xl font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">{longestStreak}</span>
                  <span className="text-lg text-gray-200">longest streak ever</span>
                </div>
              </div>
              {/* Right: Stats Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                  <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-3 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <span className="font-semibold text-2xl text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">{completedCount}</span>
                    <span className="text-gray-200"> workouts completed in {currentMonth.format('MMMM YYYY')}</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/10 to-transparent p-3 rounded-lg border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                    <span className="font-semibold text-2xl text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">{last7DaysCount}</span>
                    <span className="text-gray-200"> workouts completed in the last 7 days</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500/10 to-transparent p-3 rounded-lg border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <span className="font-semibold text-2xl text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">{missedWorkouts}</span>
                    <span className="text-gray-200"> workouts missed</span>
                  </div>
                  <div className="bg-gradient-to-r from-sky-500/10 to-transparent p-3 rounded-lg border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                    <span className="font-semibold text-2xl text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]">{longestDistance > 0 ? longestDistance.toFixed(2) : '--'}</span>
                    <span className="text-gray-200"> mi longest distance ran</span>
                  </div>
                  <div className="bg-gradient-to-r from-sky-500/10 to-transparent p-3 rounded-lg border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                    <span className="font-semibold text-2xl text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]">{totalMiles.toFixed(2)}</span>
                    <span className="text-gray-200"> total miles ran</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-3 rounded-lg border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    <span className="font-semibold text-2xl text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">{runningPR || 'No PR set yet'}</span>
                    <span className="text-gray-200"> running PR</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Pie Charts Section */}
            <div className="w-full relative flex flex-row flex-nowrap justify-center items-start gap-x-8 mb-10 z-10">
              {/** Card style for all pie charts: fixed height, consistent width, flex-col, justify-between **/}
              <div className="flex flex-col items-center min-w-[180px] max-w-[220px] h-[420px] justify-between rounded-2xl bg-[#181c2b]/80 border border-cyan-400/20 shadow-[0_0_24px_2px_rgba(56,189,248,0.10)] p-2 mx-1 glassy-card">
                <div className="text-center text-white font-bold mb-1">Workouts by Day (This Month)</div>
                <Pie data={pieData} options={pieOptions} />
                <div className="text-xs text-center text-gray-400 mt-1">This Month</div>
              </div>
              <div className="flex flex-col items-center min-w-[180px] max-w-[220px] h-[420px] justify-between rounded-2xl bg-[#181c2b]/80 border border-cyan-400/20 shadow-[0_0_24px_2px_rgba(56,189,248,0.10)] p-2 mx-1 glassy-card">
                <div className="text-center text-white font-bold mb-1">Workouts by Day (Last 7 Days)</div>
                <Pie data={pieData7} options={pieOptions} />
                <div className="text-xs text-center text-gray-400 mt-1">Last 7 Days</div>
              </div>
              <div className="flex flex-col items-center min-w-[180px] max-w-[220px] h-[420px] justify-between rounded-2xl bg-[#181c2b]/80 border border-cyan-400/20 shadow-[0_0_24px_2px_rgba(56,189,248,0.10)] p-2 mx-1 glassy-card">
                <div className="text-center text-white font-bold mb-1">Muscle Group Focus</div>
                <Pie data={{
                  labels: muscleGroupPie.labels.map((label, i) => {
                    const total = muscleGroupPie.data.reduce((a, b) => (typeof a === 'number' && typeof b === 'number' ? a + b : 0), 0);
                    const pct = total > 0 ? Math.round(((typeof muscleGroupPie.data[i] === 'number' ? muscleGroupPie.data[i] : 0) / total) * 100) : 0;
                    return `${label} (${pct}%)`;
                  }),
                  datasets: [
                    {
                      data: muscleGroupPie.data,
                      backgroundColor: muscleGroupPie.colors,
                      borderColor: muscleGroupPie.colors,
                      borderWidth: 2,
                    }
                  ]
                }} options={{
                  ...pieOptions,
                  plugins: {
                    ...(pieOptions.plugins ?? {}),
                    legend: {
                      ...((pieOptions.plugins && pieOptions.plugins.legend) ?? {}),
                      labels: {
                        ...((pieOptions.plugins && pieOptions.plugins.legend && pieOptions.plugins.legend.labels) ?? {}),
                        color: '#fff', // force white legend text
                        generateLabels: chart => {
                          const data = chart.data;
                          if (!data.labels) return [];
                          const ds = data.datasets[0].data as number[];
                          const total = ds.reduce((a, b) => (typeof a === 'number' && typeof b === 'number' ? a + b : 0), 0);
                          return data.labels.map((label, i) => {
                            const value = typeof ds[i] === 'number' ? ds[i] : 0;
                            const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                            const metaData = chart.getDatasetMeta(0).data[i];
                            const isHidden = typeof (metaData as any).hidden === 'boolean' ? (metaData as any).hidden : false;
                            return {
                              text: `${label}`,
                              fillStyle: (data.datasets[0].backgroundColor as string[])[i],
                              strokeStyle: (data.datasets[0].borderColor as string[])[i],
                              lineWidth: 2,
                              hidden: isHidden,
                              index: i,
                              fontColor: '#fff', // force white
                              color: '#fff', // force white
                            };
                          });
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = typeof context.parsed === 'number' ? context.parsed : 0;
                          const ds = context.dataset.data as number[];
                          const total = ds.reduce((a, b) => (typeof a === 'number' && typeof b === 'number' ? a + b : 0), 0);
                          const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                          return `${label}: ${value} (${pct}%)`;
                        }
                      }
                    }
                  }
                }} />
                <div className="text-xs text-center text-gray-400 mt-1">Muscle Focus</div>
              </div>
              {/* Average Completion Rate Pie Chart */}
              <div className="flex flex-col items-center min-w-[180px] max-w-[220px] h-[420px] justify-between rounded-2xl bg-[#181c2b]/80 border border-cyan-400/20 shadow-[0_0_24px_2px_rgba(56,189,248,0.10)] p-2 mx-1 glassy-card">
                <div className="text-center text-white font-bold mb-1">Average Completion Rate per Routine (This Month)</div>
                <Pie data={{
                  labels: [
                    `Completed (${avgCompletionPie.completed}%)`,
                    `Skipped (${avgCompletionPie.skipped}%)`
                  ],
                  datasets: [
                    {
                      data: [avgCompletionPie.completed, avgCompletionPie.skipped],
                      backgroundColor: [
                        '#38bdf8', // sci-fi blue
                        '#0ea5e9'  // deeper blue
                      ],
                      borderColor: [
                        '#38bdf8',
                        '#0ea5e9'
                      ],
                      borderWidth: 2,
                    }
                  ]
                }} options={pieOptions} />
                <div className="text-xs text-center text-gray-400 mt-1">This Month</div>
              </div>
            </div>
            {/* Line Graph: Workouts/week over time */}
            <div className="bg-[#232428] rounded-xl p-4 shadow-lg mt-4">
              <h3 className="text-xl font-bold text-white mb-2">Workouts/week over time</h3>
              <Line
                data={{
                  labels: workoutsPerWeekData.labels,
                  datasets: [
                    {
                      label: 'Workouts per week',
                      data: workoutsPerWeekData.data,
                      borderColor: 'rgba(56,189,248,1)',
                      backgroundColor: 'rgba(56,189,248,0.2)',
                      tension: 0.3,
                      pointRadius: 4,
                      pointBackgroundColor: 'rgba(56,189,248,1)',
                      fill: true,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: {
                      title: { display: true, text: 'Week Starting', color: '#fff' },
                      ticks: { color: '#fff', maxTicksLimit: 8 },
                      grid: { color: 'rgba(100,116,139,0.2)' }
                    },
                    y: {
                      title: { display: true, text: 'Workouts', color: '#fff' },
                      beginAtZero: true,
                      ticks: { color: '#fff', stepSize: 1 },
                      grid: { color: 'rgba(100,116,139,0.2)' }
                    }
                  }
                }}
                height={120}
              />
            </div>
          </div>
        </section>
        <Calendar selected={selectedDate} onSelect={setSelectedDate} currentMonth={currentMonth} onMonthChange={handleMonthChange} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Logs for {dayjs(selectedDate).format('MMMM D, YYYY')}</h2>
          {logs.length === 0 ? (
            <div className="text-gray-400 text-lg">No logs for this day.</div>
          ) : (
            <div className="space-y-6">
              {logs.map(({ routineName, log }, idx) => (
                <div key={idx} className="bg-[#232428] border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="text-lg font-semibold text-white mr-4">{routineName}</div>
                    {log.completed ? (
                      <span className="inline-flex items-center text-green-400 font-semibold text-sm ml-2">&#10003; Completed</span>
                    ) : (
                      <span className="inline-flex items-center text-gray-400 font-semibold text-sm ml-2">Not Completed</span>
                    )}
                  </div>
                  {/* Show time and duration info */}
                  <div className="text-xs text-gray-400 mb-2">
                    <span>Start: {log.startTime || 'N/A'} | End: {log.endTime || 'N/A'} | Duration: {log.duration || 'N/A'}</span>
                  </div>
                  {log.notes && (
                    <div className="mb-2 text-blue-300 text-xs italic whitespace-pre-line">{log.notes}</div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {log.exercises.map((ex: any, exIdx: number) => {
                      const allExercises = exercisesData.muscleGroups.flatMap((mg: any) => mg.exercises);
                      const fullExercise = allExercises.find((e: any) => e.id === ex.id) || ex;
                      return (
                        <div key={ex.id} className="text-xs text-gray-200 border-b border-gray-700 pb-1 mb-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{fullExercise.name}</span>
                            {ex.completed ? (
                              <span className="ml-3 text-green-400 font-semibold text-xs">&#10003; Completed</span>
                            ) : (
                              <span className="ml-3 text-gray-400 font-semibold text-xs">Not Completed</span>
                            )}
                          </div>
                          {(ex.sets || []).map((set: any, setIdx: number) => (
                            <div key={setIdx} className="ml-2 flex gap-4">
                              <span>Set {setIdx + 1}:</span>
                              {fullExercise.equipment === 'bodyweight' && fullExercise.musclesWorked?.includes('heart') ? (
                                <>
                                  <span>Distance: <span className="font-mono">{set.sets} mi</span></span>
                                  <span>Time: <span className="font-mono">{set.reps} min</span></span>
                                  <span>Pace: <span className="font-mono">{set.weight} min/mi</span></span>
                                </>
                              ) : (
                                <>
                                  <span>Sets: <span className="font-mono">{set.sets}</span></span>
                                  <span>Reps: <span className="font-mono">{set.reps}</span></span>
                                  <span>Weight: <span className="font-mono">{set.weight}</span></span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}