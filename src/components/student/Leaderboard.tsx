import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import AnimatedText from '@/components/ui/AnimatedText';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Star, 
  Target,
  Crown,
  Zap,
  Flame,
  Rocket
} from 'lucide-react';

interface StudentScore {
  id: string;
  name: string;
  avatar?: string;
  totalPoints: number;
  completedAssignments: number;
  averageScore: number;
  streakDays: number;
  rank: number;
  weeklyChange: number;
  badges: string[];
  isCurrentUser?: boolean;
}

const Leaderboard: React.FC = () => {
  const { user } = useAuthStore();
  const { students } = useClassStore();
  const [leaderboardData, setLeaderboardData] = useState<StudentScore[]>([]);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week');
  const [category, setCategory] = useState<'points' | 'assignments' | 'streak'>('points');

  // Mock leaderboard data
  useEffect(() => {
    const mockData: StudentScore[] = [
      {
        id: 's-1',
        name: 'Иван Иванов',
        totalPoints: 1250,
        completedAssignments: 8,
        averageScore: 92,
        streakDays: 12,
        rank: 1,
        weeklyChange: 5,
        badges: ['perfect-score', 'week-streak', 'top-student'],
        isCurrentUser: user?.id === 's-1'
      },
      {
        id: 's-2',
        name: 'Мария Сидорова',
        totalPoints: 1180,
        completedAssignments: 7,
        averageScore: 89,
        streakDays: 8,
        rank: 2,
        weeklyChange: 2,
        badges: ['perfect-score', 'week-streak'],
        isCurrentUser: user?.id === 's-2'
      },
      {
        id: 's-3',
        name: 'Алексей Петров',
        totalPoints: 1100,
        completedAssignments: 6,
        averageScore: 85,
        streakDays: 5,
        rank: 3,
        weeklyChange: -1,
        badges: ['first-assignment'],
        isCurrentUser: user?.id === 's-3'
      },
      {
        id: 's-4',
        name: 'Елена Козлова',
        totalPoints: 950,
        completedAssignments: 5,
        averageScore: 82,
        streakDays: 3,
        rank: 4,
        weeklyChange: 3,
        badges: [],
        isCurrentUser: user?.id === 's-4'
      },
      {
        id: 's-5',
        name: 'Дмитрий Волков',
        totalPoints: 800,
        completedAssignments: 4,
        averageScore: 78,
        streakDays: 2,
        rank: 5,
        weeklyChange: 0,
        badges: [],
        isCurrentUser: user?.id === 's-5'
      }
    ];
    setLeaderboardData(mockData);
  }, [user?.id]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-slate-400">#{rank}</span>;
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'perfect-score': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'week-streak': return <Flame className="h-4 w-4 text-red-500" />;
      case 'top-student': return <Trophy className="h-4 w-4 text-purple-500" />;
      case 'first-assignment': return <Target className="h-4 w-4 text-blue-500" />;
      default: return <Award className="h-4 w-4 text-slate-500" />;
    }
  };

  const getBadgeName = (badge: string) => {
    switch (badge) {
      case 'perfect-score': return 'Отличник';
      case 'week-streak': return 'Неделя подряд';
      case 'top-student': return 'Лучший студент';
      case 'first-assignment': return 'Первое задание';
      default: return 'Достижение';
    }
  };

  const getScoreValue = (student: StudentScore) => {
    switch (category) {
      case 'points': return student.totalPoints;
      case 'assignments': return student.completedAssignments;
      case 'streak': return student.streakDays;
      default: return student.totalPoints;
    }
  };

  const getScoreLabel = () => {
    switch (category) {
      case 'points': return 'points';
      case 'assignments': return 'assignments';
      case 'streak': return 'days';
      default: return 'points';
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <span className="w-4 h-4" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-slate-500';
  };

  const currentUserRank = leaderboardData.find(s => s.isCurrentUser)?.rank || 0;
  const topThree = leaderboardData.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          <AnimatedText translationKey="classRanking" />
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          <AnimatedText translationKey="competeWithClassmates" />
        </p>
      </div>

      {/* Podium */}
      {topThree.length >= 3 && (
        <div
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center"><AnimatedText translationKey="honorRoll" /></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-center gap-4">
                {/* 2nd place */}
                <div
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-20 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-end justify-center pb-2">
                    <Medal className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {topThree[1].name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {getScoreValue(topThree[1])} <AnimatedText translationKey={getScoreLabel()} />
                    </p>
                  </div>
                </div>

                {/* 1st place */}
                <div
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-24 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-lg flex items-end justify-center pb-2">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {topThree[0].name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {getScoreValue(topThree[0])} <AnimatedText translationKey={getScoreLabel()} />
                    </p>
                  </div>
                </div>

                {/* 3rd place */}
                <div
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-amber-200 dark:bg-amber-800 rounded-t-lg flex items-end justify-center pb-2">
                    <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {topThree[2].name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {getScoreValue(topThree[2])} <AnimatedText translationKey={getScoreLabel()} />
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <Tabs value={category} onValueChange={(value) => setCategory(value as typeof category)}>
          <TabsList>
            <TabsTrigger value="points"><AnimatedText translationKey="byPoints" /></TabsTrigger>
            <TabsTrigger value="assignments"><AnimatedText translationKey="byAssignments" /></TabsTrigger>
            <TabsTrigger value="streak"><AnimatedText translationKey="byStreak" /></TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as typeof timeframe)}>
          <TabsList>
            <TabsTrigger value="week"><AnimatedText translationKey="week" /></TabsTrigger>
            <TabsTrigger value="month"><AnimatedText translationKey="month" /></TabsTrigger>
            <TabsTrigger value="all"><AnimatedText translationKey="allTime" /></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Leaderboard List */}
      <div
      >
        <Card>
          <CardContent className="p-0">
            <div className="space-y-1">
              {leaderboardData.map((student, index) => (
                <div
                  className={`flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    student.isCurrentUser ? 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8">
                    {getRankIcon(student.rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name and Stats */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {student.name}
                      </p>
                      {student.isCurrentUser && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          <AnimatedText translationKey="you" />
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>{getScoreValue(student)} <AnimatedText translationKey={getScoreLabel()} /></span>
                      <span><AnimatedText translationKey="averageScore" />: {student.averageScore}%</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1">
                    {student.badges.slice(0, 3).map((badge, badgeIndex) => (
                      <div
                        className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center"
                        title={getBadgeName(badge)}
                      >
                        {getBadgeIcon(badge)}
                      </div>
                    ))}
                    {student.badges.length > 3 && (
                      <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs">
                        +{student.badges.length - 3}
                      </div>
                    )}
                  </div>

                  {/* Change */}
                  <div className="flex items-center gap-1">
                    {getChangeIcon(student.weeklyChange)}
                    <span className={`text-sm ${getChangeColor(student.weeklyChange)}`}>
                      {student.weeklyChange > 0 ? '+' : ''}{student.weeklyChange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current User Stats */}
      {currentUserRank > 0 && (
        <div
        >
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-600" />
                <AnimatedText translationKey="yourPosition" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    #{currentUserRank} <AnimatedText translationKey="place" />
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <AnimatedText translationKey="keepGoing" />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {getScoreValue(leaderboardData.find(s => s.isCurrentUser)!)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <AnimatedText translationKey={getScoreLabel()} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
