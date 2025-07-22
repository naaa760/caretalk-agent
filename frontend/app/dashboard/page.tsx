"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  Activity,
  Sun,
  Moon,
  Heart,
  Trophy,
  Bell,
  AlertCircle,
  PhoneCall,
  Sparkles,
  MessageSquare,
  BrainCircuit,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

import { MoodForm } from "@/components/mood/mood-form";
import { AnxietyGames } from "@/components/games/anxiety-games";

import {
  getUserActivities,
  saveMoodData,
  logActivity,
} from "@/lib/static-dashboard-data";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addDays,
  format,
  subDays,
  startOfDay,
  isWithinInterval,
} from "date-fns";

import { ActivityLogger } from "@/components/activities/activity-logger";
import { useSession } from "@/lib/contexts/session-context";
import { getAllChatSessions } from "@/lib/api/chat";

// Add this type definition
type ActivityLevel = "none" | "low" | "medium" | "high";

interface DayActivity {
  date: Date;
  level: ActivityLevel;
  activities: {
    type: string;
    name: string;
    completed: boolean;
    time?: string;
  }[];
}

// Add this interface near the top with other interfaces
interface Activity {
  id: string;
  userId: string | null;
  type: string;
  name: string;
  description: string | null;
  timestamp: Date;
  duration: number | null;
  completed: boolean;
  moodScore: number | null;
  moodNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Add this interface for stats
interface DailyStats {
  moodScore: number | null;
  completionRate: number;
  mindfulnessCount: number;
  totalActivities: number;
  lastUpdated: Date;
}

// Update the calculateDailyStats function to show correct stats
const calculateDailyStats = (activities: Activity[]): DailyStats => {
  const today = startOfDay(new Date());
  const todaysActivities = activities.filter((activity) =>
    isWithinInterval(new Date(activity.timestamp), {
      start: today,
      end: addDays(today, 1),
    })
  );

  // Calculate mood score (average of today's mood entries)
  const moodEntries = todaysActivities.filter(
    (a) => a.type === "mood" && a.moodScore !== null
  );
  const averageMood =
    moodEntries.length > 0
      ? Math.round(
          moodEntries.reduce((acc, curr) => acc + (curr.moodScore || 0), 0) /
            moodEntries.length
        )
      : null;

  // Count therapy sessions (all sessions ever)
  const therapySessions = activities.filter((a) => a.type === "therapy").length;

  return {
    moodScore: averageMood,
    completionRate: 100, // Always 100% as requested
    mindfulnessCount: therapySessions, // Total number of therapy sessions
    totalActivities: todaysActivities.length,
    lastUpdated: new Date(),
  };
};

// Rename the function
const generateInsights = (activities: Activity[]) => {
  const insights: {
    title: string;
    description: string;
    icon: any;
    priority: "low" | "medium" | "high";
  }[] = [];

  // Get activities from last 7 days
  const lastWeek = subDays(new Date(), 7);
  const recentActivities = activities.filter(
    (a) => new Date(a.timestamp) >= lastWeek
  );

  // Analyze mood patterns
  const moodEntries = recentActivities.filter(
    (a) => a.type === "mood" && a.moodScore !== null
  );
  if (moodEntries.length >= 2) {
    const averageMood =
      moodEntries.reduce((acc, curr) => acc + (curr.moodScore || 0), 0) /
      moodEntries.length;
    const latestMood = moodEntries[moodEntries.length - 1].moodScore || 0;

    if (latestMood > averageMood) {
      insights.push({
        title: "Mood Improvement",
        description:
          "Your recent mood scores are above your weekly average. Keep up the good work!",
        icon: Brain,
        priority: "high",
      });
    } else if (latestMood < averageMood - 20) {
      insights.push({
        title: "Mood Change Detected",
        description:
          "I've noticed a dip in your mood. Would you like to try some mood-lifting activities?",
        icon: Heart,
        priority: "high",
      });
    }
  }

  // Analyze activity patterns
  const mindfulnessActivities = recentActivities.filter((a) =>
    ["game", "meditation", "breathing"].includes(a.type)
  );
  if (mindfulnessActivities.length > 0) {
    const dailyAverage = mindfulnessActivities.length / 7;
    if (dailyAverage >= 1) {
      insights.push({
        title: "Consistent Practice",
        description: `You've been regularly engaging in mindfulness activities. This can help reduce stress and improve focus.`,
        icon: Trophy,
        priority: "medium",
      });
    } else {
      insights.push({
        title: "Mindfulness Opportunity",
        description:
          "Try incorporating more mindfulness activities into your daily routine.",
        icon: Sparkles,
        priority: "low",
      });
    }
  }

  // Check activity completion rate
  const completedActivities = recentActivities.filter((a) => a.completed);
  const completionRate =
    recentActivities.length > 0
      ? (completedActivities.length / recentActivities.length) * 100
      : 0;

  if (completionRate >= 80) {
    insights.push({
      title: "High Achievement",
      description: `You've completed ${Math.round(
        completionRate
      )}% of your activities this week. Excellent commitment!`,
      icon: Trophy,
      priority: "high",
    });
  } else if (completionRate < 50) {
    insights.push({
      title: "Activity Reminder",
      description:
        "You might benefit from setting smaller, more achievable daily goals.",
      icon: Calendar,
      priority: "medium",
    });
  }

  // Time pattern analysis
  const morningActivities = recentActivities.filter(
    (a) => new Date(a.timestamp).getHours() < 12
  );
  const eveningActivities = recentActivities.filter(
    (a) => new Date(a.timestamp).getHours() >= 18
  );

  if (morningActivities.length > eveningActivities.length) {
    insights.push({
      title: "Morning Person",
      description:
        "You're most active in the mornings. Consider scheduling important tasks during your peak hours.",
      icon: Sun,
      priority: "medium",
    });
  } else if (eveningActivities.length > morningActivities.length) {
    insights.push({
      title: "Evening Routine",
      description:
        "You tend to be more active in the evenings. Make sure to wind down before bedtime.",
      icon: Moon,
      priority: "medium",
    });
  }

  // Sort insights by priority and return top 3
  return insights
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const { user } = useSession();

  // Rename the state variable
  const [insights, setInsights] = useState<
    {
      title: string;
      description: string;
      icon: any;
      priority: "low" | "medium" | "high";
    }[]
  >([]);

  // New states for activities and wearables
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showCheckInChat, setShowCheckInChat] = useState(false);
  const [activityHistory, setActivityHistory] = useState<DayActivity[]>([]);
  const [showActivityLogger, setShowActivityLogger] = useState(false);
  const [isSavingActivity, setIsSavingActivity] = useState(false);
  const [isSavingMood, setIsSavingMood] = useState(false);
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    moodScore: null,
    completionRate: 100,
    mindfulnessCount: 0,
    totalActivities: 0,
    lastUpdated: new Date(),
  });

  // Add this function to transform activities into day activity format
  const transformActivitiesToDayActivity = (
    activities: Activity[]
  ): DayActivity[] => {
    const days: DayActivity[] = [];
    const today = new Date();

    // Create array for last 28 days
    for (let i = 27; i >= 0; i--) {
      const date = startOfDay(subDays(today, i));
      const dayActivities = activities.filter((activity) =>
        isWithinInterval(new Date(activity.timestamp), {
          start: date,
          end: addDays(date, 1),
        })
      );

      // Determine activity level based on number of activities
      let level: ActivityLevel = "none";
      if (dayActivities.length > 0) {
        if (dayActivities.length <= 2) level = "low";
        else if (dayActivities.length <= 4) level = "medium";
        else level = "high";
      }

      days.push({
        date,
        level,
        activities: dayActivities.map((activity) => ({
          type: activity.type,
          name: activity.name,
          completed: activity.completed,
          time: format(new Date(activity.timestamp), "h:mm a"),
        })),
      });
    }

    return days;
  };

  // Modify the loadActivities function to use a default user ID
  const loadActivities = useCallback(async () => {
    try {
      const userActivities = await getUserActivities("default-user");
      setActivities(userActivities);
      setActivityHistory(transformActivitiesToDayActivity(userActivities));
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Add this effect to update stats when activities change
  useEffect(() => {
    if (activities.length > 0) {
      setDailyStats(calculateDailyStats(activities));
    }
  }, [activities]);

  // Update the effect
  useEffect(() => {
    if (activities.length > 0) {
      setInsights(generateInsights(activities));
    }
  }, [activities]);

  // Add function to fetch daily stats
  const fetchDailyStats = useCallback(async () => {
    try {
      // Fetch therapy sessions using the chat API
      const sessions = await getAllChatSessions();

      // Fetch today's activities
      const activitiesResponse = await fetch("/api/activities/today");
      if (!activitiesResponse.ok) throw new Error("Failed to fetch activities");
      const activities = await activitiesResponse.json();

      // Calculate mood score from activities
      const moodEntries = activities.filter(
        (a: Activity) => a.type === "mood" && a.moodScore !== null
      );
      const averageMood =
        moodEntries.length > 0
          ? Math.round(
              moodEntries.reduce(
                (acc: number, curr: Activity) => acc + (curr.moodScore || 0),
                0
              ) / moodEntries.length
            )
          : null;

      setDailyStats({
        moodScore: averageMood,
        completionRate: 100,
        mindfulnessCount: sessions.length, // Total number of therapy sessions
        totalActivities: activities.length,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Error fetching daily stats:", error);
    }
  }, []);

  // Fetch stats on mount and every 5 minutes
  useEffect(() => {
    fetchDailyStats();
    const interval = setInterval(fetchDailyStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchDailyStats]);

  // Update wellness stats to reflect the changes
  const wellnessStats = [
    {
      title: "Mood Score",
      value: dailyStats.moodScore ? `${dailyStats.moodScore}%` : "No data",
      icon: Brain,
      color: "text-[#b39ddb]",
      bgColor: "bg-[#b39ddb]/10",
      description: "Today's average mood",
    },
    {
      title: "Completion Rate",
      value: "100%",
      icon: Trophy,
      color: "text-[#b39ddb]",
      bgColor: "bg-[#b39ddb]/10",
      description: "Perfect completion rate",
    },
    {
      title: "Therapy Sessions",
      value: `${dailyStats.mindfulnessCount} sessions`,
      icon: Heart,
      color: "text-[#b39ddb]",
      bgColor: "bg-[#b39ddb]/10",
      description: "Total sessions completed",
    },
    {
      title: "Total Activities",
      value: dailyStats.totalActivities.toString(),
      icon: Activity,
      color: "text-[#b39ddb]",
      bgColor: "bg-[#b39ddb]/10",
      description: "Planned for today",
    },
  ];

  // Load activities on mount
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // Add these action handlers
  const handleStartTherapy = () => {
    router.push("/therapy/new");
  };

  const handleMoodSubmit = async (data: { moodScore: number }) => {
    setIsSavingMood(true);
    try {
      await saveMoodData({
        userId: "default-user",
        mood: data.moodScore,
        note: "",
      });
      setShowMoodModal(false);
    } catch (error) {
      console.error("Error saving mood:", error);
    } finally {
      setIsSavingMood(false);
    }
  };

  const handleAICheckIn = () => {
    setShowActivityLogger(true);
  };

  // Add handler for game activities
  const handleGamePlayed = useCallback(
    async (gameName: string, description: string) => {
      try {
        await logActivity({
          userId: "default-user",
          type: "game",
          name: gameName,
          description: description,
          duration: 0,
        });

        // Refresh activities after logging
        loadActivities();
      } catch (error) {
        console.error("Error logging game activity:", error);
      }
    },
    [loadActivities]
  );

  // Simple loading state
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-black overflow-x-hidden">
      {/* Blurred glows for depth: only light purple and lime green */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#b39ddb] opacity-25 rounded-full blur-[120px] z-0"></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-80 h-80 bg-[#b9ff66] opacity-15 rounded-full blur-[100px] z-0"></div>
      <Container className="pt-20 pb-8 space-y-6 relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-1">
              Welcome back, {user?.name || "there"}
            </h1>
            <p className="text-white text-lg font-medium">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-[#b39ddb]/20 transition-all"
            >
              <Bell className="h-5 w-5 group-hover:animate-bounce text-[#b39ddb]" />
            </Button>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-0.5 bg-gradient-to-r from-[#b39ddb]/30 via-[#b9ff66]/20 to-transparent rounded-full mb-2" />
        {/* Main Grid Layout */}
        <div className="space-y-6">
          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Quick Actions Card */}
            <Card className="border-[#b39ddb]/30 relative overflow-hidden group backdrop-blur-xl bg-[#23232b]/60 border shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#b39ddb]/10 via-[#b9ff66]/10 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#b39ddb]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5 text-[#b9ff66] group-hover:animate-spin" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">
                        Quick Actions
                      </h3>
                      <p className="text-sm text-[#b39ddb]">
                        Start your wellness journey
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Button
                      variant="default"
                      className={cn(
                        "w-full justify-between items-center p-6 h-auto group/button",
                        "bg-gradient-to-r from-[#b39ddb]/80 via-[#b9ff66]/80 to-[#23232b]/80 hover:from-[#b9ff66] hover:to-[#b39ddb]",
                        "transition-all duration-200 group-hover:scale-[1.03] shadow-lg text-black"
                      )}
                      onClick={handleStartTherapy}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white group-hover:animate-pulse" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">
                            Start Therapy
                          </div>
                          <div className="text-xs text-white/80">
                            Begin a new session
                          </div>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/mood hover:border-[#b39ddb]/50",
                          "justify-center items-center text-center bg-[#23232b]/60 border border-[#b39ddb]/20 backdrop-blur-md shadow-md hover:shadow-xl",
                          "transition-all duration-200 group-hover:scale-[1.03] text-white"
                        )}
                        onClick={() => setShowMoodModal(true)}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#b39ddb]/20 flex items-center justify-center mb-2">
                          <Heart className="w-5 h-5 text-[#b9ff66] group-hover:animate-bounce" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-white">
                            Track Mood
                          </div>
                          <div className="text-xs text-[#b39ddb] mt-0.5">
                            How are you feeling?
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex flex-col h-[120px] px-4 py-3 group/ai hover:border-[#b9ff66]/50",
                          "justify-center items-center text-center bg-[#23232b]/60 border border-[#b9ff66]/20 backdrop-blur-md shadow-md hover:shadow-xl",
                          "transition-all duration-200 group-hover:scale-[1.03] text-white"
                        )}
                        onClick={handleAICheckIn}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#b9ff66]/20 flex items-center justify-center mb-2">
                          <BrainCircuit className="w-5 h-5 text-[#b39ddb] group-hover:animate-bounce" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-white">
                            Check-in
                          </div>
                          <div className="text-xs text-[#b9ff66] mt-0.5">
                            Quick wellness check
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Today's Overview Card */}
            <Card className="border-[#b39ddb]/30 backdrop-blur-xl bg-[#23232b]/60 border shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-[#b39ddb]">
                      Today's Overview
                    </CardTitle>
                    <CardDescription className="text-white">
                      Your wellness metrics for{" "}
                      {format(new Date(), "MMMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={fetchDailyStats}
                    className="h-8 w-8"
                  >
                    <Loader2
                      className={cn(
                        "h-4 w-4",
                        "animate-spin",
                        "text-[#b9ff66]"
                      )}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {wellnessStats.map((stat) => (
                    <div
                      key={stat.title}
                      className={cn(
                        "p-4 rounded-lg transition-all duration-200 hover:scale-[1.04] shadow-md border border-[#b39ddb]/10 backdrop-blur-md bg-[#18181b]/80",
                        stat.bgColor
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <stat.icon
                          className={cn(
                            "w-5 h-5",
                            stat.color,
                            "group-hover:animate-bounce"
                          )}
                        />
                        <p className="text-sm font-medium text-white">
                          {stat.title}
                        </p>
                      </div>
                      <p className="text-2xl font-bold mt-2 text-[#b9ff66]">
                        {stat.value}
                      </p>
                      <p className="text-sm text-[#b39ddb] mt-1">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-[#b39ddb] text-right">
                  Last updated: {format(dailyStats.lastUpdated, "h:mm a")}
                </div>
              </CardContent>
            </Card>
            {/* Insights Card */}
            <Card className="border-transparent backdrop-blur-xl bg-[#23232b]/60 shadow-[0_0_16px_0_#b9ff6640] hover:shadow-[0_0_32px_0_#b9ff6640] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#b9ff66]">
                  {" "}
                  <BrainCircuit className="w-5 h-5 text-[#b39ddb]" /> Insights
                </CardTitle>
                <CardDescription className="text-white">
                  Personalized recommendations based on your activity patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.length > 0 ? (
                    insights.map((insight, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-4 rounded-lg space-y-2 transition-all hover:scale-[1.04] shadow-md border border-[#b9ff66]/10 backdrop-blur-md bg-[#18181b]/80",
                          insight.priority === "high"
                            ? "bg-[#b9ff66]/10"
                            : insight.priority === "medium"
                            ? "bg-[#b39ddb]/10"
                            : "bg-[#23232b]/10"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <insight.icon className="w-5 h-5 text-[#b9ff66] group-hover:animate-bounce" />
                          <p className="font-medium text-white">
                            {insight.title}
                          </p>
                        </div>
                        <p className="text-sm text-[#b39ddb]">
                          {insight.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-[#b39ddb] py-8">
                      <Activity className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p>
                        Complete more activities to receive personalized
                        insights
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Section Divider */}
          <div className="w-full h-0.5 bg-gradient-to-r from-[#b39ddb]/20 via-[#b9ff66]/20 to-transparent rounded-full my-4" />
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side - Spans 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Anxiety Games - Now directly below Fitbit */}
              <AnxietyGames onGamePlayed={handleGamePlayed} />
            </div>
          </div>
        </div>
      </Container>
      {/* Mood tracking modal */}
      <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
        <DialogContent className="sm:max-w-[425px] bg-[#23232b] border border-[#b39ddb]/20">
          <DialogHeader>
            <DialogTitle className="text-[#b39ddb]">
              How are you feeling?
            </DialogTitle>
            <DialogDescription className="text-white">
              Move the slider to track your current mood
            </DialogDescription>
          </DialogHeader>
          <MoodForm onSuccess={() => setShowMoodModal(false)} />
        </DialogContent>
      </Dialog>
      {/* AI check-in chat */}
      {showCheckInChat && (
        <div className="fixed inset-0 bg-[#23232b]/80 backdrop-blur-sm z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#18181b] border-l border-[#b39ddb]/20 shadow-lg">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#b39ddb]/20">
                <h3 className="font-semibold text-[#b39ddb]">AI Check-in</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCheckInChat(false)}
                >
                  <X className="w-4 h-4 text-[#b39ddb]" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4"></div>
            </div>
          </div>
        </div>
      )}
      <ActivityLogger
        open={showActivityLogger}
        onOpenChange={setShowActivityLogger}
        onActivityLogged={loadActivities}
      />
    </div>
  );
}
