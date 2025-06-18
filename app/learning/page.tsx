import AIRecommendations from "./ai-recommendations"

export default function LearningPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <AIRecommendations />
      </div>
      <h1 className="text-3xl font-bold mb-4">Learning Resources</h1>
      <p className="mb-4">
        Welcome to the learning resources page. Here you can find various materials to enhance your knowledge and
        skills.
      </p>

      {/* Example content - replace with actual learning resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Course 1: Introduction to React</h2>
          <p>Learn the basics of React and build your first application.</p>
          <a href="#" className="text-blue-500 hover:underline">
            Start Course
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Tutorial: Node.js Fundamentals</h2>
          <p>Explore the fundamentals of Node.js and server-side development.</p>
          <a href="#" className="text-blue-500 hover:underline">
            View Tutorial
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Article: Mastering CSS Layouts</h2>
          <p>Discover advanced CSS layout techniques for responsive web design.</p>
          <a href="#" className="text-blue-500 hover:underline">
            Read Article
          </a>
        </div>
      </div>
    </div>
  )
}
