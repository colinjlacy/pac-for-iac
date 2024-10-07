terraform {
  required_providers {
    github = {
      source  = "opentofu/github"
      version = "~> 6.0"
    }
  }

  encryption {
    key_provider "pbkdf2" "mykey" {
      passphrase = var.passphrase
    }

    method "aes_gcm" "new_method" {
      keys = key_provider.pbkdf2.mykey
    }

    state {
      method = method.aes_gcm.new_method
    }

    plan {
      method = method.aes_gcm.new_method
    }
  }
}

provider "github" {
  owner = var.org
}