# Releasing Guide

This document outlines the manual release process for this project.

---

## Branches Overview

| Branch       | Purpose                          |
|--------------|---------------------------------|
| `main`       | Development (active coding)      |
| `release/*`  | Release preparation & testing    |
| `production` | Production-ready stable code     |

---

## Manual Release Process

### 1. Create a Release Branch

Start a new release branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b release/vX.Y.Z
```

### 2. Prepare the Release on the Release Branch

- Update CHANGELOG.md with the new version changes.

- Bump version numbers in your project files (package.json, go.mod, etc.).

- Test the changes thoroughly.

- Commit all changes:

```bash
git add .
git commit -m "Release vX.Y.Z"
```

### 3. Merge the Release Branch into Production

When the release is ready and tested, merge it into the production branch:

```bash
git checkout production
git pull origin production
git merge release/vX.Y.Z
```

### 4. Tag the Release

Create a Git tag for the release and push both the tag and the production branch:

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin production
git push origin vX.Y.Z
```

### 5. (Optional) Sync Production Changes Back to Main

To keep your development branch up to date with production:

```bash
git checkout main
git pull origin main
git merge production
git push origin main
```
