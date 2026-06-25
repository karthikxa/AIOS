from providers import register_provider
from providers.base import ProviderProfile

zed_pro = ProviderProfile(
    name="zed-pro",
    aliases=("zed", "local-proxy"),
    env_vars=(),
    display_name="Zed Pro",
    description="Zed Pro - AI inference engine by Zed Team",
    base_url="http://localhost:3000/v1",
    default_aux_model="auto",
    fallback_models=("auto",),
)

register_provider(zed_pro)
