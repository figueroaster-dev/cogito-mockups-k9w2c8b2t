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
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Help() {
  const [userQuery, setUserQuery] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState('Como cadastrar um novo associado?')

  const suggestedQuestions = [
    'Como alterar o plano de um associado?',
    'Como registrar um pagamento?',
    'Como cancelar um contrato?',
    'Onde visualizo cobranças em aberto?',
    'Como cadastrar um veículo?',
    'Como consultar uma proposta?',
  ]

  const steps = [
    {
      num: 1,
      title: 'Acesse Associados > Novo Cadastro',
      desc: 'No menu principal do CRM/ERP I3Tech, localize o módulo de Associados e selecione a opção de novo cadastro.',
    },
    {
      num: 2,
      title: 'Informe os dados pessoais',
      desc: 'Preencha CPF, nome completo, endereço de correspondência, contatos telefônicos e e-mail para faturamento.',
    },
    {
      num: 3,
      title: 'Cadastre o veículo',
      desc: 'Insira placa, chassi, modelo FIPE, ano e anexe o laudo ou fotos da vistoria veicular prévia.',
    },
    {
      num: 4,
      title: 'Escolha o plano',
      desc: 'Defina a cota de cobertura (básica, intermediária ou premium com vidros, reboque ilimitado e carro reserva).',
    },
    {
      num: 5,
      title: 'Valide os dados',
      desc: 'Revise os termos contratuais, cálculo de rateio e regras específicas de adesão da associação.',
    },
    {
      num: 6,
      title: 'Finalize o cadastro',
      desc: 'Confirme para gerar o termo de adesão eletrônico e acionar o faturamento inicial no ERP.',
    },
  ]

  const handleChipClick = (q: string) => {
    setCurrentQuestion(q)
    setUserQuery(q)
    toast.success(`Assistente carregou instruções para: "${q}"`)
  }

  const handleAction = (name: string) => {
    toast.info(`Ação acionada: ${name}`)
  }

  const handleFutureChange = () => {
    toast('Supervisão Humana: esta ação prepara a minuta no ERP e exige sua aprovação final.', {
      description: 'Nenhum dado é modificado sem validação prévia.',
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Target feeling banner */}
      <div className="bg-white/80 border border-purple-100 p-3.5 rounded-xl flex items-center justify-between text-xs text-purple-950">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <span className="font-semibold text-[#0E1B3D]">Sensação Cogito:</span>
          <span className="text-gray-700 italic">
            &quot;Não preciso pedir ajuda para outra pessoa nem procurar manual.&quot;
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#8B5CF6] bg-purple-50 px-2 py-0.5 rounded border border-purple-100 hidden md:inline">
          Assistente Contextual I3Tech
        </span>
      </div>

      {/* ========================================================= */}
      {/* 1. DIFERENCIAL CONTEXTUAL (Aviso com ícone de pin/localização) */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-r from-blue-50/90 to-purple-50/70 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-subtle">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#0E1B3D]">
              Cogito detectou que você está na tela de faturamento.
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              O assistente acompanha sua localização no sistema para oferecer respostas
              instantâneas.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleChipClick('Precisa de ajuda para gerar uma nova cobrança?')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-50 transition-colors shrink-0 shadow-xs"
        >
          <span>Precisa de ajuda para gerar uma nova cobrança?</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* ========================================================= */}
      {/* 2. ÁREA PRINCIPAL ESTILO Q&A (Pergunta do usuário + Resposta) */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-subtle space-y-6">
        {/* User Question */}
        <div className="flex items-start justify-end gap-3">
          <div className="bg-[#0E1B3D] text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm sm:text-base font-medium shadow-sm max-w-xl">
            {currentQuestion}
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow mt-1">
            V
          </div>
        </div>

        {/* Cogito AI Response Block */}
        <div className="flex items-start gap-4 pt-2">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="bg-[#FAF5FF]/70 border border-purple-200/70 rounded-2xl rounded-tl-sm p-6 flex-1 space-y-5">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0E1B3D]">
                  Passo a Passo Guiado pelo Cogito
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-100 text-[#8B5CF6]">
                  CRM I3Tech
                </span>
              </div>
              <span className="text-xs text-gray-500">Fluxo Validado</span>
            </div>

            {/* Numbered Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-purple-300 transition-colors shadow-xs flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-[#8B5CF6] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {st.num}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0E1B3D] leading-snug">
                      {st.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Info Line */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs">
              <div className="flex items-center gap-2 text-purple-900 font-medium">
                <Clock className="w-4 h-4 text-[#8B5CF6]" />
                <span>Tempo médio do processo: aproximadamente 3 minutos</span>
              </div>
              <span className="text-[10px] text-gray-400 italic">Dado ilustrativo do mockup.</span>
            </div>

            {/* Action buttons below response */}
            <div className="pt-2 border-t border-purple-100 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAction('Abrir cadastro de associado')}
                className="px-4 py-2.5 rounded-xl bg-[#0E1B3D] text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Abrir cadastro de associado</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('Ver passo a passo completo')}
                className="px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span>Ver passo a passo completo</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('Perguntar outra coisa')}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Perguntar outra coisa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BLOCO "O QUE VOCÊ PODE PERGUNTAR" */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="text-base font-bold text-[#0E1B3D]">O que você pode perguntar</h3>
          </div>
          <span className="text-xs text-gray-400">Atalhos rápidos para dúvidas frequentes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {suggestedQuestions.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="p-3 text-left rounded-xl bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-gray-200 text-xs font-medium text-gray-700 hover:text-purple-800 transition-all flex items-center justify-between group"
            >
              <span>{chip}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. BLOCO DISCRETO "EM BREVE" (Ações preparadas com supervisão humana) */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-7 border border-dashed border-gray-300 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#8B5CF6] border border-purple-200">
              Em breve
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#0E1B3D]">
              Ações assistidas por IA
            </h3>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Supervisão humana obrigatória
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Além de orientar, o Cogito poderá preparar ações para sua confirmação.
        </p>

        {/* Example dialogue mockup */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
          <div className="text-xs flex items-center gap-2">
            <span className="font-bold text-gray-900">Usuário:</span>
            <span className="text-gray-700 italic">
              &quot;Quero alterar o plano deste associado.&quot;
            </span>
          </div>

          <div className="text-xs flex items-start gap-2 bg-purple-50/50 p-3 rounded-lg border border-purple-100">
            <span className="font-bold text-[#8B5CF6] shrink-0">Cogito:</span>
            <span className="text-gray-800">
              &quot;Posso preparar a alteração. Qual será o novo plano?&quot;
            </span>
          </div>

          {/* Action buttons (non-functional as specified to show supervision) */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleFutureChange}
              className="px-3.5 py-2 rounded-lg bg-[#0E1B3D] text-white text-xs font-semibold hover:bg-blue-600 transition-colors opacity-90 hover:opacity-100"
            >
              Iniciar alteração
            </button>
            <button
              type="button"
              onClick={() => toast.info('Operação cancelada pelo usuário.')}
              className="px-3.5 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <span className="text-[11px] text-gray-400 italic ml-2">
              (Demonstração do conceito de supervisão humana; nenhuma ação executa sem seu clique.)
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
