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
  FileText,
  Clock,
  ShieldCheck,
  Building,
  RefreshCw,
  Info,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export type CategoriaExcecao =
  | 'Todas as exceções'
  | 'Possível ausência de faturamento no período'
  | 'Faturas vencidas com saldo pendente'
  | 'Registro bancário pendente de confirmação'
  | 'Situações que precisam de conferência'

export type StatusVisualFatura =
  | 'Fatura não emitida'
  | 'Fatura emitida sem registro bancário'
  | 'Fatura vencida'
  | 'Pagamento sem baixa'

export interface ItemFilaExcecao {
  id: string
  categoria: CategoriaExcecao
  tipoFatura: StatusVisualFatura
  associado: string
  veiculo: string
  contratoId: string
  periodo: string
  valor: string
  evidencias: string
  motivo: string
  verificacoesNecessarias: string
  proximoPasso: string
  origem: string
}

const filaExcecoesData: ItemFilaExcecao[] = [
  {
    id: 'exc-1',
    categoria: 'Possível ausência de faturamento no período',
    tipoFatura: 'Fatura não emitida',
    associado: 'Transportadora Silva & Filhos Ltda',
    veiculo: 'Volvo FH 540 (Frota - Contrato Ativo)',
    contratoId: 'CTR-9012',
    periodo: 'Competência Outubro/2024',
    valor: 'R$ 1.840,00 (estimado)',
    evidencias:
      'Contrato ativo no ERP; já consta no relatório padrão de associados sem fatura no período; plano vigente sem bloqueio cadastral.',
    motivo: 'Possível ausência de faturamento no período de fechamento da regional.',
    verificacoesNecessarias:
      'Verificar se houve migração de plano, isenção pontual negociada pela diretoria ou pendência no lote de faturamento.',
    proximoPasso: 'Conferir histórico financeiro no ERP antes de qualquer emissão manual.',
    origem: 'ERP I3Tech (Relatório de Associados Sem Faturas)',
  },
  {
    id: 'exc-2',
    categoria: 'Registro bancário pendente de confirmação',
    tipoFatura: 'Fatura emitida sem registro bancário',
    associado: 'Julio Cesar Albuquerque',
    veiculo: 'Jeep Renegade Longitude (2022)',
    contratoId: 'CTR-7741',
    periodo: 'Vencimento 25/10/2024',
    valor: 'R$ 215,00',
    evidencias:
      'Boleto gerado no sistema em 15/10; remessa bancária enviada, mas arquivo de retorno com confirmação de registro bancário ainda não processado.',
    motivo:
      'Fatura emitida sem confirmação do registro bancário ou código de barras pendente de validação pelo banco conveniado.',
    verificacoesNecessarias:
      'Confirmar retorno da remessa no módulo bancário ou verificar se o banco devolveu inconsistência de CEP/CPF.',
    proximoPasso:
      'Consultar status do arquivo de retorno bancário antes de orientar o associado a pagar.',
    origem: 'Módulo de Cobrança Bancária ERP',
  },
  {
    id: 'exc-3',
    categoria: 'Faturas vencidas com saldo pendente',
    tipoFatura: 'Fatura vencida',
    associado: 'Mariana Duarte Barreto',
    veiculo: 'Chevrolet Tracker Premier (2021)',
    contratoId: 'CTR-6610',
    periodo: 'Vencido em 10/10/2024 (Há 11 dias)',
    valor: 'R$ 280,00',
    evidencias:
      'Fatura com registro bancário confirmado; vencimento ultrapassado em 11 dias sem identificação de crédito no extrato.',
    motivo: 'Fatura vencida com saldo pendente de liquidação.',
    verificacoesNecessarias:
      'Verificar se o associado solicitou segunda via com data atualizada ou efetuou pagamento via Pix sem identificação de contrato.',
    proximoPasso:
      'Acompanhar fila de régua de cobrança padrão (sem envio ou cancelamento automático pelo Cogito).',
    origem: 'Contas a Receber ERP',
  },
  {
    id: 'exc-4',
    categoria: 'Situações que precisam de conferência',
    tipoFatura: 'Pagamento sem baixa',
    associado: 'Auto Posto Alvorada Ltda',
    veiculo: '3 Veículos Leves (Contrato Coletivo)',
    contratoId: 'CTR-8104',
    periodo: 'Competência Setembro/2024',
    valor: 'R$ 690,00',
    evidencias:
      'Crédito bancário de R$ 690,00 localizado no extrato bancário com descrição genérica; título permanece em aberto no ERP.',
    motivo:
      'Hipótese de pagamento sem baixa (dependente de confirmação com a fonte externa de pagamentos ou conciliação bancária).',
    verificacoesNecessarias:
      'Checar comprovante bancário ou conciliação manual da conta corrente da associação.',
    proximoPasso: 'Realizar conciliação manual no ERP após confirmação da tesouraria.',
    origem: 'Extrato Bancário vs Contas a Receber',
  },
  {
    id: 'exc-5',
    categoria: 'Possível ausência de faturamento no período',
    tipoFatura: 'Fatura não emitida',
    associado: 'Roberto Carlos Viana',
    veiculo: 'Honda Civic Touring (2019)',
    contratoId: 'CTR-5520',
    periodo: 'Competência Outubro/2024',
    valor: 'R$ 240,00 (a confirmar)',
    evidencias:
      'Existem contratos atual e encerrado vinculados ao mesmo veículo; fatura do contrato ativo não localizada no lote mensal.',
    motivo:
      'Possível ausência de faturamento decorrente de multiplicidade de contratos no mesmo veículo.',
    verificacoesNecessarias:
      'Conferir se a cobrança foi vinculada acidentalmente ao contrato encerrado.',
    proximoPasso: 'Mesa financeira verificar amarração veículo-contrato ativo no ERP.',
    origem: 'ERP Cadastros de Contratos',
  },
]

export default function Finance() {
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaExcecao>('Todas as exceções')
  const [searchFilter, setSearchFilter] = useState('')
  const [queryInput, setQueryInput] = useState('')
  const [activeQuestion, setActiveQuestion] = useState(
    'Quais contratos apresentam possível ausência de faturamento?',
  )
  const [selectedItem, setSelectedItem] = useState<ItemFilaExcecao | null>(null)

  const naturalQueries = [
    'Quais contratos apresentam possível ausência de faturamento?',
    'Quantas faturas estão vencidas com saldo pendente?',
    'Existem títulos emitidos sem registro bancário confirmado?',
    'Como está a taxa de inadimplência no período?',
  ]

  const handleSuggestionClick = (text: string) => {
    setActiveQuestion(text)
    setQueryInput(text)
    toast.success(`Pergunta complementar carregada: "${text}"`)
  }

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!queryInput.trim()) return
    setActiveQuestion(queryInput)
    toast.success(`Consulta demonstrativa: "${queryInput}"`)
  }

  const handleActionClick = (msg: string) => {
    toast.info(
      `${msg} (Ação demonstrativa — o Cogito NÃO realiza emissão, baixa, cancelamento ou cobrança automática)`,
    )
  }

  // Filtragem
  const filteredExcecoes = filaExcecoesData.filter((item) => {
    const matchCat =
      selectedCategoria === 'Todas as exceções' || item.categoria === selectedCategoria
    const matchSearch =
      item.associado.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.contratoId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.veiculo.toLowerCase().includes(searchFilter.toLowerCase())
    return matchCat && matchSearch
  })

  // Estilo visual dos 4 status de faturas
  const getBadgeForStatus = (status: StatusVisualFatura) => {
    switch (status) {
      case 'Fatura não emitida':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Fatura não emitida</span>
          </span>
        )
      case 'Fatura emitida sem registro bancário':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Fatura emitida sem registro bancário</span>
          </span>
        )
      case 'Fatura vencida':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300">
            <FileWarning className="w-3.5 h-3.5 text-rose-600" />
            <span>Fatura vencida</span>
          </span>
        )
      case 'Pagamento sem baixa':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-800 border border-purple-300">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>Pagamento sem baixa (hipótese)</span>
          </span>
        )
      default:
        return null
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
          Ambiente demonstrativo · Sem ações financeiras automáticas
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. HEADER DO FINANCE — P2: FILA DE EXCEÇÕES */}
      {/* ========================================================= */}
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            P2 — Segunda onda
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            Destaque: Fila de Exceções Operacionais
          </span>
          <span className="text-xs text-gray-400">
            Perguntas em linguagem natural como recurso complementar
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight">
          Cogito Finance — Fila de Exceções & Reconciliação
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-emerald-800">
          Identificação de discrepâncias cadastrais, faturas pendentes e conferência com o ERP
        </p>
        <p className="text-xs sm:text-sm text-gray-600 max-w-3xl leading-relaxed">
          Nesta segunda onda, o Cogito foca na <strong>Fila de Exceções</strong> para apoiar o
          operador financeiro a identificar inconsistências. Usamos o conceito cauteloso de{' '}
          <em>&quot;Possível ausência de faturamento&quot;</em> — nunca afirmando que todo contrato
          sem fatura é erro (pode haver isenção, renegociação ou periodicidade especial).{' '}
          <strong>O sistema NÃO oferece emissão, baixa, cancelamento ou cobrança automática</strong>
          .
        </p>

        {/* Indicadores do Período com Definição e Resalva Explícita */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-blue-600 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-blue-700">Competência Outubro/2024</span>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-[#0E1B3D] tabular-nums mt-1">R$ 2.360.000</div>
            <p className="text-[10px] text-gray-500 mt-0.5">Faturamento emitido no período (ERP)</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-amber-500 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-amber-700">Possível Ausência</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-amber-800 tabular-nums mt-1">12 contratos</div>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Contratos ativos sem fatura no relatório (a conferir)
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-rose-600 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-rose-700">Faturas Vencidas</span>
              <FileWarning className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-700 tabular-nums mt-1">R$ 184.320</div>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Saldo pendente com mais de 5 dias de atraso
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-purple-600 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-purple-700">Taxa de Inadimplência</span>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-[#0E1B3D] tabular-nums mt-1">7,8%*</div>
            <p className="text-[10px] text-purple-800 font-medium mt-0.5">
              *Dependente de definição de negócio e regras de corte
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DESTAQUE PRINCIPAL: FILA DE EXCEÇÕES OPERACIONAIS */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-subtle p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
                <Landmark className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-[#0E1B3D]">
                Fila de Exceções Financeiras (P2)
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Alertas organizados por categoria para conferência operacional humana.
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {filteredExcecoes.length} alertas identificados
          </span>
        </div>

        {/* 4 Categorias Obrigatórias em Abas/Chips */}
        <div className="flex flex-wrap gap-2 pt-1 border-b border-gray-100 pb-3">
          {[
            'Todas as exceções',
            'Possível ausência de faturamento no período',
            'Faturas vencidas com saldo pendente',
            'Registro bancário pendente de confirmação',
            'Situações que precisam de conferência',
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoria(cat as CategoriaExcecao)}
              className={cn(
                'text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all',
                selectedCategoria === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Busca rápida */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filtrar por associado, contrato ou veículo…"
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Cards da Fila de Exceções com Distinção Visual e Detalhes */}
        <div className="grid grid-cols-1 gap-4">
          {filteredExcecoes.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all space-y-3"
            >
              {/* Header do Alerta: Status Visual da Fatura + Categoria + Valor */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  {getBadgeForStatus(item.tipoFatura)}
                  <span className="text-xs font-semibold text-gray-500">
                    Contrato: <strong className="text-gray-800">{item.contratoId}</strong>
                  </span>
                  <span className="text-xs text-gray-400">· {item.periodo}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-[#0E1B3D]">{item.valor}</span>
                </div>
              </div>

              {/* Informações do Associado e Veículo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Associado:</span>{' '}
                  <strong className="text-gray-900">{item.associado}</strong>
                </div>
                <div>
                  <span className="text-gray-400">Veículo:</span>{' '}
                  <span className="text-gray-700">{item.veiculo}</span>
                </div>
              </div>

              {/* Bloco de Evidências, Motivo, Verificações e Próximo Passo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Evidências Observadas:</span>
                  </p>
                  <p className="text-gray-600 leading-relaxed">{item.evidencias}</p>
                </div>

                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Motivo do Alerta:</span>
                  </p>
                  <p className="text-gray-600 leading-relaxed">{item.motivo}</p>
                </div>

                <div className="space-y-1 pt-1 md:border-t md:border-gray-200">
                  <p className="font-semibold text-gray-900">Verificações Necessárias:</p>
                  <p className="text-gray-600 leading-relaxed">{item.verificacoesNecessarias}</p>
                </div>

                <div className="space-y-1 pt-1 md:border-t md:border-gray-200">
                  <p className="font-semibold text-emerald-800">Próximo Passo Recomendado:</p>
                  <p className="text-gray-800 font-medium leading-relaxed">{item.proximoPasso}</p>
                </div>
              </div>

              {/* Ações Demonstrativas Manuais (Sem automação) */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-gray-400">Origem: {item.origem}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleActionClick(`Conferência de ${item.contratoId}`)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                  >
                    Abrir conferência no ERP
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActionClick(`Registrar anotação para ${item.associado}`)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-medium transition-colors"
                  >
                    Registrar nota
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. RECURSO COMPLEMENTAR: PERGUNTAS EM LINGUAGEM NATURAL */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0E1B3D]">
              Consultas Financeiras em Linguagem Natural (Recurso Complementar)
            </h3>
            <p className="text-xs text-[#6B7280]">
              Faça perguntas para consolidar valores e conferir situações do ERP.
            </p>
          </div>
        </div>

        <form onSubmit={handleQuerySubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ex.: Quais associados ativos não têm fatura em outubro?"
              className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-xl border border-gray-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 bg-[#0E1B3D] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Consultar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Sugestões */}
        <div className="flex flex-wrap gap-2">
          {naturalQueries.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSuggestionClick(q)}
              className={cn(
                'text-xs font-medium px-3.5 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5',
                activeQuestion === q
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200',
              )}
            >
              <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
              <span>{q}</span>
            </button>
          ))}
        </div>

        {/* Resposta do Cogito à Pergunta Selecionada */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0E1B3D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Resposta Conceitual Cogito
            </span>
            <span className="text-[10px] font-semibold text-blue-700 uppercase bg-blue-100 px-2 py-0.5 rounded">
              Demonstrativo
            </span>
          </div>

          <div className="text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2">
            <p>
              Em relação à pergunta <strong>&quot;{activeQuestion}&quot;</strong>:
            </p>
            <p>
              O Cogito analisou os dados consolidados do ERP e localizou{' '}
              <strong>12 contratos ativos sem fatura gerada na competência de Outubro/2024</strong>.
              Desses, 2 apresentam contratos duplicados no mesmo veículo e 1 possui solicitação de
              isenção em tramitação interna.
            </p>
            <div className="p-3 bg-white rounded-lg border border-blue-200 text-xs text-gray-600">
              <strong>Nota sobre Inadimplência:</strong> A apuração de 7,8% é uma referência
              preliminar demonstrativa. A fórmula oficial de cálculo (se considera títulos a partir
              de 1 dia, 5 dias ou 30 dias de atraso) é uma questão em aberto a ser esclarecida com a
              I3Tech.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
