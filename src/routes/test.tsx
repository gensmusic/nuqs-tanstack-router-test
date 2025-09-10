import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

// Define zod schema
const searchSchema = z.object({
  page: z.number().min(1).default(1),
  sort: z.enum(['asc', 'desc']).default('asc'),
  filters: z.object({
    author: z.string().optional(),
    min_words: z.number().min(0).optional(),
  }).default({}),
})

type SearchParams = z.infer<typeof searchSchema>

export const Route = createFileRoute('/test')({
  component: TestPage,
  validateSearch: searchSchema,
})

function TestPage() {
  const navigate = useNavigate()
  const search = Route.useSearch()

  const [localForm, setLocalForm] = useState({
    author: search.filters.author || '',
    min_words: search.filters.min_words?.toString() || '',
    sort: search.sort,
    page: search.page.toString(),
  })

  const handleUpdateSearch = () => {
    const newSearch: SearchParams = {
      page: parseInt(localForm.page) || 1,
      sort: localForm.sort as 'asc' | 'desc',
      filters: {
        author: localForm.author || undefined,
        min_words: localForm.min_words ? parseInt(localForm.min_words) : undefined,
      },
    }
    navigate({ 
      to: '.',
      search: newSearch 
    })
  }

  const handleReset = () => {
    const defaultSearch: SearchParams = {
      page: 1,
      sort: 'asc',
      filters: {},
    }
    navigate({ 
      to: '.',
      search: defaultSearch 
    })
    setLocalForm({
      author: '',
      min_words: '',
      sort: 'asc',
      page: '1',
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Nuqs Test Page</h1>
        <p className="text-muted-foreground">
          Test complex search parameter types with zod validation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Search Parameters Control</CardTitle>
            <CardDescription>
              Modify parameters and click "Update Search" to update search parameters in URL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="page">Page</Label>
              <Input
                id="page"
                type="number"
                min="1"
                value={localForm.page}
                onChange={(e) => setLocalForm(prev => ({ ...prev, page: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort">Sort</Label>
              <Select
                value={localForm.sort}
                onValueChange={(value: 'asc' | 'desc') => setLocalForm(prev => ({ ...prev, sort: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending (asc)</SelectItem>
                  <SelectItem value="desc">Descending (desc)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  placeholder="Enter author name"
                  value={localForm.author}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="min_words">Min Words</Label>
                <Input
                  id="min_words"
                  type="number"
                  min="0"
                  placeholder="Enter minimum word count"
                  value={localForm.min_words}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, min_words: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateSearch} className="flex-1">
                Update Search
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Status Display */}
        <Card>
          <CardHeader>
            <CardTitle>Current Search Status</CardTitle>
            <CardDescription>
              Display current search parameter values in URL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Page</Badge>
                <span className="font-mono">{search.page}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">Sort</Badge>
                <span className="font-mono">{search.sort}</span>
              </div>

              <div className="space-y-2">
                <Badge variant="secondary">Filters</Badge>
                <div className="ml-4 space-y-1">
                  {search.filters.author && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Author:</span>
                      <span className="font-mono">{search.filters.author}</span>
                    </div>
                  )}
                  {search.filters.min_words && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Min Words:</span>
                      <span className="font-mono">{search.filters.min_words}</span>
                    </div>
                  )}
                  {!search.filters.author && !search.filters.min_words && (
                    <span className="text-sm text-muted-foreground">No filters</span>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Raw JSON Data</Label>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-auto">
                {JSON.stringify(search, null, 2)}
              </pre>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Current URL</Label>
              <div className="bg-muted p-3 rounded-md text-xs break-all">
                {window.location.href}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
