import React, { useState } from 'react'
import {
  Calendar,
  RefreshCw,
  Search,
  Sparkles,
  X,
  AlertCircle,
  Clock,
  Send,
  CheckCircle2,
  FileText,
  History,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Filter,
  Check,
  ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Opportunity {
  id: string
  prioridade: 'Alta' | 'Média'
  cliente: string
  consultor: string
  etapa: string
  valor: string
  tempoParado: string
  motivo: string
  acaoRecomendada: string
  hasDeepAnalysis?: boolean
}

const opportunitiesData: Opportunity[] = [
  {
    id: 'opp-1',
    prioridade: 'Alta',
    cliente: 'Carlos Henrique',
    consultor: 'Rafael',
    etapa: 'Proposta enviada',
    valor: 'R$ 3.480/ano',
    tempoParado: '6 dias',
    motivo: 'proposta enviada sem retorno e nenhuma próxima atividade registrada',
    acaoRecomendada: 'Realizar follow-up hoje',
    hasDeepAnalysis: true,
  },
  {
    id: 'opp-2',
    prioridade: 'Alta',
    cliente: 'Fernanda Almeida',
    consultor: 'Lucas',
    etapa: 'Aguardando assinatura',
    valor: 'R$ 4.920/ano',
    tempoParado: '3 dias',
    motivo: 'proposta aprovada, assinatura ainda pendente',
    acaoRecomendada: 'Reenviar assinatura e entrar em contato',
    hasDeepAnalysis: false,
  },
  {
    id: 'opp-3',
    prioridade: 'Média',
    cliente: 'Ricardo Souza',
    consultor: 'Amanda',
    etapa: 'Documentação',
    valor: 'R$ 2.760/ano',
    tempoParado: '4 dias',
    motivo: 'documentação incompleta',
    acaoRecomendada: 'Solicitar documento pendente',
    hasDeepAnalysis: false,
  },
]

export default function Sales() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEtapa, setSelectedEtapa] = useState('Todas as etapas')
  const [selectedPrioridade, setSelectedPrioridade] = useState('Todas as prioridades')
  const [copiedMessage, setCopiedMessage] = useState(false)

  const handleRefresh = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      toast.success('Simulação de análise atualizada (ambiente demonstrativo).')
    }, 800)
  }

  const handleOpenDetail = (opp: Opportunity) => {
    // Both Carlos Henrique and any row click can show Cogito Analysis
    setDetailOpen(true)
  }

  const handleActionClick = (actionName: string) => {
    toast.info(`${actionName} (ação demonstrativa — não altera registros no CRM)`)
  }

  const handleUseMessage = () => {
    setCopiedMessage(true)
    navigator.clipboard?.writeText(
      'Olá, Carlos! Tudo bem? Vi que encaminhamos sua proposta há alguns dias e gostaria de saber se conseguiu analisá-la. Posso ajudar com alguma dúvida ou verificar alguma condição para avançarmos?',
    )
    toast.success('Mensagem copiada! (ação demonstrativa — nenhum envio real realizado)')
    setTimeout(() => setCopiedMessage(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in relative">
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
      {/* 1. HEADER CONTROLS (Period selector & Atualizar análise) */}
      {/* ========================================================= */}
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                MVP PRIORITÁRIO
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-[#EF4444] border border-rose-200">
                17 oportunidades priorizadas
              </span>
              <span className="text-xs text-gray-400">Proteção Veicular & Frotas</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight mt-1">
              Cogito Sales
            </h1>
            <p className="text-xs sm:text-sm text-blue-700 font-semibold mt-0.5">
              Priorização de oportunidades e próxima melhor ação
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              O Cogito identifica sinais de atenção no funil comercial, organiza as oportunidades
              por prioridade e sugere o próximo passo para o consultor.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            {/* Period selector */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 shadow-sm cursor-pointer hover:bg-gray-50">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Hoje (demonstrativo)</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Refresh analysis button */}
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isUpdating}
              title="Ação demonstrativa — não altera registros"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0E1B3D] text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75"
            >
              <RefreshCw className={cn('w-4 h-4', isUpdating && 'animate-spin')} />
              <span>{isUpdating ? 'Atualizando...' : 'Atualizar análise'}</span>
            </button>
          </div>
        </div>

        {/* 1.1 MODELO DO MVP: Regra identifica -> Cogito contextualiza -> IA recomenda -> Consultor decide */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Como o MVP funciona
            </span>
            <span className="text-[10px] text-blue-700 font-medium">Princípio Operacional</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs font-semibold text-[#0E1B3D] overflow-x-auto pb-1 sm:pb-0">
            <span className="px-2 py-1 bg-white rounded border border-blue-200 shrink-0">
              Regra identifica
            </span>
            <ArrowRight className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="px-2 py-1 bg-white rounded border border-blue-200 shrink-0">
              Cogito contextualiza
            </span>
            <ArrowRight className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="px-2 py-1 bg-blue-600 text-white rounded shrink-0">IA recomenda</span>
            <ArrowRight className="w-3 h-3 text-blue-600 shrink-0" />
            <span className="px-2 py-1 bg-emerald-600 text-white rounded shrink-0">
              Consultor decide
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed pt-0.5">
            O primeiro MVP combina regras operacionais com IA generativa. O sistema identifica
            situações objetivas no CRM e utiliza IA para contextualizar e sugerir a ação, sempre com
            supervisão humana.
          </p>
        </div>

        {/* 1.2 LÓGICA VISUAL DO SALES (3 Etapas) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              1 · Detectar
            </span>
            <p className="text-xs font-bold text-[#0E1B3D] pt-0.5">Sinais Operacionais</p>
            <p className="text-[11px] text-gray-500 leading-snug">
              Propostas sem movimentação, documentação incompleta, assinatura pendente ou ausência
              de próxima atividade agendada.
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              2 · Explicar
            </span>
            <p className="text-xs font-bold text-[#0E1B3D] pt-0.5">Contexto Transparente</p>
            <p className="text-[11px] text-gray-500 leading-snug">
              Explicação objetiva dos motivos da priorização com base no tempo de inércia, valor da
              oportunidade e histórico do funil.
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              3 · Recomendar
            </span>
            <p className="text-xs font-bold text-[#0E1B3D] pt-0.5">Próximo Passo Assistido</p>
            <p className="text-[11px] text-gray-500 leading-snug">
              Sugestão de abordagem e geração assistida de mensagem para confirmação e envio pelo
              consultor comercial.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. BLOCO 1 — RESUMO DO DIA (4 Cards KPI + Nota IA) */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 17 Oportunidades (accent vermelho/laranja) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#EF4444] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold text-rose-600">Atenção Imediata</span>
              <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0E1B3D] tabular-nums tracking-tight">
              17
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">
              Oportunidades precisam de atenção
            </p>
          </div>

          {/* Card 2: R$ 248.600 (azul) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#3B82F6] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold text-blue-600">Volume Total</span>
              <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0E1B3D] tabular-nums tracking-tight">
              R$ 248.600
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">Potencial comercial em risco</p>
          </div>

          {/* Card 3: 6 Aguardando assinatura (âmbar) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#F59E0B] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold text-amber-600">Etapa de Fechamento</span>
              <FileText className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0E1B3D] tabular-nums tracking-tight">
              6
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">Aguardando assinatura</p>
          </div>

          {/* Card 4: 4 Sem interação há mais de 5 dias (roxo) */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#8B5CF6] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold text-purple-600">Inércia Crítica</span>
              <Clock className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0E1B3D] tabular-nums tracking-tight">
              4
            </div>
            <p className="text-xs text-gray-600 mt-1 font-medium">
              Sem interação há mais de 5 dias
            </p>
          </div>
        </div>

        {/* AI Note box */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-sm">
          <div className="p-1 rounded-md bg-blue-600 text-white shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            O Cogito identificou 17 oportunidades que merecem atenção com base em sinais
            operacionais observáveis no CRM.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2.1 MÉTRICAS DO MVP (Área pequena: Como mediríamos o MVP) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs sm:text-sm font-bold text-[#0E1B3D] uppercase tracking-wider">
              Como mediríamos o MVP
            </h3>
          </div>
          <span className="text-[11px] text-gray-400">
            Métricas conceituais — definição final dependerá dos dados disponíveis no CRM.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Volume</span>
            <span className="text-sm sm:text-base font-bold text-[#0E1B3D]">
              Oportunidades priorizadas
            </span>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Identificadas por sinais operacionais
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">
              Recuperação
            </span>
            <span className="text-sm sm:text-base font-bold text-emerald-700">
              Oportunidades recuperadas
            </span>
            <p className="text-[11px] text-gray-500 mt-0.5">Reativadas após inércia</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">
              Eficácia
            </span>
            <span className="text-sm sm:text-base font-bold text-blue-700">
              Conversão após recomendação
            </span>
            <p className="text-[11px] text-gray-500 mt-0.5">Fechamento pós-ação assistida</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Tempo</span>
            <span className="text-sm sm:text-base font-bold text-purple-700">
              Tempo médio sem interação
            </span>
            <p className="text-[11px] text-gray-500 mt-0.5">Redução da inércia no funil</p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BLOCO 2 — PRIORIDADES RECOMENDADAS PELO COGITO (Tabela) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-subtle p-5 sm:p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-[#0E1B3D]">
              Prioridades recomendadas pelo Cogito
            </h3>
            <span className="text-xs text-gray-400">
              Exemplo demonstrativo — clique em uma linha para abrir a análise de IA
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Exemplo ilustrativo de como o Cogito analisa a inércia do funil e sugere a abordagem de
            contato.
          </p>
        </div>

        {/* Decorative filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cliente ou consultor…"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <select
              value={selectedEtapa}
              onChange={(e) => setSelectedEtapa(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option>Todas as etapas</option>
              <option>Proposta enviada</option>
              <option>Aguardando assinatura</option>
              <option>Documentação</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedPrioridade}
              onChange={(e) => setSelectedPrioridade(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option>Todas as prioridades</option>
              <option>Alta</option>
              <option>Média</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* DESKTOP / TABLET TABLE */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#F7F8FA] text-gray-600 uppercase text-[10px] font-bold tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Prioridade</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Consultor</th>
                <th className="py-3 px-4">Etapa</th>
                <th className="py-3 px-4">Valor</th>
                <th className="py-3 px-4">Tempo parado</th>
                <th className="py-3 px-4">Motivo</th>
                <th className="py-3 px-4 text-right">Ação recomendada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {opportunitiesData.map((opp) => (
                <tr
                  key={opp.id}
                  onClick={() => handleOpenDetail(opp)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                >
                  {/* Prioridade */}
                  <td className="py-3.5 px-4">
                    {opp.prioridade === 'Alta' ? (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-[#EF4444]"
                        title="Prioridade Alta — baseada em sinais operacionais ilustrativos."
                      >
                        Alta
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-[#F59E0B]"
                        title="Prioridade Média — baseada em sinais operacionais ilustrativos."
                      >
                        Média
                      </span>
                    )}
                  </td>

                  {/* Cliente */}
                  <td className="py-3.5 px-4 font-semibold text-[#0E1B3D] group-hover:text-blue-600 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <span>{opp.cliente}</span>
                      {opp.hasDeepAnalysis && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-600"
                          title="Análise detalhada disponível"
                        />
                      )}
                    </div>
                  </td>

                  {/* Consultor */}
                  <td className="py-3.5 px-4 text-gray-600">{opp.consultor}</td>

                  {/* Etapa */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs">
                      {opp.etapa}
                    </span>
                  </td>

                  {/* Valor */}
                  <td className="py-3.5 px-4 font-semibold tabular-nums text-gray-900">
                    {opp.valor}
                  </td>

                  {/* Tempo parado */}
                  <td className="py-3.5 px-4 text-rose-600 font-medium whitespace-nowrap">
                    {opp.tempoParado}
                  </td>

                  {/* Motivo */}
                  <td className="py-3.5 px-4 text-gray-600 text-xs max-w-xs leading-snug">
                    {opp.motivo}
                  </td>

                  {/* Ação recomendada */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                        {opp.acaoRecomendada}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenDetail(opp)
                        }}
                        className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
                      >
                        Ver análise
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE STACKED CARDS (<= 640px) */}
        <div className="md:hidden space-y-3">
          {opportunitiesData.map((opp) => (
            <div
              key={opp.id}
              onClick={() => handleOpenDetail(opp)}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 transition-colors cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {opp.prioridade === 'Alta' ? (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-[#EF4444]"
                      title="Prioridade Alta — baseada em sinais operacionais ilustrativos."
                    >
                      Alta
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-[#F59E0B]"
                      title="Prioridade Média — baseada em sinais operacionais ilustrativos."
                    >
                      Média
                    </span>
                  )}
                  <span className="font-bold text-sm text-[#0E1B3D]">{opp.cliente}</span>
                </div>
                <span className="text-xs font-bold text-gray-900">{opp.valor}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <span className="text-gray-400">Consultor:</span> {opp.consultor}
                </div>
                <div>
                  <span className="text-gray-400">Etapa:</span> {opp.etapa}
                </div>
                <div>
                  <span className="text-gray-400">Parado há:</span>{' '}
                  <span className="text-rose-600 font-semibold">{opp.tempoParado}</span>
                </div>
              </div>

              <div className="text-xs bg-gray-50 p-2 rounded-lg text-gray-600">
                <span className="font-semibold text-gray-800">Motivo:</span> {opp.motivo}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-blue-600">{opp.acaoRecomendada}</span>
                <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded font-medium">
                  Ver análise →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. BLOCO 6 — DOIS CARDS "INSIGHT COGITO" */}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Insight 1 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0E1B3D] uppercase tracking-wider mb-1">
              Insight Cogito
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              38 oportunidades estão sem movimentação há mais de 5 dias. O maior volume está
              concentrado na etapa &quot;Proposta enviada&quot;.
            </p>
            <span className="text-[10px] text-gray-400 block mt-2">
              Dados ilustrativos do mockup.
            </span>
          </div>
        </div>

        {/* Insight 2 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-subtle flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0E1B3D] uppercase tracking-wider mb-1">
              Insight Cogito
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Consultores com follow-up realizado até 48 horas após envio da proposta apresentam
              melhor continuidade no funil.
            </p>
            <span className="text-[10px] text-gray-400 block mt-2">
              Dados ilustrativos do mockup.
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SLIDE-OVER DETAIL PANEL (~520px / Bottom sheet on mobile) */}
      {/* ========================================================= */}
      {detailOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setDetailOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[520px] bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-up sm:animate-fade-in border-l border-gray-200">
              {/* Panel Header */}
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0E1B3D] leading-none">
                      Análise Cogito
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Oportunidade: Carlos Henrique (R$ 3.480/ano)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Fechar painel"
                  onClick={() => setDetailOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-6 space-y-6 flex-1">
                {/* 1. Por que esta oportunidade foi priorizada? */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Por que esta oportunidade foi priorizada?
                  </h4>
                  <ul className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>proposta enviada há 6 dias;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>nenhuma interação registrada desde então;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>não existe próxima atividade agendada;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>valor acima da média das oportunidades do consultor.</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Indicador pill: Potencial de recuperação: Alto */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-800">
                      Classificação Operacional
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#10B981] border border-emerald-300">
                      Potencial de recuperação: Alto
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700/80 italic">
                    Prioridade Alta — baseada em sinais operacionais ilustrativos (tempo parado e
                    ausência de atividade).
                  </p>
                </div>

                {/* 3. Ação recomendada */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Ação recomendada
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-800 bg-white p-3.5 rounded-xl border border-gray-200 leading-relaxed">
                    Entrar em contato hoje para confirmar se o cliente analisou a proposta e
                    identificar eventual objeção.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleActionClick('Geração de mensagem')}
                      title="Demonstrativo: não altera dados nem envia mensagens"
                      className="px-3.5 py-2 rounded-lg bg-[#0E1B3D] text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      Gerar mensagem (demonstrativo)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleActionClick('Criação de tarefa')}
                      title="Demonstrativo: não altera dados nem cria registros no CRM"
                      className="px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Criar tarefa (demonstrativo)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleActionClick('Histórico da oportunidade')}
                      className="px-3.5 py-2 rounded-lg text-gray-600 hover:text-gray-900 text-xs font-medium hover:bg-gray-100 transition-colors"
                    >
                      Ver histórico (demonstrativo)
                    </button>
                  </div>
                </div>

                {/* 4. Mensagem sugerida pela IA */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Mensagem sugerida pela IA
                    </h4>
                  </div>

                  <blockquote className="p-4 rounded-xl bg-blue-50/50 border-l-4 border-l-blue-600 text-xs sm:text-sm text-gray-800 italic leading-relaxed">
                    &quot;Olá, Carlos! Tudo bem? Vi que encaminhamos sua proposta há alguns dias e
                    gostaria de saber se conseguiu analisá-la. Posso ajudar com alguma dúvida ou
                    verificar alguma condição para avançarmos?&quot;
                  </blockquote>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleUseMessage}
                      title="Demonstrativo: copia o texto, não envia mensagem real"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      {copiedMessage ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <MessageSquare className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedMessage ? 'Copiado!' : 'Usar mensagem (demonstrativo)'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleActionClick('Edição de mensagem')}
                      className="px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Editar (demonstrativo)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleActionClick('Nova abordagem sugerida')}
                      className="px-3.5 py-2 rounded-lg text-gray-600 hover:text-gray-900 text-xs font-medium hover:bg-gray-100 transition-colors"
                    >
                      Gerar outra abordagem (demonstrativo)
                    </button>
                  </div>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>Origem: CRM I3Tech (dados ilustrativos)</span>
                <button
                  type="button"
                  onClick={() => setDetailOpen(false)}
                  className="font-semibold text-gray-700 hover:text-black"
                >
                  Fechar painel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
