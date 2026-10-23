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
    pergunta: 'Por que não consigo aprovar esta cotação?',
    contextoTela: 'CRM — Funil de Vendas > Etapa de Análise Conferência / Aprovação',
    orientacaoObjetiva:
      'Uma cotação só é liberada para aprovação quando todos os quatro requisitos obrigatórios de conformidade forem validados: documentos do associado, documentos do veículo, laudo de vistoria prévia e termo de adesão assinado eletronicamente.',
    passos: [
      {
        num: 1,
        titulo: 'Verificar status dos documentos do associado e do veículo',
        desc: 'Abra a aba "Documentação" da cotação. Certifique-se de que nenhum anexo possui o status "Pendente" ou "Rejeitado por legibilidade".',
      },
      {
        num: 2,
        titulo: 'Conferir o parecer do laudo de vistoria prévia',
        desc: 'Verifique se o número do laudo foi integrado e se o parecer do vistoriador consta como "Aprovado sem ressalvas".',
      },
      {
        num: 3,
        titulo: 'Validar a assinatura eletrônica do termo de adesão',
        desc: 'O contrato precisa estar com status "Assinado". Se estiver como "Enviado", o lead ainda não concluiu a assinatura eletrônica.',
      },
      {
        num: 4,
        titulo: 'Liberar aprovação na mesa de conferência',
        desc: 'Com todas as abas aprovadas, o botão "Aprovar Cotação" ficará habilitado para os perfis com permissão operacional.',
        efeitoRelevante:
          'Efeito: Ao aprovar a cotação, o sistema gera o rascunho de contrato no ERP e notifica o consultor para ativação.',
      },
    ],
    fonteOficial: 'Manual Movidesk — Artigo #1042: Regras de Aprovação e Alçadas no CRM I3Tech',
    conteudoNaoValidado:
      'A regra de tolerância para vistorias com avarias leves ainda não foi formalmente confirmada pela coordenação.',
    efeitoAcao:
      'Aprovar a cotação bloqueia edição de dados cadastrais e move o lead para a etapa "Aprovados", disparando a criação do contrato no ERP.',
  },
  {
    id: 'help-2',
    pergunta: 'Qual a diferença entre conferência e análise operacional?',
    contextoTela: 'Operacional — Divisão de Responsabilidades Comercial vs Sede',
    orientacaoObjetiva:
      'A conferência é uma etapa de checagem documental e cadastral primária (geralmente realizada pelo consultor ou filial), enquanto a análise operacional é a validação de regras de risco, alçadas financeiras e conformidade técnica conduzida pela equipe da sede.',
    passos: [
      {
        num: 1,
        titulo: 'Conferência Cadastral (Prévia)',
        desc: 'Validação da completude: conferir se fotos estão nítidas, se o comprovante é recente e se o veículo confere com a tabela FIPE indicada.',
      },
      {
        num: 2,
        titulo: 'Submissão à Mesa Operacional',
        desc: 'Envio formal para a fila da sede. O consultor perde a permissão de edição direta durante a análise.',
      },
      {
        num: 3,
        titulo: 'Análise Operacional Técnica (Sede)',
        desc: 'Verificação em bases externas, checagem de regras de veículos pesados/frotas, validação de rateio e emissão do parecer final.',
      },
    ],
    fonteOficial:
      'Manual Operacional I3Tech — Seção 3.2: Fluxo de Análise e Matriz de Responsabilidades',
    conteudoNaoValidado:
      'Os prazos de SLA entre a conferência inicial e a resposta da mesa técnica ainda não constam documentados oficialmente.',
    efeitoAcao:
      'A reprovação na análise operacional devolve a cotação para o consultor com exigência cadastrada.',
  },
  {
    id: 'help-3',
    pergunta: 'Como cadastrar associado, veículo e financeiro?',
    contextoTela: 'ERP Gestão — Módulos Cadastrais > Associados e Contratos',
    orientacaoObjetiva:
      'O cadastro no ERP deve seguir a ordem estrita de dependência de entidades: primeiro o Associado (pessoa física/jurídica), depois o Veículo vinculado a ele, e por fim o Contrato com o Plano e as Regras Financeiras.',
    passos: [
      {
        num: 1,
        titulo: 'Cadastrar o Associado no ERP',
        desc: 'Acesse Módulo de Associados > Novo. Insira CPF/CNPJ, nome completo, endereço com CEP válido e contatos para envio de boleto.',
      },
      {
        num: 2,
        titulo: 'Vincular o Veículo ao Associado',
        desc: 'Acesse a aba Veículos do associado > Adicionar Veículo. Preencha placa, chassi, renavam, ano e código FIPE correspondente.',
      },
      {
        num: 3,
        titulo: 'Criar o Contrato e Configurar o Financeiro',
        desc: 'Acesse Contratos > Novo Contrato. Selecione o veículo, defina o plano de proteção veicular, dia de vencimento, forma de cobrança (boleto/Pix) e valor de mensalidade.',
        efeitoRelevante:
          'Efeito: A criação do contrato com data ativa aciona a régua de geração automática de faturas no próximo ciclo de faturamento.',
      },
    ],
    fonteOficial: 'Base de Conhecimento Movidesk — Treinamento Operacional ERP Módulo Associados',
    conteudoNaoValidado:
      'Regras de rateio proporcional para adesões no meio do mês dependem do regulamento interno de cada associação.',
    efeitoAcao:
      'Cadastrar o contrato com vencimento imediato pode gerar cobrança pró-rata automática no ERP.',
  },
  {
    id: 'help-4',
    pergunta: 'Qual a diferença entre fatura sem registro e fatura não paga?',
    contextoTela: 'ERP Financeiro — Módulo de Contas a Receber e Cobrança Bancária',
    orientacaoObjetiva:
      'Fatura sem registro bancário é um boleto gerado no sistema cujo arquivo de remessa ainda não foi confirmado pelo banco conveniado (o código de barras pode não ser aceito em canais de pagamento). Fatura não paga é um título registrado cujo vencimento ocorreu sem liquidação pelo associado.',
    passos: [
      {
        num: 1,
        titulo: 'Identificar a Fatura Emitida sem Registro',
        desc: 'O boleto possui número interno, mas a coluna "Registro Bancário" está como "Pendente" ou "Aguardando Retorno". Não deve ser cobrado do associado como atraso.',
      },
      {
        num: 2,
        titulo: 'Processar Arquivo de Retorno',
        desc: 'Importe o arquivo de retorno diário do banco conveniado para que o ERP confirme o registro da cobrança.',
      },
      {
        num: 3,
        titulo: 'Tratar Fatura Não Paga (Vencida)',
        desc: 'Título que foi devidamente registrado no banco, teve seu vencimento ultrapassado e permanece com saldo devedor.',
        efeitoRelevante:
          'Efeito: Somente faturas registradas e vencidas entram na contagem de inadimplência e régua de notificação.',
      },
    ],
    fonteOficial: 'Manual Movidesk — Artigo #208: Conciliação Bancária e Status de Cobrança no ERP',
    conteudoNaoValidado:
      'O tempo limite de aceitação de boletos sem registro varia conforme o banco emissor (geralmente até D+1).',
    efeitoAcao:
      'Cobrar um associado por fatura sem registro pode gerar reclamações no suporte por erro de linha digitável.',
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
          O Help responde dúvidas frequentes de operação sem inventar links ou regras internas
          inexistentes. Cada resposta indica com clareza o contexto da tela, a fonte do conhecimento
          e alertas para regras que ainda dependem de validação com a gestão.
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
                Assistência Contextual
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
            Orientação Objetiva
          </span>
        </div>

        {/* Orientação Objetiva Inicial */}
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
          {activeTopic.orientacaoObjetiva}
        </div>

        {/* Passos Numerados com Explicação de Efeitos */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Passo a Passo de Resolução
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
            Impacto da Ação no Sistema (CRM & ERP)
          </p>
          <p className="leading-relaxed">{activeTopic.efeitoAcao}</p>
        </div>

        {/* Rodapé do Tópico: Fonte Oficial vs Conteúdo Não Validado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs border-t border-gray-100">
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 space-y-1">
            <span className="font-bold text-[#0E1B3D] block flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              Fonte Oficial Conhecida
            </span>
            <p className="text-gray-600 text-[11px]">{activeTopic.fonteOficial}</p>
          </div>

          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1">
            <span className="font-bold text-amber-950 block flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Conteúdo Ainda Não Validado
            </span>
            <p className="text-amber-900/90 text-[11px]">
              {activeTopic.conteudoNaoValidado ||
                'Regras complementares a confirmar com a equipe técnica da I3Tech.'}
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
