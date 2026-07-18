import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await auth()) redirect("/admin");
  const { error } = await searchParams;

  async function authenticate(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/admin" });
    } catch (authError) {
      if (authError instanceof AuthError) redirect("/admin/login?error=credentials");
      throw authError;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form action={authenticate} className="w-full max-w-md rounded-3xl border border-yellow-400/20 bg-white/[0.04] p-8 backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">Accès sécurisé</p>
        <h1 className="mt-3 text-3xl font-black uppercase">Administration</h1>
        <label className="mt-8 block text-sm" htmlFor="admin-email">Email</label>
        <input id="admin-email" name="email" type="email" autoComplete="username" required className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3" />
        <label className="mt-5 block text-sm" htmlFor="admin-password">Mot de passe</label>
        <input id="admin-password" name="password" type="password" minLength={12} autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3" />
        {error && <p role="alert" className="mt-4 text-sm text-red-300">Identifiants invalides.</p>}
        <button className="mt-7 w-full rounded-full bg-yellow-400 px-5 py-3 font-black uppercase text-black">Se connecter</button>
      </form>
    </main>
  );
}
