
import { FeedbackForm } from "@/components/fisherfolk/feedback-form";
import { Suspense } from "react";

function FisherfolkFeedbackPageContent() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Submit Feedback</h1>
        <p className="text-muted-foreground">
          Have a complaint or suggestion? Let us know.
        </p>
      </div>
        <FeedbackForm />
    </div>
  );
}


export default function FisherfolkFeedbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <FisherfolkFeedbackPageContent />
    </Suspense>
  )
}
