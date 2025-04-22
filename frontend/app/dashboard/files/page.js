"use client"

import { useState } from "react"
import { Upload, File, FileText, ImageIcon, Film, Archive, MoreVertical, Search, Grid, List } from "lucide-react"

export default function Files() {
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Dummy data for files
  const allFiles = [
    {
      id: "1",
      name: "Project Requirements.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "Demo User",
      uploadedAt: "2023-06-10",
      icon: FileText,
    },
    {
      id: "2",
      name: "Homepage Mockup.png",
      type: "image",
      size: "4.8 MB",
      uploadedBy: "Jane Smith",
      uploadedAt: "2023-06-08",
      icon: ImageIcon,
    },
    {
      id: "3",
      name: "Meeting Notes.docx",
      type: "document",
      size: "1.2 MB",
      uploadedBy: "John Doe",
      uploadedAt: "2023-06-05",
      icon: FileText,
    },
    {
      id: "4",
      name: "Product Demo.mp4",
      type: "video",
      size: "24.6 MB",
      uploadedBy: "Demo User",
      uploadedAt: "2023-06-01",
      icon: Film,
    },
    {
      id: "5",
      name: "Logo Assets.zip",
      type: "archive",
      size: "8.2 MB",
      uploadedBy: "Jane Smith",
      uploadedAt: "2023-05-28",
      icon: Archive,
    },
    {
      id: "6",
      name: "Financial Report.xlsx",
      type: "spreadsheet",
      size: "3.1 MB",
      uploadedBy: "John Doe",
      uploadedAt: "2023-05-25",
      icon: FileText,
    },
    {
      id: "7",
      name: "Brand Guidelines.pdf",
      type: "pdf",
      size: "5.7 MB",
      uploadedBy: "Demo User",
      uploadedAt: "2023-05-20",
      icon: FileText,
    },
    {
      id: "8",
      name: "Presentation.pptx",
      type: "presentation",
      size: "6.3 MB",
      uploadedBy: "Jane Smith",
      uploadedAt: "2023-05-18",
      icon: FileText,
    },
  ]

  // Filter files based on search query
  const filteredFiles = allFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Function to get file icon based on type
  const getFileIcon = (file) => {
    const IconComponent = file.icon
    return <IconComponent className="h-6 w-6" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Files</h1>
        <button className="btn-primary flex items-center">
          <Upload className="h-5 w-5 mr-1" /> Upload
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex rounded-md shadow-sm">
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-l-md ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-r-md ${viewMode === "list" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredFiles.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-2 text-indigo-600">
                        {getFileIcon(file)}
                      </div>
                      <p className="font-medium text-sm truncate w-full">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Uploaded By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                              {getFileIcon(file)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-sm text-gray-500">{file.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.uploadedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.uploadedAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <File className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No files found</h3>
              <p className="text-gray-500">
                {searchQuery ? "Try adjusting your search criteria." : "Get started by uploading your first file."}
              </p>
              {!searchQuery && (
                <button className="btn-primary mt-4 flex items-center mx-auto">
                  <Upload className="h-5 w-5 mr-1" /> Upload Files
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
