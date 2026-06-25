// Search matching logic for models and providers

/**
 * Matches a model/provider object against a query string.
 * Matches name, provider, description, tags, and badges.
 * @param {Object} model - The model/provider object.
 * @param {string} query - The search query.
 * @returns {boolean} - True if matches, false otherwise.
 */
export function matchModel(model, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  
  const nameMatch = model.name ? model.name.toLowerCase().includes(q) : false;
  const providerMatch = model.provider ? model.provider.toLowerCase().includes(q) : false;
  const descMatch = model.desc ? model.desc.toLowerCase().includes(q) : false;
  
  const tagsMatch = model.tags ? model.tags.some(tag => tag.toLowerCase().includes(q)) : false;
  const badgeMatch = model.badge ? model.badge.toLowerCase().includes(q) : false;
  
  return nameMatch || providerMatch || descMatch || tagsMatch || badgeMatch;
}

export default matchModel;
