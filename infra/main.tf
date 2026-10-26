locals {
  apex      = var.zone_name
  hostnames = [local.apex, "www.${local.apex}", "stats.${local.apex}"]

  # CloudFront's fixed hosted zone id for alias records.
  cloudfront_zone_id = "Z2FDTNDATAQYW2"

  # AWS managed cache policy "CachingDisabled".
  caching_disabled_policy_id = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"

  origin_id = "placeholder-regions-f3nation"
}

data "aws_route53_zone" "this" {
  provider     = aws.personal
  name         = var.zone_name
  private_zone = false
}

resource "aws_acm_certificate" "this" {
  domain_name               = local.apex
  subject_alternative_names = ["www.${local.apex}", "stats.${local.apex}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  provider = aws.personal
  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id         = data.aws_route53_zone.this.zone_id
  name            = each.value.name
  type            = each.value.type
  ttl             = 300
  records         = [each.value.record]
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

resource "aws_cloudfront_function" "redirect" {
  name    = "f3muletown-redirect"
  runtime = "cloudfront-js-2.0"
  comment = "307 redirects for f3muletown.com, www and stats"
  publish = true
  code    = file("${path.module}/redirect.js")
}

resource "aws_cloudfront_distribution" "this" {
  enabled         = true
  is_ipv6_enabled = true
  http_version    = "http2and3"
  price_class     = "PriceClass_100"
  comment         = "f3muletown.com redirect"
  aliases         = local.hostnames

  # Never contacted: the viewer-request function answers every request.
  origin {
    domain_name = "regions.f3nation.com"
    origin_id   = local.origin_id

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    target_origin_id       = local.origin_id
    viewer_protocol_policy = "allow-all"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = local.caching_disabled_policy_id
    compress               = false

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.redirect.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.this.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_route53_record" "alias" {
  provider = aws.personal
  for_each = {
    for pair in setproduct(local.hostnames, ["A", "AAAA"]) :
    "${pair[0]}_${pair[1]}" => { name = pair[0], type = pair[1] }
  }

  zone_id         = data.aws_route53_zone.this.zone_id
  name            = each.value.name
  type            = each.value.type
  allow_overwrite = true

  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = local.cloudfront_zone_id
    evaluate_target_health = false
  }
}
