
import { Suspense } from 'react';
import FeedbackClientComponent from './feedback-client';

export default function FisherfolkFeedbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackClientComponent />
    </Suspense>
  );
}
