provider "github" {
  owner = "open-garlic"
}

resource "github_repository" "repo" {
  name        = var.name
  description = var.description
  auto_init = true
  visibility = "public"
  archive_on_destroy = true
}

resource "github_branch" "repo_branch" {
  branch     = var.branch_name
  repository = github_repository.repo.name
}

resource "github_branch_default" "repo_default_branch" {
  branch     = github_branch.repo_branch.branch
  repository = github_repository.repo.name
}

resource "github_branch_protection" "garlic_kitchen" {
  pattern           = github_branch_default.repo_default_branch.branch
  repository_id       = github_repository.repo.id
  required_status_checks {
    strict   = true
    contexts = ["continuous-integration"]
  }
  required_pull_request_reviews {
    dismiss_stale_reviews = true
    require_code_owner_reviews = true
  }
  enforce_admins = true
}

resource "github_team" "team" {
  name        = var.team_name
  description = "The kitchen team"
  privacy     = "closed"
}

resource "github_team_repository" "team_repo" {
  team_id    = github_team.team.id
  repository = github_repository.repo.name
  permission = "admin"
}

resource "github_team_members" "team_membership" {
  team_id  = github_team.team.id
  for_each = var.members
  members {
    username = each.value
    role     = "maintainer"
  }
}

