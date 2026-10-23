import React, { useState } from 'react'
import {
  Sparkles,
  ClipboardCheck,
  Filter,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  HelpCircle,
  FileText,
  Search,
  ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export type StatusValidacao =
  | 'Em aberto'
  | 'Parcialmente esclarecido'
  | 'Esclarecido'
  | 'Não se aplica'

export type PrioridadeQuestao =
  | 'P1 — Primeiro MVP'
  | 'P2 — Segunda onda'
  | 'Quick Win — Escopo reduzido'
  | 'Depende de validação técnica'

export interface QuestaoValidacao {
  id: number
  tema: string
  pergunta: string
  porQuePrecisamosEsclarecer: string
  evidenciaObservada: string
  resposta: string // Inicia em branco
  responsavel: string // Inicia "A definir"
  status: StatusValidacao // Inicia "Em aberto"
  prioridade: PrioridadeQuestao
  bloqueiaQualEntrega: string
}

const questoesIniciaisData: QuestaoValidacao[] = [
  {
    id: 1,
    tema: 'Integração',
    pergunta:
      'Quais APIs, eventos ou consultas suportadas permitem acessar os dados em modo somente leitura?',
    porQuePrecisamosEsclarecer:
      'Garantir leitura segura sem impacto operacional e viabilizar atualização da lista de prioridades em tempo hábil.',
    evidenciaObservada:
      'Telas do CRM e ERP operam em ambiente web, mas não há documentação pública de endpoints REST, Webhooks ou banco espelho.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega: 'Conexão em tempo real da lista de Cotações para Destravar (P1 Sales).',
  },
  {
    id: 2,
    tema: 'Identificadores',
    pergunta: 'Como se relacionam lead, cotação, proposta, associado, veículo, contrato e fatura?',
    porQuePrecisamosEsclarecer:
      'Mapear chaves primárias e relacionamentos (1:N, N:N) para unificar o ciclo completo sem duplicidade ou órfãos de dados.',
    evidenciaObservada:
      'No ERP foram observados múltiplos contratos (atual e encerrado) vinculados à mesma placa/veículo, e cotações com múltiplas propostas comerciais.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega:
      'Mapeamento de entidades para Sales (P1) e Fila de Exceções do Finance (P2).',
  },
  {
    id: 3,
    tema: 'Datas do CRM',
    pergunta:
      'O que representam a data do cartão e a última atualização? Existe data de entrada em cada etapa?',
    porQuePrecisamosEsclarecer:
      'Calcular com exatidão o tempo real de inércia na etapa sem inferir "dias sem contato" equivocadamente.',
    evidenciaObservada:
      'Alguns cartões exibem data de movimentação de coluna e outros apenas data de criação do lead ou registro de anotação.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega: 'Regras explícitas de ordenação e detecção de cotações travadas.',
  },
  {
    id: 4,
    tema: 'Contatos',
    pergunta:
      'Quais contatos são registrados e vinculados à cotação? Há rastreamento de envio, entrega, leitura e resposta?',
    porQuePrecisamosEsclarecer:
      'Saber se o lead realmente recebeu a proposta e se há tentativa recente antes de sugerir nova abordagem.',
    evidenciaObservada:
      'Disparos ocorrem por canais diversos (WhatsApp, SMS, e-mail) sem retorno padronizado no histórico do lead no CRM.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega:
      'Contextualização situacional e redação assistida de mensagens de follow-up.',
  },
  {
    id: 5,
    tema: 'Agenda',
    pergunta:
      'É possível consultar compromissos futuros, concluídos e cancelados por cotação ou lead?',
    porQuePrecisamosEsclarecer:
      'Evitar alertar o consultor sobre oportunidades que já possuem reunião, ligação ou vistoria agendada para hoje ou amanhã.',
    evidenciaObservada:
      'O CRM possui calendário e tarefas, mas nem todos os consultores vinculam a atividade diretamente ao ID da cotação.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega:
      'Filtro de "Nenhum compromisso futuro registrado" na lista de trabalho priorizada.',
  },
  {
    id: 6,
    tema: 'Status',
    pergunta:
      'Qual é a fonte oficial de etapa, situação geral e substatus? Como são tratadas divergências?',
    porQuePrecisamosEsclarecer:
      'Eliminar ambiguidade entre status da cotação no funil e status das abas de documentos, vistoria e assinatura.',
    evidenciaObservada:
      'Existem cotações na etapa "Assinatura" com laudo de vistoria ainda não concluído formalmente.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega: 'Classificação fidedigna de bloqueios em 5 tipos de pendência.',
  },
  {
    id: 7,
    tema: 'Responsabilidades',
    pergunta: 'Quem deve agir em cada pendência: consultor, analista ou outra equipe?',
    porQuePrecisamosEsclarecer:
      'Atribuir a recomendação do Cogito à pessoa correta (filial vs sede) sem gerar cobrança indevida ao consultor.',
    evidenciaObservada:
      'Pendências de análise operacional ficam na mesa técnica da sede, enquanto documentos ilegíveis dependem do consultor.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega: 'Definição do campo "Responsável pela próxima ação" no Sales e no Help.',
  },
  {
    id: 8,
    tema: 'Valores',
    pergunta:
      'Como identificar a proposta relevante e calcular mensalidade e adesão sem dupla contagem?',
    porQuePrecisamosEsclarecer:
      'Apresentar volume comercial real sem somar cotações alternativas nem confundir valor protegido FIPE com receita da associação.',
    evidenciaObservada:
      'Uma única cotação pode conter 3 opções de plano (Básico, Intermediário e Completo) cadastradas como propostas filhas.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega:
      'Cálculo de "Mensalidade potencial das cotações priorizadas" e "Taxa de adesão".',
  },
  {
    id: 9,
    tema: 'Cobrança esperada',
    pergunta: 'Quais regras definem quando um contrato deve ter uma fatura no período?',
    porQuePrecisamosEsclarecer:
      'Identificar ausência real de faturamento sem gerar falsos positivos para contratos recém-ativados ou com carência contratual.',
    evidenciaObservada:
      'O relatório de associados sem faturas do ERP aponta casos com vencimentos especiais ou primeiro pagamento quitado na adesão.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P2 — Segunda onda',
    bloqueiaQualEntrega:
      'Categoria "Possível ausência de faturamento no período" no Cogito Finance.',
  },
  {
    id: 10,
    tema: 'Exceções financeiras',
    pergunta:
      'Como funcionam transferências, isenções, renegociações, cancelamentos e periodicidades?',
    porQuePrecisamosEsclarecer:
      'Reconhecer exceções operacionais legítimas para não rotular contratos regulares como anomalias ou erros.',
    evidenciaObservada:
      'Alguns associados possuem contratos anuais com cobrança semestral ou acordos de diretoria sem fatura mensal.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P2 — Segunda onda',
    bloqueiaQualEntrega: 'Fila de Exceções do Finance (P2) e filtros de conferência.',
  },
  {
    id: 11,
    tema: 'Pagamentos',
    pergunta:
      'Como são representados pagamentos parciais, estornos, baixas manuais e retornos bancários?',
    porQuePrecisamosEsclarecer:
      'Distinguir com precisão fatura não paga de pagamento recebido pendente de baixa ou conciliação.',
    evidenciaObservada:
      'Identificados pagamentos via Pix sem conciliação automática com o CNAB bancário no contas a receber.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P2 — Segunda onda',
    bloqueiaQualEntrega: 'Status visual de "Pagamento sem baixa" e conferência bancária.',
  },
  {
    id: 12,
    tema: 'Inadimplência',
    pergunta: 'Qual definição deve ser usada e é possível reconstruir a posição histórica?',
    porQuePrecisamosEsclarecer:
      'Padronizar a fórmula oficial de cálculo de inadimplência (faixa de dias de atraso e títulos considerados) sem divergência com a diretoria.',
    evidenciaObservada:
      'Diferentes áreas calculam taxa de inadimplência considerando cortes de 1 dia, 15 dias ou 60 dias de vencimento.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P2 — Segunda onda',
    bloqueiaQualEntrega: 'Indicadores do Finance e histórico mensal de inadimplência.',
  },
  {
    id: 13,
    tema: 'Permissões',
    pergunta: 'Como são segregados os dados entre associações, consultores e equipes?',
    porQuePrecisamosEsclarecer:
      'Garantir conformidade com a LGPD e evitar que consultores visualizem cotações de outros consultores ou regionais não autorizadas.',
    evidenciaObservada:
      'O ERP e CRM atendem operações multi-associação e regionais com gerências distintas.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'Depende de validação técnica',
    bloqueiaQualEntrega:
      'Segurança e controle de acesso em todos os módulos (Sales, Finance, Help).',
  },
  {
    id: 14,
    tema: 'Conhecimento',
    pergunta:
      'Quais manuais e conteúdos oficiais podem alimentar o Help e quem os mantém atualizados?',
    porQuePrecisamosEsclarecer:
      'Alimentar a assistência contextual com conhecimento homologado, evitando inventar processos ou divulgar procedimentos desatualizados.',
    evidenciaObservada:
      'Existem artigos e manuais no Movidesk, mas com datas de atualização variadas e sem responsável formal por revisão.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'Quick Win — Escopo reduzido',
    bloqueiaQualEntrega: 'Base oficial de perguntas e respostas operacionais do Cogito Help.',
  },
  {
    id: 15,
    tema: 'Piloto',
    pergunta:
      'Qual amostra representativa pode ser disponibilizada para validar precisão e resultado?',
    porQuePrecisamosEsclarecer:
      'Testar as regras determinísticas e as sugestões de IA em um grupo piloto de consultores antes da liberação geral.',
    evidenciaObservada:
      'Comportamentos de preenchimento variam substancialmente entre filiais com rotinas comerciais diferentes.',
    resposta: '',
    responsavel: 'A definir',
    status: 'Em aberto',
    prioridade: 'P1 — Primeiro MVP',
    bloqueiaQualEntrega: 'Validação de eficácia e acurácia do Primeiro MVP do Cogito Sales.',
  },
]

export default function Validacao() {
  const [questoes, setQuestoes] = useState<QuestaoValidacao[]>(questoesIniciaisData)
  const [selectedPrioridade, setSelectedPrioridade] = useState<string>('Todas as prioridades')
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos os status')
  const [selectedEntrega, setSelectedEntrega] = useState<string>('Todas as entregas')
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false)
  const [activeEditingId, setActiveEditingId] = useState<number | null>(null)
  const [tempResposta, setTempResposta] = useState<string>('')
  const [tempResponsavel, setTempResponsavel] = useState<string>('A definir')
  const [tempStatus, setTempStatus] = useState<StatusValidacao>('Em aberto')

  // Filtragem
  const filteredQuestoes = questoes.filter((q) => {
    const matchPrio =
      selectedPrioridade === 'Todas as prioridades' || q.prioridade === selectedPrioridade
    const matchStatus = selectedStatus === 'Todos os status' || q.status === selectedStatus
    const matchEntrega =
      selectedEntrega === 'Todas as entregas' ||
      q.bloqueiaQualEntrega.toLowerCase().includes(selectedEntrega.toLowerCase())

    return matchPrio && matchStatus && matchEntrega
  })

  const handleStartEdit = (q: QuestaoValidacao) => {
    setActiveEditingId(q.id)
    setTempResposta(q.resposta)
    setTempResponsavel(q.responsavel)
    setTempStatus(q.status)
  }

  const handleSaveEdit = (id: number) => {
    setQuestoes((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              resposta: tempResposta,
              responsavel: tempResponsavel,
              status: tempStatus,
            }
          : item,
      ),
    )
    setActiveEditingId(null)
    toast.success(
      'Edição local atualizada! (Simulação demonstrativa — alterações não são salvas no banco)',
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const getStatusBadge = (st: StatusValidacao) => {
    switch (st) {
      case 'Em aberto':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            Em aberto
          </span>
        )
      case 'Parcialmente esclarecido':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
            Parcialmente esclarecido
          </span>
        )
      case 'Esclarecido':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            Esclarecido
          </span>
        )
      case 'Não se aplica':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-300">
            Não se aplica
          </span>
        )
    }
  }

  return (
    <div className={cn('space-y-8 animate-fade-in', isPrintMode && 'bg-white p-6')}>
      {/* Banner Global Mandatório */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-blue-900 shadow-xs print:hidden">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-semibold text-[#0E1B3D]">
            Protótipo — dados ilustrativos, sem conexão ativa
          </span>
        </div>
        <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded hidden sm:inline">
          Pauta de Alinhamento Técnico I3Tech
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. HEADER DA PÁGINA DE VALIDAÇÃO TÉCNICA */}
      {/* ========================================================= */}
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                Pauta de Trabalho
              </span>
              <span className="text-xs text-gray-500">15 Questões Chave</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight mt-1.5">
              Validação técnica — Dados e Acessos
            </h1>
            <p className="text-xs sm:text-sm text-indigo-900 font-semibold mt-0.5">
              Questões que precisamos esclarecer para transformar o protótipo em um MVP integrado.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
              Esta pauta consolida as dúvidas essenciais de arquitetura, integridade de dados e
              regras de negócio levantadas durante o discovery com a I3Tech. Todas as respostas
              iniciam em aberto e com responsáveis a definir.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 print:hidden">
            <button
              type="button"
              onClick={() => setIsPrintMode(!isPrintMode)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all',
                isPrintMode
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
              )}
            >
              <Eye className="w-4 h-4" />
              <span>{isPrintMode ? 'Visualização Padrão' : 'Modo Apresentação'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0E1B3D] text-white text-xs font-semibold hover:bg-blue-600 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* Aviso de Preenchimento Demonstrativo */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Nota sobre persistência:</strong> O preenchimento nesta página é puramente
            demonstrativo. Edições efetuadas durante a apresentação operam em estado local da sessão
            e <strong>não são gravadas no backend</strong>.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. FILTROS DA PAUTA DE VALIDAÇÃO */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
        <div className="relative">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
            Prioridade
          </label>
          <select
            value={selectedPrioridade}
            onChange={(e) => setSelectedPrioridade(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
          >
            <option>Todas as prioridades</option>
            <option>P1 — Primeiro MVP</option>
            <option>P2 — Segunda onda</option>
            <option>Quick Win — Escopo reduzido</option>
            <option>Depende de validação técnica</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
        </div>

        <div className="relative">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
          >
            <option>Todos os status</option>
            <option>Em aberto</option>
            <option>Parcialmente esclarecido</option>
            <option>Esclarecido</option>
            <option>Não se aplica</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
        </div>

        <div className="relative">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
            Entrega Afetada
          </label>
          <select
            value={selectedEntrega}
            onChange={(e) => setSelectedEntrega(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
          >
            <option>Todas as entregas</option>
            <option>Sales</option>
            <option>Finance</option>
            <option>Help</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 bottom-2.5 pointer-events-none" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. TABELA / CARDS DAS 15 QUESTÕES */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            {filteredQuestoes.length} questões na pauta atual
          </span>
          <span className="text-xs text-gray-400">Reunião Técnica com Equipe I3Tech</span>
        </div>

        <div className="space-y-4">
          {filteredQuestoes.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-subtle space-y-4 transition-all hover:border-indigo-300"
            >
              {/* Header da Questão: Número, Tema, Prioridade e Status */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 border-b border-gray-100 pb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {q.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-900 border border-indigo-200">
                      Tema: {q.tema}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-700">
                      {q.prioridade}
                    </span>
                    {getStatusBadge(q.status)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0E1B3D] pt-1">
                    {q.pergunta}
                  </h3>
                </div>

                <div className="text-xs text-gray-500 self-start sm:self-auto shrink-0 space-y-0.5 text-right">
                  <p>
                    Responsável: <strong className="text-gray-800">{q.responsavel}</strong>
                  </p>
                </div>
              </div>

              {/* Grid: Por que precisamos esclarecer & Evidência observada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <span className="font-bold text-gray-900 uppercase tracking-wider text-[10px] block">
                    Por que precisamos esclarecer?
                  </span>
                  <p className="text-gray-600 leading-relaxed">{q.porQuePrecisamosEsclarecer}</p>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <span className="font-bold text-gray-900 uppercase tracking-wider text-[10px] block">
                    Evidência observada no Protótipo / Análise
                  </span>
                  <p className="text-gray-600 leading-relaxed">{q.evidenciaObservada}</p>
                </div>
              </div>

              {/* Entrega Bloqueada */}
              <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 text-xs text-rose-950 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Bloqueia qual entrega:</strong> {q.bloqueiaQualEntrega}
                </p>
              </div>

              {/* Resposta e Esclarecimento (Demonstrativo em Branco ou com Edição Local) */}
              <div className="p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    Resposta ou Esclarecimento da I3Tech
                  </span>
                  {activeEditingId !== q.id && (
                    <button
                      type="button"
                      onClick={() => handleStartEdit(q)}
                      className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline print:hidden"
                    >
                      Preencher durante reunião (demo)
                    </button>
                  )}
                </div>

                {activeEditingId === q.id ? (
                  <div className="space-y-3 pt-1">
                    <textarea
                      value={tempResposta}
                      onChange={(e) => setTempResposta(e.target.value)}
                      placeholder="Anote a resposta fornecida pela equipe técnica da I3Tech..."
                      rows={3}
                      className="w-full p-2.5 rounded-lg border border-indigo-300 text-xs text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-semibold text-gray-600 block mb-0.5">
                          Responsável a definir
                        </label>
                        <input
                          type="text"
                          value={tempResponsavel}
                          onChange={(e) => setTempResponsavel(e.target.value)}
                          placeholder="Ex.: Carlos (I3Tech)"
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-gray-600 block mb-0.5">
                          Status
                        </label>
                        <select
                          value={tempStatus}
                          onChange={(e) => setTempStatus(e.target.value as StatusValidacao)}
                          className="w-full px-2.5 py-1.5 rounded-md border border-gray-300 text-xs bg-white"
                        >
                          <option>Em aberto</option>
                          <option>Parcialmente esclarecido</option>
                          <option>Esclarecido</option>
                          <option>Não se aplica</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(q.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Salvar nota na sessão
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveEditingId(null)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {q.resposta ? (
                      <p className="text-gray-800 leading-relaxed italic">
                        &quot;{q.resposta}&quot;
                      </p>
                    ) : (
                      <p className="text-gray-400 italic">
                        [Resposta ainda não preenchida — a esclarecer na reunião com a equipe
                        I3Tech]
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
