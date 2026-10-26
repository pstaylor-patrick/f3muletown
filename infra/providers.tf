# Default: the f3muletown account (141147250900). CloudFront, ACM, the function.
provider "aws" {
  region              = "us-east-1"
  profile             = var.aws_profile
  allowed_account_ids = ["141147250900"]

  default_tags {
    tags = {
      Project   = "f3muletown"
      ManagedBy = "terraform"
      Repo      = "pstaylor-patrick/f3muletown"
    }
  }
}

# Personal account (569032832755). Owns the f3muletown.com Route53 zone.
provider "aws" {
  alias               = "personal"
  region              = "us-east-1"
  profile             = var.dns_profile
  allowed_account_ids = ["569032832755"]
}
