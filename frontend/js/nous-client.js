/**
 * nous-client.js
 * 
 * Handles direct browser → Nous Research API calls for free models.
 * Token is auto-read from the local nous-token-server (port 7123)
 * which reads it from hermes auth.json on disk.
 * 
 * Includes automatic fallback (e.g. to poolside/laguna-s-2.1:free) if
 * Step 3.7 Flash experiences upstream 503 capacity limits on Nous Research.
 */

const NOUS_TOKEN_SERVER = typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.hostname}:7123`
  : "http://127.0.0.1:7123";
const NOUS_CACHE_KEY = "nous_token_cache";
const NOUS_CACHE_TTL_MS = 5 * 60 * 1000; // re-read every 5 mins

export const NOUS_DIRECT_MODELS = new Set([
  "stepfun/step-3.7-flash:free",
  "stepfun/step-3.7-flash",
  "step-3.7-flash",
  "premium-step-3.7-flash",
  "tencent/hy3:free",
  "tencent/hy3",
  "poolside/laguna-s-2.1:free",
  "poolside/laguna-s-2.1",
]);

function resolveNousModel(modelId) {
  const aliases = {
    "step-3.7-flash": "stepfun/step-3.7-flash:free",
    "stepfun/step-3.7-flash": "stepfun/step-3.7-flash:free",
    "premium-step-3.7-flash": "stepfun/step-3.7-flash:free",
    "tencent/hy3": "tencent/hy3:free",
    "laguna-s-2.1": "poolside/laguna-s-2.1:free",
    "poolside/laguna-s-2.1": "poolside/laguna-s-2.1:free",
  };
  return aliases[modelId] ?? modelId;
}

export async function getNousToken() {
  try {
    const cached = JSON.parse(localStorage.getItem(NOUS_CACHE_KEY) || "null");
    if (cached && cached.token && Date.now() - cached.ts < NOUS_CACHE_TTL_MS) {
      return cached;
    }
  } catch (_) {}

  try {
    const resp = await fetch(`${NOUS_TOKEN_SERVER}/nous-token`, { signal: AbortSignal.timeout(3000) });
    if (!resp.ok) throw new Error(`Token server returned ${resp.status}`);
    const data = await resp.json();
    const result = {
      token: data.token || "",
      base_url: data.base_url || "https://inference-api.nousresearch.com/v1",
      ts: Date.now(),
    };
    if (result.token) {
      localStorage.setItem(NOUS_CACHE_KEY, JSON.stringify(result));
    }
    return result;
  } catch (err) {
    console.warn("[nous-client] Could not reach token server:", err.message);
    try {
      const cached = JSON.parse(localStorage.getItem(NOUS_CACHE_KEY) || "null");
      if (cached?.token) return cached;
    } catch (_) {}
    return { token: "", base_url: "https://inference-api.nousresearch.com/v1" };
  }
}

export function isNousDirectModel(modelId) {
  return NOUS_DIRECT_MODELS.has(modelId);
}

export async function nousStreamChat({ model, messages, maxTokens = 2048, onChunk, onDone, onError }) {
  const { token, base_url } = await getNousToken();

  if (!token) {
    onError?.(new Error("No Nous Research token found in hermes auth.json. Please ensure nous-token-server (port 7123) is running."));
    return () => {};
  }

  const primaryModel = resolveNousModel(model);
  const fallbackModel = "poolside/laguna-s-2.1:free";
  const controller = new AbortController();

  (async () => {
    let activeModel = primaryModel;
    let resp = null;

    try {
      resp = await fetch(`${base_url}/chat/completions`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages,
          max_tokens: maxTokens,
          stream: true,
        }),
      });

      // Handle 503 Capacity Limit fallback to Laguna S 2.1
      if (resp.status === 503 && activeModel !== fallbackModel) {
        console.warn(`[nous-client] Model ${activeModel} is 503 overloaded on Nous Research. Falling back to ${fallbackModel}...`);
        activeModel = fallbackModel;
        resp = await fetch(`${base_url}/chat/completions`, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            model: activeModel,
            messages,
            max_tokens: maxTokens,
            stream: true,
          }),
        });
      }

      if (!resp.ok) {
        const errText = await resp.text().catch(() => String(resp.status));
        let msg = errText;
        try {
          msg = JSON.parse(errText).message ?? errText;
        } catch (_) {}
        throw new Error(`Nous API ${resp.status}: ${msg}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === "data: [DONE]") continue;
          if (!trimmed.startsWith("data: ")) continue;
          try {
            const chunk = JSON.parse(trimmed.slice(6));
            const text = chunk?.choices?.[0]?.delta?.content;
            if (text) onChunk?.(text);
          } catch (_) {}
        }
      }

      if (buffer.trim() && buffer.trim().startsWith("data: ") && buffer.trim() !== "data: [DONE]") {
        try {
          const chunk = JSON.parse(buffer.trim().slice(6));
          const text = chunk?.choices?.[0]?.delta?.content;
          if (text) onChunk?.(text);
        } catch (_) {}
      }

      onDone?.();
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("[nous-client] Stream error:", err);
      onError?.(err);
    }
  })();

  return () => controller.abort();
}

export async function nousChat({ model, messages, maxTokens = 2048 }) {
  const { token, base_url } = await getNousToken();
  if (!token) throw new Error("No Nous Research token found.");

  let activeModel = resolveNousModel(model);
  let resp = await fetch(`${base_url}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: activeModel,
      messages,
      max_tokens: maxTokens,
      stream: false,
    }),
  });

  if (resp.status === 503) {
    activeModel = "poolside/laguna-s-2.1:free";
    resp = await fetch(`${base_url}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: activeModel,
        messages,
        max_tokens: maxTokens,
        stream: false,
      }),
    });
  }

  if (!resp.ok) {
    const errText = await resp.text().catch(() => String(resp.status));
    let msg = errText;
    try { msg = JSON.parse(errText).message ?? errText; } catch (_) {}
    throw new Error(`Nous API ${resp.status}: ${msg}`);
  }

  const data = await resp.json();
  return data?.choices?.[0]?.message?.content ?? "";
}
