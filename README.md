# Private AI Deployment Plan

This repository contains a practical plan for deploying private AI for small to
large user groups. It includes deployment architecture, hosting
platform choices, model-size recommendations, setup cost, monthly hosting cost,
maintenance cost, and scaling guidance from small to large user counts.

Last updated: 2026-07-22

## What Is Included

- A full private AI deployment plan for small, growing, large, and very large user groups.
- Cost estimates for 1B, 3B, 7B, 14B, 32B, 70B, 120B, 405B, 1T, and 1.5T+ model classes.
- Hosting platform recommendations for cloud, GPU cloud, on-prem, and hybrid deployments.
- Security, compliance, maintenance, and support requirements.
- CSV cost models that can be edited for quotations and proposals.

## Recommended Reading Order

1. [Private AI Deployment Plan](docs/private-ai-deployment-plan.md)
2. [Monthly Cost Estimates](docs/monthly-cost-estimates.md)
3. [Security and Compliance](docs/security-compliance.md)
4. [Cost Model CSV](costs/private_ai_cost_model.csv)
5. [GPU Hosting Rates CSV](costs/gpu_hosting_rates.csv)

## Short Recommendation

For most small-to-large user amount deployments, do not run every request on a very
large model. Use a private AI router:

- Small tasks: 1B to 7B local model.
- Normal business tasks: 7B to 32B model.
- Complex reasoning, coding, legal, finance, and medical review: 70B to 120B model.
- Very high-value enterprise tasks: 405B or external API fallback.
- 1T to 1.5T+ model class: only for very large enterprise, government, or national-scale workloads.

This keeps the system fast, private, and financially realistic.

## Source Notes

Pricing changes frequently. The estimates use public GPU pricing references from:

- [Lambda GPU Cloud](https://lambda.ai/pricing)
- [RunPod GPU Pricing](https://www.runpod.io/pricing)
- [AWS EC2 On-Demand Pricing](https://aws.amazon.com/ec2/pricing/on-demand/)
- [Azure Retail Prices API](https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices)
- [Google Cloud GPU Pricing](https://cloud.google.com/compute/gpus-pricing)

Always re-check provider pricing before making a final customer quotation.
