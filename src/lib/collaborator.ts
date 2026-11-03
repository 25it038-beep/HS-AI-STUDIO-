export const COLLABORATOR_SUFFIX = "-HS AI Solution@2026";

export interface CollaboratorValidationResult {
  valid: boolean;
  collaboratorName?: string;
  error?: string;
}

/**
 * Validates whether the given string is a legitimate collaborator identifier.
 * Every valid collaborator ID ends with "-HS AI Solution@2026" with the collaborator's
 * name preceding it. Includes strict input sanitization and length limits.
 */
export function validateCollaboratorId(rawId: string | null | undefined): CollaboratorValidationResult {
  if (!rawId || typeof rawId !== "string") {
    return { valid: false, error: "Collaborator ID is required." };
  }

  const trimmed = rawId.trim();

  // Length sanity limit to prevent memory/DoS attacks
  if (trimmed.length < COLLABORATOR_SUFFIX.length + 2 || trimmed.length > 80) {
    return {
      valid: false,
      error: "Invalid Collaborator ID length.",
    };
  }

  if (!trimmed.endsWith(COLLABORATOR_SUFFIX)) {
    return {
      valid: false,
      error: "Invalid Collaborator ID. Access is strictly restricted to verified HS AI Solutions collaborators.",
    };
  }

  const namePart = trimmed.slice(0, -COLLABORATOR_SUFFIX.length).trim();
  if (!namePart || namePart.length < 2) {
    return {
      valid: false,
      error: "Invalid Collaborator ID. Collaborator identifier name is missing or too short.",
    };
  }

  // Whitelist safe name characters: alphanumeric, spaces, hyphens, periods, underscores
  const safeNameRegex = /^[a-zA-Z0-9\s._-]+$/;
  if (!safeNameRegex.test(namePart)) {
    return {
      valid: false,
      error: "Invalid Collaborator ID format. Name contains illegal characters.",
    };
  }

  return {
    valid: true,
    collaboratorName: namePart,
  };
}
