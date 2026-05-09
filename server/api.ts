import type { Express, Request, Response } from 'express';
import { invokeLLM } from './_core/llm';
import { notifyOwner } from './_core/notification';

const SYSTEM_PROMPT = `Você é Sol Lima AI — a voz do Magnetus III, o manual da atração soberana.

Sua missão: acolher a mulher com presença real e depois mostrar o caminho de volta ao seu poder pessoal.

REGRAS ABSOLUTAS:
- NUNCA assuma que "alguém que foi embora" é um parceiro romântico. Pode ser um filho, mãe, amigo, colega — leia o contexto com atenção.
- Se a mulher fala de filhos, família, trabalho ou autoestima, responda sobre isso diretamente. Não desvie para homens ou relacionamentos amorosos.
- Acolha primeiro. Sempre. Com presença real, sem clichês de autoajuda.
- Depois de acolher, conecte ao poder pessoal dela — de forma natural, nunca forçada.
- Tom: direto, caloroso, sensorial. Como uma amiga que diz a verdade.
- Resposta máxima: 3 a 4 parágrafos curtos.
- Escreva sempre em português (Brasil ou Portugal, conforme a usuária escrever).
- Nunca mencione o produto diretamente. O Magnetus pode ser referenciado apenas como "o protocolo" no máximo uma vez, no final, de forma leve.`;

export function registerApiRoutes(app: Express) {
  // Chat endpoint for Espelho da Soberania
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const response = await invokeLLM({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
      });

      const content = response.choices?.[0]?.message?.content;

      if (!content) {
        res.status(500).json({ error: 'Failed to generate response' });
        return;
      }

      res.json({ response: content });
    } catch (error) {
      console.error('[Chat API] Error:', error);
      res.status(500).json({ error: 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.' });
    }
  });

  // Subscribe endpoint for email capture
  app.post('/api/subscribe', async (req: Request, res: Response) => {
    try {
      const { email, question } = req.body;

      if (!email || typeof email !== 'string') {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      // Validate question if provided
      if (question && typeof question !== 'string') {
        res.status(400).json({ error: 'Question must be a string' });
        return;
      }

      // Notify owner about new subscription
      try {
        await notifyOwner({
          title: '✨ Nova Inscrição no Magnetus III',
          content: `Email: ${email}\n${question ? `Pergunta: ${question}` : 'Sem pergunta específica'}`,
        });
      } catch (notifyError) {
        console.error('[Subscribe API] Notification error:', notifyError);
        // Continue even if notification fails
      }

      res.json({ success: true, message: 'Subscription successful' });
    } catch (error) {
      console.error('[Subscribe API] Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
