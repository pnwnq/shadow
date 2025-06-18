import ZhipuAI from 'zhipuai-sdk-nodejs-v4';

// 指定在 Node.js 环境中运行
export const runtime = 'nodejs';
// 强制动态渲染
export const dynamic = 'force-dynamic';

// 将智谱AI的原始SSE流转换为Vercel AI SDK所需的Data Stream格式
function zhipuStreamToDataStream(zhipuStream: AsyncIterable<any>): ReadableStream<Uint8Array> {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      return new ReadableStream({
            async start(controller) {
                  try {
                        for await (const chunk of zhipuStream) {
                              // 将二进制块解码为文本
                              const textChunk = decoder.decode(chunk, { stream: true });

                              // 按行分割，因为一个块可能包含多个SSE事件
                              const lines = textChunk.split('\n').filter(line => line.trim() !== '');

                              for (const line of lines) {
                                    if (line.startsWith('data: ')) {
                                          const jsonStr = line.substring(6);

                                          // 检查是否是结束信号
                                          if (jsonStr === '[DONE]') {
                                                continue; // 忽略结束信号
                                          }

                                          try {
                                                const parsed = JSON.parse(jsonStr);
                                                const content = parsed.choices?.[0]?.delta?.content;

                                                if (content) {
                                                      // 遵循Vercel AI SDK的Data Stream Protocol
                                                      const formattedChunk = `0:${JSON.stringify(content)}\n`;
                                                      controller.enqueue(encoder.encode(formattedChunk));
                                                }
                                          } catch (e) {
                                                console.error('Failed to parse ZhipuAI stream data:', jsonStr, e);
                                          }
                                    }
                              }
                        }
                  } catch (error) {
                        console.error('Error in Zhipu stream processing:', error);
                        controller.error(error);
                  } finally {
                        // 根据Vercel AI SDK规范，发送一个结束消息块
                        const finishChunk = `d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`;
                        controller.enqueue(encoder.encode(finishChunk));
                        controller.close();
                  }
            },
      });
}

export async function POST(req: Request) {
      try {
            const { messages } = await req.json();

            const client = new ZhipuAI({
                  apiKey: process.env.ZHIPU_AI_API_KEY,
            });

            const zhipuStream = await client.completions.create({
                  model: 'glm-4',
                  stream: true,
                  messages,
            });

            const dataStream = zhipuStreamToDataStream(zhipuStream as any);

            return new Response(dataStream, {
                  headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'x-vercel-ai-data-stream': 'v1',
                  },
            });

      } catch (error) {
            console.error('Error in POST /api/ai/chat:', error);
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return new Response(JSON.stringify({ error: errorMessage }), {
                  status: 500,
                  headers: { 'Content-Type': 'application/json' },
            });
      }
} 