"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Target, Clock, Star, ArrowRight, Sparkles } from "lucide-react"

interface LearningPath {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: string
  progress: number
  topics: string[]
  resources: {
    id: string
    title: string
    type: "document" | "video" | "tutorial" | "project"
    url: string
  }[]
}

interface UserProfile {
  interests: string[]
  currentLevel: string
  completedTopics: string[]
  goals: string[]
}

export default function AIRecommendations() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true)
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 模拟数据
      setUserProfile({
        interests: ["嵌入式开发", "机器学习", "PCB设计"],
        currentLevel: "intermediate",
        completedTopics: ["Arduino基础", "C语言编程"],
        goals: ["参加电子设计竞赛", "掌握STM32开发"],
      })

      setLearningPaths([
        {
          id: "1",
          title: "STM32微控制器开发进阶",
          description: "基于您的嵌入式开发兴趣和竞赛目标，推荐深入学习STM32开发",
          difficulty: "intermediate",
          estimatedTime: "4-6周",
          progress: 25,
          topics: ["STM32 HAL库", "RTOS", "外设驱动", "调试技巧"],
          resources: [
            { id: "1", title: "STM32开发环境搭建", type: "tutorial", url: "/documents/stm32-setup" },
            { id: "2", title: "HAL库使用指南", type: "document", url: "/documents/hal-guide" },
            { id: "3", title: "实战项目：智能小车", type: "project", url: "/projects/smart-car" },
          ],
        },
        {
          id: "2",
          title: "PCB设计与制作",
          description: "结合您的PCB设计兴趣，从原理图到成品的完整流程",
          difficulty: "beginner",
          estimatedTime: "3-4周",
          progress: 0,
          topics: ["Altium Designer", "原理图设计", "PCB布线", "制造工艺"],
          resources: [
            { id: "4", title: "Altium Designer入门", type: "video", url: "/learning/altium-basics" },
            { id: "5", title: "PCB设计规范", type: "document", url: "/documents/pcb-rules" },
            { id: "6", title: "实战：LED矩阵驱动板", type: "project", url: "/projects/led-matrix" },
          ],
        },
        {
          id: "3",
          title: "机器学习在嵌入式系统中的应用",
          description: "将机器学习技术应用到嵌入式设备，适合有一定基础的学习者",
          difficulty: "advanced",
          estimatedTime: "6-8周",
          progress: 0,
          topics: ["TensorFlow Lite", "模型优化", "边缘计算", "实时推理"],
          resources: [
            { id: "7", title: "TensorFlow Lite入门", type: "tutorial", url: "/learning/tflite-intro" },
            { id: "8", title: "模型量化技术", type: "document", url: "/documents/model-quantization" },
            { id: "9", title: "智能语音识别项目", type: "project", url: "/projects/voice-recognition" },
          ],
        },
      ])
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <Target className="h-4 w-4" />
      case "tutorial":
        return <Star className="h-4 w-4" />
      case "project":
        return <ArrowRight className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {userProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI 个性化推荐
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">您的兴趣领域</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">学习目标</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.goals.map((goal, index) => (
                    <Badge key={index} variant="outline">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {learningPaths.map((path) => (
          <Card key={path.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                </div>
                <Badge className={getDifficultyColor(path.difficulty)}>{path.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {path.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {path.topics.length} 个主题
                </div>
              </div>

              {path.progress > 0 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>学习进度</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">主要内容</h4>
                <div className="flex flex-wrap gap-2">
                  {path.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">推荐资源</h4>
                <div className="space-y-2">
                  {path.resources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="flex items-center gap-2 text-sm">
                      {getResourceIcon(resource.type)}
                      <span className="flex-1">{resource.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">{path.progress > 0 ? "继续学习" : "开始学习"}</Button>
                <Button variant="outline">查看详情</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
