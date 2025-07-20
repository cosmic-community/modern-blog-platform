'use client'

export default function BackButton() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <button
      onClick={handleGoBack}
      className="inline-block w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
    >
      Go Back
    </button>
  )
}