import { useState, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import EmailCaptureForm from '@/components/EmailCaptureForm';

/**
 * DESIGN PHILOSOPHY: Luxo Sensorial com Drama
 * - Paleta: Preto Profundo (#050505) + Ouro Gradiente (#D4AF37) + Burgundy (#4A0404)
 * - Tipografia: Playfair Display (elegância) + Inter (modernidade)
 * - Atmosfera: Sofisticada, provocadora, sensorial
 * - Efeitos: Glass-morphism, gradientes, texturas de cetim, animações fluidas
 * - CENTRALIZAÇÃO: Todos os textos centralizados para máximo impacto
 */

export default function Home() {
  const [revealElements, setRevealElements] = useState<Set<number>>(new Set());
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll reveal animation
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
          setRevealElements(prev => new Set(prev).add(index));
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulated AI response
  const handleAIReframe = async () => {
    if (!aiInput.trim()) return;

    setAiLoading(true);
    setTimeout(() => {
      const responses = [
        `Você está presa na "Bolha da Aprovação". Aquele silêncio que você sente? É o vazio que deixa quando você para de pedir permissão para existir. Seu "Comando de Governo" é imediato: hoje, você não explica, não justifica, não negocia. Você decide. A coroa caiu porque você estava esperando que alguém a colocasse. Levante-a você mesma.`,
        `Identifiquei a "Morte em Vida" - você está visível, mas invisível. Funcionando, mas vazia. Seu código está corrompido pela necessidade de ser "a mulher legal". Seu Comando: Neste exato momento, escolha uma coisa que você quer e que ninguém quer que você tenha. Faça. O governo começa aqui.`,
        `Você está no "Feminicídio Emocional" - aquela erosão lenta onde você resolve tudo mas ninguém te valoriza. Seu poder não está em fazer mais, está em exigir mais. Seu Comando de Governo: Pare. Hoje você não oferece nada. Observe quem sente falta de você. Aí está seu verdadeiro valor.`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResult(randomResponse);
      setAiLoading(false);
    }, 1500);
  };

  const faqItems = [
    {
      question: 'O acesso é imediato?',
      answer: 'Sim! Após a confirmação do pagamento, você recebe acesso instantâneo ao protocolo completo de 15 dias. Sem esperas, sem burocracia.'
    },
    {
      question: 'Serve para quem quer reconquistar o ex?',
      answer: 'Magnetus III não é sobre reconquistar. É sobre ressignificar sua identidade para que você nunca mais precise de migalhas. Se ele voltar, será porque você se tornou inegável.'
    },
    {
      question: 'Tenho vergonha, o nome aparece na fatura?',
      answer: 'Sua privacidade é sagrada. O nome que aparece na fatura é genérico e discreto. Ninguém saberá o que você comprou.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{backgroundImage: 'url(/images/hero-edited.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Hero Content - CENTRALIZADO */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left: Text Content - CENTRALIZADO */}
            <div className="text-center flex flex-col items-center justify-center">
              <span className="inline-block uppercase tracking-[0.4em] text-[10px] md:text-xs mb-8 gold-text reveal animate-fade-in">
                A Sobrevivência é um ato de Governo
              </span>
              
              <h1 className="text-5xl md:text-7xl leading-[1.1] mb-10 reveal font-serif italic text-center" style={{ transitionDelay: '200ms' }}>
                Ensinaram-te a <span className="italic font-light">esperar</span>.<br />
                Vim ensinar-te a <span className="gold-text font-bold">governar</span>.
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-400 font-light italic mb-14 leading-relaxed reveal text-center" style={{ transitionDelay: '400ms' }}>
                O manual da atração soberana para quem cansou de aceitar migalhas em pratos de porcelana.
              </p>
              
              <div className="flex flex-col items-center gap-6 reveal" style={{ transitionDelay: '600ms' }}>
                <a href="#oferta" className="btn-gold px-10 py-5 md:px-16 md:py-7 rounded-full text-sm md:text-lg uppercase font-bold hover:scale-105 transition-transform">
                  Ressignificar a minha história
                </a>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse-gold"></span>
                  Mais de 12.000 mulheres ativadas
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative reveal animate-slide-in-right flex justify-center" style={{ transitionDelay: '800ms' }}>
              <div className="relative group">
                <div className="glass-card aspect-[3/4] p-8 flex flex-col justify-between relative overflow-hidden border-2 border-gold/20 shadow-2xl glow-gold max-w-sm">
                  <div className="absolute -right-20 -top-20 opacity-5">
                    <span className="text-[25rem] font-serif italic">SL</span>
                  </div>
                  
                  {/* Ebook Image - Capa Corrigida */}
                  <img 
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/magnetus-correct-cover-JQ8pPovzTJShiygunWJyyB.webp" 
                    alt="Magnetus III - O Manual da Atração Soberana"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 z-10">
                    <div className="gold-text text-2xl md:text-3xl font-serif italic">Magnetus III</div>
                    <p className="text-xs tracking-[0.4em] text-gold/60 uppercase">Manual da Atração Soberana</p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 flex items-center justify-center text-center p-4 shadow-2xl -rotate-12 group-hover:rotate-0 transition-transform duration-700" style={{backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/seal-guarantee-premium-Dbwk3BSeHpCJWRjyTzFXPh.webp)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold/50" />
        </div>
      </header>

      {/* EMAIL CAPTURE SECTION */}
      <EmailCaptureForm />

      {/* AI MIRROR SECTION - CENTRALIZADO */}
      <section className="py-32 bg-zinc-950 px-6 border-y border-gold/10 relative text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-16 reveal">
            <h2 className="text-4xl md:text-5xl gold-text mb-4 italic font-serif">O Espelho da Soberania ✨</h2>
            <p className="text-gray-400 font-light uppercase tracking-widest text-xs">Diagnóstico Instantâneo de Governo</p>
          </div>

          <div className="glass-card p-8 md:p-12 reveal">
            <p className="text-gray-300 mb-8 text-center italic">
              "Onde é que a tua coroa caiu? Descreve uma situação onde te sentiste invisível, trocada ou sem poder. Deixa-me mostrar-te o código para retomar o trono."
            </p>
            
            <div className="space-y-6">
              <textarea 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ex: Ele visualizou e não respondeu... Sinto que ninguém me valoriza no trabalho... Sinto que sou sempre a segunda opção..." 
                className="w-full bg-black/50 border border-gold/20 rounded-2xl p-6 text-gray-200 focus:border-gold/50 focus:outline-none transition-colors min-h-[150px] italic text-center"
              />
              
              <button 
                onClick={handleAIReframe}
                disabled={aiLoading}
                className="btn-gold w-full py-5 rounded-2xl text-lg uppercase font-bold flex items-center justify-center gap-3 disabled:opacity-50 mx-auto"
              >
                <span>Ativar Diagnóstico Soberano ✨</span>
                {aiLoading && <div className="spinner border-t-black"></div>}
              </button>
            </div>

            {/* AI Result */}
            {aiResult && (
              <div className="mt-12 p-8 ai-response-box rounded-2xl reveal active animate-scale-up text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest">Resposta de Sol Lima AI</span>
                </div>
                <div className="text-gray-300 leading-relaxed italic text-lg space-y-4">
                  {aiResult}
                </div>
                <div className="mt-8 flex justify-center">
                  <a href="#oferta" className="text-gold text-xs uppercase tracking-[0.3em] font-bold hover:opacity-70 transition-opacity border-b border-gold/30 pb-1">
                    Aprender o protocolo completo no Magnetus III
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TENSION SECTION - CENTRALIZADO */}
      <section className="py-32 bg-black px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="border-l-0 pl-0 space-y-12 reveal">
            <h2 className="text-3xl md:text-5xl mb-10 leading-snug italic font-serif">
              Sentes o aperto no peito?<br />
              <span className="text-gray-500 text-2xl md:text-3xl">Aquele silêncio que grita que, não importa o quanto faças... continuas a ser a</span> <span className="gold-text">segunda opção</span>.
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              <p>
                O feminicídio emocional não é um golpe seco. É uma erosão lenta. É o cansaço de ser a mulher que resolve tudo para todos, mas que habita um castelo onde as luzes estão sempre a piscar.
              </p>
              <p className="text-2xl md:text-3xl gold-text italic font-serif py-4">
                Quem te convenceu de que precisavas de aprovação para existir?
              </p>
              <p>
                Este não é um livro de dicas. É um inventário de guerra contra a invisibilidade. É sobre desinstalar o sistema de quem foi programada para ser escolhida e ativar o sistema de quem <span className="text-white font-semibold">decide ser o destino</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL SECTION - 3 PILLARS - CENTRALIZADO */}
      <section className="py-32 bg-black px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl md:text-6xl gold-text mb-6 uppercase tracking-tighter italic font-serif">Protocolo de Ativação</h2>
            <p className="text-gray-500 tracking-[0.3em] text-xs uppercase">A tríade do governo pessoal</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* A1: Atrair */}
            <div className="glass-card p-12 group hover:bg-gold/5 transition-colors reveal text-center overflow-hidden rounded-3xl">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/a1-atrair-magnetismo-m8h8xyMNu5sDusSD47me9p.webp"
                alt="A1 - Atrair"
                className="w-full h-48 object-cover rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="w-14 h-14 border border-gold/30 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform mx-auto">
                <span className="gold-text text-xl font-bold font-serif italic text-2xl">A1</span>
              </div>
              <h3 className="text-2xl mb-6 font-serif italic text-white">Atrair</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Não pela carência, mas pela presença soberana. Aprende a parar de caçar e torna-te o eixo onde tudo converge. Magnetismo não se pede, emite-se.
              </p>
            </div>

            {/* A2: Ativar - CENTRAL & HIGHLIGHTED */}
            <div className="glass-card p-12 border-gold/40 scale-105 shadow-2xl relative z-10 bg-white/5 reveal text-center overflow-hidden rounded-3xl">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/a2-ativar-poder-btkC5xNgMPxAkvXQXDFJtn.webp"
                alt="A2 - Ativar"
                className="w-full h-48 object-cover rounded-2xl mb-8"
              />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter">Essencial</div>
              <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <span className="text-black text-xl font-bold font-serif italic text-2xl">A2</span>
              </div>
              <h3 className="text-2xl mb-6 font-serif italic text-white">Ativar</h3>
              <p className="text-gray-200 text-sm leading-relaxed font-semibold">
                O protocolo de 15 dias baseado em neurociência que ressignifica a tua identidade celular. É o fim da "menina boazinha" e o nascimento da mulher que governa.
              </p>
            </div>

            {/* A3: Agrupar */}
            <div className="glass-card p-12 group hover:bg-gold/5 transition-colors reveal text-center overflow-hidden rounded-3xl">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/a3-agrupar-imperio-jTq5ZGN4SZo29XSEBtSkfv.webp"
                alt="A3 - Agrupar"
                className="w-full h-48 object-cover rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="w-14 h-14 border border-gold/30 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform mx-auto">
                <span className="gold-text text-xl font-bold font-serif italic text-2xl">A3</span>
              </div>
              <h3 className="text-2xl mb-6 font-serif italic text-white">Agrupar</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Governar o teu ecossistema. Relações, finanças e legado alinhados à tua nova frequência de poder. Onde o caos termina, o teu império começa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ANTES VS DEPOIS SECTION - TRANSFORMAÇÃO IMPACTANTE */}
      <section className="py-32 bg-black px-6 border-b border-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl md:text-6xl gold-text mb-6 uppercase tracking-tighter italic font-serif">Antes vs Depois</h2>
            <p className="text-gray-400 text-xl italic">O que muda quando você ativa seu magnetismo</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* ANTES */}
            <div className="glass-card p-12 bg-red-950/20 border border-red-900/30 rounded-3xl reveal">
              <h3 className="text-3xl font-serif italic text-red-400 mb-8 text-center">ANTES DO PROTOCOLO</h3>
              <ul className="space-y-6 text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="text-red-400 text-2xl font-bold mt-1">✗</span>
                  <span className="text-lg">Você explica, justifica e negocia cada decisão sua</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-400 text-2xl font-bold mt-1">✗</span>
                  <span className="text-lg">Sente-se invisível mesmo quando está visível</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-400 text-2xl font-bold mt-1">✗</span>
                  <span className="text-lg">Resolve tudo para todos, mas ninguém te valoriza</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-400 text-2xl font-bold mt-1">✗</span>
                  <span className="text-lg">Espera aprovação para existir plenamente</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-400 text-2xl font-bold mt-1">✗</span>
                  <span className="text-lg">Relacionamentos rasos que te deixam vazia</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-400 text-2xl font-bold mt-1">✗</span>
                  <span className="text-lg">Medo de ser "egoísta" por colocar você em primeiro lugar</span>
                </li>
              </ul>
            </div>

            {/* DEPOIS */}
            <div className="glass-card p-12 bg-gold/10 border border-gold/40 rounded-3xl reveal">
              <h3 className="text-3xl font-serif italic text-gold mb-8 text-center">DEPOIS DO PROTOCOLO</h3>
              <ul className="space-y-6 text-gray-200">
                <li className="flex items-start gap-4">
                  <span className="text-gold text-2xl font-bold mt-1">✓</span>
                  <span className="text-lg font-semibold">Você decide. Ponto. Sem explicações.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-gold text-2xl font-bold mt-1">✓</span>
                  <span className="text-lg font-semibold">Torna-se o eixo onde tudo converge</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-gold text-2xl font-bold mt-1">✓</span>
                  <span className="text-lg font-semibold">Exige mais. Recebe mais. Governa mais.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-gold text-2xl font-bold mt-1">✓</span>
                  <span className="text-lg font-semibold">Sua presença é magnetismo puro</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-gold text-2xl font-bold mt-1">✓</span>
                  <span className="text-lg font-semibold">Relacionamentos profundos e significativos</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-gold text-2xl font-bold mt-1">✓</span>
                  <span className="text-lg font-semibold">Você é a prioridade. Sempre.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER SECTION - CENTRALIZADO */}
      <section id="oferta" className="py-32 bg-silk px-6 border-y border-gold/10" style={{backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/satin-texture-background-Dbwk3BSeHpCJWRjyTzFXPh.webp)'}}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Product Image - MELHORADA */}
          <div className="relative group reveal flex justify-center">
            <div className="glass-card aspect-[3/4] p-10 flex flex-col justify-between relative overflow-hidden border-2 border-gold/20 shadow-2xl glow-gold max-w-sm">
              <div className="absolute -right-20 -top-20 opacity-5">
                <span className="text-[25rem] font-serif italic">SL</span>
              </div>
              
              {/* Bundle Image com os 2 ebooks */}
              <img 
                src="/images/offer-bundle.png"
                alt="Magnetus III + Antídoto do Antivalor Bundle"
                className="w-full h-full object-cover rounded-2xl"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl"></div>
              
              <div className="z-10 absolute bottom-0 left-0 right-0 p-6 text-center">
                <div className="gold-text text-4xl md:text-5xl font-serif italic mb-2">Magnetus III</div>
                <p className="text-xs tracking-[0.4em] text-gold/60 uppercase">+ Antídoto do Antivalor</p>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 w-32 h-32 flex items-center justify-center text-center p-4 shadow-2xl -rotate-12 group-hover:rotate-0 transition-transform duration-700" style={{backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/seal-guarantee-premium-Dbwk3BSeHpCJWRjyTzFXPh.webp)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
          </div>

          {/* Offer Details - CENTRALIZADO */}
          <div className="space-y-10 reveal text-center">
            <h2 className="text-5xl md:text-7xl leading-none font-serif italic text-white">Assume o teu <br /><span className="gold-text">Lugar no Topo</span>.</h2>
            
            <ul className="space-y-6 flex flex-col items-center">
              <li className="flex items-center gap-5 text-lg text-gray-300">
                <span className="text-gold text-2xl font-serif italic">01.</span> Protocolo de 15 Dias Magnetus III
              </li>
              <li className="flex items-center gap-5 text-lg text-gray-300">
                <span className="text-gold text-2xl font-serif italic">02.</span> Bónus: O Antídoto do Antivalor (Secreto)
              </li>
            </ul>

            <div className="py-10 border-t border-gold/10">
              <div className="flex items-baseline justify-center gap-4 mb-2">
                <span className="text-7xl font-bold gold-text">R$ 69,90</span>
                <span className="text-gray-500 font-light uppercase text-xs tracking-widest">à vista</span>
              </div>
              <p className="text-xl italic text-gray-300">Ou 12x de <span className="text-white font-bold">R$ 6,99</span></p>
            </div>

            <a 
              href="https://pay.kirvano.com/0ef2fba1-c83e-46bf-9632-51117043d8b5"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full block text-center py-7 rounded-2xl text-xl uppercase font-black tracking-widest hover:scale-105 transition-transform mx-auto"
            >
              Ativar o meu Magnetismo Agora
            </a>
          </div>
        </div>
      </section>

      {/* GUARANTEE SECTION - CENTRALIZADO COM SELO */}
      <section className="py-20 bg-black px-6 border-b border-gold/10">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="inline-block mb-6">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663374998284/WD4iXKUYMQAx6qrV7pXDRN/seal-guarantee-premium-Dbwk3BSeHpCJWRjyTzFXPh.webp"
              alt="Garantia Premium 7 Dias"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-6">GARANTIA PREMIUM</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Se em uma semana você não sentir seu poder voltando, eu devolvo cada centavo. Sem perguntas, sem burocracia. O risco é todo meu.
          </p>
        </div>
      </section>

      {/* AUTHOR SECTION - CENTRALIZADO */}
      <section className="py-32 bg-black px-6 border-b border-gold/10">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-12">Sobre a Autora</h2>
          
          <div className="flex flex-col items-center gap-12">
            <img 
              src="/images/sol-lima.jpg"
              alt="Sol Lima - Autora de Magnetus III"
              className="w-64 h-80 object-cover rounded-2xl shadow-2xl glow-gold"
            />
            
            <div className="space-y-6">
              <h3 className="text-3xl font-serif italic gold-text">Sol Lima</h3>
              <p className="text-gray-400 text-lg leading-relaxed italic">
                A sociedade passou a vida inteira te dizendo para "apenas ser você mesmo" e esperar ser notado. Sol Lima mapeou a engenharia reversa do porquê isso é a maior mentira que já te contaram. Estrategista de comportamento e criadora do método Magnetus, ela entendeu que presença não é sorte — é matemática social. Sol elaborou este manual para destruir seus antivalores e instalar uma única certeza: a de que o respeito não se pede, se impõe. Se você quiser tentar agradar, ela escreveu seu novo modo de operar.
              </p>
              <p className="text-gold text-xl italic font-serif mb-6 leading-relaxed">
                Eles queriam que você fosse boazinha.<br />Eu vou te ensinar a ser inesquecível.<br />Reescreva as regras.
              </p>
              <p className="text-gold text-sm uppercase tracking-widest font-bold">
                12.000+ mulheres ativadas | Bestseller em 3 países | Especialista em Governo Pessoal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - CENTRALIZADO */}
      <section className="py-32 bg-black px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Ainda tem dúvidas?</h2>
          </div>

          <div className="space-y-4 reveal">
            {faqItems.map((item, index) => (
              <div key={index} className="glass-card border border-gold/20 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gold/5 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-serif italic text-white text-center flex-1">{item.question}</h3>
                  <div className={`text-gold transition-transform ml-4 flex-shrink-0 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t border-gold/10 animate-scale-up text-center">
                    <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-black border-t border-gold/5 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gold-text text-3xl font-serif italic mb-10">Magnetus III</div>
          <p className="text-[9px] md:text-[11px] text-gray-600 tracking-[0.5em] uppercase mb-8">
            © 2026 Magnetus III • Sol Lima • Todos os Direitos Reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
