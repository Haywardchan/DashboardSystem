import Link from "next/link"
import { CircleDot, MessageSquare } from "lucide-react"

const issues = [
  {
    id: 55,
    title: "Chakra V3",
    author: "rbmdotdev",
    date: "Nov 27, 2024",
    comments: 0,
  },
  {
    id: 51,
    title: "TagsField doesn't exist in components.",
    author: "Osama092",
    date: "Aug 27, 2024",
    comments: 0,
  },
  {
    id: 50,
    title: "Pie chart labels hard to read",
    author: "mountainash",
    date: "Jul 24, 2024",
    comments: 1,
  },
  {
    id: 49,
    title: "upgrading to ES6 breaks the project",
    author: "devuser",
    date: "Jun 15, 2024",
    comments: 3,
  },
]

export default function IssuesList() {
  return (
    <div>
      {issues.map((issue, index) => (
        <div
          key={issue.id}
          className={`flex items-start p-4 hover:bg-gray-100 ${
            index !== issues.length - 1 ? "border-b border-gray-300" : ""
          }`}
        >
          <div className="mr-3 mt-1 text-green-600">
            <CircleDot className="h-4 w-4" />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <Link href="/" className="font-semibold text-gray-900 hover:text-blue-600">
                {issue.title}
              </Link>
            </div>
            <div className="text-xs text-gray-700 mt-1">
              #{issue.id} • {issue.author} opened on {issue.date}
            </div>
          </div>
          {issue.comments > 0 && (
            <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 text-xs ml-2">
              <MessageSquare className="h-3 w-3 mr-1" />
              {issue.comments}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
