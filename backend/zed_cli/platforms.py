"""
Shared platform registry for Zed Agent.

Single source of truth for platform metadata consumed by both
skills_config (label display) and tools_config (default toolset
resolution).  Import ``PLATFORMS`` from here instead of maintaining
duplicate dicts in each module.
"""

from collections import OrderedDict
from typing import NamedTuple


class PlatformInfo(NamedTuple):
    """Metadata for a single platform entry."""
    label: str
    default_toolset: str


# Ordered so that TUI menus are deterministic.
PLATFORMS: OrderedDict[str, PlatformInfo] = OrderedDict([
    ("cli",            PlatformInfo(label="ðŸ–¥ï¸  CLI",            default_toolset="zed-cli")),
    ("telegram",       PlatformInfo(label="ðŸ“± Telegram",        default_toolset="zed-telegram")),
    ("discord",        PlatformInfo(label="ðŸ’¬ Discord",         default_toolset="zed-discord")),
    ("slack",          PlatformInfo(label="ðŸ’¼ Slack",           default_toolset="zed-slack")),
    ("whatsapp",       PlatformInfo(label="ðŸ“± WhatsApp",        default_toolset="zed-whatsapp")),
    ("whatsapp_cloud", PlatformInfo(label="ðŸ“± WhatsApp Business (Cloud)", default_toolset="zed-whatsapp")),
    ("signal",         PlatformInfo(label="ðŸ“¡ Signal",          default_toolset="zed-signal")),
    ("bluebubbles",    PlatformInfo(label="ðŸ’™ BlueBubbles",     default_toolset="zed-bluebubbles")),
    ("email",          PlatformInfo(label="ðŸ“§ Email",           default_toolset="zed-email")),
    ("homeassistant",  PlatformInfo(label="ðŸ  Home Assistant",  default_toolset="zed-homeassistant")),
    ("mattermost",     PlatformInfo(label="ðŸ’¬ Mattermost",      default_toolset="zed-mattermost")),
    ("matrix",         PlatformInfo(label="ðŸ’¬ Matrix",          default_toolset="zed-matrix")),
    ("dingtalk",       PlatformInfo(label="ðŸ’¬ DingTalk",        default_toolset="zed-dingtalk")),
    ("feishu",         PlatformInfo(label="ðŸª½ Feishu",          default_toolset="zed-feishu")),
    ("wecom",          PlatformInfo(label="ðŸ’¬ WeCom",           default_toolset="zed-wecom")),
    ("wecom_callback", PlatformInfo(label="ðŸ’¬ WeCom Callback",  default_toolset="zed-wecom-callback")),
    ("weixin",         PlatformInfo(label="ðŸ’¬ Weixin",          default_toolset="zed-weixin")),
    ("qqbot",          PlatformInfo(label="ðŸ’¬ QQBot",           default_toolset="zed-qqbot")),
    ("yuanbao",        PlatformInfo(label="ðŸ¤– Yuanbao",         default_toolset="zed-yuanbao")),
    ("webhook",        PlatformInfo(label="ðŸ”— Webhook",         default_toolset="zed-webhook")),
    ("api_server",     PlatformInfo(label="ðŸŒ API Server",      default_toolset="zed-api-server")),
    ("cron",           PlatformInfo(label="â° Cron",            default_toolset="zed-cron")),
])


def platform_label(key: str, default: str = "") -> str:
    """Return the display label for a platform key, or *default*.

    Checks the static PLATFORMS dict first, then the plugin platform
    registry for dynamically registered platforms.
    """
    info = PLATFORMS.get(key)
    if info is not None:
        return info.label
    # Check plugin registry
    try:
        from gateway.platform_registry import platform_registry
        entry = platform_registry.get(key)
        if entry:
            return f"{entry.emoji}  {entry.label}" if entry.emoji else entry.label
    except Exception:
        pass
    return default


def get_all_platforms() -> "OrderedDict[str, PlatformInfo]":
    """Return PLATFORMS merged with any plugin-registered platforms.

    Plugin platforms are appended after builtins.  This is the function
    that tools_config and skills_config should use for platform menus.
    """
    merged = OrderedDict(PLATFORMS)
    try:
        from gateway.platform_registry import platform_registry
        for entry in platform_registry.plugin_entries():
            if entry.name not in merged:
                merged[entry.name] = PlatformInfo(
                    label=f"{entry.emoji}  {entry.label}" if entry.emoji else entry.label,
                    default_toolset=f"zed-{entry.name}",
                )
    except Exception:
        pass
    return merged
