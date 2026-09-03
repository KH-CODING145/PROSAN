import { ArticleItem } from '../types';

export const articlesData: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'deterministic-multi-agent-llm-workflows',
    title: 'Building Deterministic Multi-Agent LLM Workflows in Production',
    excerpt: 'How to combine finite state machines with structured JSON outputs to build reliable, loop-free autonomous AI agent systems without hallucination traps.',
    publishedDate: 'January 2026',
    readTime: '7 min read',
    tags: ['AI Agents', 'Gemini', 'System Design', 'TypeScript'],
    link: '/articles/deterministic-multi-agent-llm-workflows',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    category: 'Artificial Intelligence & Agents',
    keyTakeaways: [
      'Pure prompt chaining without formal state constraints fails at scale due to compounding variance.',
      'Explicit finite state machine (FSM) transitions eliminate infinite agent reasoning loops.',
      'Zod/JSON Schema validation gates on every subagent handoff prevent schema drifting.',
      'Circuit breakers and idempotency keys guarantee atomic rollback when external tool calls fail.'
    ],
    sections: [
      {
        heading: 'The Fallacy of Unbounded Autonomous Agent Loops',
        body: [
          'Many early generative AI implementations relied on open-ended ReAct loops where an LLM recursively decided whether to invoke another tool or conclude. While impressive in demo videos, this approach routinely falls into circular hallucinations or runaway token consumption when deployed against unpredictable enterprise APIs.',
          'To establish enterprise-grade reliability, multi-agent systems must separate routing logic from tool execution. By framing the workflow as a deterministic Finite State Machine (FSM), transitions are enforced by strict runtime contracts rather than probabilistic model guesses.'
        ]
      },
      {
        heading: 'Constraining Transitions with Schema Gates',
        body: [
          'Every stage transition must require valid JSON conformant to an immutable schema before moving to the next worker. If an agent outputs invalid parameters, an automated repair loop reprompts specifically for the delta rather than re-running the entire conversation history.',
          'Below is the architecture pattern used to wrap Gemini tool executions in transactional state steps:'
        ],
        codeSnippet: {
          language: 'typescript',
          code: `interface WorkflowState<TData> {
  step: 'ANALYZE' | 'SYNTHESIZE' | 'VERIFY' | 'COMMIT';
  payload: TData;
  retryCount: number;
  idempotencyToken: string;
}

export async function transitionWorkflow<T>(
  current: WorkflowState<T>,
  agentExecutor: (state: WorkflowState<T>) => Promise<T>,
  validator: z.ZodSchema<T>
): Promise<WorkflowState<T>> {
  const rawResult = await agentExecutor(current);
  const validated = validator.parse(rawResult);
  return {
    ...current,
    payload: validated,
    step: getNextStep(current.step)
  };
}`
        }
      },
      {
        heading: 'Production Results & Observability',
        body: [
          'By implementing deterministic boundaries with Firestore telemetry for tracking execution latency and token overhead, automated agent failures dropped by 94.2% across 10,000+ daily pipeline runs.',
          'Furthermore, engineers can replay any execution failure precisely from the recorded state snapshot without guessing non-deterministic intermediary thought chains.'
        ]
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'optimizing-react-19-for-real-time-telemetry',
    title: 'Optimizing React 19 for High-Frequency Real-Time Telemetry',
    excerpt: 'Deep dive into rendering 250k+ metrics per second using Web Workers, canvas pipelines, and micro-batching without dropping UI animation frames.',
    publishedDate: 'November 2025',
    readTime: '9 min read',
    tags: ['React 19', 'Performance', 'Web Vitals', 'D3.js'],
    link: '/articles/optimizing-react-19-for-real-time-telemetry',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'High-Performance Frontend',
    keyTakeaways: [
      'Direct React state updates at 60Hz+ will choke the main thread garbage collector.',
      'OffscreenCanvas in dedicated Web Workers decouples render throughput from DOM reconciliations.',
      'Micro-batching incoming WebSocket/SSE streams with requestAnimationFrame preserves 120 FPS UI response.',
      'TypedArray buffers minimize memory allocation spikes when processing high-density streaming timeseries.'
    ],
    sections: [
      {
        heading: 'The Bottleneck of React State in Streaming Applications',
        body: [
          'Standard React patterns encourage binding incoming data directly to useState or useReducer. When handling financial ticks or IoT telemetry streaming at hundreds of payloads per second, React reconciliation cycles dominate the main thread and trigger massive frame drops.',
          'To achieve buttery smooth 120 FPS interaction, the visual canvas layer must be decoupled from the DOM hierarchy entirely.'
        ]
      },
      {
        heading: 'Decoupling with Web Workers and OffscreenCanvas',
        body: [
          'By transferring an OffscreenCanvas control to a Web Worker, binary telemetry streams are parsed, smoothed, and painted completely off the main thread. The React application UI remains purely focused on lightweight controls and responsive gesture handling.'
        ],
        codeSnippet: {
          language: 'typescript',
          code: `// Transferring canvas control to background worker
const canvas = canvasRef.current;
if ('transferControlToOffscreen' in canvas) {
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ type: 'INIT_CANVAS', canvas: offscreen }, [offscreen]);
}

// Micro-batching state updates to 60fps raf
let frameBatch: MetricPacket[] = [];
function handlePacket(packet: MetricPacket) {
  frameBatch.push(packet);
  if (!scheduledRaf) {
    scheduledRaf = requestAnimationFrame(() => {
      flushBatchToBuffer(frameBatch);
      frameBatch = [];
      scheduledRaf = null;
    });
  }
}`
        }
      },
      {
        heading: 'Benchmarking Web Vitals Under Load',
        body: [
          'Stress-testing this architecture with 250,000 synthetic metrics/sec demonstrated a steady 0ms Long Task duration on Chrome DevTools, maintaining 99.8% 60fps frames and zero Cumulative Layout Shift.'
        ]
      }
    ]
  },
  {
    id: 'art-3',
    slug: 'self-healing-browser-automation-playwright',
    title: 'Architecting Self-Healing Browser Bots with Playwright & Computer Vision',
    excerpt: 'Techniques for surviving frequent DOM structure mutations in enterprise web scraping and RPA tasks using semantic computer vision heuristics.',
    publishedDate: 'August 2025',
    readTime: '6 min read',
    tags: ['Automation', 'Playwright', 'Node.js', 'Python'],
    link: '/articles/self-healing-browser-automation-playwright',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    category: 'Automation & DevOps',
    keyTakeaways: [
      'Brittle XPath and CSS selectors are the single largest cause of maintenance debt in automated web agents.',
      'Multimodal visual embeddings provide resilient fallback when DOM classnames and hierarchies mutate.',
      'Accessibility tree (AOM) snapshots provide 10x higher selector resilience than raw HTML DOM paths.',
      'Autonomous healing reduces test suite flakes and RPA downtime by over 80%.'
    ],
    sections: [
      {
        heading: 'The Brittle Nature of Syntactic Selectors',
        body: [
          'Modern web applications built with CSS-in-JS or obfuscated classnames frequently release DOM updates that break traditional test scripts. Automated bots that rely on static query selectors quickly degrade into continuous maintenance sinks.',
          'Instead of treating elements as rigid strings, self-healing automation combines semantic accessibility labels with coordinate-based visual anchoring.'
        ]
      },
      {
        heading: 'Heuristic Fallback Pipeline',
        body: [
          'When a primary selector fails to resolve within a 2-second budget, the engine traverses a multi-tiered recovery heuristic:',
          '1. Accessibility Role & Name matching (Accessible Object Model)',
          '2. Relative proximity to static landmarks (e.g. "Button to the right of Account Balance")',
          '3. Visual embedding comparison using localized screen crops'
        ],
        codeSnippet: {
          language: 'typescript',
          code: `export async function resilientClick(page: Page, targetDesc: TargetDescriptor) {
  try {
    // Tier 1: Strict ARIA role & accessible name
    await page.getByRole(targetDesc.role, { name: targetDesc.name }).click({ timeout: 1500 });
  } catch {
    // Tier 2: Spatial Heuristic Anchor
    console.warn('Falling back to spatial coordinate heuristic for', targetDesc.name);
    const anchor = await page.getByText(targetDesc.anchorText).boundingBox();
    if (anchor) {
      await page.mouse.click(anchor.x + targetDesc.offsetX, anchor.y + targetDesc.offsetY);
    }
  }
}`
        }
      },
      {
        heading: 'Impact in Enterprise Production',
        body: [
          'Integrating this self-healing heuristic across 400+ enterprise RPA jobs reduced manual bot maintenance tickets from 38 per month to under 3 per month.'
        ]
      }
    ]
  }
];
