import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  TrendingUp,
  Landmark,
  LifeBuoy,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  Layers,
  ChevronRight,
  Clock,
  ShieldCheck,
  Activity,
} from 'lucide-react'
import { toast } from 'sonner'

export default function Index() {
  const navigate = useNavigate()
  const [askQuery, setAskQuery] = useState('')

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!askQuery.trim()) return

    const q = askQuery.toLowerCase()
    if (
      q.includes('inadimpl') ||
      q.includes('arrecada') ||
      q.includes('recebe') ||
      q.includes('finance')
    ) {
      toast.info('Redirecionando para análise detalhada no Cogito Finance...')
      setTimeout(() => navigate('/finance'), 350)
    } else if (
      q.includes('oportunidade') ||
      q.includes('venda') ||
      q.includes('comercial') ||
      q.includes('proposta')
    ) {
      toast.info('Redirecionando para oportunidades no Cogito Sales...')
      setTimeout(() => navigate('/sales'), 350)
    } else {
      toast.info('Consultando assistente Cogito Help...')
      setTimeout(() => navigate('/help'), 350)
    }
  }

  const handleChipClick = (suggestion: string) => {
    setAskQuery(suggestion)
    if (suggestion.includes('inadimplência') || suggestion.includes('arrecadação')) {
      toast.success(`Pergunta selecionada: "${suggestion}"`)
      setTimeout(() => navigate('/finance'), 400)
    } else if (suggestion.includes('oportunidades') || suggestion.includes('operação')) {
      toast.success(`Pergunta selecionada: "${suggestion}"`)
      setTimeout(() => navigate('/sales'), 400)
    } else {
      toast.success(`Pergunta selecionada: "${suggestion}"`)
      setTimeout(() => navigate('/help'), 400)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Aviso de Protótipo */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-blue-900 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-semibold text-[#0E1B3D]">
            Protótipo — dados ilustrativos, sem conexão ativa
          </span>
        </div>
        <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded hidden sm:inline">
          Ambiente demonstrativo
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. GREETING BLOCK & VALUE PIPELINE */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-subtle relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100/80">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Visão Executiva do Dia</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0E1B3D] tracking-tight">
              Boa tarde, Vinicius.
            </h1>
            <p className="text-base text-[#6B7280] mt-1.5 font-normal">
              Aqui estão os pontos que merecem atenção hoje.
            </p>
          </div>

          {/* Evolution Pipeline pill: Dados -> Contexto -> Insight -> Recomendação -> Ação */}
          <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-3 sm:p-3.5 max-w-lg">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1 text-[#0E1B3D]">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                Ciclo de IA (Demonstração)
              </span>
              <span className="text-[10px] text-gray-400">CRM & ERP I3Tech</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs font-medium overflow-x-auto pb-1 sm:pb-0">
              <span className="px-2 py-1 bg-white rounded border border-gray-200 text-gray-700">
                Dados
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="px-2 py-1 bg-white rounded border border-gray-200 text-gray-700">
                Contexto
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200 font-semibold">
                Insight
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded border border-purple-200">
                Recomendação
              </span>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-semibold">
                Ação
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN BLOCK: "O que o Cogito encontrou" (3 Module Cards) */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0E1B3D] tracking-tight">
              O que o Cogito encontrou
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Exemplos de como o Cogito analisa dados de CRM e ERP para orientar decisões.
            </p>
          </div>
          <span className="text-xs text-gray-400 hidden sm:inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Dados ilustrativos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: SALES */}
          <div className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-subtle hover:shadow-elevation transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden">
            {/* Top Accent Band */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0E1B3D]">Sales</h3>
                    <span className="text-[11px] text-gray-400">Funil & Conversão</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-[#EF4444] border border-rose-100">
                  Atenção Alta
                </span>
              </div>

              <div className="space-y-1 my-3">
                <p className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight">
                  17 oportunidades precisam de atenção
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  R$ 248.600 em potencial comercial (exemplo)
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Propostas sem movimentação recente e contratos prontos aguardando assinatura de
                associados.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/sales"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Ver oportunidades</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-gray-400">
                Protótipo — dados ilustrativos, sem conexão ativa
              </p>
            </div>
          </div>

          {/* Card 2: FINANCE */}
          <div className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-subtle hover:shadow-elevation transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden">
            {/* Top Accent Band */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-rose-500" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0E1B3D]">Finance</h3>
                    <span className="text-[11px] text-gray-400">Cobrança & Inadimplência</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  +0,9 p.p.
                </span>
              </div>

              <div className="space-y-1 my-3">
                <p className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight">
                  Inadimplência de 7,8% (ilustrativa)
                </p>
                <p className="text-sm font-semibold text-rose-600">
                  R$ 184 mil em cobranças vencidas (exemplo)
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Concentração em atrasos de 6 a 15 dias. Cogito identificou também 12 contratos sem
                cobrança gerada.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/finance"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Ver análise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-gray-400">
                Dados ilustrativos para demonstração.
              </p>
            </div>
          </div>

          {/* Card 3: HELP */}
          <div className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-subtle hover:shadow-elevation transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden">
            {/* Top Accent Band */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#8B5CF6] group-hover:scale-105 transition-transform">
                    <LifeBuoy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0E1B3D]">Help</h3>
                    <span className="text-[11px] text-gray-400">Assistente & Suporte</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  87% Autonomia (ilustrativa)
                </span>
              </div>

              <div className="space-y-1 my-3">
                <p className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight">
                  26 dúvidas respondidas (exemplo)
                </p>
                <p className="text-sm font-semibold text-emerald-600">
                  87% de autonomia estimada (dados ilustrativos)
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Consultas sobre cadastro de associados, emissão de boletos e ativação de vistorias
                resolvidas no fluxo.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/help"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Abrir assistente</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-gray-400">
                Dados ilustrativos para demonstração.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INSIGHTS BLOCK: "Insights para você" */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0E1B3D]">Insights para você</h2>
              <p className="text-xs text-[#6B7280]">
                Exemplos demonstrativos de prioridades identificadas a partir de dados de CRM e ERP
              </p>
            </div>
          </div>
          <span className="text-[11px] text-gray-400 hidden sm:inline">
            3 recomendações demonstrativas
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {/* Insight 1 - Comercial */}
          <div className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/80 -mx-3 px-3 rounded-lg transition-colors">
            <div className="flex items-start sm:items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                Comercial
              </span>
              <p className="text-sm font-medium text-[#111827]">
                38 propostas estão sem movimentação há mais de cinco dias.
              </p>
            </div>
            <Link
              to="/sales"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 shrink-0 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Ver no Sales</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Insight 2 - Financeiro */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/80 -mx-3 px-3 rounded-lg transition-colors">
            <div className="flex items-start sm:items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                Financeiro
              </span>
              <p className="text-sm font-medium text-[#111827]">
                12 contratos ativos não apresentaram cobrança gerada.
              </p>
            </div>
            <Link
              to="/finance"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 shrink-0 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Ver no Finance</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Insight 3 - Operação */}
          <div className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/80 -mx-3 px-3 rounded-lg transition-colors">
            <div className="flex items-start sm:items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-[#8B5CF6] border border-purple-100 shrink-0">
                Operação
              </span>
              <p className="text-sm font-medium text-[#111827]">
                As dúvidas mais frequentes desta semana foram relacionadas a cadastro e faturamento.
              </p>
            </div>
            <Link
              to="/help"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-purple-700 shrink-0 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Ver no Help</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. CROSS-MODULE QUESTION FIELD: "Pergunte ao Cogito" */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-white via-white to-blue-50/40 rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0E1B3D]">Pergunte ao Cogito</h2>
            <p className="text-xs text-[#6B7280]">
              Consulte indicadores, associados, propostas ou processos em linguagem natural.
            </p>
          </div>
        </div>

        <form onSubmit={handleAskSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              placeholder="O que você quer saber?"
              className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-xl border border-gray-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 bg-[#0E1B3D] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Consultar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Sugestões rápidas
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Como está a operação hoje?',
              'Quais oportunidades precisam de atenção?',
              'Qual foi nossa arrecadação?',
              'Onde está aumentando a inadimplência?',
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="text-xs font-medium px-3.5 py-2 rounded-lg bg-gray-100/90 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-gray-700 border border-gray-200/80 transition-all text-left flex items-center gap-1.5 active:scale-95"
              >
                <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                <span>{chip}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
