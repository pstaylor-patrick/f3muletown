output "distribution_id" {
  value = aws_cloudfront_distribution.this.id
}

output "distribution_domain_name" {
  value = aws_cloudfront_distribution.this.domain_name
}

output "certificate_arn" {
  value = aws_acm_certificate.this.arn
}

output "hosted_zone_id" {
  value = data.aws_route53_zone.this.zone_id
}
