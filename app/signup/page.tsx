"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpenCheck, Loader2, Check, X, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Derived checks - recomputed on every render directly from state
  const minLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = email.trim().length > 0 && minLen && hasUpper && hasLower && hasNumber && passwordsMatch;

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("[Signup] Submit clicked. Checking fields...");
    
    // Read state directly via refs at call time (not memoized)
    const currentEmail = email; // captured at call time
    const currentPassword = password;
    const currentConfirm = confirmPassword;

    if (!currentEmail.trim()) { setError("Please enter your email address."); return; }
    if (currentPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (!/[A-Z]/.test(currentPassword)) { setError("Password must contain an uppercase letter."); return; }
    if (!/[a-z]/.test(currentPassword)) { setError("Password must contain a lowercase letter."); return; }
    if (!/[0-9]/.test(currentPassword)) { setError("Password must contain a number."); return; }
    if (currentPassword !== currentConfirm) { setError("Passwords do not match."); return; }
    
    console.log("[Signup] Validation passed. Submitting...");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentEmail.trim(), password: currentPassword }),
      });
      
      const data = await res.json();
      console.log("[Signup] Response:", res.status, data);

      if (!res.ok) {
        throw new Error(data?.error || `Error ${res.status}`);
      }

      console.log("[Signup] SUCCESS. Setting success=true, will redirect");
      setSuccess(true);
      
      setTimeout(() => {
        console.log("[Signup] Executing redirect...");
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      console.error("[Signup] Error:", err.message);
      const msg = err.message || "";
      if (msg.includes("already exists")) {
        setError("An account with this email already exists. Please sign in instead.");
      } else if (msg.includes("fetch") || msg.includes("Failed to fetch")) {
        setError("Unable to connect to server. Please check your connection and try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, router]);

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50">
        <div className="w-full max-w-md space-y-6 rounded-xl border border-emerald-500/30 bg-zinc-900 p-8 shadow-2xl text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
              <Check className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Account Created!</h2>
          <p className="text-zinc-400">You are being redirected to the sign in page...</p>
          <div className="pt-4 flex flex-col gap-3">
            <Link 
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Go to Sign In Now
            </Link>
            <a 
              href="/login"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Click here if you are not redirected automatically
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
              <BookOpenCheck className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create your account</h1>
          <p className="mt-2 text-sm text-zinc-400">Start publishing KDP books with AI.</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email address</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 block w-full rounded-md border border-zinc-700 bg-zinc-950/50 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="you@example.com" 
              required 
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Password</label>
            <div className="relative mt-1.5">
              <input 
                id="password"
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-zinc-700 bg-zinc-950/50 px-3 py-2.5 pr-10 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                placeholder="••••••••" 
                required 
                disabled={loading}
                autoComplete="new-password"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300" 
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="mt-3 space-y-1.5">
              {[
                { label: "At least 8 characters", check: minLen },
                { label: "One uppercase letter", check: hasUpper },
                { label: "One lowercase letter", check: hasLower },
                { label: "One number", check: hasNumber },
              ].map((req) => (
                <div key={req.label} className="flex items-center gap-2 text-xs">
                  {req.check ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-zinc-600" />
                  )}
                  <span className={req.check ? "text-zinc-300" : "text-zinc-500"}>{req.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-zinc-300">Confirm password</label>
            <input 
              id="confirm-password"
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5 block w-full rounded-md border border-zinc-700 bg-zinc-950/50 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="••••••••" 
              required 
              disabled={loading}
              autoComplete="new-password"
            />
            {confirmPassword.length > 0 && (
              <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                {passwordsMatch ? (
                  <><Check className="h-3.5 w-3.5 text-emerald-400" /><span className="text-emerald-400">Passwords match</span></>
                ) : (
                  <><X className="h-3.5 w-3.5 text-red-400" /><span className="text-red-400">Passwords do not match</span></>
                )}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading || !canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}