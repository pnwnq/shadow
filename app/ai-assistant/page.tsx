import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatInterface from "./chat-interface"
import AIRecommendations from "../learning/ai-recommendations"

export default function Page() {
  return (
    <Tabs defaultValue="chat" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chat">智能问答</TabsTrigger>
        <TabsTrigger value="recommendations">学习推荐</TabsTrigger>
      </TabsList>

      <TabsContent value="chat" className="mt-6">
        <ChatInterface />
      </TabsContent>

      <TabsContent value="recommendations" className="mt-6">
        <AIRecommendations />
      </TabsContent>
    </Tabs>
  )
}
