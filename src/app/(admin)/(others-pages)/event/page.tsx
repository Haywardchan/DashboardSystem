"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Check,
  ChevronDown,
  CircleDot,
  Code,
  GitPullRequest,
  MessageSquare,
  Play,
  Plus,
  Search,
  Shield,
  Tag,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import IssuesList from "@/components/issues-list"


export default function IssuesPage() {
  const [searchQuery, setSearchQuery] = useState("is:issue state:open")

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Repo Navigation */}
      <nav className="border-b border-gray-300 bg-white">
        <div className="flex overflow-x-auto">
          <Link href="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-200">
            <Code className="h-4 w-4 mr-2" />
            <span>Code</span>
          </Link>
          <Link href="/" className="flex items-center px-4 py-3 text-sm border-b-2 border-orange-500 font-semibold">
            <CircleDot className="h-4 w-4 mr-2" />
            <span>Issues</span>
            <Badge variant="secondary" className="ml-2 bg-gray-200 hover:bg-gray-200">
              5
            </Badge>
          </Link>
          <Link href="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-200">
            <GitPullRequest className="h-4 w-4 mr-2" />
            <span>Pull requests</span>
            <Badge variant="secondary" className="ml-2 bg-gray-200 hover:bg-gray-200">
              5
            </Badge>
          </Link>
          <Link href="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-200">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Discussions</span>
          </Link>
          <Link href="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-200">
            <Play className="h-4 w-4 mr-2" />
            <span>Actions</span>
          </Link>
          <Link href="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-200">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-8.25.75a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0ZM8 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 3Z"></path>
            </svg>
            <span>Projects</span>
          </Link>
          <Link href="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-200">
            <Shield className="h-4 w-4 mr-2" />
            <span>Security</span>
          </Link>
          <Link href="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-200">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path>
            </svg>
            <span>Insights</span>
          </Link>
        </div>
      </nav>

      {/* Contribution Banner */}
      <div className="p-4 border-b border-gray-300">
        <div className="max-w-6xl mx-auto bg-gray-100 border border-gray-300 rounded-md p-4 text-center">
          <p className="mb-2">
            <span className="mr-2">👋</span>
            <span className="font-semibold">Want to contribute to LoRa tags?</span>
          </p>
          <p className="text-sm">
            If you have a bug or an idea, read the{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              contributing guidelines
            </Link>{" "}
            before opening an issue.
          </p>
        </div>
      </div>

      {/* Issues Content */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Search and Filters */}
        <div className="mb-4 flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow">
            <div className="absolute left-3 top-2.5 text-gray-500">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 py-1.5 bg-white border-gray-300 rounded-md w-full"
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-300 bg-gray-100 hover:bg-gray-200 text-sm">
              <Tag className="h-4 w-4 mr-1" />
              Labels
            </Button>
            <Button variant="outline" className="border-gray-300 bg-gray-100 hover:bg-gray-200 text-sm">
              <svg className="h-4 w-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.75 0a.75.75 0 0 1 .75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 0 1 0 2.672l-2.07 1.75a1.75 1.75 0 0 1-1.13.414H8.5v5.25a.75.75 0 0 1-1.5 0V10H2.75A1.75 1.75 0 0 1 1 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 0 1 7.75 0Zm0 8.5h4.384a.25.25 0 0 0 .161-.06l2.07-1.75a.248.248 0 0 0 0-.38l-2.07-1.75a.25.25 0 0 0-.161-.06H2.75a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h5Z"></path>
              </svg>
              Milestones
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">New issue</Button>
          </div>
        </div>

        {/* Issues List Header */}
        <div className="bg-gray-100 border border-gray-300 rounded-t-md">
          <div className="flex items-center p-4 border-b border-gray-300">
            <Tabs defaultValue="open" className="w-full">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="open"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black data-[state=active]:font-semibold px-3 py-1 h-auto rounded-md"
                >
                  <CircleDot className="h-4 w-4 mr-2 text-green-500" />
                  <span>Open</span>
                  <Badge variant="secondary" className="ml-2 bg-gray-200 hover:bg-gray-200">
                    5
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="closed"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black data-[state=active]:font-semibold px-3 py-1 h-auto rounded-md"
                >
                  <Check className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Closed</span>
                  <Badge variant="secondary" className="ml-2 bg-gray-200 hover:bg-gray-200">
                    20
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 p-3 text-sm border-b border-gray-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:bg-gray-200">
                  Author
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-300 text-gray-900">
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">Filter by author</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:bg-gray-200">
                  Labels
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-300 text-gray-900">
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">Filter by label</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:bg-gray-200">
                  Projects
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-300 text-gray-900">
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">Filter by project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:bg-gray-200">
                  Milestones
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-300 text-gray-900">
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">
                  Filter by milestone
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:bg-gray-200">
                  Assignees
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-300 text-gray-900">
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">
                  Filter by assignee
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:bg-gray-200">
                  Types
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-300 text-gray-900">
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">Filter by type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-gray-600 hover:bg-gray-200">
                  Newest
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-300 text-gray-900">
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">Sort by newest</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">Sort by oldest</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">
                  Sort by most commented
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">
                  Sort by least commented
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">
                  Sort by recently updated
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-200 focus:text-gray-900">
                  Sort by least recently updated
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Issues List */}
          <IssuesList />
        </div>
      </div>
    </div>
  )
}

