
'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/contexts/language-context';
import { FeedbackForm } from '@/components/fisherfolk/feedback-form';

export default function FeedbackClientComponent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  // You can now use searchParams if needed, for example:
  // const feedbackType = searchParams.get('type');

  return <FeedbackForm t={t} />;
}
