#!/usr/bin/env bash
set -euo pipefail


AWS_ACCOUNT="736615000376"
AWS_REGION="ap-southeast-2"
ECR_REPO="digital-citizen"
EC2_IP="13.237.240.102"
SSH_KEY="$HOME/Downloads/dc-key.pem"


ECR="${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
VERSION="${1:-v$(date +%Y%m%d-%H%M%S)}"
IMAGE="${ECR}/${ECR_REPO}:${VERSION}"

echo "[local] build jar + image"
mvn -q -DskipTests package
docker build -t "${IMAGE}" .

echo "[local] ECR login + push"
aws ecr get-login-password --region "${AWS_REGION}" \
| docker login --username AWS --password-stdin "${ECR}"
docker push "${IMAGE}"

echo "[local] remote update on EC2"
ssh -o StrictHostKeyChecking=no -i "${SSH_KEY}" ec2-user@"${EC2_IP}" \
  "/opt/dc/update_dc.sh ${VERSION} && sudo systemctl reload nginx || true"

echo "[done] deployed tag ${VERSION}"
