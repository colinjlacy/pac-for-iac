package main

import future.keywords.in
import future.keywords.if
import future.keywords.every
import future.keywords.contains

has_key(x, k) { _ = x[k] }

# if there are any repos, there should be at least one branch
deny[msg] {
    count(input.resource.github_repository) > 0
    not has_key( input.resource, "github_branch")
    msg = "there should be at least one branch for every repo"
}

# if there are any repos, there should be at least one default branch
deny[msg] {
    count(input.resource.github_repository) > 0
    not has_key( input.resource, "github_branch_default")
    msg = "there should be at least one default branch for every repo"
}

# every repo should have at least one branch
deny[msg] {
    some name
    repo := input.resource.github_repository[name]
    branches := input.resource.github_branch[_].repository
    branch_set := concat(",", branches)
    not contains( branch_set, name)
    msg = sprintf("repo `%s` should have at least one branch", [name])
}

# there should be a default branch for every repo
deny[msg] {
    some name
    repo := input.resource.github_repository[name]
    default_branch_repos := input.resource.github_branch_default[_].repository
    branch_set := concat(",", default_branch_repos)
    not contains( branch_set, name)
    msg = sprintf("repo `%s` should have a default branch", [name])
}

# every repo should have archive_on_destroy set to true
deny[msg] {
    some name
    repo := input.resource.github_repository[name]
    not repo.archive_on_destroy
    msg = sprintf("repo `%s` should have archive_on_destroy set to true", [name])
}

# every repo should have a repo team
deny[msg] {
    some name
    repo := input.resource.github_repository[name]
    team_repo := input.resource.github_team_repository[_].repository
    not contains(team_repo, name)
    msg = sprintf("repo `%s` should have a repo team", [name])
}

