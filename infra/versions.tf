terraform {
  required_version = ">= 1.10.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }

  backend "s3" {
    bucket       = "f3muletown-tfstate-141147250900"
    key          = "edge/terraform.tfstate"
    region       = "us-east-1"
    profile      = "f3muletown"
    encrypt      = true
    use_lockfile = true
  }
}
