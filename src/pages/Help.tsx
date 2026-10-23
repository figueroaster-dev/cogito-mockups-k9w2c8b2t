import React, { useState } from 'react'
import {
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageSquare,
  Lock,
  Layers,
  ChevronRight,
  Info,
  AlertTriangle,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface HelpTopic {
  id: string
  pergunta: string
  contextoTela: string
  orientacaoObjetiva: string
  passos: { num: number; titulo: string; desc: string; efeitoRelevante?: string }[]
  fonteOficial: string
  conteudoNaoValidado?: string
  efeitoAcao: string
}

const helpTopicsData: HelpTopic[] = [
  {
    id: 'help-1',
    pergunta: 'Como funciona a conferência e aprovação de cotações?',
    contextoTela: 'CRM — Funil de Vendas > Telas de Análise Conferência e Análise Operacional',
    orientacaoObjetiva:
      'Na interface observada, Análise Conferência permite acompanhar os dados e processos. A tela informa que a análise de fotos e a alteração dos status dos processos ficam disponíveis na Análise Operacional. Responsabilidades e permissões por perfil precisam ser confirmadas com a I3Tech.',
    passos: [
      {
        num: 1,
        titulo: 'Acompanhar dados e status dos processos na Análise Conferência',
        desc: 'Na tela Análise Conferência, é possível visualizar o resumo cadastral, campos da cotação e os status dos processos (documentos do associado, documentos do veículo, vistoria e assinatura).',
      },
      {
        num: 2,
        titulo: 'Acessar a tela Análise Operacional para fotos e alterações',
        desc: 'A própria tela Análise Conferência informa expressamente que a análise de fotos e a alteração dos status dos processos ficam disponíveis na Análise Operacional.',
      },
      {
        num: 3,
        titulo: 'Operar os controles de aprovação e reprovação observados',
        desc: 'A Análise Operacional apresenta controles de aprovação e reprovação. Os efeitos exatos e a existência de restrições por perfil dependem de validação técnica.',
        efeitoRelevante:
          'A confirmar com a I3Tech: Os efeitos sistêmicos das ações de aprovação ou reprovação (ex.: criação de contrato, bloqueio de edição ou notificações) ainda não foram validados.',
      },
    ],
    fonteOficial: 'Fonte oficial pendente de validação pela I3Tech.',
    conteudoNaoValidado:
      'Obrigatoriedade e exceções dos requisitos de aprovação, alçadas financeiras e matriz de permissões precisam ser confirmadas com a I3Tech.',
    efeitoAcao:
      'Na demonstração: controles de aprovação e reprovação existem na Análise Operacional. Efeitos em contratos ou notificações não foram confirmados.',
  },
  {
    id: 'help-2',
    pergunta: 'Qual a diferença entre conferência e análise operacional?',
    contextoTela: 'CRM — Telas Análise Conferência vs Análise Operacional',
    orientacaoObjetiva:
      'Na interface observada, Análise Conferência permite acompanhar os dados e processos. A tela informa que a análise de fotos e a alteração dos status dos processos ficam disponíveis na Análise Operacional. Responsabilidades e permissões por perfil precisam ser confirmadas com a I3Tech.',
    passos: [
      {
        num: 1,
        titulo: 'Visualização e acompanhamento (Análise Conferência)',
        desc: 'Permite acompanhar os dados da cotação e o andamento dos processos associados.',
      },
      {
        num: 2,
        titulo: 'Ação e deliberação (Análise Operacional)',
        desc: 'A tela de conferência redireciona para a Análise Operacional quando é necessária a análise de fotos e a alteração dos status dos processos.',
      },
      {
        num: 3,
        titulo: 'Controles operacionais observados',
        desc: 'A Análise Operacional dispõe de controles de aprovação e reprovação, além de campos de motivo de pendência.',
      },
    ],
    fonteOficial: 'Fonte oficial pendente de validação pela I3Tech.',
    conteudoNaoValidado:
      'Matriz completa de permissões por perfil (consultor vs mesa técnica da matriz) e divisão de alçadas permanecem a confirmar com a I3Tech.',
    efeitoAcao:
      'A definição exata de quem pode agir em cada tela e o efeito de cada deliberação dependem de validação técnica.',
  },
  {
    id: 'help-3',
    pergunta: 'Como estão estruturados associado, veículo e contrato no ERP?',
    contextoTela: 'ERP Gestão — Entidades Cadastrais Observadas',
    orientacaoObjetiva:
      'No ERP foram observados: associados, veículos, planos e contratos. Foi observado também que contrato atual e contrato encerrado podem estar vinculados ao mesmo veículo.',
    passos: [
      {
        num: 1,
        titulo: 'Associado, Veículo e Plano',
        desc: 'Identificados cadastros de associados com dados de identificação, veículos associados e vínculos com planos de proteção.',
      },
      {
        num: 2,
        titulo: 'Contratos vinculados ao veículo',
        desc: 'Foi observado na interface que um mesmo veículo pode ter múltiplos contratos vinculados ao longo do tempo (contrato atual e contrato encerrado).',
      },
      {
        num: 3,
        titulo: 'Composição de valores e histórico',
        desc: 'Foram observados vigência, consultor, região, forma de pagamento, composição de valores e histórico de alterações de contrato.',
        efeitoRelevante:
          'A confirmar com a I3Tech: Regras de ativação automática e efeitos de integrações entre CRM e ERP.',
      },
    ],
    fonteOficial: 'Fonte oficial pendente de validação pela I3Tech.',
    conteudoNaoValidado:
      'Regras completas de cobrança esperada, carências e regras de rateio precisam ser validadas.',
    efeitoAcao:
      'Instrução demonstrativa baseada na estrutura de entidades observada na navegação do ERP.',
  },
  {
    id: 'help-4',
    pergunta: 'Qual a diferença entre fatura sem registro bancário e fatura não paga?',
    contextoTela: 'ERP Financeiro — Faturas & Registro Bancário de Cobranças',
    orientacaoObjetiva:
      'No ERP foi observada tela de faturas sem registro, relacionada ao registro bancário de cobranças e a integrações. Uma fatura sem registro bancário não se confunde com fatura não emitida, com fatura não paga ou com pagamento sem baixa.',
    passos: [
      {
        num: 1,
        titulo: 'Fatura sem registro bancário',
        desc: 'Relacionada à confirmação do registro da cobrança junto ao banco conveniado ou a integrações do ERP. A interface informa tela específica de faturas sem registro.',
      },
      {
        num: 2,
        titulo: 'Fatura vencida com saldo pendente (Fatura não paga)',
        desc: 'Fatura que já foi emitida e cujo vencimento ocorreu sem quitação registrada no contas a receber.',
      },
      {
        num: 3,
        titulo: 'Hipótese de pagamento sem baixa',
        desc: 'Cenário futuro que depende de acesso a uma fonte independente de pagamentos e conciliação bancária.',
        efeitoRelevante:
          'A confirmar com a I3Tech: Fluxo de importação de retorno bancário informa possibilidade de quitação automática na interface.',
      },
    ],
    fonteOficial: 'Fonte oficial pendente de validação pela I3Tech.',
    conteudoNaoValidado:
      'Regras de pagamentos parciais, estornos, renegociações e fontes bancárias externas dependem de validação.',
    efeitoAcao:
      'Distinção conceitual estrita para evitar confusão entre pendência bancária, inadimplência e cobrança indevida.',
  },
]

export default function Help() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('help-1')
  const [userQueryInput, setUserQueryInput] = useState('')

  const activeTopic = helpTopicsData.find((t) => t.id === selectedTopicId) || helpTopicsData[0]

  const handleSelectQuestion = (id: string) => {
    setSelectedTopicId(id)
    toast.success('Orientação contextual carregada.')
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userQueryInput.trim()) return

    const lower = userQueryInput.toLowerCase()
    if (lower.includes('aprov') || lower.includes('cotaç')) {
      setSelectedTopicId('help-1')
    } else if (lower.includes('confer') || lower.includes('operacion')) {
      setSelectedTopicId('help-2')
    } else if (
      lower.includes('cadastr') ||
      lower.includes('veículo') ||
      lower.includes('associad')
    ) {
      setSelectedTopicId('help-3')
    } else if (lower.includes('fatura') || lower.includes('registr') || lower.includes('banco')) {
      setSelectedTopicId('help-4')
    } else {
      setSelectedTopicId('help-1')
    }
    toast.info(`Localizada a melhor orientação para sua dúvida.`)
  }

  const handleActionSimulate = (msg: string) => {
    toast.info(`${msg} (Ação demonstrativa — o Cogito orienta e prepara sem alterar sistemas)`)
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
          Ambiente demonstrativo · Apoio a processos
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. HEADER DO COGITO HELP — QUICK WIN */}
      {/* ========================================================= */}
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-[#8B5CF6] border border-purple-200">
            Quick Win — Escopo reduzido
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-100">
            Assistência Contextual de Uso
          </span>
          <span className="text-xs text-gray-400">
            Base em manuais oficiais Movidesk e documentação conhecida
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight">
          Cogito Help — Orientação Contextual por Fluxo
        </h1>
        <p className="text-xs sm:text-sm text-purple-700 font-semibold">
          Orientação objetiva, passos numerados, fontes oficiais e explicação de impactos
          operacionais
        </p>
        <p className="text-xs sm:text-sm text-gray-600 max-w-3xl leading-relaxed">
          Demonstração de assistência contextual orientada aos fluxos observados no CRM e ERP da
          I3Tech. Foram observados acesso a manuais, tutorial em vídeo e widget Movidesk na
          interface; o conteúdo desses materiais e as regras internas permanecem pendentes de
          validação pela I3Tech.
        </p>

        {/* Ciclo de Evolução Futura: Orientar → Preparar → Usuário revisar → Confirmar */}
        <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-purple-900">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Evolução da Experiência do Usuário
            </span>
            <span className="text-[10px] text-purple-700 font-medium">Controle Humano Total</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs font-semibold text-[#0E1B3D] overflow-x-auto pb-1 sm:pb-0">
            <span className="px-2.5 py-1 bg-white rounded border border-purple-200 shrink-0 text-purple-900 font-bold">
              1. Orientar
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="px-2.5 py-1 bg-white rounded border border-purple-200 shrink-0 text-gray-700">
              2. Preparar
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="px-2.5 py-1 bg-purple-600 text-white rounded shrink-0">
              3. Usuário revisar
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="px-2.5 py-1 bg-emerald-600 text-white rounded shrink-0">
              4. Confirmar
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug pt-0.5">
            O Cogito orienta a execução, prepara o rascunho de tela ou mensagem, aguarda a revisão
            detalhada do usuário e só então a ação é confirmada.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. ATALHOS PARA AS 4 DÚVIDAS OBRIGATÓRIAS */}
      {/* ========================================================= */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700">
          Candidatos Iniciais de Perguntas Frequentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {helpTopicsData.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => handleSelectQuestion(topic.id)}
              className={cn(
                'p-3.5 text-left rounded-xl border transition-all flex flex-col justify-between group',
                selectedTopicId === topic.id
                  ? 'bg-purple-50 border-purple-400 shadow-xs ring-2 ring-purple-200'
                  : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-gray-50',
              )}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                  Dúvida de Operação
                </span>
                <p className="text-xs font-bold text-[#0E1B3D] leading-snug group-hover:text-purple-900">
                  {topic.pergunta}
                </p>
              </div>
              <span className="text-[11px] text-gray-500 mt-2 block truncate">
                {topic.contextoTela.split('—')[0]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. RESPOSTA DETALHADA E CONTEXTUAL DO COGITO */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-6">
        {/* Header do Tópico Selecionado */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-purple-600 text-white">
                <HelpCircle className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                Demonstração de Orientação Contextual
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0E1B3D] mt-1">
              {activeTopic.pergunta}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>
                <strong>Contexto da tela:</strong> {activeTopic.contextoTela}
              </span>
            </p>
          </div>

          <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 self-start sm:self-auto shrink-0">
            Observado no demonstrativo
          </span>
        </div>

        {/* Orientação Objetiva Inicial */}
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
          {activeTopic.orientacaoObjetiva}
        </div>

        {/* Passos Numerados com Explicação de Efeitos */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Passo a Passo de Resolução (Demonstrativo)
          </h4>

          <div className="space-y-3">
            {activeTopic.passos.map((st) => (
              <div
                key={st.num}
                className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {st.num}
                </div>
                <div className="space-y-1 flex-1">
                  <h5 className="text-xs sm:text-sm font-bold text-[#0E1B3D] leading-snug">
                    {st.titulo}
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">{st.desc}</p>
                  {st.efeitoRelevante && (
                    <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
                      ⚠️ {st.efeitoRelevante}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explicação dos Efeitos Relevantes no CRM / ERP */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5 text-xs text-blue-950">
          <p className="font-bold uppercase tracking-wider text-[11px] text-blue-900 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            Impacto Operacional & Limites Observados
          </p>
          <p className="leading-relaxed">{activeTopic.efeitoAcao}</p>
        </div>

        {/* Rodapé do Tópico: Fonte Oficial vs Conteúdo Não Validado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs border-t border-gray-100">
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 space-y-1">
            <span className="font-bold text-[#0E1B3D] block flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              Fonte Oficial
            </span>
            <p className="text-gray-700 font-semibold text-[11px]">{activeTopic.fonteOficial}</p>
            <p className="text-gray-500 text-[10px]">
              Foram observados acesso a manuais, tutorial em vídeo e widget Movidesk na interface; o
              conteúdo não foi consultado ou homologado.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1">
            <span className="font-bold text-amber-950 block flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              A confirmar com a I3Tech
            </span>
            <p className="text-amber-900/90 text-[11px]">
              {activeTopic.conteudoNaoValidado ||
                'Regras complementares e efeitos sistêmicos a confirmar com a equipe técnica da I3Tech.'}
            </p>
          </div>
        </div>
        {/* Ações Demonstrativas de Auxílio */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => handleActionSimulate('Preparação da tela no CRM/ERP')}
            className="px-4 py-2 rounded-xl bg-[#0E1B3D] text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-sm"
          >
            Preparar tela para conferência
          </button>
          <button
            type="button"
            onClick={() => handleActionSimulate('Consulta ao suporte Movidesk')}
            className="px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
          >
            Ver artigo no Movidesk
          </button>
        </div>
      </section>
    </div>
  )
}
