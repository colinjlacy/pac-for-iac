module "garlic" {
  source      = "./modules/github"
  name        = "garlic"
  description = "Next-level awesome for your codebase"
  team_name   = "cooks"
  branch_name = "kitchen"
  members = ["colinjlacy"]
}
