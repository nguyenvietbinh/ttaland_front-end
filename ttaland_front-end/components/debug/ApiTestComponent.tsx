'use client'
import { useState, useEffect } from 'react'

interface TestResult {
  status: 'SUCCESS' | 'ERROR' | 'FAILED';
  data?: unknown;
  error?: string;
  sampleMediaUrl?: string;
  statusCode?: number;
  count?: number;
  hasResults?: boolean;
  firstResult?: unknown;
}

interface TestResults {
  [key: string]: TestResult;
}

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState<TestResults>({})
  const [loading, setLoading] = useState(false)

  const testApiEndpoints = async () => {
    setLoading(true)
    const results: TestResults = {}

    const endpoints = [
      { name: 'Properties', url: 'http://localhost:8000/api/properties/' },
      { name: 'Projects', url: 'http://localhost:8000/api/projects/' },
      { name: 'Apartments', url: 'http://localhost:8000/api/apartments/' },
      { name: 'Townhouses', url: 'http://localhost:8000/api/townhouses/' },
      { name: 'Villas', url: 'http://localhost:8000/api/villas/' },
      { name: 'Land', url: 'http://localhost:8000/api/land/' }
    ]

    for (const endpoint of endpoints) {
      try {
        console.log(`Testing ${endpoint.name}: ${endpoint.url}`)
        
        const response = await fetch(endpoint.url)
        
        if (response.ok) {
          const data = await response.json()
          results[endpoint.name] = {
            status: 'SUCCESS',
            statusCode: response.status,
            count: data.count || 0,
            hasResults: data.results && data.results.length > 0,
            firstResult: data.results?.[0] || null,
            sampleMediaUrl: data.results?.[0]?.media?.[0]?.file || 
                           data.results?.[0]?.main_images?.[0] || null
          }
        } else {
          results[endpoint.name] = {
            status: 'ERROR',
            statusCode: response.status,
            error: `HTTP ${response.status}`
          }
        }
      } catch (error) {
        results[endpoint.name] = {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Network error'
        }
      }
    }

    setTestResults(results)
    setLoading(false)
  }

  useEffect(() => {
    testApiEndpoints()
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">API Connectivity Test</h2>
      
      <button 
        onClick={testApiEndpoints}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Retest APIs'}
      </button>

      <div className="space-y-4">
        {Object.entries(testResults).map(([name, result]: [string, TestResult]) => (
          <div key={name} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
              <span className={`px-2 py-1 rounded text-sm font-medium ${
                result.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                result.status === 'ERROR' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {result.status}
              </span>
            </div>
            
            {result.status === 'SUCCESS' && (
              <div className="text-sm text-gray-600 space-y-1">
                <p>Status Code: {result.statusCode}</p>
                <p>Total Count: {result.count}</p>
                <p>Has Results: {result.hasResults ? 'Yes' : 'No'}</p>
                {result.sampleMediaUrl && (
                  <p>Sample Media URL: <code className="bg-gray-100 px-1 rounded">{result.sampleMediaUrl}</code></p>
                )}
                {result.firstResult && typeof result.firstResult === 'object' ? (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-600">Show First Result</summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.firstResult, null, 2)}
                    </pre>
                  </details>
                ) : null}
              </div>
            )}
            
            {(result.status === 'ERROR' || result.status === 'FAILED') && (
              <div className="text-sm text-red-600">
                <p>Error: {result.error}</p>
                {result.statusCode && <p>Status Code: {result.statusCode}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick image test */}
      {Object.values(testResults).some((result: TestResult) => result.sampleMediaUrl) && (
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Image URL Test</h3>
          {Object.entries(testResults).map(([name, result]: [string, TestResult]) => 
            result.sampleMediaUrl ? (
              <div key={name} className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{name} - Media URL: {result.sampleMediaUrl}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Full URL: {result.sampleMediaUrl?.startsWith('http') ? result.sampleMediaUrl : `http://localhost:8000${result.sampleMediaUrl}`}
                </p>
                <img 
                  src={result.sampleMediaUrl?.startsWith('http') ? result.sampleMediaUrl : `http://localhost:8000${result.sampleMediaUrl}`}
                  alt={`Test image from ${name}`}
                  className="w-32 h-32 object-cover border rounded"
                  onLoad={() => console.log(`✅ Image loaded successfully: ${result.sampleMediaUrl}`)}
                  onError={(e) => {
                    console.log(`❌ Image failed to load: ${result.sampleMediaUrl}`)
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  )
}

export default ApiTestComponent
