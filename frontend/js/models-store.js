// centralized state store for models page
const initialModels = [
  // Zed Pro — built-in model via deploy proxy
  {
    id: "zed-pro",
    name: "Zed Pro",
    provider: "Zed Pro",
    desc: "Built-in model — Zed's AI inference engine by Zed Team.",
    badge: null,
    tags: ["Official"],
    status: "connected",
    logoClass: "logo-zed-pro",
    logoSrc: "assets/models/zed-pro.svg",
    type: "provider",
    modelCount: 1,
    settings: {
      apiKey: "",
      baseUrl: "/v1",
      endpoint: "auto",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "zed-pro-model",
    name: "Zed Pro",
    provider: "Zed Pro",
    desc: "Zed Pro — our flagship AI assistant by the Zed Team.",
    tags: ["Official"],
    status: "connected",
    logoClass: "logo-zed-pro",
    logoSrc: "assets/models/zed-pro.svg",
    type: "official",
    isPrimary: true,
    settings: { apiKey: "", baseUrl: "/v1", endpoint: "auto" }
  },

  // 1. Providers (type: "provider")
  {
    id: "openai",
    name: "OpenAI",
    provider: "OpenAI",
    desc: "GPT-OSS models are open-weight OpenAI releases hosted on various infra",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-openai",
    logoSrc: "assets/models/openai.svg",
    type: "provider",
    modelCount: 4,
    settings: {
      apiKey: "",
      baseUrl: "https://api.openai.com/v1",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "google",
    name: "Google",
    provider: "Google",
    desc: "Gemini = proprietary API; Gemma = open-weight models",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "provider",
    modelCount: 9,
    settings: {
      apiKey: "",
      baseUrl: "https://generativelanguage.googleapis.com",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "meta-llama",
    name: "Meta",
    provider: "Meta",
    desc: "open-weight; hosted on Groq, Together, Fireworks, etc.",
    badge: null,
    tags: ["Open-source"],
    status: "disconnected",
    logoClass: "logo-meta",
    logoSrc: "assets/models/meta.svg",
    type: "provider",
    modelCount: 5,
    settings: {
      apiKey: "",
      baseUrl: "",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "qwen",
    name: "Qwen",
    provider: "Qwen",
    desc: "open-weight; Alibaba Cloud Qwen series",
    badge: null,
    tags: ["Open-source"],
    status: "disconnected",
    logoClass: "logo-qwen",
    logoSrc: "assets/models/qwen.svg",
    type: "provider",
    modelCount: 3,
    settings: {
      apiKey: "",
      baseUrl: "",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    provider: "NVIDIA",
    desc: "Nemotron = NVIDIA's Llama-based fine-tunes",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-nvidia",
    logoSrc: "assets/models/nvidia.svg",
    type: "provider",
    modelCount: 6,
    settings: {
      apiKey: "",
      baseUrl: "https://integrate.api.nvidia.com/v1",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "zhipu",
    name: "Zhipu AI",
    provider: "Zhipu AI",
    desc: "Chinese AI lab; GLM series (General Language Model)",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-zhipu",
    logoSrc: "assets/models/zhipu.svg",
    type: "provider",
    modelCount: 2,
    settings: {
      apiKey: "",
      baseUrl: "https://open.bigmodel.cn/api/paas/v4",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "liquidai",
    name: "Liquid AI",
    provider: "Liquid AI",
    desc: "LFM = Liquid Foundation Model (non-transformer architecture)",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-liquid",
    logoSrc: "assets/models/liquid.svg",
    type: "provider",
    modelCount: 2,
    settings: {
      apiKey: "",
      baseUrl: "https://api.liquid.ai/v1",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "poolside",
    name: "Poolside",
    provider: "Poolside",
    desc: "code-focused models; proprietary",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-poolside",
    logoSrc: "assets/models/poolside.svg",
    logoText: "PS",
    type: "provider",
    modelCount: 4,
    settings: {
      apiKey: "",
      baseUrl: "",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "moonshot",
    name: "Moonshot AI",
    provider: "Moonshot AI",
    desc: "Chinese AI lab; Kimi is their model brand",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-moonshot",
    logoSrc: "assets/models/moonshot.svg",
    type: "provider",
    modelCount: 1,
    settings: {
      apiKey: "",
      baseUrl: "https://api.moonshot.cn/v1",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "mistral",
    name: "Mistral AI",
    provider: "Mistral AI",
    desc: "Dolphin is a Mistral-based fine-tune by Cognitive Computations",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-mistral",
    logoSrc: "assets/models/mistral.svg",
    type: "provider",
    modelCount: 1,
    settings: {
      apiKey: "",
      baseUrl: "https://api.mistral.ai/v1",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "stepfun",
    name: "StepFun",
    provider: "StepFun",
    desc: "Chinese AI lab (阶跃星辰)",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-stepfun",
    logoSrc: "assets/models/stepfun.svg",
    type: "provider",
    modelCount: 1,
    settings: {
      apiKey: "",
      baseUrl: "",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "groq",
    name: "Groq",
    provider: "Groq",
    desc: "Groq's own compound routing models (multi-model ensemble)",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-groq",
    logoSrc: "assets/models/groq.svg",
    type: "provider",
    modelCount: 2,
    settings: {
      apiKey: "",
      baseUrl: "",
      orgId: "",
      overrides: ""
    }
  },
  {
    id: "nousresearch",
    name: "Nous Research",
    provider: "Nous Research",
    desc: "fine-tune of Llama 405B with Hermes dataset",
    badge: null,
    tags: ["Official"],
    status: "disconnected",
    logoClass: "logo-nous",
    logoSrc: "assets/models/nous.svg",
    type: "provider",
    modelCount: 1,
    settings: {
      apiKey: "",
      baseUrl: "",
      orgId: "",
      overrides: ""
    }
  },

  // 2. Individual Models (type: "official")
  {
    id: "gpt-oss-20b-free",
    name: "GPT-OSS 20B (free)",
    provider: "OpenAI",
    desc: "Free 20B open-weight OpenAI release.",
    tags: ["Lightweight"],
    status: "disconnected",
    logoClass: "logo-openai",
    logoSrc: "assets/models/openai.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "gpt-oss-20b-groq",
    name: "GPT-OSS 20B (Groq)",
    provider: "OpenAI",
    desc: "20B open-weight OpenAI release hosted on Groq.",
    tags: ["Ultra-fast"],
    status: "disconnected",
    logoClass: "logo-openai",
    logoSrc: "assets/models/openai.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "gpt-oss-20b-pollinations",
    name: "GPT-OSS 20B (Pollinations)",
    provider: "OpenAI",
    desc: "20B open-weight OpenAI release hosted on Pollinations.",
    tags: ["Creative"],
    status: "disconnected",
    logoClass: "logo-openai",
    logoSrc: "assets/models/openai.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "gpt-oss-safeguard-20b-groq",
    name: "GPT-OSS Safeguard 20B (Groq)",
    provider: "OpenAI",
    desc: "Moderation aligned open-weight OpenAI release on Groq.",
    tags: ["Safety"],
    status: "disconnected",
    logoClass: "logo-openai",
    logoSrc: "assets/models/openai.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // Google
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    desc: "High-speed Google Gemini model.",
    tags: ["High-speed"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://generativelanguage.googleapis.com" }
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash-Lite",
    provider: "Google",
    desc: "Highly efficient Google Gemini model.",
    tags: ["Efficient"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://generativelanguage.googleapis.com" }
  },
  {
    id: "gemini-3-flash-preview",
    name: "Gemini 3 Flash Preview",
    provider: "Google",
    desc: "Preview version of Gemini 3 Flash.",
    tags: ["BETA"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://generativelanguage.googleapis.com" }
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    provider: "Google",
    desc: "Google's next generation flagship model.",
    tags: ["BETA"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://generativelanguage.googleapis.com" }
  },
  {
    id: "gemini-3.1-flash-lite-preview",
    name: "Gemini 3.1 Flash-Lite Preview",
    provider: "Google",
    desc: "Preview version of Gemini 3.1 Flash-Lite.",
    tags: ["BETA"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://generativelanguage.googleapis.com" }
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    provider: "Google",
    desc: "Advanced Google Gemini 3.5 model.",
    tags: ["Latest"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://generativelanguage.googleapis.com" }
  },
  {
    id: "gemma-4-26b-a4b-free",
    name: "Gemma 4 26B-A4B (free)",
    provider: "Google",
    desc: "Free open-weight Gemma 4 model.",
    tags: ["Open-weights"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "gemma-4-26b-it",
    name: "Gemma 4 26B IT",
    provider: "Google",
    desc: "Instruction-tuned Gemma 4 26B.",
    tags: ["Instruct"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "gemma-4-31b-it",
    name: "Gemma 4 31B IT",
    provider: "Google",
    desc: "Instruction-tuned Gemma 4 31B.",
    tags: ["Instruct"],
    status: "disconnected",
    logoClass: "logo-google",
    logoSrc: "assets/models/google.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // Meta
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B Instant",
    provider: "Meta",
    desc: "Fast, efficient Llama 3.1 8B model.",
    tags: ["High-speed"],
    status: "disconnected",
    logoClass: "logo-meta",
    logoSrc: "assets/models/meta.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "llama-3.2-3b-free",
    name: "Llama 3.2 3B (free)",
    provider: "Meta",
    desc: "Free lightweight Llama 3.2 3B model.",
    tags: ["Free"],
    status: "disconnected",
    logoClass: "logo-meta",
    logoSrc: "assets/models/meta.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    provider: "Meta",
    desc: "State-of-the-art Llama 3.3 70B model.",
    tags: ["High-accuracy"],
    status: "disconnected",
    logoClass: "logo-meta",
    logoSrc: "assets/models/meta.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "llama-3.3-70b-or-free",
    name: "Llama 3.3 70B (OR free)",
    provider: "Meta",
    desc: "Free alternative Llama 3.3 70B model.",
    tags: ["Free"],
    status: "disconnected",
    logoClass: "logo-meta",
    logoSrc: "assets/models/meta.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "llama-4-scout",
    name: "Llama 4 Scout",
    provider: "Meta",
    desc: "Next-gen Llama 4 preview model.",
    tags: ["BETA"],
    status: "disconnected",
    logoClass: "logo-meta",
    logoSrc: "assets/models/meta.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // Qwen
  {
    id: "qwen3-coder-480b-free",
    name: "Qwen3 Coder 480B (free)",
    provider: "Qwen",
    desc: "Free code-focused Qwen3 model.",
    tags: ["Coding"],
    status: "disconnected",
    logoClass: "logo-qwen",
    logoSrc: "assets/models/qwen.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "qwen3-32b-groq",
    name: "Qwen3 32B (Groq)",
    provider: "Qwen",
    desc: "Qwen3 32B model hosted on Groq.",
    tags: ["Ultra-fast"],
    status: "disconnected",
    logoClass: "logo-qwen",
    logoSrc: "assets/models/qwen.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "qwen3-next-80b-free",
    name: "Qwen3-Next 80B (free)",
    provider: "Qwen",
    desc: "Free next-gen Qwen3 80B model.",
    tags: ["Latest"],
    status: "disconnected",
    logoClass: "logo-qwen",
    logoSrc: "assets/models/qwen.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // NVIDIA
  {
    id: "nemotron-3-super-120b-free",
    name: "Nemotron 3 Super 120B (free)",
    provider: "NVIDIA",
    desc: "Free Nemotron 3 120B model.",
    tags: ["Free"],
    status: "disconnected",
    logoClass: "logo-nvidia",
    logoSrc: "assets/models/nvidia.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://integrate.api.nvidia.com/v1" }
  },
  {
    id: "nemotron-3-super-120b-kilo",
    name: "Nemotron 3 Super 120B (Kilo)",
    provider: "NVIDIA",
    desc: "Kilo instance of Nemotron 3 120B.",
    tags: ["High-speed"],
    status: "disconnected",
    logoClass: "logo-nvidia",
    logoSrc: "assets/models/nvidia.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://integrate.api.nvidia.com/v1" }
  },
  {
    id: "nemotron-3-nano-30b-free",
    name: "Nemotron 3 Nano 30B (free)",
    provider: "NVIDIA",
    desc: "Free lightweight Nemotron 3 Nano.",
    tags: ["Free"],
    status: "disconnected",
    logoClass: "logo-nvidia",
    logoSrc: "assets/models/nvidia.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://integrate.api.nvidia.com/v1" }
  },
  {
    id: "nemotron-3-nano-30b-reasoning-free",
    name: "Nemotron 3 Nano 30B Reasoning (free)",
    provider: "NVIDIA",
    desc: "Reasoning specialized free Nemotron 3 Nano.",
    tags: ["Reasoning"],
    status: "disconnected",
    logoClass: "logo-nvidia",
    logoSrc: "assets/models/nvidia.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://integrate.api.nvidia.com/v1" }
  },
  {
    id: "nemotron-nano-9b-v2-free",
    name: "Nemotron Nano 9B v2 (free)",
    provider: "NVIDIA",
    desc: "Free 9B Nemotron Nano v2.",
    tags: ["Lightweight"],
    status: "disconnected",
    logoClass: "logo-nvidia",
    logoSrc: "assets/models/nvidia.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://integrate.api.nvidia.com/v1" }
  },
  {
    id: "nemotron-nano-12b-vl-free",
    name: "Nemotron Nano 12B VL (free)",
    provider: "NVIDIA",
    desc: "Free vision-language Nemotron Nano.",
    tags: ["Vision"],
    status: "disconnected",
    logoClass: "logo-nvidia",
    logoSrc: "assets/models/nvidia.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://integrate.api.nvidia.com/v1" }
  },

  // Zhipu AI
  {
    id: "glm-4.5-air-free",
    name: "GLM-4.5 Air (free)",
    provider: "Zhipu AI",
    desc: "Free GLM-4.5 Air model.",
    tags: ["Free"],
    status: "disconnected",
    logoClass: "logo-zhipu",
    logoSrc: "assets/models/zhipu.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://open.bigmodel.cn/api/paas/v4" }
  },
  {
    id: "glm-4.7-cerebras",
    name: "GLM-4.7 (Cerebras)",
    provider: "Zhipu AI",
    desc: "GLM-4.7 model hosted on Cerebras.",
    tags: ["Ultra-fast"],
    status: "disconnected",
    logoClass: "logo-zhipu",
    logoSrc: "assets/models/zhipu.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://open.bigmodel.cn/api/paas/v4" }
  },

  // Liquid AI
  {
    id: "liquid-lfm-2.5-1.2b-free",
    name: "Liquid LFM 2.5 1.2B (free)",
    provider: "Liquid AI",
    desc: "Free Liquid LFM 2.5 1.2B model.",
    tags: ["Non-transformer"],
    status: "disconnected",
    logoClass: "logo-liquid",
    logoSrc: "assets/models/liquid.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://api.liquid.ai/v1" }
  },
  {
    id: "liquid-lfm-2.5-1.2b-thinking-free",
    name: "Liquid LFM 2.5 1.2B Thinking (free)",
    provider: "Liquid AI",
    desc: "Free reasoning Liquid LFM 2.5 1.2B model.",
    tags: ["Reasoning"],
    status: "disconnected",
    logoClass: "logo-liquid",
    logoSrc: "assets/models/liquid.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://api.liquid.ai/v1" }
  },

  // Poolside
  {
    id: "poolside-laguna-m.1-free",
    name: "Poolside Laguna M.1 (free)",
    provider: "Poolside",
    desc: "Free Poolside Laguna M.1 model.",
    tags: ["Coding"],
    status: "disconnected",
    logoClass: "logo-poolside",
    logoText: "PS",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "poolside-laguna-m.1-kilo",
    name: "Poolside Laguna M.1 (Kilo)",
    provider: "Poolside",
    desc: "Kilo instance of Poolside Laguna M.1.",
    tags: ["Coding"],
    status: "disconnected",
    logoClass: "logo-poolside",
    logoText: "PS",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "poolside-laguna-xs.2-free",
    name: "Poolside Laguna XS.2 (free)",
    provider: "Poolside",
    desc: "Free Poolside Laguna XS.2 model.",
    tags: ["Coding"],
    status: "disconnected",
    logoClass: "logo-poolside",
    logoText: "PS",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "poolside-laguna-xs.2-kilo",
    name: "Poolside Laguna XS.2 (Kilo)",
    provider: "Poolside",
    desc: "Kilo instance of Poolside Laguna XS.2.",
    tags: ["Coding"],
    status: "disconnected",
    logoClass: "logo-poolside",
    logoText: "PS",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // Moonshot AI
  {
    id: "kimi-k2.6-or-free",
    name: "Kimi K2.6 (OR free)",
    provider: "Moonshot AI",
    desc: "Free Moonshot Kimi K2.6 model.",
    tags: ["Long-context"],
    status: "disconnected",
    logoClass: "logo-moonshot",
    logoSrc: "assets/models/moonshot.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://api.moonshot.cn/v1" }
  },

  // Mistral AI
  {
    id: "dolphin-mistral-24b-venice-free",
    name: "Dolphin Mistral 24B Venice (free)",
    provider: "Mistral AI",
    desc: "Free Dolphin Mistral model hosted on Venice.",
    tags: ["Fine-tune"],
    status: "disconnected",
    logoClass: "logo-mistral",
    logoSrc: "assets/models/mistral.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "https://api.mistral.ai/v1" }
  },

  // StepFun
  {
    id: "stepfun-step-3.7-flash-kilo",
    name: "StepFun Step 3.7 Flash (Kilo)",
    provider: "StepFun",
    desc: "Kilo instance of StepFun Step 3.7 Flash.",
    tags: ["Chinese"],
    status: "disconnected",
    logoClass: "logo-stepfun",
    logoSrc: "assets/models/stepfun.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // Groq
  {
    id: "compound-groq",
    name: "Compound (Groq)",
    provider: "Groq",
    desc: "Ensemble router model hosted on Groq.",
    tags: ["Ensemble"],
    status: "disconnected",
    logoClass: "logo-groq",
    logoSrc: "assets/models/groq.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },
  {
    id: "compound-mini-groq",
    name: "Compound Mini (Groq)",
    provider: "Groq",
    desc: "Lightweight ensemble model hosted on Groq.",
    tags: ["Ensemble"],
    status: "disconnected",
    logoClass: "logo-groq",
    logoSrc: "assets/models/groq.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // Nous Research
  {
    id: "hermes-3-405b-free",
    name: "Hermes 3 405B (free)",
    provider: "Nous Research",
    desc: "Nous Research Hermes 3 405B model.",
    tags: ["Instruct"],
    status: "disconnected",
    logoClass: "logo-nous",
    logoSrc: "assets/models/nous.svg",
    type: "official",
    isPrimary: false,
    settings: { apiKey: "", baseUrl: "" }
  },

  // ── Free models via FreeLLMAPI proxy ──────────────────────────────────
  {
    id: "premium-step-3.7-flash",
    name: "Step 3.7 Flash",
    provider: "StepFun",
    desc: "StepFun Step 3.7 Flash via Hermes.",
    tags: ["Fast"],
    status: "connected",
    logoClass: "logo-stepfun",
    logoSrc: "assets/models/stepfun.svg",
    type: "official",
    isPrimary: false,
    settings: { baseUrl: "/v1", endpoint: "step-3.7-flash" }
  },
  {
    id: "premium-tencent-hy3",
    name: "Hy3",
    provider: "Tencent",
    desc: "Tencent HyperCLOVA via Hermes.",
    tags: ["Fast"],
    status: "connected",
    logoClass: "logo-tencent",
    logoSrc: "assets/models/tencent.svg",
    type: "official",
    isPrimary: false,
    settings: { baseUrl: "/v1", endpoint: "tencent/hy3" }
  },
  {
    id: "premium-poolside-laguna-s-2.1",
    name: "Laguna S 2.1",
    provider: "Poolside",
    desc: "Poolside Laguna S 2.1 via Hermes.",
    tags: ["Coding"],
    status: "connected",
    logoClass: "logo-poolside",
    logoSrc: "assets/models/poolside.svg",
    type: "official",
    isPrimary: false,
    settings: { baseUrl: "/v1", endpoint: "poolside/laguna-s-2.1" }
  },
  {
    id: "premium-inclusionai-ling-3.0-flash",
    name: "Ling 3.0 Flash",
    provider: "Inclusion AI",
    desc: "Inclusion AI Ling 3.0 Flash via Hermes.",
    tags: ["Fast"],
    status: "connected",
    logoClass: "logo-inclusionai",
    logoSrc: "assets/models/inclusionai.svg",
    type: "official",
    isPrimary: false,
    settings: { baseUrl: "/v1", endpoint: "inclusionai/ling-3.0-flash" }
  },
  {
    id: "premium-poolside-laguna-xs-2.1",
    name: "Laguna XS 2.1",
    provider: "Poolside",
    desc: "Poolside Laguna XS 2.1 via Hermes.",
    tags: ["Coding"],
    status: "connected",
    logoClass: "logo-poolside",
    logoSrc: "assets/models/poolside.svg",
    type: "official",
    isPrimary: false,
    settings: { baseUrl: "/v1", endpoint: "poolside/laguna-xs-2.1" }
  }
];

class ModelsStore {
  constructor() {
    // Default activeTab is "providers" to match the mockup (which lists Connected Providers by default)
    this.state = {
      activeTab: "providers",
      searchQuery: "",
      activeCategory: "all",
      models: [...initialModels],
      activeModel: "Zed Pro"
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setActiveModel(modelName) {
    this.state.activeModel = modelName;
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  setTab(tab) {
    this.state.activeTab = tab;
    this.notify();
  }

  setSearchQuery(query) {
    this.state.searchQuery = query;
    this.notify();
  }

  setCategory(category) {
    this.state.activeCategory = category;
    this.notify();
  }

  updateModelStatus(id, status) {
    const model = this.state.models.find(m => m.id === id);
    if (model) {
      model.status = status;

      // Propagate status change from provider to its child models
      if (model.type === 'provider') {
        const providerName = model.name;
        this.state.models.forEach(m => {
          if (m.provider === providerName && m.type !== 'provider') {
            m.status = status;
            if (status === 'disconnected') {
              m.settings = { apiKey: "", baseUrl: "", orgId: "", overrides: "" };
            }
          }
        });
      }

      this.notify();
    }
  }

  updateModelSettings(id, settings) {
    const model = this.state.models.find(m => m.id === id);
    if (model) {
      model.settings = { ...model.settings, ...settings };

      // If it's a provider, propagate settings to all its child models
      if (model.type === 'provider') {
        const providerName = model.name;
        this.state.models.forEach(m => {
          if (m.provider === providerName && m.type !== 'provider') {
            m.settings = {
              ...m.settings,
              apiKey: settings.apiKey !== undefined ? settings.apiKey : m.settings.apiKey,
              baseUrl: settings.baseUrl !== undefined ? settings.baseUrl : m.settings.baseUrl,
              orgId: settings.orgId !== undefined ? settings.orgId : m.settings.orgId,
              overrides: settings.overrides !== undefined ? settings.overrides : m.settings.overrides
            };
            // Also ensure statuses match
            m.status = model.status;
          }
        });
      }

      this.notify();
    }
  }

  toggleModelPrimary(id) {
    const model = this.state.models.find(m => m.id === id);
    if (model) {
      model.isPrimary = !model.isPrimary;
      this.notify();
    }
  }

  addProviderWithModels(providerData, modelIds) {
    let provider = this.state.models.find(m => m.type === 'provider' && m.name.toLowerCase() === providerData.name.toLowerCase());
    
    const isLocal = /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(providerData.baseUrl || '');
    
    if (!provider) {
      const newId = providerData.name.toLowerCase().replace(/\s+/g, '-');
      provider = {
        id: newId,
        name: providerData.name,
        provider: providerData.name,
        desc: `${modelIds.length} models available. Connected via custom API.`,
        badge: isLocal ? "Local" : "Custom",
        tags: isLocal ? ["Local"] : [],
        status: "connected",
        logoClass: "logo-custom",
        logoSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
        type: "provider",
        modelCount: modelIds.length,
        settings: {
          apiKey: providerData.apiKey || "",
          baseUrl: providerData.baseUrl || "",
          orgId: "",
          overrides: ""
        }
      };
      this.state.models.push(provider);
    } else {
      provider.status = "connected";
      provider.settings = {
        ...provider.settings,
        apiKey: providerData.apiKey || provider.settings.apiKey,
        baseUrl: providerData.baseUrl || provider.settings.baseUrl
      };
      provider.modelCount = modelIds.length;
    }

    const seenIds = new Set();
    modelIds.forEach(modelId => {
      if (seenIds.has(modelId)) return;
      seenIds.add(modelId);

      let model = this.state.models.find(m => m.type === 'official' && m.id === modelId);
      if (!model) {
        model = {
          id: modelId,
          name: modelId,
          provider: provider.name,
          desc: `Model ${modelId} from ${provider.name}`,
          tags: isLocal ? ["Local"] : ["Custom"],
          status: "connected",
          logoClass: provider.logoClass,
          logoSrc: provider.logoSrc,
          logoSvg: provider.logoSvg,
          type: "official",
          isPrimary: false,
          settings: {
            apiKey: providerData.apiKey || "",
            baseUrl: providerData.baseUrl || ""
          }
        };
        this.state.models.push(model);
      } else {
        model.status = "connected";
        model.settings = {
          ...model.settings,
          apiKey: providerData.apiKey || model.settings.apiKey,
          baseUrl: providerData.baseUrl || model.settings.baseUrl
        };
      }
    });

    this.notify();
  }

  addCustomProvider(providerData) {
    const newId = `custom-${Date.now()}`;
    // Local servers don't need an API key to be considered "connected"
    const isLocal = /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(providerData.baseUrl || '');
    const isConnected = !!(providerData.apiKey || isLocal || providerData.baseUrl);
    const newProvider = {
      id: newId,
      name: providerData.name,
      provider: providerData.name,
      desc: `Custom provider: ${providerData.baseUrl || 'API'}`,
      badge: "Custom",
      tags: isLocal ? ["Local"] : ["Custom"],
      status: isConnected ? "connected" : "disconnected",
      logoClass: "logo-custom",
      logoSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
      type: "provider",
      modelCount: 1,
      settings: {
        apiKey: providerData.apiKey || "",
        baseUrl: providerData.baseUrl || "",
        orgId: "",
        overrides: ""
      }
    };
    this.state.models.push(newProvider);
    this.notify();
  }
}

export const modelsStore = new ModelsStore();