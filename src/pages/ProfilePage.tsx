import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Trophy, 
  Star, 
  Target, 
  BookOpen, 
  Users,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
  category: 'achievement' | 'milestone' | 'special';
}

interface ProfileStats {
  totalLessons: number;
  completedAssignments: number;
  averageScore: number;
  streakDays: number;
  totalPoints: number;
  rank: number;
}

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { currentClass, students } = useClassStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [badges, setBadges] = useState<Badge[]>([]);
  const [stats, setStats] = useState<ProfileStats>({
    totalLessons: 0,
    completedAssignments: 0,
    averageScore: 0,
    streakDays: 0,
    totalPoints: 0,
    rank: 0
  });

  // Mock badges data
  useEffect(() => {
    const mockBadges: Badge[] = [
      {
        id: 'first-login',
        name: 'Первые шаги',
        description: 'Впервые вошли в систему',
        icon: '👋',
        color: 'bg-blue-500',
        earnedAt: new Date('2024-01-15'),
        category: 'achievement'
      },
      {
        id: 'first-assignment',
        name: 'Первое задание',
        description: 'Выполнили первое домашнее задание',
        icon: '📝',
        color: 'bg-green-500',
        earnedAt: new Date('2024-01-16'),
        category: 'achievement'
      },
      {
        id: 'perfect-score',
        name: 'Отличник',
        description: 'Получили 100% за задание',
        icon: '⭐',
        color: 'bg-yellow-500',
        earnedAt: new Date('2024-01-20'),
        category: 'milestone'
      },
      {
        id: 'week-streak',
        name: 'Неделя подряд',
        description: 'Заходили в систему 7 дней подряд',
        icon: '🔥',
        color: 'bg-red-500',
        earnedAt: new Date('2024-01-25'),
        category: 'milestone'
      },
      {
        id: 'top-student',
        name: 'Лучший студент',
        description: 'Попали в топ-3 класса',
        icon: '🏆',
        color: 'bg-purple-500',
        earnedAt: new Date('2024-02-01'),
        category: 'special'
      }
    ];
    setBadges(mockBadges);

    // Mock stats
    setStats({
      totalLessons: 12,
      completedAssignments: 8,
      averageScore: 87,
      streakDays: 5,
      totalPoints: 1250,
      rank: 2
    });
  }, []);

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        name: editData.name,
        email: editData.email,
        avatar: editData.avatar
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '📊';
    }
  };

  const getBadgeIcon = (icon: string) => {
    return <span className="text-2xl">{icon}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Профиль
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Управляйте своим профилем и просматривайте достижения
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Информация о профиле</span>
                  {!isEditing ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Редактировать
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Сохранить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Отмена
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={editData.avatar} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(editData.name)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Input
                      placeholder="URL аватара"
                      value={editData.avatar}
                      onChange={(e) => setEditData(prev => ({ ...prev, avatar: e.target.value }))}
                      className="w-full"
                    />
                  )}
                </div>

                {/* Profile Fields */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-slate-800 dark:text-slate-200 font-medium">
                        {user?.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <p className="text-slate-800 dark:text-slate-200 font-medium">
                        {user?.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Роль</Label>
                    <Badge 
                      className={`${
                        user?.role === 'teacher' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {user?.role === 'teacher' ? 'Учитель' : 'Студент'}
                    </Badge>
                  </div>

                  {currentClass && (
                    <div>
                      <Label>Класс</Label>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">
                        {currentClass.name}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Achievements */}
          <div
            className="lg:col-span-2"
          >
            <Tabs defaultValue="stats" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stats">Статистика</TabsTrigger>
                <TabsTrigger value="badges">Достижения</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Уроков</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                            {stats.totalLessons}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Заданий</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                            {stats.completedAssignments}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                          <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Средний балл</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                            {stats.averageScore}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <Award className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Дней подряд</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                            {stats.streakDays}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Очков</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                            {stats.totalPoints}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                          <span className="text-lg">{getRankIcon(stats.rank)}</span>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Место в классе</p>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
                            #{stats.rank}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="badges" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <div
                      className="group"
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center text-white`}>
                              {getBadgeIcon(badge.icon)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                {badge.name}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                {badge.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    badge.category === 'achievement' ? 'border-blue-200 text-blue-800' :
                                    badge.category === 'milestone' ? 'border-green-200 text-green-800' :
                                    'border-purple-200 text-purple-800'
                                  }`}
                                >
                                  {badge.category === 'achievement' ? 'Достижение' :
                                   badge.category === 'milestone' ? 'Рекорд' : 'Особое'}
                                </Badge>
                                <span className="text-xs text-slate-500">
                                  {badge.earnedAt.toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
