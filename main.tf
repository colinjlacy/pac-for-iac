resource "github_repository" "garlic" {
  name        = "garlic"
  description = "Next-level awesome for your codebase"
  auto_init = true
  visibility = "public"
  archive_on_destroy = true
}

resource "github_branch" "garlic_kitchen" {
  branch     = "kitchen"
  repository = github_repository.garlic.name
}

resource "github_branch" "garlic_kitchen" {
  branch     = "kitchen"
  repository = github_repository.garlic.name
}

resource "github_branch_default" "garlic_kitchen" {
  branch     = github_branch.garlic_kitchen.branch
  repository = github_repository.garlic.name
}

resource "github_branch_protection" "garlic_kitchen" {
  pattern           = github_branch_default.garlic_kitchen.branch
  repository_id       = github_repository.garlic.id
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

resource "github_team" "cooks" {
  name        = "cooks"
  description = "The kitchen team"
  privacy     = "closed"
}

resource "github_team_repository" "garlic_cooks" {
  team_id    = github_team.cooks.id
  repository = github_repository.garlic.name
  permission = "admin"
}

resource "github_team_members" "cooks_membership" {
  team_id  = github_team.cooks.id
  members {
    username = "colinjlacy"
    role     = "maintainer"
  }
}

