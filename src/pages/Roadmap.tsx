import React, { useState } from 'react'
import {
  Sparkles,
  TrendingUp,
  Landmark,
  LifeBuoy,
  Layers,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Cpu,
  BrainCircuit,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type NivelAutomacao =
  | 'A — Automação tradicional'
  | 'B — Regra + IA'
  | 'C — IA necessária para a experiência proposta'

export type PrioridadeFrente =
  | 'P1 — Primeiro MVP'
  | 'P2 — Segunda onda'
  | 'Quick Win — Escopo reduzido'
  | 'Backlog — Exploração futura'

export interface RoadmapInitiative {
  id: string
  frente: PrioridadeFrente
  titulo: string
  classificacao: NivelAutomacao
  problema: string
  usuarioPrincipal: string
  resultadoEsperado: string
  dependencias: string
  metricaSucesso: string
  papelAutomacaoIA: string
  apenasCartaoOportunidade?: boolean
}

const initiativesData: RoadmapInitiative[] = [
  // P1 — Primeiro MVP
  {
    id: 'init-p1-1',
    frente: 'P1 — Primeiro MVP',
    titulo: 'Cogito Sales — Cotações para Destravar (Priorização & Ação Assistida)',
    classificacao: 'B — Regra + IA',
    problema:
      'Cotações ficam paradas no funil por falta de acompanhamento de pendências específicas (documentos, vistoria, assinatura) e ausência de compromissos agendados.',
    usuarioPrincipal: 'Consultores Comerciais e Coordenadores de Vendas',
    resultadoEsperado:
      'Fila de trabalho priorizada com bloqueio evidente e rascunhos contextuais de mensagem, destravando propostas sem perder tempo de resposta.',
    dependencias:
      'Acesso somente leitura a leads, cotações, propostas ativas e agenda de compromissos do CRM I3Tech.',
    metricaSucesso:
      'Redução do tempo de inércia entre etapas do funil e aumento de cotações recuperadas após bloqueio.',
    papelAutomacaoIA:
      'Regras determinísticas identificam os bloqueios objetivos e ordenam a prioridade; IA generativa resume o contexto situacional e redige a minuta de mensagem sugerida para o consultor revisar.',
  },

  // P2 — Segunda onda
  {
    id: 'init-p2-1',
    frente: 'P2 — Segunda onda',
    titulo: 'Cogito Finance — Fila de Exceções & Reconciliação com ERP',
    classificacao: 'B — Regra + IA',
    problema:
      'Dificuldade de detectar contratos sem faturamento no período, faturas emitidas sem confirmação de registro bancário e inconsistências de conciliação.',
    usuarioPrincipal: 'Operadores Financeiros, Tesouraria e Faturamento',
    resultadoEsperado:
      'Painel de alertas operacionais agrupados em 4 categorias claras com verificação recomendada antes de qualquer tomada de decisão.',
    dependencias:
      'Acesso a associados, contratos, planos e histórico de contas a receber do ERP I3Tech.',
    metricaSucesso:
      'Redução de contratos ativos sem cobrança no fechamento e antecipação de falhas de remessa/retorno bancário.',
    papelAutomacaoIA:
      'Consultas estruturadas e cruzamento determinístico de tabelas para identificar exceções; IA traduz dúvidas em consultas e contextualiza a inconsistência para o operador humano.',
  },

  // Quick Win — Escopo reduzido
  {
    id: 'init-qw-1',
    frente: 'Quick Win — Escopo reduzido',
    titulo: 'Cogito Help — Assistência Contextual por Fluxo',
    classificacao: 'B — Regra + IA',
    problema:
      'Usuários perdem tempo com dúvidas repetitivas sobre cadastros, alçadas de aprovação e diferenças de status operacional entre CRM e ERP.',
    usuarioPrincipal: 'Novos consultores, operadores de atendimento e analistas de filial',
    resultadoEsperado:
      'Orientação rápida com passos numerados, fonte oficial indicada e transparência sobre regras ainda dependentes de validação.',
    dependencias:
      'Mapeamento de conteúdos de suporte, manuais e procedimentos existentes na I3Tech e alinhamento de processos padrão (as fontes oficiais e o conteúdo que poderá ser utilizado pelo Cogito ainda precisam ser validados com a I3Tech).',
    metricaSucesso:
      'Queda em chamados de suporte interno para dúvidas básicas de navegação e preenchimento.',
    papelAutomacaoIA:
      'Busca semântica de artigos de ajuda e geração de roteiros passo a passo orientados à tela em que o usuário se encontra.',
  },

  // Backlog — Exploração futura (SOMENTE CARTÕES DE OPORTUNIDADE — HIPÓTESES A VALIDAR)
  {
    id: 'init-bk-1',
    frente: 'Backlog — Exploração futura',
    titulo: 'Previsão de Inadimplência & Score Comportamental',
    classificacao: 'C — IA necessária para a experiência proposta',
    problema:
      'Hipótese de oportunidade: avaliar se padrões históricos de pagamentos permitem antecipar risco de atraso antes do vencimento.',
    usuarioPrincipal: 'Gestão Financeira e Risco',
    resultadoEsperado:
      'Sinalização precoce para priorizar contatos preventivos da equipe de cobrança.',
    dependencias: 'Histórico representativo, com período a definir após análise dos dados no ERP.',
    metricaSucesso: 'Acurácia de detecção e aderência da equipe em testes piloto.',
    papelAutomacaoIA:
      'Modelos analíticos supervisionados treinados sobre dados transacionais consolidados.',
    apenasCartaoOportunidade: true,
  },
  {
    id: 'init-bk-2',
    frente: 'Backlog — Exploração futura',
    titulo: 'Previsão de Retenção & Alerta de Churn de Associados',
    classificacao: 'C — IA necessária para a experiência proposta',
    problema:
      'Hipótese de oportunidade: identificar sinais indiretos que antecedem cancelamentos de contratos para abordagem proativa.',
    usuarioPrincipal: 'Equipe de Retenção e Pós-Venda',
    resultadoEsperado:
      'Avisos contextuais para relacionamento antes de solicitações formais de cancelamento.',
    dependencias:
      'Histórico representativo, com período a definir após análise dos dados de atendimento e contratos.',
    metricaSucesso: 'Aderência dos alertas e engajamento nas tentativas de retenção.',
    papelAutomacaoIA:
      'Análise de padrões de cancelamento e sugestão de abordagens personalizadas de retenção.',
    apenasCartaoOportunidade: true,
  },
  {
    id: 'init-bk-3',
    frente: 'Backlog — Exploração futura',
    titulo: 'Vistoria Assistida com Visão Computacional',
    classificacao: 'C — IA necessária para a experiência proposta',
    problema:
      'Hipótese de oportunidade: apoio ao associado ou vistoriador durante a captura de fotos para evitar reenvios por enquadramento incorreto.',
    usuarioPrincipal: 'Vistoriadores e Analistas de Risco',
    resultadoEsperado:
      'Orientação em tempo real sobre luz, enquadramento e visibilidade das partes do veículo.',
    dependencias:
      'Fluxo de câmera compatível e viabilidade técnica a definir após análise das fotos demonstrativas.',
    metricaSucesso: 'Diminuição de retrabalho e reenvio de fotos em testes com filiais.',
    papelAutomacaoIA:
      'Visão computacional para validação de layout fotográfico e identificação preliminar de componentes do veículo.',
    apenasCartaoOportunidade: true,
  },
  {
    id: 'init-bk-4',
    frente: 'Backlog — Exploração futura',
    titulo: 'Análise Inteligente de Documentos e Imagens (OCR + Validação)',
    classificacao: 'C — IA necessária para a experiência proposta',
    problema:
      'Hipótese de oportunidade: agilizar a conferência manual de CRLV e CNH na mesa técnica através de pré-extração de campos.',
    usuarioPrincipal: 'Mesa de Conferência e Conformidade',
    resultadoEsperado:
      'Extração assistida de texto para conferência visual lado a lado com os dados da cotação.',
    dependencias: 'Acesso seguro a imagens e conformidade estrita com a LGPD.',
    metricaSucesso: 'Redução do tempo despendido por documento conferido em amostragem controlada.',
    papelAutomacaoIA: 'OCR assistido com cruzamento de campos para checagem com supervisão humana.',
    apenasCartaoOportunidade: true,
  },
  {
    id: 'init-bk-5',
    frente: 'Backlog — Exploração futura',
    titulo: 'Campanhas Inteligentes e Régua Proativa de Contato',
    classificacao: 'B — Regra + IA',
    problema:
      'Hipótese de oportunidade: apoiar a redação de mensagens personalizadas em comunicações sazonais com associados.',
    usuarioPrincipal: 'Marketing e Operações Comerciais',
    resultadoEsperado: 'Rascunhos orientados ao perfil de veículo e estágio do associado na base.',
    dependencias: 'Integração oficial de envio e autorizações de contato validadas.',
    metricaSucesso: 'Taxa de leitura e resposta em campanhas piloto supervisionadas.',
    papelAutomacaoIA:
      'Geração de minutas de mensagens para revisão e disparo por canais homologados.',
    apenasCartaoOportunidade: true,
  },
  {
    id: 'init-bk-6',
    frente: 'Backlog — Exploração futura',
    titulo: 'Análises Gerenciais e Copiloto Executivo para Diretoria',
    classificacao: 'B — Regra + IA',
    problema:
      'Hipótese de oportunidade: síntese de indicadores operacionais dispersos para reuniões de acompanhamento da gestão.',
    usuarioPrincipal: 'Diretoria Executiva e Gestores de Regional',
    resultadoEsperado:
      'Resumos executivos sob demanda a partir de bases consolidadas de vendas e financeiro.',
    dependencias:
      'Definição de modelo de integração analítica e homologação prévia das fórmulas gerenciais.',
    metricaSucesso: 'Clareza e precisão das sínteses validadas pelos gestores de regional.',
    papelAutomacaoIA:
      'Agregação analítica combinada com raciocínio de IA para síntese de relatórios executivos.',
    apenasCartaoOportunidade: true,
  },
]

export default function Roadmap() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Todas as frentes')

  const filteredInitiatives = initiativesData.filter((init) => {
    if (selectedFilter === 'Todas as frentes') return true
    return init.frente === selectedFilter
  })

  const getClassificacaoBadge = (cls: NivelAutomacao) => {
    if (cls.startsWith('A')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
          <Cpu className="w-3 h-3 text-blue-600" />
          <span>A — Automação tradicional</span>
        </span>
      )
    }
    if (cls.startsWith('B')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
          <Layers className="w-3 h-3 text-purple-600" />
          <span>B — Regra + IA</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
        <BrainCircuit className="w-3 h-3 text-amber-600" />
        <span>C — IA necessária</span>
      </span>
    )
  }

  const getFrenteBadge = (frente: PrioridadeFrente) => {
    switch (frente) {
      case 'P1 — Primeiro MVP':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
            P1 — Primeiro MVP
          </span>
        )
      case 'P2 — Segunda onda':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            P2 — Segunda onda
          </span>
        )
      case 'Quick Win — Escopo reduzido':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-[#8B5CF6] border border-purple-300">
            Quick Win — Escopo reduzido
          </span>
        )
      case 'Backlog — Exploração futura':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
            Backlog — Exploração futura
          </span>
        )
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
          Ambiente demonstrativo · Visão Estratégica
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. HEADER DO ROADMAP */}
      {/* ========================================================= */}
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Visão de Produto Cogito
          </span>
          <span className="text-xs text-gray-500">Estruturado por P1, P2, Quick Win e Backlog</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#0E1B3D] tracking-tight">
          Roadmap do Cogito
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-3xl leading-relaxed">
          O Roadmap traduz as oportunidades mapeadas no discovery em iniciativas concretas. Cada
          projeto detalha o problema a resolver, o usuário-alvo, o resultado pretendido, as
          dependências de integração, a métrica de validação e o papel da automação e da IA.
        </p>

        {/* Observação Mandatória */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium leading-relaxed">
              <strong>Observação de governança:</strong> &quot;Prioridades propostas a partir do
              discovery. Sequenciamento sujeito à validação de dados, esforço e impacto.&quot;
            </p>
            <p className="text-[11px] text-amber-900/80">
              Distinguimos rigorosamente dor observada na interface de hipóteses de oportunidade no
              Backlog. Nenhuma hipótese de backlog constitui requisito técnico fechado.
            </p>
          </div>
        </div>

        {/* Guia de Classificação: A / B / C */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Classificação Tecnológica das Oportunidades
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 space-y-1">
              <span className="font-bold text-blue-900 block">A — Automação tradicional</span>
              <p className="text-gray-600 text-[11px] leading-snug">
                Regras determinísticas de negócio, filtros diretos de banco de dados e fluxos
                estruturados.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-100 space-y-1">
              <span className="font-bold text-purple-900 block">B — Regra + IA</span>
              <p className="text-gray-600 text-[11px] leading-snug">
                A regra de negócio identifica e seleciona o caso; a IA apoia resumo,
                contextualização e redação de minutas.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100 space-y-1">
              <span className="font-bold text-amber-900 block">C — IA necessária</span>
              <p className="text-gray-600 text-[11px] leading-snug">
                A experiência proposta depende essencialmente de modelos preditivos, visão
                computacional ou agentes avançados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. FILTRO DE FRENTES */}
      {/* ========================================================= */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filtrar frente:
        </span>
        {[
          'Todas as frentes',
          'P1 — Primeiro MVP',
          'P2 — Segunda onda',
          'Quick Win — Escopo reduzido',
          'Backlog — Exploração futura',
        ].map((frente) => (
          <button
            key={frente}
            type="button"
            onClick={() => setSelectedFilter(frente)}
            className={cn(
              'text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all',
              selectedFilter === frente
                ? 'bg-[#0E1B3D] text-white border-[#0E1B3D] shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
            )}
          >
            {frente}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 3. LISTA DE CARTÕES DO ROADMAP */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 gap-5">
        {filteredInitiatives.map((init) => (
          <div
            key={init.id}
            className={cn(
              'bg-white rounded-2xl border p-5 sm:p-6 shadow-subtle space-y-4 transition-all',
              init.frente === 'P1 — Primeiro MVP'
                ? 'border-2 border-blue-600 ring-2 ring-blue-50'
                : init.frente === 'Backlog — Exploração futura'
                  ? 'border-dashed border-gray-300 bg-gray-50/50'
                  : 'border-gray-200',
            )}
          >
            {/* Header do Cartão */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 border-b border-gray-100 pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getFrenteBadge(init.frente)}
                  {getClassificacaoBadge(init.classificacao)}
                  {init.apenasCartaoOportunidade && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded">
                      Cartão de Oportunidade (Backlog)
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0E1B3D] mt-1">
                  {init.titulo}
                </h3>
              </div>
              <span className="text-xs text-gray-500 self-start sm:self-auto shrink-0 font-medium">
                Usuário Principal: <strong>{init.usuarioPrincipal}</strong>
              </span>
            </div>

            {/* Grid de Conteúdo Estruturado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="font-bold text-gray-900 uppercase tracking-wider text-[11px] block">
                  Problema Identificado
                </span>
                <p className="text-gray-600 leading-relaxed text-xs">{init.problema}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] block">
                  Resultado Esperado
                </span>
                <p className="text-gray-600 leading-relaxed text-xs">{init.resultadoEsperado}</p>
              </div>

              <div className="space-y-1 pt-1 md:border-t md:border-gray-100">
                <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px] block">
                  Dependências Técnicas / Dados
                </span>
                <p className="text-gray-600 leading-relaxed text-xs">{init.dependencias}</p>
              </div>

              <div className="space-y-1 pt-1 md:border-t md:border-gray-100">
                <span className="font-bold text-purple-900 uppercase tracking-wider text-[11px] block">
                  Métrica de Sucesso
                </span>
                <p className="text-gray-600 leading-relaxed text-xs">{init.metricaSucesso}</p>
              </div>
            </div>

            {/* Papel da Automação e da IA */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <span className="font-bold text-[#0E1B3D] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Papel da Automação e da IA
              </span>
              <p className="text-gray-700 leading-relaxed">{init.papelAutomacaoIA}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
