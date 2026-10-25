import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 — No Footage — Folk Cinema</title>
      </Helmet>

      <main className="min-h-screen bg-charcoal text-cream flex flex-col justify-between p-8 md:p-16 select-none">
        <div className="font-mono text-xs uppercase tracking-widest text-cream/40">
          ERROR // 404
        </div>

        <div className="my-auto">
          <h1 className="font-display-mega text-[16vw] text-cream leading-tight-display tracking-condensed-display uppercase whitespace-nowrap">
            NO FOOTAGE
          </h1>
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-cream/60 mt-4">
            The requested reel or sequence does not exist in our archive.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block bg-terracotta text-cream px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-terracotta-hover transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>

        <div className="font-mono text-[10px] text-cream/30 uppercase tracking-widest">
          FOLK CINEMA ARCHIVES // 404 NOT FOUND
        </div>
      </main>
    </>
  );
};
