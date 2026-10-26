# infra

Terraform for the f3muletown.com edge. A CloudFront Function in AWS account
141147250900 answers every request to f3muletown.com, www.f3muletown.com and
stats.f3muletown.com with a 307. DNS stays in the Route53 zone in the personal
account (569032832755). Applied locally; CI only runs fmt and validate.

## Prerequisites

- Terraform >= 1.10
- AWS CLI profiles `f3muletown` and `personal` in `~/.aws/config`
- `aws sso login --profile personal` (the shared SSO session covers both)

## State bucket (one time)

```sh
B=f3muletown-tfstate-141147250900
P="--profile f3muletown --region us-east-1"
aws s3api head-bucket --bucket $B $P 2>/dev/null || aws s3api create-bucket --bucket $B $P
aws s3api put-bucket-versioning --bucket $B --versioning-configuration Status=Enabled $P
aws s3api put-bucket-encryption --bucket $B $P --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"},"BucketKeyEnabled":true}]}'
aws s3api put-public-access-block --bucket $B $P --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws s3api put-bucket-ownership-controls --bucket $B $P \
  --ownership-controls 'Rules=[{ObjectOwnership=BucketOwnerEnforced}]'
```

## Plan and apply

```sh
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

## Check

```sh
check() { printf '%-45s ' "$1"; curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "$1"; }
check https://f3muletown.com/
check https://www.f3muletown.com/stats
check https://stats.f3muletown.com/
```

## Keeping targets in sync

`redirect.js` duplicates the URLs in `packages/redirects/src/index.ts`.
`packages/redirects/src/cloudfront-function.test.ts` fails if they drift.
