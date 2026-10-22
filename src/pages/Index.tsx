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
              <span>Visão Executiva</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0E1B3D] tracking-tight">
              Boa tarde, Vinicius.
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280] mt-1.5 font-normal max-w-xl">
              Transformando dados operacionais em prioridades, recomendações e ações assistidas.
            </p>
            <p className="text-xs text-blue-700 font-medium mt-2 bg-blue-50/80 inline-block px-2.5 py-1 rounded-md border border-blue-100">
              &quot;O CRM registra o trabalho. O Cogito ajuda a decidir onde agir.&quot;
            </p>
          </div>

          {/* Evolution Pipeline pill: Dados -> Contexto -> Insight -> Recomendação -> Ação */}
          <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-3 sm:p-3.5 max-w-lg">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1 text-[#0E1B3D]">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                Ciclo de Inteligência
              </span>
              <span className="text-[10px] text-gray-400">Supervisão Ativa</span>
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
            <p className="text-[11px] text-[#6B7280] mt-2 pt-2 border-t border-gray-200 leading-snug">
              No primeiro MVP, decisões e ações permanecem supervisionadas pelo usuário.
            </p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {/* Card 1: SALES (MVP PRIORITÁRIO - Destaque Principal) */}
          <div className="group bg-white rounded-2xl border-2 border-blue-600 p-6 shadow-elevation hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden ring-4 ring-blue-50">
            {/* Top Accent Band */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0E1B3D]">Cogito Sales</h3>
                    <span className="text-[11px] text-blue-700 font-semibold">
                      Priorização & Próxima Ação
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-xs tracking-wide">
                  MVP PRIORITÁRIO
                </span>
              </div>

              <div className="space-y-1.5 my-3">
                <p className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight">
                  17 oportunidades priorizadas
                </p>
                <p className="text-sm font-bold text-blue-700">R$ 248.600 em potencial comercial</p>
              </div>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Identifica oportunidades que merecem atenção, explica os sinais encontrados e
                recomenda a próxima melhor ação para o consultor.
              </p>

              {/* Mini visual summary of indicators */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-600">
                <div className="bg-blue-50/70 p-2 rounded-lg">
                  <span className="font-semibold text-blue-900 block">6 propostas</span>
                  aguardando assinatura
                </div>
                <div className="bg-purple-50/70 p-2 rounded-lg">
                  <span className="font-semibold text-purple-900 block">4 oportunidades</span>
                  sem interação há 5+ dias
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/sales"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Explorar MVP Sales</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-gray-400">
                Protótipo — dados ilustrativos, sem conexão ativa
              </p>
            </div>
          </div>

          {/* Card 2: FINANCE (PRÓXIMA FRENTE) */}
          <div className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-subtle hover:shadow-elevation transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden">
            {/* Top Accent Band */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0E1B3D]">Cogito Finance</h3>
                    <span className="text-[11px] text-gray-400">Consultas & Reconciliação</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  PRÓXIMA FRENTE
                </span>
              </div>

              <div className="space-y-1 my-3">
                <p className="text-lg sm:text-xl font-bold text-[#0E1B3D] tracking-tight">
                  Consultas em Linguagem Natural
                </p>
                <p className="text-xs font-semibold text-emerald-700">
                  Reconciliação e validação direta de dados do ERP
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Consultas financeiras em linguagem natural e validação de valores e cobranças com
                base nos dados do ERP.
              </p>

              {/* Sample queries preview */}
              <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span>Quanto recebemos hoje?</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span>Quais cobranças estão vencidas?</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/finance"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Ver conceito Finance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-gray-400">
                Dados ilustrativos para demonstração.
              </p>
            </div>
          </div>

          {/* Card 3: HELP (QUICK WIN / ROADMAP) */}
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
                    <h3 className="font-bold text-base text-[#0E1B3D]">Cogito Help</h3>
                    <span className="text-[11px] text-gray-400">Assistência Operacional</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-[#8B5CF6] border border-purple-200">
                  QUICK WIN / ROADMAP
                </span>
              </div>

              <div className="space-y-1 my-3">
                <p className="text-lg sm:text-xl font-bold text-[#0E1B3D] tracking-tight">
                  Orientação Contextual de Uso
                </p>
                <p className="text-xs font-semibold text-purple-700">
                  Passo a passo nos processos operacionais
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Assistência contextual para orientar usuários em fluxos e funcionalidades do CRM e
                ERP.
              </p>

              {/* Sample help items */}
              <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-1 h-1 rounded-full bg-purple-500" />
                  <span>Cadastro guiado de novos associados</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-1 h-1 rounded-full bg-purple-500" />
                  <span>Redução de dúvidas repetitivas</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/help"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Ver conceito Help</span>
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
          {/* Insight 1 - Comercial (Prioridade Principal - MVP) */}
          <div className="py-3.5 first:pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-blue-50/50 -mx-3 px-3 rounded-lg transition-colors border-l-2 border-l-blue-600">
            <div className="flex items-start sm:items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shrink-0">
                Comercial · MVP P1
              </span>
              <p className="text-sm font-medium text-[#111827]">
                17 oportunidades apresentam sinais que merecem atenção.
              </p>
            </div>
            <Link
              to="/sales"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 shrink-0 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Explorar no Sales</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Insight 2 - Financeiro (Próxima Frente) */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/80 -mx-3 px-3 rounded-lg transition-colors">
            <div className="flex items-start sm:items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 shrink-0">
                Financeiro · P2
              </span>
              <p className="text-sm font-medium text-[#111827]">
                Exemplo de consulta: valores e cobranças podem ser consolidados diretamente dos
                dados do ERP.
              </p>
            </div>
            <Link
              to="/finance"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 shrink-0 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Ver no Finance</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Insight 3 - Operação (Quick Win / Roadmap) */}
          <div className="py-3.5 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/80 -mx-3 px-3 rounded-lg transition-colors">
            <div className="flex items-start sm:items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-[#8B5CF6] border border-purple-100 shrink-0">
                Operação · Quick Win
              </span>
              <p className="text-sm font-medium text-[#111827]">
                Cogito Help pode reduzir dúvidas repetitivas sobre utilização do sistema.
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
      {/* 3.1 ROADMAP ESTRATÉGICO VISUAL (Agora -> Próxima -> Quick Win -> Futuro) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E7EB] shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm sm:text-base font-bold text-[#0E1B3D]">
              Direção de Produto & Roadmap
            </h3>
          </div>
          <span className="text-[11px] text-gray-400">Sequenciamento do produto</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* 1. Agora: Sales */}
          <div className="p-3.5 rounded-xl border-2 border-blue-600 bg-blue-50/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-600 text-white tracking-wider">
                Agora · MVP P1
              </span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs font-bold text-[#0E1B3D] pt-1">Cogito Sales</p>
            <p className="text-[11px] text-gray-600 leading-snug">
              Priorização de oportunidades e próxima melhor ação supervisionada.
            </p>
          </div>

          {/* 2. Próxima frente: Finance */}
          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 tracking-wider">
                Próxima Frente · P2
              </span>
              <Landmark className="w-4 h-4 text-emerald-700" />
            </div>
            <p className="text-xs font-bold text-[#0E1B3D] pt-1">Cogito Finance</p>
            <p className="text-[11px] text-gray-600 leading-snug">
              Consultas financeiras e reconciliação com dados do ERP.
            </p>
          </div>

          {/* 3. Quick Win / evolução: Help */}
          <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-[#8B5CF6] tracking-wider">
                Quick Win / Evolução
              </span>
              <LifeBuoy className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <p className="text-xs font-bold text-[#0E1B3D] pt-1">Cogito Help</p>
            <p className="text-[11px] text-gray-600 leading-snug">
              Orientação contextual para fluxos e processos do sistema.
            </p>
          </div>

          {/* 4. Futuro condicionado */}
          <div className="p-3.5 rounded-xl border border-dashed border-gray-300 bg-gray-50/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-600 tracking-wider">
                Futuro
              </span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs font-bold text-gray-700 pt-1">Evoluções Avançadas</p>
            <p className="text-[11px] text-gray-500 leading-snug">
              Predictive Finance · Sinistros · Vistoria · Automações avançadas.
            </p>
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
