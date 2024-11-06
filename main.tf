module "garlic" {
  source      = "./modules/github"
  name        = "garlic"
  description = "Next-level awesome for your codebase"
  team_name   = "cooks"
  branch_name = "kitchen"
  members = ["colinjlacy"]
}

module "onion" {
  source      = "./modules/github"
  name        = "onion-cli"
  description = "Gives garlic that extra boost!"
  team_name   = "chefs"
  branch_name = "kitchen"
  members = []
}