export const COLLABORATOR_SUFFIX = "-HS AI Solution@2026";

export interface CollaboratorValidationResult {
  valid: boolean;
  collaboratorName?: string;
  error?: string;
}

/**
 * Validates whether the given string is a legitimate collaborator identifier.
 * Every valid collaborator ID ends with "-HS AI Solution@2026" with the collaborator's
 * name preceding it.
 */
export function validateCollaboratorId(rawId: string | null | undefined): CollaboratorValidationResult {
  if (!rawId || typeof rawId !== "string") {
    return { valid: false, error: "Collaborator ID is required." };
  }

  const trimmed = rawId.trim();
  if (!trimmed.endsWith(COLLABORATOR_SUFFIX)) {
    return {
      valid: false,
      error: "Invalid Collaborator ID. Access is strictly restricted to verified HS AI Solutions collaborators.",
    };
  }

  const namePart = trimmed.slice(0, -COLLABORATOR_SUFFIX.length).trim();
  if (!namePart) {
    return {
      valid: false,
      error: "Invalid Collaborator ID. Collaborator identifier name is missing.",
    };
  }

  return {
    valid: true,
    collaboratorName: namePart,
  };
}
