
import { Suspense } from 'react';
import FeedbackClientComponent from './feedback-client';

// Wrap the component that uses useSearchParams in a Suspense boundary
export default function FisherfolkFeedbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackClientComponent />
    </Suspense>
  );
}

