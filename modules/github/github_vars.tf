variable "name" {
  type = string
}

variable "description" {
  type = string
}

variable "team_name" {
  type    = string
  default = "cooks"
}

variable "branch_name" {
  type    = string
  default = "kitchen"
}

variable "members" {
    type    = set(string)
    default = ["colinjlacy"]
}