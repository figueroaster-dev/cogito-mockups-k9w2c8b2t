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
  Car,
  User,
  FileCheck2,
  Eye,
  Shield,
  ExternalLink,
  Layers,
  HelpCircle,
  Copy,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export type EtapaFunil =
  | 'Recebidas'
  | 'Negociação'
  | 'Vistoria'
  | 'Documentos'
  | 'Assinatura'
  | 'Análise Conferência'
  | 'Aprovados'
  | 'Aguardando Ativação'

export type PendenciaTipo =
  | 'Documentos do associado'
  | 'Documentos do veículo'
  | 'Vistoria'
  | 'Assinatura'
  | 'Análise operacional'

export interface CotacaoPriorizada {
  id: string
  codigo: string
  lead: string
  consultor: string
  etapa: EtapaFunil
  responsavelAcao: string // 'Consultor (Rafael)', 'Análise Operacional (Conferência)', etc. ou 'A confirmar'
  tipoPendencia: PendenciaTipo
  detalhePendencia: string
  ultimaAtualizacao: string // 'Ontem às 16h40', 'Há 4 dias', etc.
  proximoCompromisso: string // 'Hoje às 15h00' ou 'Nenhum compromisso futuro registrado'
  mensalidadePotencial: string // 'R$ 210/mês' ou 'A confirmar'
  adesao: string // 'R$ 350' ou 'Não disponível'
  motivoPrioridade: string
  proximaAcaoRecomendada: string
  regiao: string
  referenciaComercial: string
  veiculo: string
  // Dados de evidências
  evidencias: {
    statusAssociadoDocs: string
    statusVeiculoDocs: string
    statusVistoria: string
    statusAssinatura: string
    statusAnaliseOperacional: string
    timestamps: string
  }
  // Rascunho para mensagem
  mensagemSugerida: string
}

const cotacoesData: CotacaoPriorizada[] = [
  {
    id: 'cot-1',
    codigo: 'COT-8421',
    lead: 'Carlos Henrique Medeiros',
    consultor: 'Rafael Silveira',
    etapa: 'Assinatura',
    responsavelAcao: 'Responsável a confirmar',
    tipoPendencia: 'Assinatura',
    detalhePendencia: 'Status do processo de assinatura pendente no CRM (cenário ilustrativo)',
    ultimaAtualizacao: 'Há 3 dias (18/10 às 14:20)',
    proximoCompromisso: 'Nenhum compromisso futuro registrado',
    mensalidadePotencial: 'R$ 290/mês',
    adesao: 'R$ 400',
    motivoPrioridade:
      'Processo de assinatura marcado como pendente, sem compromisso futuro registrado na agenda.',
    proximaAcaoRecomendada:
      'Fazer contato para verificar se houve recebimento do link e se há dúvidas sobre o termo.',
    regiao: 'Belo Horizonte - MG',
    referenciaComercial: 'Campanha Digital Outubro',
    veiculo: 'Toyota Corolla XEi 2.0 (2022) — Categoria Passeio',
    evidencias: {
      statusAssociadoDocs: 'Aprovados no CRM',
      statusVeiculoDocs: 'Aprovados no CRM',
      statusVistoria: 'Aprovada (cenário demonstrativo)',
      statusAssinatura: 'Pendente (envio e leitura do link a confirmar com a I3Tech)',
      statusAnaliseOperacional: 'Disponível na Análise Operacional (regras a confirmar)',
      timestamps:
        'Registro no CRM: 12/10 | Última atualização do registro: 18/10 | Rastreamento de leitura: Não verificado',
    },
    mensagemSugerida:
      'Olá Carlos Henrique! Tudo bem? Acompanhando sua cotação (COT-8421) para o Corolla, verificamos que os processos de documentação e vistoria estão aprovados, constando a assinatura do termo como pendente. Gostaria de saber se você teve acesso ao documento ou se precisa de algum suporte por aqui.',
  },
  {
    id: 'cot-2',
    codigo: 'COT-8395',
    lead: 'Fernanda Almeida Prado',
    consultor: 'Lucas Nogueira',
    etapa: 'Vistoria',
    responsavelAcao: 'Responsável a confirmar',
    tipoPendencia: 'Vistoria',
    detalhePendencia: 'Status do processo de vistoria consta como pendente no CRM',
    ultimaAtualizacao: 'Há 5 dias (16/10 às 11:15)',
    proximoCompromisso: 'Nenhum compromisso futuro registrado',
    mensalidadePotencial: 'R$ 180/mês',
    adesao: 'R$ 250',
    motivoPrioridade:
      'Cotação na etapa Vistoria com processo de vistoria pendente há mais de 4 dias e sem compromisso futuro na agenda.',
    proximaAcaoRecomendada:
      'Contatar a lead para orientar a realização da vistoria ou checar necessidade de vistoria assistida.',
    regiao: 'Contagem - MG',
    referenciaComercial: 'Indicação de Associado',
    veiculo: 'Hyundai HB20 1.0 Flex (2021)',
    evidencias: {
      statusAssociadoDocs: 'Aprovados',
      statusVeiculoDocs: 'Aprovados',
      statusVistoria:
        'Pendente (não há evidência no CRM se o link foi aberto ou se houve tentativa)',
      statusAssinatura: 'Não iniciada',
      statusAnaliseOperacional: 'Aguardando vistoria (controles na Análise Operacional)',
      timestamps:
        'Registro no CRM: 14/10 | Atualização de registro: 16/10 | Envio/leitura: Não validado no CRM',
    },
    mensagemSugerida:
      'Olá Fernanda! Tudo bem? Estou acompanhando sua cotação (COT-8395) para o HB20. No sistema consta a vistoria como pendente. Teve alguma dificuldade para realizar as fotos ou gostaria de apoio para concluir essa etapa?',
  },
  {
    id: 'cot-3',
    codigo: 'COT-8512',
    lead: 'Ricardo Souza Mendes',
    consultor: 'Amanda Vasconcelos',
    etapa: 'Documentos',
    responsavelAcao: 'Responsável a confirmar',
    tipoPendencia: 'Documentos do veículo',
    detalhePendencia:
      'Cenário ilustrativo com regra a confirmar: documento do veículo com apontamento de pendência',
    ultimaAtualizacao: 'Há 2 dias (19/10 às 09:30)',
    proximoCompromisso: 'Nenhum compromisso futuro registrado',
    mensalidadePotencial: 'R$ 230/mês',
    adesao: 'R$ 300',
    motivoPrioridade:
      'Processo de documentos do veículo com pendência assinalada e sem agendamento futuro no lead.',
    proximaAcaoRecomendada: 'Solicitar reenvio do documento do veículo com boa legibilidade.',
    regiao: 'Betim - MG',
    referenciaComercial: 'Parceiro Oficina Credenciada',
    veiculo: 'Chevrolet Onix Plus Turbo (2020)',
    evidencias: {
      statusAssociadoDocs: 'Aprovados',
      statusVeiculoDocs: 'Pendente com motivo registrado (cenário demonstrativo)',
      statusVistoria: 'Aprovada',
      statusAssinatura: 'Não iniciada',
      statusAnaliseOperacional: 'Pendência registrada no CRM em 19/10 às 09:25',
      timestamps:
        'Registro: 17/10 | Última atualização do registro: 19/10 | Histórico de contato consolidado: Não verificado',
    },
    mensagemSugerida:
      'Olá Ricardo! Tudo bem? Na conferência da sua cotação (COT-8512), foi apontada uma pendência na foto do documento do seu Onix Plus. Poderia nos enviar uma nova imagem nítida para darmos andamento à cotação?',
  },
  {
    id: 'cot-4',
    codigo: 'COT-8460',
    lead: 'Juliana Costa Ferreira',
    consultor: 'Rafael Silveira',
    etapa: 'Análise Conferência',
    responsavelAcao: 'Responsável a confirmar',
    tipoPendencia: 'Análise operacional',
    detalhePendencia:
      'Cotação em Análise Conferência; alteração de status e fotos disponível na Análise Operacional',
    ultimaAtualizacao: 'Há 1 dia (20/10 às 15:10)',
    proximoCompromisso: 'A confirmar na mesa de conferência',
    mensalidadePotencial: 'R$ 350/mês',
    adesao: 'R$ 600',
    motivoPrioridade:
      'Cotação na etapa Análise Conferência aguardando parecer ou deliberação nos controles operacionais.',
    proximaAcaoRecomendada:
      'Verificar o status da cotação na Análise Operacional e validar alçadas e responsabilidades com a I3Tech.',
    regiao: 'Belo Horizonte - MG',
    referenciaComercial: 'Consultoria Direta',
    veiculo: 'Jeep Compass Longitude Diesel (2021)',
    evidencias: {
      statusAssociadoDocs: 'Enviados no CRM',
      statusVeiculoDocs: 'Enviados no CRM',
      statusVistoria: 'Enviada',
      statusAssinatura: 'Não finalizada',
      statusAnaliseOperacional:
        'A tela Análise Conferência informa que a alteração de status fica na Análise Operacional',
      timestamps:
        'Registro: 18/10 | Última atualização: 20/10 às 15:10 | Matriz de permissões: A confirmar com a I3Tech',
    },
    mensagemSugerida:
      'Olá Juliana! Informamos que os dados e processos da sua cotação (COT-8460) estão em acompanhamento na etapa de Análise Conferência. Havendo qualquer atualização operacional, faremos contato imediato.',
  },
  {
    id: 'cot-5',
    codigo: 'COT-8530',
    lead: 'Marcos Vinicius Santos',
    consultor: 'Lucas Nogueira',
    etapa: 'Documentos',
    responsavelAcao: 'Responsável a confirmar',
    tipoPendencia: 'Documentos do associado',
    detalhePendencia:
      'Cenário ilustrativo com regra a confirmar: comprovante de residência com data a validar (prazo oficial pendente de confirmação com a I3Tech)',
    ultimaAtualizacao: 'Há 4 dias (17/10 às 17:00)',
    proximoCompromisso: 'Nenhum compromisso futuro registrado',
    mensalidadePotencial: 'A confirmar',
    adesao: 'Não disponível',
    motivoPrioridade:
      'Documento do associado com apontamento de pendência e sem compromisso futuro na agenda.',
    proximaAcaoRecomendada:
      'Solicitar envio de comprovante recente conforme regra de aceitação a validar com a I3Tech.',
    regiao: 'Nova Lima - MG',
    referenciaComercial: 'Google Ads',
    veiculo: 'Fiat Strada Freedom 1.3 (2023)',
    evidencias: {
      statusAssociadoDocs: 'Pendente (cenário demonstrativo com regras a confirmar)',
      statusVeiculoDocs: 'Aprovados',
      statusVistoria: 'Aprovada',
      statusAssinatura: 'Não iniciada',
      statusAnaliseOperacional: 'Aguardando validação documental',
      timestamps:
        'Registro: 15/10 | Atualização de registro: 17/10 | Histórico consolidado de leitura: Não verificado',
    },
    mensagemSugerida:
      'Olá Marcos Vinicius! Tudo bem? Para o andamento da sua cotação (COT-8530), precisamos atualizar o comprovante de endereço. Você teria um documento recente para nos enviar por aqui?',
  },
]

export default function Sales() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedCotacao, setSelectedCotacao] = useState<CotacaoPriorizada | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConsultor, setSelectedConsultor] = useState('Todos os consultores')
  const [selectedEtapa, setSelectedEtapa] = useState('Todas as etapas')
  const [selectedPendencia, setSelectedPendencia] = useState('Todos os tipos de pendência')
  const [copiedDraft, setCopiedDraft] = useState(false)
  const [editableMessage, setEditableMessage] = useState('')
  const [isEditingDraft, setIsEditingDraft] = useState(false)

  const handleRefresh = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      toast.success('Lista de cotações priorizadas atualizada (regras explícitas do MVP).')
    }, 600)
  }

  const handleOpenCotacao = (cot: CotacaoPriorizada) => {
    setSelectedCotacao(cot)
    setEditableMessage(cot.mensagemSugerida)
    setIsEditingDraft(false)
    setDetailOpen(true)
  }

  const handleCopyMessage = () => {
    setCopiedDraft(true)
    navigator.clipboard?.writeText(editableMessage)
    toast.success('Rascunho copiado para a área de transferência! (Nenhuma mensagem enviada)')
    setTimeout(() => setCopiedDraft(false), 2000)
  }

  const handleSimulateAction = (acao: string) => {
    toast.info(`${acao} (Ação demonstrativa — nada é enviado ou alterado no CRM)`)
  }

  // Filtragem da lista
  const filteredCotacoes = cotacoesData.filter((c) => {
    const matchSearch =
      c.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.veiculo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchConsultor =
      selectedConsultor === 'Todos os consultores' || c.consultor === selectedConsultor
    const matchEtapa = selectedEtapa === 'Todas as etapas' || c.etapa === selectedEtapa
    const matchPendencia =
      selectedPendencia === 'Todos os tipos de pendência' || c.tipoPendencia === selectedPendencia

    return matchSearch && matchConsultor && matchEtapa && matchPendencia
  })

  // Helper para converter string monetária ("R$ 290/mês", "R$ 400") em número
  const parseValorNumerico = (str: string): number | null => {
    if (
      !str ||
      str.toLowerCase().includes('confirmar') ||
      str.toLowerCase().includes('disponível')
    ) {
      return null
    }
    const clean = str.replace(/[^\d,]/g, '').replace(',', '.')
    const parsed = parseFloat(clean)
    return isNaN(parsed) ? null : parsed
  }

  // Cálculos dinâmicos respeitando o filtro ativo
  const totalCotacoes = filteredCotacoes.length

  // Mensalidades conhecidas
  const cotacoesComMensalidade = filteredCotacoes
    .map((c) => parseValorNumerico(c.mensalidadePotencial))
    .filter((v): v is number => v !== null)
  const somaMensalidade = cotacoesComMensalidade.reduce((acc, val) => acc + val, 0)

  // Adesões conhecidas
  const cotacoesComAdesao = filteredCotacoes
    .map((c) => parseValorNumerico(c.adesao))
    .filter((v): v is number => v !== null)
  const somaAdesao = cotacoesComAdesao.reduce((acc, val) => acc + val, 0)

  // Sem compromisso futuro registrado
  const countSemCompromisso = filteredCotacoes.filter((c) =>
    c.proximoCompromisso.toLowerCase().includes('nenhum'),
  ).length

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Banner Global Mandatório */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-blue-900 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-semibold text-[#0E1B3D]">
            Protótipo — dados ilustrativos, sem conexão ativa
          </span>
        </div>
        <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded hidden sm:inline">
          Ambiente demonstrativo · Decisão assistida
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. HEADER DO SALES: COTAÇÕES PARA DESTRAVAR (P1) */}
      {/* ========================================================= */}
      <div className="space-y-4 pb-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                P1 — Primeiro MVP
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                Lista de Trabalho Priorizada
              </span>
              <span className="text-xs text-gray-500">
                Regras explícitas de priorização + IA para contexto e redação
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight mt-1.5">
              Cotações para Destravar
            </h1>
            <p className="text-xs sm:text-sm text-blue-800 font-semibold mt-0.5">
              Quais cotações precisam da minha atenção, qual é o bloqueio e o que devo fazer agora?
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
              O Cogito complementa o funil do CRM com uma lista de prioridades, reunindo pendências,
              responsáveis e próximos passos.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isUpdating}
              title="Ação demonstrativa"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0E1B3D] text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75"
            >
              <RefreshCw className={cn('w-4 h-4', isUpdating && 'animate-spin')} />
              <span>{isUpdating ? 'Reavaliando...' : 'Reavaliar regras'}</span>
            </button>
          </div>
        </div>

        {/* Princípio de Engenharia do MVP */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-blue-900">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Como a detecção funciona neste MVP
            </span>
            <span className="text-[10px] text-blue-700 font-medium">
              Sem previsão de conversão por IA (campo Chance de Conversão não é previsão de IA)
            </span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            No primeiro MVP,{' '}
            <strong>a detecção e a ordenação são baseadas em regras explícitas</strong> (tempo desde
            última atualização de registro, ausência de compromisso futuro na agenda e pendências
            específicas em documentos, vistoria ou assinatura). A{' '}
            <strong>
              IA apoia exclusivamente o resumo situacional, a explicação contextual e o rascunho
              demonstrativo da experiência de redação assistida
            </strong>
            . Nenhuma mensagem é enviada sem o comando explícito do usuário.
          </p>
        </div>

        {/* 4 Cards de Resumo Operacional (Respeitam estritamente o filtro e valores ausentes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {/* Card 1: Quantidade de cotações */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-blue-600 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
              Volume no Filtro
            </span>
            <div className="text-2xl font-extrabold text-[#0E1B3D] tabular-nums mt-0.5">
              {totalCotacoes} {totalCotacoes === 1 ? 'cotação' : 'cotações'}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Registros correspondentes aos filtros ativos
            </p>
          </div>

          {/* Card 2: Mensalidade potencial */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-emerald-600 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Mensalidade Potencial
            </span>
            <div className="text-2xl font-extrabold text-emerald-700 tabular-nums mt-0.5">
              {cotacoesComMensalidade.length > 0
                ? `R$ ${somaMensalidade.toLocaleString('pt-BR')}/mês`
                : 'A confirmar'}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              {totalCotacoes === 0
                ? 'Nenhuma cotação no filtro'
                : cotacoesComMensalidade.length === totalCotacoes
                  ? `Total conhecido de ${totalCotacoes} de ${totalCotacoes} cotações`
                  : `Total conhecido de ${cotacoesComMensalidade.length} das ${totalCotacoes} cotações`}
            </p>
          </div>

          {/* Card 3: Total de adesões potenciais */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-indigo-600 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">
              Total de adesões potenciais
            </span>
            <div className="text-2xl font-extrabold text-[#0E1B3D] tabular-nums mt-0.5">
              {cotacoesComAdesao.length > 0
                ? `R$ ${somaAdesao.toLocaleString('pt-BR')}`
                : 'Não disponível'}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              {totalCotacoes === 0
                ? 'Nenhuma cotação no filtro'
                : cotacoesComAdesao.length === totalCotacoes
                  ? `Total conhecido de ${totalCotacoes} de ${totalCotacoes} cotações`
                  : `Total conhecido de ${cotacoesComAdesao.length} das ${totalCotacoes} cotações`}
            </p>
          </div>

          {/* Card 4: Sem Compromisso Futuro */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-amber-500 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
              Agenda do Lead
            </span>
            <div className="text-2xl font-extrabold text-amber-700 tabular-nums mt-0.5">
              {countSemCompromisso} {countSemCompromisso === 1 ? 'cotação' : 'cotações'}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Sem compromisso futuro registrado na agenda no filtro atual
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. FILTROS E CONTROLES DA LISTA DE TRABALHO */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-subtle p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0E1B3D]">
              Fila Operacional de Destravamento
            </h2>
            <p className="text-xs text-gray-500">
              Clique em uma cotação para abrir o painel detalhado com evidências e preparar
              mensagem.
            </p>
          </div>
          <span className="text-xs text-gray-400">
            {filteredCotacoes.length} de {cotacoesData.length} registros exibidos
          </span>
        </div>

        {/* Barra de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar código, lead ou veículo…"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <select
              value={selectedConsultor}
              onChange={(e) => setSelectedConsultor(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option>Todos os consultores</option>
              <option>Rafael Silveira</option>
              <option>Lucas Nogueira</option>
              <option>Amanda Vasconcelos</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedEtapa}
              onChange={(e) => setSelectedEtapa(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option>Todas as etapas</option>
              <option>Recebidas</option>
              <option>Negociação</option>
              <option>Vistoria</option>
              <option>Documentos</option>
              <option>Assinatura</option>
              <option>Análise Conferência</option>
              <option>Aprovados</option>
              <option>Aguardando Ativação</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedPendencia}
              onChange={(e) => setSelectedPendencia(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option>Todos os tipos de pendência</option>
              <option>Documentos do associado</option>
              <option>Documentos do veículo</option>
              <option>Vistoria</option>
              <option>Assinatura</option>
              <option>Análise operacional</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Tabela de Trabalho (Desktop / Tablet) */}
        <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#F7F8FA] text-gray-600 uppercase text-[10px] font-bold tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-3">Cotação & Lead</th>
                <th className="py-3 px-3">Etapa & Consultor</th>
                <th className="py-3 px-3">Responsável Próx. Ação</th>
                <th className="py-3 px-3">Pendência Específica</th>
                <th className="py-3 px-3">Última Atualização & Agenda</th>
                <th className="py-3 px-3">Valores</th>
                <th className="py-3 px-3 text-right">Próxima Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCotacoes.map((cot) => (
                <tr
                  key={cot.id}
                  onClick={() => handleOpenCotacao(cot)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                >
                  {/* Código e Lead */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-blue-700 text-xs font-mono">
                          {cot.codigo}
                        </span>
                        <span className="text-[10px] text-gray-400">· {cot.regiao}</span>
                      </div>
                      <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {cot.lead}
                      </span>
                      <span className="text-[11px] text-gray-500 truncate max-w-[190px]">
                        {cot.veiculo}
                      </span>
                    </div>
                  </td>

                  {/* Etapa e Consultor */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-xs font-medium w-fit">
                        {cot.etapa}
                      </span>
                      <span className="text-xs text-gray-600">
                        Consultor: <strong>{cot.consultor}</strong>
                      </span>
                    </div>
                  </td>

                  {/* Responsável pela Próxima Ação */}
                  <td className="py-3 px-3">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
                        cot.responsavelAcao.includes('Consultor')
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : cot.responsavelAcao.includes('Análise Operacional')
                            ? 'bg-purple-50 text-purple-900 border border-purple-200'
                            : 'bg-gray-100 text-gray-700',
                      )}
                    >
                      {cot.responsavelAcao}
                    </span>
                  </td>

                  {/* Pendência Específica */}
                  <td className="py-3 px-3 max-w-[210px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                        {cot.tipoPendencia}
                      </span>
                      <span className="text-xs text-gray-700 line-clamp-2 leading-snug">
                        {cot.detalhePendencia}
                      </span>
                    </div>
                  </td>

                  {/* Última Atualização e Agenda */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col text-xs space-y-0.5">
                      <span className="text-gray-700">
                        <strong>Atualizado:</strong> {cot.ultimaAtualizacao}
                      </span>
                      <span
                        className={cn(
                          'text-[11px]',
                          cot.proximoCompromisso.includes('Nenhum')
                            ? 'text-rose-600 font-semibold'
                            : 'text-gray-500',
                        )}
                      >
                        <strong>Agenda:</strong> {cot.proximoCompromisso}
                      </span>
                    </div>
                  </td>

                  {/* Valores Separados */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col text-xs font-mono">
                      <span className="font-bold text-[#0E1B3D]">{cot.mensalidadePotencial}</span>
                      <span className="text-[10px] text-gray-500">Adesão: {cot.adesao}</span>
                    </div>
                  </td>

                  {/* Próxima Ação */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenCotacao(cot)
                        }}
                        className="text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <span>Abrir detalhe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards para Telas Menores / Mobile */}
        <div className="lg:hidden space-y-3">
          {filteredCotacoes.map((cot) => (
            <div
              key={cot.id}
              onClick={() => handleOpenCotacao(cot)}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 transition-colors cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-blue-700">{cot.codigo}</span>
                    <span className="text-[10px] text-gray-400">· {cot.regiao}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0E1B3D]">{cot.lead}</h3>
                  <p className="text-xs text-gray-500">{cot.veiculo}</p>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="font-bold text-[#0E1B3D]">{cot.mensalidadePotencial}</span>
                  <p className="text-[10px] text-gray-400">Adesão: {cot.adesao}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                  {cot.etapa}
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-medium">
                  {cot.tipoPendencia}
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  Resp: {cot.responsavelAcao}
                </span>
              </div>

              <div className="text-xs bg-gray-50 p-2.5 rounded-lg space-y-1 text-gray-700">
                <p>
                  <strong>Bloqueio:</strong> {cot.detalhePendencia}
                </p>
                <p className="text-gray-500">
                  <strong>Última atualização:</strong> {cot.ultimaAtualizacao}
                </p>
                <p
                  className={cn(
                    'text-[11px]',
                    cot.proximoCompromisso.includes('Nenhum')
                      ? 'text-rose-600 font-semibold'
                      : 'text-gray-500',
                  )}
                >
                  <strong>Agenda:</strong> {cot.proximoCompromisso}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-500">Consultor: {cot.consultor}</span>
                <span className="text-xs font-semibold text-blue-700 inline-flex items-center gap-1">
                  Ver detalhe e rascunho →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PAINEL DE DETALHE (DRAWER EXTENSIVO ADAPTADO COM OS 7 PONTOS) */}
      {/* ========================================================= */}
      {detailOpen && selectedCotacao && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setDetailOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[560px] bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-gray-200 animate-slide-up sm:animate-fade-in">
              {/* Header do Drawer */}
              <div className="p-5 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                        {selectedCotacao.codigo}
                      </span>
                      <span className="text-xs text-gray-500">Etapa: {selectedCotacao.etapa}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#0E1B3D] leading-tight mt-0.5">
                      {selectedCotacao.lead}
                    </h3>
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

              {/* Corpo: Painel com 5 blocos separados conforme instrução */}
              <div className="p-5 sm:p-6 space-y-6 flex-1 text-xs sm:text-sm">
                {/* 1. Dados ilustrativos da cotação */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between text-blue-900 font-bold uppercase tracking-wider text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      1. Dados ilustrativos da cotação
                    </span>
                    <span className="text-[10px] text-blue-700 font-semibold">
                      Exemplo ilustrativo
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-800">
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">
                        Código & Lead
                      </span>
                      <strong>{selectedCotacao.codigo}</strong> — {selectedCotacao.lead}
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">
                        Veículo
                      </span>
                      <span>{selectedCotacao.veiculo}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">
                        Etapa do Funil
                      </span>
                      <span className="inline-flex px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[11px]">
                        {selectedCotacao.etapa}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">
                        Consultor & Região
                      </span>
                      <span>
                        {selectedCotacao.consultor} ({selectedCotacao.regiao})
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">
                        Mensalidade Potencial
                      </span>
                      <strong>{selectedCotacao.mensalidadePotencial}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase font-bold">
                        Total de adesões potenciais
                      </span>
                      <strong>{selectedCotacao.adesao}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Regra demonstrativa de priorização */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    2. Regra demonstrativa de priorização
                  </h4>
                  <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1.5">
                    <p className="font-medium text-gray-900">{selectedCotacao.motivoPrioridade}</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 pt-1 text-[11px]">
                      <li>
                        <strong>Última atualização de registro:</strong>{' '}
                        {selectedCotacao.ultimaAtualizacao} (não representa confirmação de último
                        contato efetivo).
                      </li>
                      <li>
                        <strong>Compromisso na agenda:</strong> {selectedCotacao.proximoCompromisso}
                        .
                      </li>
                      <li>
                        <strong>Regra aplicada:</strong> Priorizar registros sem compromisso futuro
                        cadastrado na agenda e com processos assinalados como pendentes.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. Explicação do Cogito & Evidências do cenário demonstrativo */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      3. Explicação do Cogito
                    </h4>
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      Evidências do cenário demonstrativo
                    </span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
                    <div className="flex items-start justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="text-gray-500">Documentos do associado:</span>
                      <span className="font-medium text-gray-800 text-right">
                        {selectedCotacao.evidencias.statusAssociadoDocs}
                      </span>
                    </div>
                    <div className="flex items-start justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="text-gray-500">Documentos do veículo:</span>
                      <span className="font-medium text-gray-800 text-right">
                        {selectedCotacao.evidencias.statusVeiculoDocs}
                      </span>
                    </div>
                    <div className="flex items-start justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="text-gray-500">Status da vistoria:</span>
                      <span className="font-medium text-gray-800 text-right">
                        {selectedCotacao.evidencias.statusVistoria}
                      </span>
                    </div>
                    <div className="flex items-start justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="text-gray-500">Assinatura eletrônica:</span>
                      <span className="font-medium text-gray-800 text-right">
                        {selectedCotacao.evidencias.statusAssinatura}
                      </span>
                    </div>
                    <div className="flex items-start justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="text-gray-500">Análise Operacional:</span>
                      <span className="font-medium text-gray-800 text-right">
                        {selectedCotacao.evidencias.statusAnaliseOperacional}
                      </span>
                    </div>
                    <div className="pt-1 text-[11px] text-gray-500 leading-snug">
                      <strong>Rastreamento no demonstrativo:</strong>{' '}
                      {selectedCotacao.evidencias.timestamps}
                    </div>
                  </div>
                </div>

                {/* 4. Próximo passo sugerido */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    4. Próximo passo sugerido
                  </h4>
                  <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">
                        {selectedCotacao.proximaAcaoRecomendada}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {selectedCotacao.responsavelAcao}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900/80 leading-relaxed">
                      Pendência assinalada: <strong>{selectedCotacao.tipoPendencia}</strong> —{' '}
                      {selectedCotacao.detalhePendencia}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleSimulateAction('Simulação de agendamento de compromisso na agenda')
                        }
                        className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-semibold transition-colors"
                      >
                        Simular registro de compromisso
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSimulateAction('Simulação de notificação interna')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                      >
                        Simular notificação
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. Informações ainda não disponíveis */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    5. Informações ainda não disponíveis
                  </h4>
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                    <p className="font-semibold flex items-center gap-1.5 text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      A confirmar com a I3Tech:
                    </p>
                    <ul className="list-disc list-inside text-[11px] text-amber-900/90 space-y-0.5">
                      <li>
                        Histórico consolidado de envio, entrega, leitura e resposta de propostas e
                        termos.
                      </li>
                      <li>
                        Data de entrada em cada etapa e semântica exata dos timestamps do CRM.
                      </li>
                      <li>
                        Matriz completa de responsabilidades e permissões entre consultor e mesa da
                        sede.
                      </li>
                      <li>
                        Obrigatoriedade e exceções de prazos para documentos (ex.: comprovantes de
                        residência).
                      </li>
                      <li>Efeitos sistêmicos e APIs de escrita em tempo real.</li>
                    </ul>
                  </div>
                </div>

                {/* Registro de Origem */}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Registro {selectedCotacao.codigo} no CRM demonstrativo
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Lead: {selectedCotacao.lead} · Consultor: {selectedCotacao.consultor}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSimulateAction('Abertura simulada do registro no CRM')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span>Abrir no CRM (simulação)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>

                {/* Preparação de Mensagem para Revisão (Rascunho demonstrativo) */}
                <div className="space-y-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                        Preparação de Mensagem para Revisão
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      Rascunho Demonstrativo
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-snug">
                    <strong>Rascunho demonstrativo da experiência de redação assistida.</strong> O
                    conteúdo abaixo é um texto sugerido pré-configurado para o consultor revisar e
                    copiar. Nenhuma mensagem é disparada pelo Cogito ou enviada ao cliente.
                  </p>

                  <div className="space-y-2">
                    <textarea
                      value={editableMessage}
                      onChange={(e) => {
                        setEditableMessage(e.target.value)
                        setIsEditingDraft(true)
                      }}
                      rows={4}
                      className="w-full p-3 rounded-xl border border-gray-300 text-xs text-gray-800 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
                      placeholder="Edite a mensagem sugerida..."
                    />

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        {copiedDraft ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedDraft ? 'Copiado!' : 'Copiar rascunho'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditableMessage(selectedCotacao.mensagemSugerida)
                          setIsEditingDraft(false)
                          toast.info('Rascunho restaurado para a sugestão inicial.')
                        }}
                        className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
                      >
                        Restaurar original
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSimulateAction('Preparação de abordagem alternativa')}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 text-xs font-medium hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Gerar outra abordagem (demonstrativo)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer do Drawer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>Decisão supervisionada pelo consultor</span>
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
