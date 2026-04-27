'use client'
import { useState } from 'react'
import { Lock, Mail, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import AnimatedBackground from '@/components/animated-background'

export default function Page() {
  const [show, setShow] = useState(false)
  const [gta, setGta] = useState<'success'|'failed'|null>(null)
  const [showForgot, setShowForgot] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const handleLogin = () => {
    const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value || ''
    const senha = (document.querySelector('input[type="password"]') as HTMLInputElement)?.value || ''
    const ok = email.includes('@') && senha.length > 3

    if (ok) {
      setGta('success')
      const cx = window.innerWidth/2, cy = window.innerHeight/2
      for(let i=0;i<4;i++){
        setTimeout(()=> window.dispatchEvent(new CustomEvent('confetti',{detail:{x:cx+(Math.random()-0.5)*200, y:cy}})), i*150)
      }
    } else {
      setGta('failed')
    }
    setTimeout(()=>setGta(null),2200)
  }

  return (
    <>
      <AnimatedBackground />

      <div className="relative min-h-screen overflow-hidden bg-transparent text-white">
        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <div style={{ width: '360px', maxWidth: 'calc(100vw - 32px)' }}>
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#0a0418]/80 shadow-[0_0_60px_-15px_rgba(168,85,247,0.6)] backdrop-blur-2xl">
              <div className="h-1 w-full bg-gradient-to-r from-[#ff1a8a] via-[#a855f7] to-[#00d4ff]" />

              <div className="p-6">
                <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/5">
                  <Lock className="size-5" />
                </div>
                <h1 className="text-center text-xl font-semibold">Bem-vindo de volta</h1>
                <p className="mt-1 text-center text-sm text-white/60">Entre e brilhe ✨</p>

                <div className="mt-6 space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-3 text-sm outline-none placeholder:text-white/30 focus:border-fuchsia-400/70 focus:ring-2 focus:ring-fuchsia-400/20"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                    <input
                      type={show? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-9 text-sm outline-none placeholder:text-white/30 focus:border-fuchsia-400/70 focus:ring-2 focus:ring-fuchsia-400/20"
                    />
                    <button
                      onClick={() => setShow(!show)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {show? <EyeOff className="size-4"/> : <Eye className="size-4"/>}
                    </button>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="group flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(90deg,#ff1a8a,#a855f7,#00d4ff)] bg-[length:200%_100%] text-sm font-medium shadow-[0_0_25px_rgba(255,26,138,0.5)] transition-all hover:bg-[position:100%_0] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
                  >
                    <Sparkles className="size-4" /> Entrar <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </button>

                  <button
                    onClick={() => setShowForgot(true)}
                    className="w-full text-xs text-white/50 hover:text-fuchsia-300"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-white/40">
              Não tem conta? <span onClick={() => setShowSignup(true)} className="text-fuchsia-300 cursor-pointer hover:underline">Criar conta</span>
            </p>
          </div>
        </div>
      </div>

      {gta && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/40" />
          <h1 className={`relative gta-text ${gta === 'success'? 'gta-success' : 'gta-failed'}`}>
            {gta === 'success'? 'LOGIN SUCCESS' : 'LOGIN FAILED'}
          </h1>
        </div>
      )}

      {showForgot && (
        <div className="fixed inset-0 z-[200] grid place-items-center bg-black/70 backdrop-blur-sm" onClick={()=>setShowForgot(false)}>
          <div onClick={e=>e.stopPropagation()} className="w- rounded-2xl border border-white/15 bg-[#0a0418]/90 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Redefinir senha</h2>
            <p className="mt-1 text-sm text-white/60">Digite seu e-mail</p>
            <input placeholder="seu@email.com" className="mt-4 h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm outline-none focus:border-fuchsia-400/70" />
            <button onClick={()=>{setShowForgot(false); alert('Link enviado!')}} className="mt-3 h-10 w-full rounded-xl bg-fuchsia-600 text-sm font-medium hover:bg-fuchsia-500">Enviar link</button>
            <button onClick={()=>setShowForgot(false)} className="mt-2 w-full text-xs text-white/50">Cancelar</button>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 z-[200] grid place-items-center bg-black/70 backdrop-blur-sm" onClick={()=>setShowSignup(false)}>
          <div onClick={e=>e.stopPropagation()} className="w- rounded-2xl border border-white/15 bg-[#0a0418]/90 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Criar conta</h2>
            <input placeholder="Nome" className="mt-4 h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm outline-none" />
            <input placeholder="Email" className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm outline-none" />
            <input placeholder="Senha" type="password" className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm outline-none" />
            <button onClick={()=>{setShowSignup(false); window.dispatchEvent(new CustomEvent('confetti',{detail:{x:window.innerWidth/2,y:window.innerHeight/2}}))}} className="mt-3 h-10 w-full rounded-xl bg-[linear-gradient(90deg,#ff1a8a,#a855f7)] text-sm font-medium">Cadastrar ✨</button>
            <button onClick={()=>setShowSignup(false)} className="mt-2 w-full text-xs text-white/50">Voltar</button>
          </div>
        </div>
      )}
    </>
  )
}