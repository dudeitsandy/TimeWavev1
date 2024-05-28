import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Subscribe = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    const { sessionId } = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Error redirecting to checkout:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="bg-primary text-white p-2 rounded"
      >
        {loading ? 'Loading...' : 'Subscribe'}
      </button>
    </div>
  );
};

export default Subscribe;
