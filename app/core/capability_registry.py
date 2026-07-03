"""Central capability registry for SIDRA.

SIDRA depends on abstract capabilities instead of concrete providers. This
module loads, validates, queries, and persists those capabilities from a
human-readable JSON file.
"""

from __future__ import annotations

import json
import logging
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any, Literal


CapabilityDomain = Literal[
    "development",
    "creative",
    "business",
    "network",
    "machine",
    "audio",
    "video",
    "image",
    "research",
    "spiritual",
    "system",
]
CapabilityStatus = Literal["available", "unavailable", "disabled", "experimental"]
RiskLevel = Literal["SAFE", "SENSITIVE", "CRITICAL"]

VALID_DOMAINS = {
    "development",
    "creative",
    "business",
    "network",
    "machine",
    "audio",
    "video",
    "image",
    "research",
    "spiritual",
    "system",
}
VALID_STATUSES = {"available", "unavailable", "disabled", "experimental"}
VALID_RISK_LEVELS = {"SAFE", "SENSITIVE", "CRITICAL"}


@dataclass(slots=True)
class Capability:
    """A SIDRA capability independent from its concrete providers."""

    id: str
    name: str
    domain: CapabilityDomain
    description: str
    providers: list[str] = field(default_factory=list)
    status: CapabilityStatus = "unavailable"
    risk_level: RiskLevel = "SAFE"
    requires_permission: bool = False
    local: bool = False
    cloud: bool = False
    tags: list[str] = field(default_factory=list)


class CapabilityRegistry:
    """Load, query, and persist SIDRA capabilities."""

    def __init__(
        self,
        config_path: str | Path = "config/capabilities.json",
        log_path: str | Path = "logs/capability_registry.log",
    ) -> None:
        self.config_path = Path(config_path)
        self.log_path = Path(log_path)
        self.capabilities: dict[str, Capability] = {}
        self.logger = self._build_logger()
        self.load_capabilities()

    def load_capabilities(self) -> list[Capability]:
        """Load capabilities from JSON into memory."""

        if not self.config_path.exists():
            self.capabilities = {}
            self.logger.warning("Capability config not found: %s", self.config_path)
            return []

        with self.config_path.open("r", encoding="utf-8") as file:
            raw_data = json.load(file)

        if not isinstance(raw_data, list):
            raise ValueError("capabilities.json must contain a list")

        loaded: dict[str, Capability] = {}
        for item in raw_data:
            capability = self._coerce_capability(item)
            if capability.id in loaded:
                raise ValueError(f"Duplicate capability id: {capability.id}")
            loaded[capability.id] = capability

        self.capabilities = loaded
        self.logger.info("Loaded %s capabilities", len(self.capabilities))
        return self.list_capabilities()

    def save_capabilities(self) -> None:
        """Persist capabilities to JSON using a stable, readable format."""

        self.config_path.parent.mkdir(parents=True, exist_ok=True)
        data = [asdict(item) for item in self.list_capabilities()]
        with self.config_path.open("w", encoding="utf-8") as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
            file.write("\n")
        self.logger.info("Saved %s capabilities", len(data))

    def register_capability(self, capability: Capability | dict[str, Any]) -> Capability:
        """Register a new capability and persist the registry."""

        item = self._coerce_capability(capability)
        if item.id in self.capabilities:
            raise ValueError(f"Capability already registered: {item.id}")

        self.capabilities[item.id] = item
        self.save_capabilities()
        self.logger.info("Registered capability: %s", item.id)
        return item

    def update_capability(self, capability_id: str, data: dict[str, Any]) -> Capability:
        """Update an existing capability and persist the registry."""

        existing = self.get_capability(capability_id)
        if existing is None:
            raise KeyError(f"Capability not found: {capability_id}")

        merged = asdict(existing)
        merged.update(data)
        updated = self._coerce_capability(merged)
        if updated.id != capability_id:
            raise ValueError("Capability id cannot be changed")

        self.capabilities[capability_id] = updated
        self.save_capabilities()
        self.logger.info("Updated capability: %s", capability_id)
        return updated

    def get_capability(self, capability_id: str) -> Capability | None:
        """Return a capability by id."""

        return self.capabilities.get(capability_id)

    def list_capabilities(self) -> list[Capability]:
        """Return all capabilities sorted by id."""

        return [self.capabilities[key] for key in sorted(self.capabilities)]

    def list_by_domain(self, domain: str) -> list[Capability]:
        """Return capabilities for a domain."""

        return [
            capability
            for capability in self.list_capabilities()
            if capability.domain == domain
        ]

    def list_available(self) -> list[Capability]:
        """Return capabilities that can currently be selected."""

        return [
            capability
            for capability in self.list_capabilities()
            if capability.status in {"available", "experimental"}
        ]

    def find_by_tag(self, tag: str) -> list[Capability]:
        """Return capabilities carrying a tag, case-insensitively."""

        normalized = tag.casefold()
        return [
            capability
            for capability in self.list_capabilities()
            if any(item.casefold() == normalized for item in capability.tags)
        ]

    def find_by_provider(self, provider_name: str) -> list[Capability]:
        """Return capabilities served by a provider, case-insensitively."""

        normalized = provider_name.casefold()
        return [
            capability
            for capability in self.list_capabilities()
            if any(provider.casefold() == normalized for provider in capability.providers)
        ]

    def can_use(self, capability_id: str) -> bool:
        """Return whether SIDRA may select this capability.

        Permission-gated capabilities can still be selectable. The caller must
        apply permission policy before execution when ``requires_permission`` is
        true.
        """

        capability = self.get_capability(capability_id)
        return capability is not None and capability.status in {
            "available",
            "experimental",
        }

    def describe_capability(self, capability_id: str) -> str:
        """Return a human-readable description of a capability."""

        capability = self.get_capability(capability_id)
        if capability is None:
            return f"Capability '{capability_id}' is not registered."

        providers = ", ".join(capability.providers) or "No provider configured"
        tags = ", ".join(capability.tags) or "No tags"
        permission = (
            "requires permission"
            if capability.requires_permission
            else "no permission required"
        )

        return (
            f"{capability.name} ({capability.id})\n"
            f"Domain: {capability.domain}\n"
            f"Status: {capability.status}\n"
            f"Risk: {capability.risk_level} | {permission} | "
            f"{self._describe_locality(capability)}\n"
            f"Providers: {providers}\n"
            f"Tags: {tags}\n"
            f"Description: {capability.description}"
        )

    def choose_provider(self, capability_id: str) -> str | None:
        """Return the first configured provider for a usable capability."""

        capability = self.get_capability(capability_id)
        if capability is None or not self.can_use(capability_id):
            return None
        return capability.providers[0] if capability.providers else None

    def _build_logger(self) -> logging.Logger:
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        logger = logging.getLogger("sidra.capability_registry")
        logger.setLevel(logging.INFO)

        if not logger.handlers:
            handler = logging.FileHandler(self.log_path, encoding="utf-8")
            handler.setFormatter(
                logging.Formatter(
                    "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
                )
            )
            logger.addHandler(handler)

        return logger

    def _coerce_capability(self, data: Capability | dict[str, Any]) -> Capability:
        capability = data if isinstance(data, Capability) else Capability(**data)
        self._validate_capability(capability)
        return capability

    def _validate_capability(self, capability: Capability) -> None:
        if not capability.id.strip():
            raise ValueError("Capability id is required")
        if capability.domain not in VALID_DOMAINS:
            raise ValueError(f"Invalid domain for {capability.id}")
        if capability.status not in VALID_STATUSES:
            raise ValueError(f"Invalid status for {capability.id}")
        if capability.risk_level not in VALID_RISK_LEVELS:
            raise ValueError(f"Invalid risk_level for {capability.id}")
        if not isinstance(capability.providers, list):
            raise ValueError(f"providers must be a list for {capability.id}")
        if not isinstance(capability.tags, list):
            raise ValueError(f"tags must be a list for {capability.id}")

    @staticmethod
    def _describe_locality(capability: Capability) -> str:
        if capability.local and capability.cloud:
            return "local and cloud"
        if capability.local:
            return "local"
        if capability.cloud:
            return "cloud"
        return "no runtime location declared"

