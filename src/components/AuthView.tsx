import React, { FormEvent, useState } from 'react';
import { AuthError, SupabaseClient } from '@supabase/supabase-js';
import { AlertCircle, ArrowRight, Brain, CheckCircle2, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { supabaseConfigurationError } from '../services/supabaseClient';

interface AuthViewProps {
  client: SupabaseClient | null;
}

type AuthMode = 'sign-in' | 'sign-up';

const errorMessage = (error: AuthError): string => error.message;

export const AuthView: React.FC<AuthViewProps> = ({ client }) => {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client) return;

    setError(null);
    setNotice(null);
    setIsSubmitting(true);

    try {
      const result = mode === 'sign-in'
        ? await client.auth.signInWithPassword({ email: email.trim(), password })
        : await client.auth.signUp({
            email: email.trim(),
            password,
            options: {
              emailRedirectTo: window.location.origin,
              data: { full_name: name.trim() }
            }
          });

      if (result.error) {
        setError(errorMessage(result.error));
      } else if (mode === 'sign-up' && !result.data.session) {
        setNotice('Check your email for a confirmation link to finish creating your account.');
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-soft-white)] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-700 bg-white p-7 shadow-xl sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
            <Brain className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="text-sm font-extrabold tracking-tight text-slate-100">
            DOMAIN<span className="text-emerald-600">BREAKERS</span>
          </p>
          <h1 className="mt-5 text-2xl font-bold text-slate-100">
            {mode === 'sign-in' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === 'sign-in'
              ? 'Sign in to continue your learning journey.'
              : 'Sign up to save your learning progress.'}
          </p>
        </div>

        {supabaseConfigurationError && (
          <div role="alert" className="mb-5 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{supabaseConfigurationError}</span>
          </div>
        )}

        {error && (
          <div role="alert" className="mb-5 flex gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {notice && (
          <div role="status" className="mb-5 flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'sign-up' && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-200">Full name</span>
              <span className="relative block">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-700 bg-white py-3 pl-10 pr-3 text-sm text-slate-100 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                />
              </span>
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-200">Email address</span>
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-white py-3 pl-10 pr-3 text-sm text-slate-100 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-200">Password</span>
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="password"
                autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                minLength={8}
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder={mode === 'sign-in' ? 'Enter your password' : 'At least 8 characters'}
                className="w-full rounded-xl border border-slate-700 bg-white py-3 pl-10 pr-3 text-sm text-slate-100 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />
            </span>
          </label>

          <button
            type="submit"
            disabled={!client || isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
            {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {mode === 'sign-in' ? 'New to DomainBreakers?' : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in');
              setError(null);
              setNotice(null);
            }}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {mode === 'sign-in' ? 'Create an account' : 'Sign in'}
          </button>
        </p>
      </section>
    </main>
  );
};
