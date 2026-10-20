import React, { useState } from 'react'
import {
  Sparkles,
  Send,
  AlertTriangle,
  ArrowUpRight,
  Landmark,
  TrendingUp,
  DollarSign,
  FileWarning,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Search,
  PieChart,
  BarChart3,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Finance() {
  const [queryInput, setQueryInput] = useState('')
  const [activeQuestion, setActiveQuestion] = useState('Qual foi a inadimplência do mês passado?')

  const suggestions = [
    'Qual foi a inadimplência do mês passado?',
    'Quanto recebemos hoje?',
    'Quais despesas mais cresceram neste trimestre?',
    'Como está a arrecadação deste mês?',
    'Quais cobranças precisam de atenção?',
    'Compare a arrecadação deste mês com o anterior.',
  ]

  const nextAnalyses = [
    'Ver associados com maior valor em atraso',
    'Comparar inadimplência por regional',
    'Analisar recuperação após cobrança',
    'Projetar arrecadação do próximo mês',
  ]

  const handleSuggestionClick = (text: string) => {
    setActiveQuestion(text)
    setQueryInput(text)
    toast.success(`Análise carregada para: "${text}"`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!queryInput.trim()) return
    setActiveQuestion(queryInput)
    toast.success(`Cogito consolidou os números para: "${queryInput}"`)
  }

  const handleAnalyseContracts = () => {
    toast.info('Abrindo visualizador de auditoria dos 12 contratos sem cobrança...')
  }

  // Monthly data for vertical bar chart
  const monthlyData = [
    { month: 'Abr', rate: 6.1, heightPercent: 55, isHighlight: false, fill: '#3B82F6' },
    { month: 'Mai', rate: 6.4, heightPercent: 62, isHighlight: false, fill: '#3B82F6' },
    { month: 'Jun', rate: 6.2, heightPercent: 58, isHighlight: false, fill: '#3B82F6' },
    { month: 'Jul', rate: 6.5, heightPercent: 66, isHighlight: false, fill: '#3B82F6' },
    { month: 'Ago', rate: 6.9, heightPercent: 78, isHighlight: false, fill: '#F59E0B' },
    { month: 'Set', rate: 7.8, heightPercent: 96, isHighlight: true, fill: '#EF4444' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Target feeling banner */}
      <div className="bg-white/80 border border-blue-100 p-3.5 rounded-xl flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-[#0E1B3D]">Sensação Cogito:</span>
          <span className="text-gray-700 italic">
            &quot;Não preciso montar relatório nem navegar por várias telas para entender o que está
            acontecendo.&quot;
          </span>
        </div>
        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 hidden md:inline">
          ERP I3Tech Sincronizado
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. CAIXA PRINCIPAL DE CONSULTA (Wide prompt + 6 Suggestions) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0E1B3D]">
              Consulta Financeira Inteligente
            </h2>
            <p className="text-xs text-[#6B7280]">
              Pergunte qualquer métrica sobre arrecadação, fluxo, títulos ou inadimplência da sua
              associação.
            </p>
          </div>
        </div>

        {/* Query Input */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Pergunte algo sobre o financeiro..."
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

        {/* 6 Suggestion Chips */}
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Perguntas sugeridas
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSuggestionClick(sug)}
                className={cn(
                  'text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5 active:scale-95',
                  activeQuestion === sug
                    ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200',
                )}
              >
                <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                <span>{sug}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CHAT DEMONSTRADO: PERGUNTA + RESPOSTA COGITO */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-5">
        {/* User Question Bubble */}
        <div className="flex items-start justify-end gap-3">
          <div className="bg-[#0E1B3D] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm sm:text-base font-medium shadow-sm max-w-xl">
            {activeQuestion}
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow mt-1">
            V
          </div>
        </div>

        {/* Cogito AI Response Block */}
        <div className="flex items-start gap-3.5 pt-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl rounded-tl-sm p-5 sm:p-6 flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0E1B3D]">Resposta Cogito</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                  Consolidação I3Tech ERP
                </span>
              </div>
              <span className="text-[11px] text-gray-500">Hoje, 14:32</span>
            </div>

            {/* Answer Content */}
            <div className="space-y-2 text-sm sm:text-base text-gray-800 leading-relaxed">
              <p className="font-semibold text-gray-900">
                A inadimplência de setembro foi de{' '}
                <strong className="text-[#EF4444] font-bold">7,8%</strong>, equivalente a{' '}
                <strong className="text-gray-900 font-bold">R$ 184.320</strong> em cobranças
                vencidas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs sm:text-sm">
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-gray-600">Em agosto, a inadimplência foi de:</span>
                  <strong className="text-gray-900 font-bold">6,9%</strong>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-gray-600">Variação no período:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-rose-600">
                    <ArrowUpRight className="w-4 h-4" />
                    +0,9 ponto percentual
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. 4 CARDS FINANCEIROS */}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: R$ 2,36 mi */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#3B82F6] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold text-blue-600">Consolidado Mensal</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0E1B3D] tabular-nums tracking-tight">
            R$ 2,36 mi
          </div>
          <p className="text-xs text-gray-600 mt-1 font-medium">Arrecadação no período</p>
        </div>

        {/* Card 2: R$ 184 mil */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#EF4444] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold text-rose-600">Títulos em Aberto</span>
            <FileWarning className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#EF4444] tabular-nums tracking-tight">
            R$ 184 mil
          </div>
          <p className="text-xs text-gray-600 mt-1 font-medium">Valor inadimplente</p>
        </div>

        {/* Card 3: 7,8% */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#F59E0B] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold text-amber-600">Taxa Relativa</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0E1B3D] tabular-nums tracking-tight">
            7,8%
          </div>
          <p className="text-xs text-gray-600 mt-1 font-medium">Taxa de inadimplência</p>
        </div>

        {/* Card 4: 1.284 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 border-l-4 border-l-[#8B5CF6] shadow-subtle hover:shadow-elevation transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-semibold text-purple-600">Boletos Vencidos</span>
            <Landmark className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0E1B3D] tabular-nums tracking-tight">
            1.284
          </div>
          <p className="text-xs text-gray-600 mt-1 font-medium">Cobranças vencidas</p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GRÁFICO DE BARRAS VERTICAL (Evolução da inadimplência) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-base sm:text-lg font-bold text-[#0E1B3D]">
                Evolução da inadimplência — últimos 6 meses
              </h3>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Tendência suave de alta ao longo do semestre com aceleração no último ciclo.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-3 h-3 rounded bg-blue-500" /> Regular
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-3 h-3 rounded bg-amber-500" /> Atenção
            </span>
            <span className="flex items-center gap-1.5 text-gray-900 font-semibold">
              <span className="w-3 h-3 rounded bg-rose-500" /> Destaque Setembro
            </span>
          </div>
        </div>

        {/* Accessible Vertical Bar Chart in pure SVG/CSS */}
        <div className="pt-4 pb-2">
          <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-3 sm:gap-6 px-2 sm:px-6 border-b border-gray-200 relative">
            {/* Subtle horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-gray-300 w-full flex justify-end text-[10px] text-gray-400 pr-2">
                8%
              </div>
              <div className="border-b border-dashed border-gray-300 w-full flex justify-end text-[10px] text-gray-400 pr-2">
                6%
              </div>
              <div className="border-b border-dashed border-gray-300 w-full flex justify-end text-[10px] text-gray-400 pr-2">
                4%
              </div>
              <div className="border-b border-dashed border-gray-300 w-full flex justify-end text-[10px] text-gray-400 pr-2">
                2%
              </div>
            </div>

            {/* Bars */}
            {monthlyData.map((item) => (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center h-full justify-end group relative z-10"
              >
                {/* Value tooltip/pill on top of the bar */}
                <span
                  className={cn(
                    'text-xs font-bold mb-2 tabular-nums transition-transform group-hover:-translate-y-1',
                    item.isHighlight ? 'text-[#EF4444] text-sm' : 'text-gray-700',
                  )}
                >
                  {item.rate.toString().replace('.', ',')}%
                </span>

                {/* Vertical Bar */}
                <div
                  className={cn(
                    'w-full max-w-[48px] rounded-t-lg transition-all duration-300 group-hover:opacity-90 shadow-sm',
                    item.isHighlight
                      ? 'bg-gradient-to-t from-rose-600 to-rose-500 ring-2 ring-rose-200 ring-offset-1'
                      : item.month === 'Ago'
                        ? 'bg-gradient-to-t from-amber-600 to-amber-500'
                        : 'bg-gradient-to-t from-blue-600 to-blue-400',
                  )}
                  style={{ height: `${item.heightPercent}%` }}
                />

                {/* Month Label */}
                <span
                  className={cn(
                    'text-xs mt-2.5 font-medium',
                    item.isHighlight ? 'text-[#EF4444] font-bold' : 'text-gray-500',
                  )}
                >
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CARD DESTACADO "ATENÇÃO" & CARD PROATIVO "ANOMALIA" */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: Atenção Inadimplência */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <div className="p-1.5 rounded-lg bg-amber-500 text-white">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">Atenção</h3>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
            <p className="font-semibold">A inadimplência aumentou pelo segundo mês consecutivo.</p>
            <p className="text-amber-900/90">
              A maior concentração de valores vencidos está entre associados com atraso entre 6 e 15
              dias.
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[11px] text-amber-800 font-medium">
              Recomendação Cogito: disparar régua preventiva de cobrança via WhatsApp antes do 15º
              dia.
            </span>
          </div>
        </div>

        {/* Card 2: Proativo — Cogito encontrou uma anomalia */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 border-l-4 border-l-purple-600 shadow-subtle space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-base text-[#0E1B3D]">
                  Cogito encontrou uma anomalia
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Detecção Automática
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              12 contratos ativos não apresentaram cobrança gerada neste ciclo.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Demonstração de que o Finance monitora ativamente sem precisar que o usuário pergunte.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleAnalyseContracts}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0E1B3D] text-white text-xs sm:text-sm font-semibold hover:bg-purple-700 transition-colors shadow-sm"
            >
              <span>Analisar contratos</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. PRÓXIMAS ANÁLISES SUGERIDAS */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-subtle space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm sm:text-base font-bold text-[#0E1B3D]">
            Próximas análises sugeridas
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {nextAnalyses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSuggestionClick(item)}
              className="p-3 text-left rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 text-xs font-medium text-gray-700 hover:text-blue-700 transition-all flex items-center justify-between group"
            >
              <span>{item}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
