"use client"

import { useState } from "react"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { GTANotification } from "./gta-notification"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setNotification(null)

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Credenciais inválidas")
      }

      const data = await response.json()
      
      // Salva o token JWT no localStorage
      localStorage.setItem("token", data.token)
      
      // Mostra notificacao estilo GTA
      setNotification({ type: "success", message: "Login Bem Sucedido" })
      
    } catch (err) {
      // Mostra notificacao de erro estilo GTA
      setNotification({ type: "error", message: "Failed" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationComplete = () => {
    if (notification?.type === "success") {
      window.location.href = "/dashboard"
    } else {
      setNotification(null)
    }
  }

  return (
    <>
      {/* Notificacao estilo GTA */}
      {notification && (
        <GTANotification
          type={notification.type}
          message={notification.message}
          onComplete={handleNotificationComplete}
        />
      )}

      <div className="w-full max-w-md">
      {/* Logo e Título */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 shadow-lg shadow-blue-500/20">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-slate-400 font-light">
          Entre com suas credenciais para acessar sua conta
        </p>
      </div>

      {/* Card de Login com Glassmorphism */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
        
        {/* Card */}
        <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 hover:border-slate-600"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm font-medium text-slate-300">
                Senha
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors" />
                </div>
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 hover:border-slate-600"
                />
              </div>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3.5 px-6 rounded-xl font-medium text-white overflow-hidden group/btn disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover/btn:scale-105" />
              
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 blur-xl opacity-0 group-hover/btn:opacity-40 transition-opacity duration-300" />
              
              {/* Button content */}
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Link para esqueceu a senha */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>

      {/* Texto de rodapé */}
      <p className="text-center text-sm text-slate-400 mt-8">
        Não tem uma conta?{" "}
        <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Criar conta
        </a>
      </p>
    </div>
    </>
  )
}
