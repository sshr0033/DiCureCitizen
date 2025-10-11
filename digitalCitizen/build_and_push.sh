#!/bin/bash
set -e

# ---- CONFIG ----
export AWS_ACCOUNT=736615000376
export AWS_REGION=ap-southeast-2
export ECR=$AWS_ACCOUNT.dkr.ecr.$AWS_REGION.amazonaws.com
export REPO=digital-citizen
export TAG=v$(date +%Y%m%d-%H%M%S)-amd64

echo "  Building & pushing $ECR/$REPO:$TAG ..."

# ---- LOGIN ----
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR

# ---- CREATE BUILDER ----
docker buildx rm dcx || true
docker buildx create --use --name dcx

# ---- BUILD & PUSH ----
docker buildx build --platform linux/amd64 \
  -t "$ECR/$REPO:$TAG" \
  -t "$ECR/$REPO:latest-amd64" \
  --push .

echo " Image pushed successfully as $TAG"
echo "  Deploy using this command on EC2:"
echo "export TAG=$TAG"

