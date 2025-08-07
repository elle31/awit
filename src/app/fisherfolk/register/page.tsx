
'use client';
import { RegistrationForm } from "@/components/fisherfolk/registration-form";
import { useTranslation } from "@/contexts/language-context";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function FisherfolkRegisterPage() {
    const { t } = useTranslation();
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">{t("New Registration")}</h1>
        <p className="text-muted-foreground">
          {t("Fill out the form below to register your vessel or fishing gear.")}
        </p>
      </div>
      <RegistrationForm />
    </div>
    </Suspense>
  );
}
