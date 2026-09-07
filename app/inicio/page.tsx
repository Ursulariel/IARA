import { AppPageLayout } from "@/components/app-page-layout"
import { CreationActions } from "@/components/creation-actions"

export default function Page() {
  return (
    <AppPageLayout>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col">
            <CreationActions />
          </div>
        </div>
      </div>
    </AppPageLayout>
  )
}
