"""SIDRA Master Core integration with the Capability Registry."""

from __future__ import annotations

from dataclasses import dataclass

from app.core.capability_registry import Capability, CapabilityRegistry


@dataclass(slots=True)
class CapabilityDecision:
    """Decision produced by Master Core before execution."""

    capability_id: str
    available: bool
    provider: str | None
    requires_permission: bool
    message: str


class MasterCore:
    """Master Core that routes work through abstract capabilities."""

    def __init__(self, registry: CapabilityRegistry | None = None) -> None:
        self.registry = registry or CapabilityRegistry()

    def decide_capability(self, user_request: str) -> CapabilityDecision:
        """Infer the best capability for a request and validate availability."""

        capability_id = self._infer_capability_id(user_request)
        if capability_id is None:
            return CapabilityDecision(
                capability_id="unknown",
                available=False,
                provider=None,
                requires_permission=False,
                message="No matching SIDRA capability was found for this request.",
            )

        capability = self.registry.get_capability(capability_id)
        if capability is None or not self.registry.can_use(capability_id):
            return CapabilityDecision(
                capability_id=capability_id,
                available=False,
                provider=None,
                requires_permission=False,
                message=(
                    f"Capability '{capability_id}' is not available yet. "
                    "SIDRA cannot execute this request with the current registry."
                ),
            )

        provider = self._choose_provider(capability)
        return CapabilityDecision(
            capability_id=capability.id,
            available=True,
            provider=provider,
            requires_permission=capability.requires_permission,
            message=(
                f"Use capability '{capability.name}'"
                + (f" via provider '{provider}'." if provider else ".")
            ),
        )

    def handle_terminal_command(self, command: str) -> str:
        """Handle SIDRA terminal commands for capabilities."""

        parts = command.strip().split()
        if not parts or parts[0] != "/capabilities":
            return "Unknown command."

        if len(parts) == 1 or parts[1] == "list":
            return self._format_capabilities(self.registry.list_capabilities())
        if parts[1] == "available":
            return self._format_capabilities(self.registry.list_available())
        if parts[1] == "domain":
            if len(parts) < 3:
                return "Usage: /capabilities domain <domain>"
            return self._format_capabilities(self.registry.list_by_domain(parts[2]))
        if parts[1] == "describe":
            if len(parts) < 3:
                return "Usage: /capabilities describe <capability_id>"
            return self.registry.describe_capability(parts[2])
        if parts[1] == "providers":
            if len(parts) < 3:
                return "Usage: /capabilities providers <provider_name>"
            return self._format_capabilities(
                self.registry.find_by_provider(" ".join(parts[2:]))
            )

        return "Unknown /capabilities command."

    def answer_current_capabilities(self) -> str:
        """Answer: what is SIDRA capable of doing now?"""

        return self._format_capabilities(self.registry.list_available())

    def _infer_capability_id(self, user_request: str) -> str | None:
        text = user_request.casefold()
        keyword_map = {
            "code_generation": ("code", "generate", "program", "script"),
            "code_refactoring": ("refactor", "clean code", "architecture"),
            "devloop_execution": ("devloop", "build", "test", "run checks"),
            "terminal_execution": ("terminal", "shell", "powershell", "command"),
            "file_management": ("file", "folder", "rename", "copy"),
            "internet_access": ("internet", "web", "browse", "search online"),
            "machine_control": ("machine", "desktop", "control computer"),
            "memory_search": ("memory", "remember", "recall"),
            "project_management": ("project", "roadmap", "task"),
            "workflow_execution": ("workflow", "automation", "pipeline"),
            "image_generation": ("image", "illustration", "photo"),
            "video_generation": ("video", "clip", "film"),
            "text_to_3d": ("text to 3d", "3d from text"),
            "3d_modeling": ("3d", "model", "mesh"),
            "game_engine_control": ("game engine", "unreal", "unity"),
            "audio_generation": ("audio", "music", "sound"),
            "voice_synthesis": ("voice", "tts", "narration"),
            "speech_to_text": ("transcribe", "speech to text", "stt"),
            "business_analysis": ("business", "market", "strategy"),
            "roi_analysis": ("roi", "return on investment", "finance"),
            "network_configuration": ("network", "router", "dns"),
            "vpn_management": ("vpn",),
            "cybersecurity_audit": ("security", "cyber", "audit"),
            "spiritual_study": ("spiritual", "bible", "quran", "study"),
            "document_analysis": ("document", "pdf", "docx", "analyze document"),
        }

        for capability_id, keywords in keyword_map.items():
            if any(keyword in text for keyword in keywords):
                return capability_id
        return None

    def _choose_provider(self, capability: Capability) -> str | None:
        return capability.providers[0] if capability.providers else None

    @staticmethod
    def _format_capabilities(capabilities: list[Capability]) -> str:
        if not capabilities:
            return "No capabilities found."

        return "\n".join(
            (
                f"- {capability.id} | {capability.name} | "
                f"{capability.domain} | {capability.status} | "
                f"providers: {', '.join(capability.providers) or 'none'}"
            )
            for capability in capabilities
        )

