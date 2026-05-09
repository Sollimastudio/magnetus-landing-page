import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Mail } from 'lucide-react';
import EmailCaptureForm from '@/components/EmailCaptureForm';

const KIWIFY_CHECKOUT = 'https://pay.kiwify.com.br/m8cGccz';

export default function Home() {
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [countdownTime, setCountdownTime] = useState(0);
  const endTimeRef = useRef<number>(0);

  const lastQuestionRef = useRef<string>('');

  // Scroll reveal animation
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer (24 hours from page load)
  useEffect(() => {
    if (endTimeRef.current === 0) {
      endTimeRef.current = new Date().getTime() + 24 * 60 * 60 * 1000;
    }

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const distance = endTimeRef.current - now;
      
      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdownTime(hours * 60 + minutes);
      } else {
        setCountdownTime(0);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);


  const handleAIReframe = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    lastQuestionRef.current = aiInput.trim();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: aiInput }),
      });
      if (!res.ok) throw new Error('Erro na resposta');
      const data = await res.json();
      setAiResult(data.response);
    } catch {
      setAiError('Algo correu mal. Tenta novamente.');
    } finally {
      setAiLoading(false);
    }
  };

  const faqItems = [
    {
      question: 'O acesso é imediato?',
      answer: 'Sim! Após a confirmação do pagamento, você recebe acesso instantâneo ao protocolo completo de 15 dias. Sem esperas, sem burocracia. Você entra direto no seu portal e começa a transformação imediatamente.'
    },
    {
      question: 'Serve para quem quer reconquistar o ex?',
      answer: 'Magnetus III não é sobre reconquistar. É sobre ressignificar sua identidade para que você nunca mais precise de migalhas. Se ele voltar, será porque você se tornou inegável. O foco é seu poder pessoal, não a aprovação de ninguém.'
    },
    {
      question: 'Tenho vergonha, o nome aparece na fatura?',
      answer: 'Sua privacidade é sagrada. O nome que aparece na fatura é genérico e discreto. Ninguém saberá o que você comprou. Você pode fazer isso em paz, sem julgamentos.'
    },
    {
      question: 'Posso assistir quantas vezes quiser?',
      answer: 'Sim! Acesso vitalício ao protocolo. Você pode revisar, repetir, aprofundar quantas vezes precisar. É seu. Para sempre.'
    }
  ];

  const testimonials = [
    {
      name: 'Mariana, 34 anos',
      role: 'Empresária',
      text: 'Depois de 10 anos sendo invisível no meu próprio relacionamento, em 15 dias eu mudei. Não é mágica, é verdade. Meu parceiro me vê diferente. Mas o melhor é que EU me vejo diferente.',
      avatar: '👑'
    },
    {
      name: 'Sofia, 42 anos',
      role: 'Executiva',
      text: 'Sempre fui a mulher que resolve tudo. Magnetus me mostrou que governar começa em casa, comigo mesma. Minha vida profissional, meus relacionamentos, tudo mudou.',
      avatar: '✨'
    },
    {
      name: 'Juliana, 28 anos',
      role: 'Criadora de Conteúdo',
      text: 'Eu não sabia que era invisível até o protocolo me mostrar. Agora eu sou o eixo. As pessoas giram ao meu redor. É surreal.',
      avatar: '💎'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <header className="relative w-full bg-black pt-16 md:pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-white mb-4 leading-tight">
                  Ensinaram-te a <span className="gold-text">esperar</span>.
                </h1>
                <h2 className="text-3xl md:text-4xl font-serif italic text-gold mb-8">
                  Vim ensinar-te a <span className="text-white">governar</span>.
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                Magnetus III é o protocolo de ativação soberana para mulheres que cansaram de ser a segunda opção. Em 15 dias, você ressignifica sua identidade e retoma o poder que sempre foi seu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href={KIWIFY_CHECKOUT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold py-4 px-8 text-lg font-bold rounded-2xl text-center hover:scale-105 transition-transform"
                >
                  Ativar Agora
                </a>
                <a 
                  href="#espelho" 
                  className="border-2 border-gold/50 text-gold py-4 px-8 text-lg font-bold rounded-2xl text-center hover:bg-gold/10 transition-colors"
                >
                  Testar Diagnóstico
                </a>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <img 
                src="/manus-storage/herooo_f4e495d4.png" 
                alt="Magnetus III - Protocolo Feminino" 
                className="w-full h-auto rounded-3xl shadow-2xl shadow-gold/20"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="luxury-divider my-24" />

      {/* TENSION SECTION */}
      <section className="py-24 md:py-40 bg-black px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 reveal text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight">
              Sentes o aperto no peito?<br />
              <span className="text-gray-500 text-2xl md:text-3xl block mt-4">Aquele silêncio que grita que, não importa o quanto faças...</span> 
              <span className="gold-text text-3xl md:text-4xl block mt-4">continuas a ser a segunda opção</span>.
            </h2>
            <div className="space-y-8 text-lg md:text-xl text-gray-400 font-light leading-relaxed pt-8">
              <p>
                O feminicídio emocional não é um golpe seco. É uma erosão lenta. É o cansaço de ser a mulher que resolve tudo para todos, mas que habita um castelo onde as luzes estão sempre a piscar.
              </p>
              <p className="text-2xl md:text-3xl gold-text italic font-serif py-8 border-y border-gold/20">
                Quem te convenceu de que precisavas de aprovação para existir?
              </p>
              <p>
                Este não é um livro de dicas. É um inventário de guerra contra a invisibilidade. É sobre desinstalar o sistema de quem foi programada para ser escolhida e ativar o sistema de quem <span className="text-white font-semibold">decide ser o destino</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* PROTOCOL SECTION - 3 PILLARS */}
      <section className="py-24 md:py-40 bg-black px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl md:text-6xl gold-text mb-6 uppercase tracking-tighter italic font-serif">Protocolo de Ativação</h2>
            <p className="text-gray-500 tracking-[0.3em] text-xs uppercase">A tríade do governo pessoal</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* A1: Atrair */}
            <div className="glass-card p-12 group hover:bg-gold/5 transition-colors reveal text-center overflow-hidden rounded-3xl">
              <div className="w-20 h-20 border-2 border-gold/30 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform mx-auto">
                <span className="gold-text text-3xl font-bold font-serif italic">A1</span>
              </div>
              <h3 className="text-2xl mb-6 font-serif italic text-white">Atrair</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Não pela carência, mas pela presença soberana. Aprende a parar de caçar e torna-te o eixo onde tudo converge. Magnetismo não se pede, emite-se.
              </p>
            </div>

            {/* A2: Ativar - CENTRAL & HIGHLIGHTED */}
            <div className="glass-card-dark p-12 border-gold/40 scale-105 shadow-2xl relative z-10 reveal text-center overflow-hidden rounded-3xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-tighter">Essencial</div>
              <div className="w-20 h-20 bg-gold rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <span className="text-black text-3xl font-bold font-serif italic">A2</span>
              </div>
              <h3 className="text-2xl mb-6 font-serif italic text-white">Ativar</h3>
              <p className="text-gray-200 text-base leading-relaxed font-semibold">
                O protocolo de 15 dias baseado em neurociência que ressignifica a tua identidade celular. É o fim da "menina boazinha" e o nascimento da mulher que governa.
              </p>
            </div>

            {/* A3: Agrupar */}
            <div className="glass-card p-12 group hover:bg-gold/5 transition-colors reveal text-center overflow-hidden rounded-3xl">
              <div className="w-20 h-20 border-2 border-gold/30 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform mx-auto">
                <span className="gold-text text-3xl font-bold font-serif italic">A3</span>
              </div>
              <h3 className="text-2xl mb-6 font-serif italic text-white">Agrupar</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Governar o teu ecossistema. Relações, finanças e legado alinhados à tua nova frequência de poder. Onde o caos termina, o teu império começa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* ESPELHO DA SOBERANIA - AI MIRROR SECTION */}
      <section id="espelho" className="py-24 md:py-40 bg-zinc-950 px-4 md:px-6 border-y border-gold/10 relative text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-16 reveal">
            <h2 className="text-4xl md:text-5xl gold-text mb-4 italic font-serif">O Espelho da Soberania ✨</h2>
            <p className="text-gray-400 font-light uppercase tracking-widest text-xs">Diagnóstico Instantâneo de Governo</p>
          </div>

          <div className="glass-card p-8 md:p-12 reveal">
            <p className="text-gray-300 mb-8 text-center italic text-lg">
              "Onde é que a tua coroa caiu? Descreve uma situação onde te sentiste invisível, trocada ou sem poder. Deixa-me mostrar-te o código para retomar o trono."
            </p>
            
            <div className="space-y-6">
              <textarea 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ex: Ele visualizou e não respondeu... Sinto que ninguém me valoriza no trabalho... Sinto que sou sempre a segunda opção..." 
                className="w-full bg-black/50 border border-gold/20 rounded-2xl p-6 text-gray-200 focus:border-gold/50 focus:outline-none transition-colors min-h-[150px] italic text-center placeholder-gray-600"
              />
              
              <button 
                onClick={handleAIReframe}
                disabled={aiLoading}
                className="btn-gold w-full py-5 rounded-2xl text-lg uppercase font-bold flex items-center justify-center gap-3 disabled:opacity-50 mx-auto"
              >
                <span>Ativar Diagnóstico Soberano ✨</span>
                {aiLoading && <div className="spinner border-t-black w-5 h-5"></div>}
              </button>
            </div>

            {aiError && <p className="mt-6 text-red-400 text-sm text-center">{aiError}</p>}
            {aiResult && (
              <div className="mt-12 p-8 ai-response-box rounded-2xl reveal active animate-scale-up text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest">Resposta de Sol Lima AI</span>
                </div>
                <div className="text-gray-300 leading-relaxed italic text-lg space-y-4 whitespace-pre-wrap">{aiResult}</div>
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

      <div className="luxury-divider my-24" />

      {/* EBOOKS SECTION */}
      <section className="py-24 md:py-40 bg-black px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">O que você recebe</h2>
            <p className="text-gray-400 text-lg">Dois ebooks premium para sua transformação</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* MAGNETUS III */}
            <div className="reveal text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-48 h-64 bg-gradient-to-b from-rose-900 to-rose-950 rounded-lg shadow-2xl shadow-gold/30 flex items-center justify-center border border-gold/20 transform hover:scale-105 transition-transform">
                  <div className="text-center p-6">
                    <p className="text-gold text-sm uppercase tracking-widest mb-2">Ebook Principal</p>
                    <h3 className="text-4xl font-serif italic text-white mb-4">MAGNETUS</h3>
                    <p className="text-gold text-2xl font-bold">III</p>
                    <p className="text-gray-300 text-xs mt-4">Manual da Atração para Mulheres</p>
                    <p className="text-gray-400 text-xs mt-2">by Sol Lima</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-serif italic text-white mb-4">MAGNETUS III</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                O protocolo de 15 dias que transforma sua identidade celular. Baseado em neurociência, este ebook detalha cada dia do protocolo de ativação soberana. Você aprenderá a desinstalar programações limitantes e ativar seu poder magnético genuíno.
              </p>
              <p className="text-gold font-semibold">Protocolo de Presença Feminina</p>
            </div>

            {/* ANTÍDOTO */}
            <div className="reveal text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-48 h-64 bg-amber-100 rounded-lg shadow-2xl shadow-gold/30 flex items-center justify-center border-2 border-amber-900/30 transform hover:scale-105 transition-transform relative">
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center">
                    <span className="text-gold text-xs font-bold">BÔNUS</span>
                  </div>
                  <div className="text-center p-6">
                    <p className="text-amber-900 text-xs uppercase tracking-widest mb-4">Envelope Kraft</p>
                    <p className="text-amber-900 text-sm font-serif italic mb-4">ANTÍDOTO</p>
                    <p className="text-amber-900 text-lg font-bold">AO ANTIVALOR</p>
                    <p className="text-amber-900 text-xs mt-4">Secret</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-serif italic text-white mb-4">Antídoto ao Antivalor</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Seu ebook bônus exclusivo. Um guia secreto que desvela os padrões de desvalorização que você internalizou. Descubra como mulheres de poder reconhecem seu valor real e recusam migalhas. Este é o antídoto para quem foi programada a aceitar menos.
              </p>
              <p className="text-gold font-semibold">Bônus Exclusivo e Secreto</p>
            </div>
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* ABOUT SOL LIMA - AUTHOR SECTION */}
      <section className="py-24 md:py-40 bg-gradient-to-b from-zinc-950 to-black px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="reveal order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-rose-900/20 rounded-3xl blur-2xl" />
                <img 
                  src="/manus-storage/IMG_6591_1a4da586.PNG" 
                  alt="Sol Lima - Autora do Protocolo Magnetus" 
                  className="relative w-full h-auto rounded-3xl shadow-2xl shadow-gold/30 border border-gold/20"
                />
              </div>
            </div>

            {/* Story */}
            <div className="reveal order-1 md:order-2 space-y-8">
              <div>
                <p className="text-gold text-sm uppercase tracking-widest font-bold mb-4">Conheça a Autora</p>
                <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">Sol Lima</h2>
                <p className="text-gray-400 text-lg italic">Neurociência. Ressurreição. Soberania.</p>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  Eu sobrevivi ao que chamo de <span className="text-gold font-semibold">Feminicídio Emocional</span>.
                </p>
                <p>
                  Por anos, eu fui a sombra de quem eu deveria ser. Vivi em estado de hipervigilância crônica, onde cada passo meu era calculado para não desagradar, para não ser notada, para não incomodar. Minha voz era um sussurro abafado por uma religiosidade que me ensinou a anular o "eu".
                </p>
                <p>
                  Eu não tinha amor-próprio. Minha autoestima era um deserto. Mas a dor me levou ao estudo. Mergulhei na neurociência para entender por que meu cérebro me mantinha refém do medo.
                </p>
                <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 my-6">
                  <p className="text-gold italic font-serif text-lg">
                    "No meu TCC sobre Presença e Magnetismo, descobri que a atração não é um dom místico, mas um padrão de sinais químicos e comportamentais que qualquer mulher pode ativar."
                  </p>
                </div>
                <p>
                  Hoje, como Sol Lima, eu não apenas recuperei minha luz; eu criei o <span className="text-gold font-semibold">Protocolo Magnetus</span> para que você não precise levar décadas para fazer o mesmo. É a ciência da ressurreição da sua presença.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="space-y-2">
                  <p className="text-gold font-bold text-sm uppercase tracking-widest">Neurociência</p>
                  <p className="text-gray-400 text-sm">Base científica em cada técnica.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gold font-bold text-sm uppercase tracking-widest">Blindagem</p>
                  <p className="text-gray-400 text-sm">Proteção contra a autoanulação.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* THE 7-DAY METAMORPHOSIS */}
      <section className="py-24 md:py-40 bg-black px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">A Metamorfose em 7 Dias</h2>
            <p className="text-gray-400 text-lg">Os 7 pilares do Protocolo Magnetus</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: '1', title: 'Quebra do Estado de Hipervigilância', desc: 'Desativar o sistema de alerta crônico que mantém você em pânico' },
              { num: '2', title: 'Ressignificação da Autoimagem Neural', desc: 'Reprogramar como seu cérebro vê você' },
              { num: '3', title: 'Domínio da Linguagem Corporal de Alto Valor', desc: 'Seu corpo fala antes da boca' },
              { num: '4', title: 'Ativação do Efeito Imã Social', desc: 'Tornar-se o eixo onde tudo converge' },
              { num: '5', title: 'Comunicação Visceral e Assertiva', desc: 'Falar com presença, não com agressão' },
              { num: '6', title: 'Eliminação de Bloqueios Religiosos Limitantes', desc: 'Desinstalar programações de anulação' },
              { num: '7', title: 'Protocolo de Presença Inabalável', desc: 'Integração e consolidação do novo sistema' },
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl reveal" style={{ transitionDelay: `${idx * 50}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold text-lg">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* SOCIAL PROOF SECTION */}
      <section className="py-24 md:py-40 bg-black px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Histórias de Transformação</h2>
            <p className="text-gray-400 text-lg">Mulheres que ativaram seu poder</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass-card p-8 rounded-3xl reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="text-5xl mb-6">{testimonial.avatar}</div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gold/20 pt-6">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-gold text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* OFFER SECTION */}
      <section id="oferta" className="py-24 md:py-40 bg-gradient-to-b from-black via-gold/5 to-black px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Magnetus III - Bundle Completo</h2>
            <p className="text-gray-400 text-lg">Tudo que você precisa para 15 dias de ativação</p>
          </div>

          <div className="glass-card-dark p-12 rounded-3xl mb-8 reveal">
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Protocolo de 15 Dias</h3>
                  <p className="text-gray-400">Aulas diárias com técnicas de neurociência e ressignificação de identidade</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Workbook Interativo</h3>
                  <p className="text-gray-400">Exercícios práticos para ativar seu poder pessoal dia a dia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Comunidade Exclusiva</h3>
                  <p className="text-gray-400">Acesso ao círculo de mulheres ativadas (suporte vitalício)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Bônus: Guia de Relacionamentos</h3>
                  <p className="text-gray-400">Manual exclusivo sobre como manter seu poder em relacionamentos</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Ebook Bônus: Antídoto ao Antivalor</h3>
                  <p className="text-gray-400">Guia secreto para reconhecer e recusar desvalorização</p>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 mb-12 text-center">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Oferta Limitada</p>
              <p className="text-3xl md:text-4xl font-bold text-gold">
                {Math.floor(countdownTime / 60)}h {countdownTime % 60}m
              </p>
              <p className="text-gray-400 text-sm mt-2">até o fim da promoção</p>
            </div>

            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                R$ 297<span className="text-2xl text-gray-400 line-through ml-4">497</span>
              </p>
              <p className="text-gold text-lg font-semibold mb-8">40% de desconto - Acesso vitalício</p>
              
              <a 
                href={KIWIFY_CHECKOUT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-6 rounded-2xl text-xl uppercase font-bold mb-4 hover:scale-105 transition-transform inline-block"
              >
                Ativar Magnetus III Agora
              </a>
              
              <p className="text-gray-400 text-sm">
                ✓ Acesso imediato após confirmação | ✓ Garantia de 7 dias | ✓ Privacidade garantida
              </p>
            </div>
          </div>

          <EmailCaptureForm lastQuestion={lastQuestionRef.current} />
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* SOCIAL PROOF - NUMBERS */}
      <section className="py-20 md:py-32 bg-black px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-12">Junte-se a mulheres que já ativaram seu poder</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-gold">12.000+</p>
              <p className="text-gray-400">Mulheres Ativadas</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-gold">15</p>
              <p className="text-gray-400">Dias de Transformação</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-gold">100%</p>
              <p className="text-gray-400">Garantia de Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* FAQ SECTION */}
      <section className="py-24 md:py-40 bg-black px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-400">Esclarecendo suas dúvidas</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden reveal" style={{ transitionDelay: `${idx * 50}ms` }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gold/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white text-left">{item.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gold transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6 border-t border-gold/20">
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="luxury-divider my-24" />

      {/* FOOTER CTA */}
      <section className="py-24 bg-black px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto reveal">
          <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">
            Sua coroa está esperando.
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Não é sobre reconquistar ninguém. É sobre se reconquistar. Magnetus III é o primeiro passo para você se tornar inegável.
          </p>
          <a 
            href={KIWIFY_CHECKOUT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block py-4 px-12 text-lg font-bold rounded-2xl hover:scale-105 transition-transform"
          >
            Começar Agora
          </a>
        </div>
      </section>
    </div>
  );
}
