import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  TrendingUp,
  Landmark,
  LifeBuoy,
  ArrowRight,
  Send,
  AlertCircle,
  Lightbulb,
  Search,
  Layers,
  ChevronRight,
  Clock,
  ShieldCheck,
  Activity,
  Map,
  ClipboardCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react'
import { toast } from 'sonner'

export default function Index() {
  const navigate = useNavigate()
  const [askQuery, setAskQuery] = useState('')
  const [askContextNote, setAskContextNote] = useState<string | null>(null)

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!askQuery.trim()) return

    const q = askQuery.toLowerCase()
    if (
      q.includes('inadimpl') ||
      q.includes('fatura') ||
      q.includes('recebe') ||
      q.includes('finance') ||
      q.includes('faturamento')
    ) {
      setAskContextNote(
        'Contexto considerado: ERP I3Tech — Módulo de Faturamento e Faturas (demonstrativo).',
      )
      toast.info('Consultando contexto de faturamento no Cogito Finance...')
      setTimeout(() => navigate('/finance'), 500)
    } else if (
      q.includes('cotaç') ||
      q.includes('proposta') ||
      q.includes('bloqueio') ||
      q.includes('destravar') ||
      q.includes('sales') ||
      q.includes('venda')
    ) {
      setAskContextNote(
        'Contexto considerado: CRM I3Tech — Cotações ativas e pendências operacionais (demonstrativo).',
      )
      toast.info('Consultando cotações com bloqueio no Cogito Sales...')
      setTimeout(() => navigate('/sales'), 500)
    } else if (q.includes('roadmap') || q.includes('futuro') || q.includes('backlog')) {
      toast.info('Acessando visão do Roadmap do Cogito...')
      setTimeout(() => navigate('/roadmap'), 400)
    } else if (
      q.includes('valid') ||
      q.includes('api') ||
      q.includes('i3tech') ||
      q.includes('acesso')
    ) {
      toast.info('Acessando pauta de validação técnica com a I3Tech...')
      setTimeout(() => navigate('/validacao'), 400)
    } else {
      setAskContextNote(
        'Contexto considerado: Manuais, procedimentos e fontes de conhecimento da I3Tech (a validar).',
      )
      toast.info('Consultando orientações de processos no Cogito Help...')
      setTimeout(() => navigate('/help'), 500)
    }
  }

  const handleChipClick = (suggestion: string) => {
    setAskQuery(suggestion)
    if (suggestion.includes('faturamento') || suggestion.includes('faturas')) {
      setAskContextNote('Contexto considerado: ERP Financeiro (demonstrativo).')
      toast.success(`Pergunta selecionada: "${suggestion}"`)
      setTimeout(() => navigate('/finance'), 400)
    } else if (suggestion.includes('cotações') || suggestion.includes('destravar')) {
      setAskContextNote('Contexto considerado: Funil de Vendas do CRM (demonstrativo).')
      toast.success(`Pergunta selecionada: "${suggestion}"`)
      setTimeout(() => navigate('/sales'), 400)
    } else {
      setAskContextNote(
        'Contexto considerado: Manuais, procedimentos e fontes de conhecimento da I3Tech (a validar).',
      )
      toast.success(`Pergunta selecionada: "${suggestion}"`)
      setTimeout(() => navigate('/help'), 400)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner Global Mandatório */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-blue-900 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-semibold text-[#0E1B3D]">
            Protótipo — dados ilustrativos, sem conexão ativa
          </span>
        </div>
        <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded hidden sm:inline">
          Ambiente demonstrativo · Decisões e ações supervisionadas
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. CABEÇALHO DA HOME (Título & Subtítulo Conforme Especificação) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-subtle relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100/80">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Painel Central de Decisão</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0E1B3D] tracking-tight">
              Prioridades que precisam da sua atenção
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2 font-normal max-w-xl leading-relaxed">
              Entenda o que está acontecendo, consulte as evidências e decida o próximo passo.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 font-medium">
                Primeiro MVP com foco no Comercial (Sales)
              </span>
              <span className="text-xs text-gray-500">
                Regras explícitas + Contextualização supervisionada por humano
              </span>
            </div>
          </div>

          {/* Ciclo Conceitual: Dados → Contexto → Insight → Recomendação → Ação */}
          <div className="bg-[#F7F8FA] border border-[#E5E7EB] rounded-xl p-3.5 sm:p-4 max-w-lg shrink-0">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1 text-[#0E1B3D]">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                Ciclo Conceitual Cogito
              </span>
              <span className="text-[10px] text-gray-500">Sem automação cega</span>
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
              No primeiro MVP, detecção e ordenação usam regras explícitas; a IA apoia resumo,
              contextualização e redação com validação humana.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ATALHOS RÁPIDOS PARA AS FRENTES (Sales, Finance, Help, Roadmap, Validação) */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0E1B3D] tracking-tight">
              Módulos e Direcionamentos do Cogito
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Identificadores de prioridade conforme alinhamento de produto.
            </p>
          </div>
          <span className="text-xs text-gray-400 hidden sm:inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Dados demonstrativos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {/* Card 1: SALES — P1 — Primeiro MVP (Destaque Maior) */}
          <div className="group bg-white rounded-2xl border-2 border-blue-600 p-6 shadow-elevation hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden ring-4 ring-blue-50">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0E1B3D]">Cogito Sales</h3>
                    <p className="text-[11px] text-blue-700 font-semibold">
                      Cotações para Destravar
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600 text-white tracking-wide shadow-xs">
                  P1 — Primeiro MVP
                </span>
              </div>

              <div className="space-y-1.5 my-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                  Lista de Prioridades (Complementar ao CRM)
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0E1B3D]">
                  5 cotações com pendências no demonstrativo
                </p>
                <div className="pt-1.5 border-t border-blue-200/60 text-[11px] text-gray-600 space-y-0.5">
                  <p>
                    <span className="font-semibold text-gray-800">Mensalidade potencial:</span>{' '}
                    <strong className="text-blue-700">R$ 1.050/mês</strong> (4 de 5 conhecidas)
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Total de adesões potenciais: R$ 1.550 (sem somar propostas alternativas da mesma
                    cotação).
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                O Cogito complementa o funil do CRM com uma lista de prioridades, reunindo
                pendências, responsáveis e próximos passos, com separação entre etapa da cotação e
                status dos processos.
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-gray-100 space-y-2">
              <Link
                to="/sales"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Acessar Prioridades do Sales</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-center text-gray-400">
                Sem envio de mensagens reais · Decisão do consultor
              </p>
            </div>
          </div>

          {/* Card 2: FINANCE — P2 — Segunda onda */}
          <div className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-subtle hover:shadow-elevation transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0E1B3D]">Cogito Finance</h3>
                    <p className="text-[11px] text-gray-500">Exceções de Faturamento</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  P2 — Segunda onda
                </span>
              </div>

              <div className="space-y-1.5 my-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wide">
                  Exceções de Faturamento
                </p>
                <p className="text-base font-bold text-[#0E1B3D]">
                  Possível ausência de faturamento e status de faturas
                </p>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Diferenciação operacional entre faturas sem registro bancário, vencidas e hipótese
                  futura de pagamento sem baixa.
                </p>
              </div>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Foco em situações que precisam de conferência humana no ERP. Sem baixa ou
                cancelamento automático; taxa de inadimplência com definição a validar.
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-gray-100 space-y-2">
              <Link
                to="/finance"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
              >
                <span>Abrir Visão do Finance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-center text-gray-400">
                Apoio a conferências · Sem alterações automáticas
              </p>
            </div>
          </div>

          {/* Card 3: HELP — Quick Win — Escopo reduzido */}
          <div className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-subtle hover:shadow-elevation transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500" />

            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#8B5CF6] group-hover:scale-105 transition-transform">
                    <LifeBuoy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0E1B3D]">Cogito Help</h3>
                    <p className="text-[11px] text-gray-500">Orientação Contextual de Uso</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#8B5CF6] border border-purple-200">
                  Quick Win — Escopo reduzido
                </span>
              </div>

              <div className="space-y-1.5 my-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                <p className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Passo a Passo Guiado
                </p>
                <p className="text-base font-bold text-[#0E1B3D]">
                  Orientação por tela e fluxo operacional
                </p>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Orientações contextuais observadas nas telas de conferência e análise operacional.
                </p>
              </div>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Apresenta instruções demonstrativas separando com rigor o observado no demonstrativo
                do que permanece a confirmar com a I3Tech.
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-gray-100 space-y-2">
              <Link
                to="/help"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
              >
                <span>Consultar Help Contextual</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-center text-gray-400">
                Evolução futura: Orientar → Preparar → Revisar → Confirmar
              </p>
            </div>
          </div>
        </div>

        {/* 2.1 Cards Adicionais: Roadmap e Validação Técnica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Link
            to="/roadmap"
            className="p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-subtle transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Map className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0E1B3D]">Roadmap do Cogito</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    Visão de Produto
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Visão estruturada de P1, P2, Quick Win e Backlog com classificação A/B/C.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/validacao"
            className="p-4 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-subtle transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0E1B3D]">
                    Validação Técnica — Dados e Acessos
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    15 Questões I3Tech
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Pauta de trabalho para transformar o protótipo em MVP integrado.
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PERGUNTE AO COGITO (Com Indicação Clara do Contexto Considerado) */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-white via-white to-blue-50/40 rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0E1B3D]">Pergunte ao Cogito</h2>
              <p className="text-xs text-[#6B7280]">
                Consultas e orientações com indicação explícita do contexto de dados considerado.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hidden sm:inline">
            Demonstrativo
          </span>
        </div>

        <form onSubmit={handleAskSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              placeholder="Ex.: Quais cotações estão travadas em vistoria? Ou: O que significa fatura sem registro?"
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

        {askContextNote && (
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
            <span>{askContextNote}</span>
            <button
              type="button"
              onClick={() => setAskContextNote(null)}
              className="text-[10px] text-blue-600 hover:underline"
            >
              Limpar
            </button>
          </div>
        )}

        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Sugestões estruturadas por contexto
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Quais cotações precisam de atenção agora?',
              'Por que não consigo aprovar uma cotação?',
              'Quais contratos apresentam possível ausência de faturamento?',
              'Qual a diferença entre conferência e análise operacional?',
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
