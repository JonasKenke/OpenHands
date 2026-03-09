/**
 * Get the git repository path for a conversation
 * If a repository is selected, returns /workspace/project/{repo-name}
 * Otherwise, returns /workspace/project
 *
 * @param selectedRepository The selected repository in "owner/repo" format (GitHub/GitLab/Bitbucket)
 *   or "org/project/repo" format (Azure DevOps)
 * @returns The git path to use
 */
export function getGitPath(
  selectedRepository: string | null | undefined,
): string {
  if (!selectedRepository) {
    return "/workspace/project";
  }

  // Extract the repository name from the last path segment.
  // GitHub/GitLab/Bitbucket use "owner/repo" (2 parts) → last part is the repo name.
  // Azure DevOps uses "org/project/repo" (3 parts) → last part is the repo name.
  const parts = selectedRepository.split("/");
  const repoName = parts[parts.length - 1];

  return `/workspace/project/${repoName}`;
}
