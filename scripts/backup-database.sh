#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
backup_dir="${BACKUP_DIR:-backups}"
mkdir -p "$backup_dir"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
destination="$backup_dir/festival-talent-$timestamp.dump"

if [[ -e "$destination" ]]; then
  echo "Refusing to overwrite existing backup." >&2
  exit 1
fi

pg_dump --dbname="$DATABASE_URL" --format=custom --file="$destination"
echo "Backup created: $destination"
