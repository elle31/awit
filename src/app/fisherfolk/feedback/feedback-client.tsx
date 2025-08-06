
'use client';

import { useTranslation } from '@/contexts/language-context';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
export default function FeedbackClientComponent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  
  // Example of how to use searchParams if needed in the future
  // const feedbackType = searchParams.get('type');

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">{t("Submit Feedback")}</h1>
        <p className="text-muted-foreground">
          {t("Have a complaint or suggestion? Let us know.")}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("Feedback Form")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label htmlFor="feedback-type">{t("Feedback Type")}</Label>
                <Select>
                    <SelectTrigger id="feedback-type">
                        <SelectValue placeholder={t("Select a type")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="suggestion">{t("Suggestion")}</SelectItem>
                        <SelectItem value="complaint">{t("Complaint")}</SelectItem>
                        <SelectItem value="bug">{t("Report a Bug")}</SelectItem>
                        <SelectItem value="other">{t("Other")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="subject">{t("Subject")}</Label>
                <Input id="subject" placeholder={t("e.g., Difficulty uploading photos")}/>
            </div>
            <div>
                <Label htmlFor="message">{t("Message")}</Label>
                <Textarea id="message" placeholder={t("Describe your feedback in detail...")} rows={5}/>
            </div>
            <div className="flex justify-end">
                <Button>{t("Submit Feedback")}</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
