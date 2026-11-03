# Git

## Identity

- Every commit here is authored by `mdolzhko`, set in the local git config.
  The global config belongs to another account: never use it, never change
  it, and never write its name or email in a file, a commit message or a
  branch name — the repository is public (see CLAUDE.md).
- Before committing, check `git var GIT_AUTHOR_IDENT`: it is what git will
  actually stamp, whatever the config files say.
- Pushes go through `gh`. Before pushing, check `gh auth status`: the active
  account must be `mdolzhko`. If it is not, stop and tell the owner; never
  switch it, since other repositories on this machine push through it too.

## Branches

- The owner creates branches; their names start with `mdolzhko/`. Never
  commit on a branch whose name carries another account — stop and ask the
  owner to rename it.
- `main` changes only through a pull request; nothing is pushed to it
  directly.
- Each Orca workspace is a git worktree, and `main` is checked out in
  another one, so `git switch main` fails here. A new branch starts from
  `origin/main` after a `git fetch`.

## Commits

- Nothing is committed or pushed until the owner says so.
- One theme per commit, subject in the imperative, body says why.
- `pnpm check` is green before every commit.
- No `--amend`, no force-push, no rebase of anything pushed: a mistake is
  fixed by a new commit.
- No bare `git stash`: worktrees share one stash, and another session may
  pop yours. Set work aside in a temporary commit instead.

## Pull requests

- When the owner says to push: push the branch and open a PR into `main`,
  title = the theme, body = what changed and why. The owner reviews and
  merges it.
- Once the owner has merged it, the branch is deleted on GitHub
  (`git push origin --delete <branch>`, unless GitHub removed it already).
  Local branches are the owner’s to delete; leave them alone.
