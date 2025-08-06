
import { Suspense } from 'react';
import FeedbackClientComponent from './feedback-client';
import { headers } from 'next/headers';

// Wrap the component that uses useSearchParams in a Suspense boundary
export default function FisherfolkFeedbackPage() {
  // Access headers to force dynamic rendering
  headers();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackClientComponent />
    </Suspense>
  );
}

