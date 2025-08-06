
import { FeedbackForm } from "@/components/fisherfolk/feedback-form";
import { useTranslation } from "@/contexts/language-context";
import { Suspense } from "react";

export default function FisherfolkFeedbackPage() {
    const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">{t("Submit Feedback")}</h1>
        <p className="text-muted-foreground">
          {t("Have a complaint or suggestion? Let us know.")}
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FeedbackForm />
      </Suspense>
    </div>
  );
}
