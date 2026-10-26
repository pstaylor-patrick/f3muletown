variable "aws_profile" {
  description = "AWS CLI profile for the f3muletown account."
  type        = string
  default     = "f3muletown"
}

variable "dns_profile" {
  description = "AWS CLI profile for the account holding the f3muletown.com hosted zone."
  type        = string
  default     = "personal"
}

variable "zone_name" {
  description = "Route53 hosted zone name."
  type        = string
  default     = "f3muletown.com"
}
