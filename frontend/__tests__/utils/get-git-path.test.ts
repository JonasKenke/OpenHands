import { describe, it, expect } from "vitest";
import { getGitPath } from "#/utils/get-git-path";

describe("getGitPath", () => {
  it("returns /workspace/project when repository is null", () => {
    expect(getGitPath(null)).toBe("/workspace/project");
  });

  it("returns /workspace/project when repository is undefined", () => {
    expect(getGitPath(undefined)).toBe("/workspace/project");
  });

  it("returns /workspace/project when repository is empty string", () => {
    expect(getGitPath("")).toBe("/workspace/project");
  });

  it("returns the repo name for a GitHub-style owner/repo", () => {
    expect(getGitPath("OpenHands/OpenHands")).toBe(
      "/workspace/project/OpenHands",
    );
  });

  it("returns the repo name for a GitLab-style owner/repo", () => {
    expect(getGitPath("mygroup/my-repo")).toBe("/workspace/project/my-repo");
  });

  it("returns the actual repo name for an Azure DevOps org/project/repo URL (not the project name)", () => {
    expect(getGitPath("myorg/MyProject/my-actual-repo")).toBe(
      "/workspace/project/my-actual-repo",
    );
  });

  it("handles a bare repo name with no slashes", () => {
    expect(getGitPath("solo-repo")).toBe("/workspace/project/solo-repo");
  });
});
