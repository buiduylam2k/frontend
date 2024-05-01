import LoadingSpinner from "@/components/loading-spinner"

function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <span>
        <LoadingSpinner />
        Loading...
      </span>
    </div>
  )
}

export default Loading
