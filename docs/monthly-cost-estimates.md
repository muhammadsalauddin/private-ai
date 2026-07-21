# Monthly Cost Estimates

Last updated: 2026-07-22

These are planning estimates for private AI deployments. They are not final
quotes. GPU, storage, network, and support costs change frequently by provider,
region, contract, and availability.

## Pricing Sources Used

- [Lambda GPU Cloud Pricing](https://lambda.ai/pricing)
- [RunPod GPU Pricing](https://www.runpod.io/pricing)
- [AWS EC2 Capacity Blocks Pricing](https://aws.amazon.com/ec2/capacityblocks/pricing/)
- [Google Cloud Committed Use Discounts](https://docs.cloud.google.com/docs/cuds)

## Core Assumptions

- 730 hours per month.
- Costs are for inference and production hosting, not training a foundation model.
- Estimates include application servers, databases, storage, monitoring, backups, and vector DB where relevant.
- Maintenance includes bug fixes, model updates, monitoring, uptime support, RAG updates, and security patches.
- Large model serving needs extra memory for KV cache, batching, redundancy, and failover.
- 1T to 1.5T+ models are possible, but usually not financially efficient for 50 to 1000 users unless the workload is very high-value.

## GPU Cost Examples

| GPU setup | Reference provider | Hourly estimate | Monthly estimate |
|---|---|---:|---:|
| 1x H100 | Lambda | USD 3.99/hr | USD 2,912.70 |
| 2x H100 | Lambda | USD 7.98/hr | USD 5,825.40 |
| 4x H100 | Lambda | USD 15.96/hr | USD 11,650.80 |
| 8x H100 | Lambda | USD 31.92/hr | USD 23,301.60 |
| 16x H100 | Lambda | USD 63.84/hr | USD 46,603.20 |
| 32x B200 | Lambda | USD 214.08/hr | USD 156,278.40 |
| 64x B200 | Lambda | USD 428.16/hr | USD 312,556.80 |
| 8x H100 p5.48xlarge | AWS Capacity Blocks | USD 41.528/hr | USD 30,315.44 |
| 8x B200 p6-b200.48xlarge | AWS Capacity Blocks | USD 98.84/hr | USD 72,153.20 |

RunPod can be lower or higher depending on serverless, secure cloud, community
cloud, and availability. Google Cloud and other hyperscalers can become cheaper
with committed use discounts, but commitment terms reduce flexibility.

## Model Size Cost Bands

| Model class | Practical serving target | Typical monthly infra | Notes |
|---|---|---:|---|
| 1B-3B | CPU, L4, A10, small GPU | USD 300-2,000 | Good for routing, basic chat, autocomplete, simple support. |
| 7B-14B | A10, A100, H100, or B200 | USD 1,500-5,000 | Good default for private company chat. |
| 32B | 1x H100/H200/B200 | USD 3,000-8,000 | Better writing, coding, multilingual, long answers. |
| 70B | 2x H100 or 1-2x H200/B200 | USD 6,000-18,000 | Stronger quality and reasoning. |
| 120B-180B | 4x H100 or 2-4x B200/H200 | USD 12,000-40,000 | Specialist enterprise tier. |
| 405B | 8-16x H100/B200 | USD 30,000-120,000 | High-quality enterprise model class. |
| 1T-1.5T+ | 32-64+ high-memory GPUs | USD 200,000-750,000+ | Only for major enterprise or national-scale AI. |

## Company Size Packages

### 50 Users

| Item | Low | Recommended | High |
|---|---:|---:|---:|
| One-time setup | USD 10,000 | USD 22,000 | USD 35,000 |
| Hosting/month | USD 900 | USD 2,200 | USD 3,500 |
| Maintenance/month | USD 1,200 | USD 2,500 | USD 4,000 |
| Total/month | USD 2,500 | USD 5,000 | USD 8,500 |
| Monthly cost/user | USD 50 | USD 100 | USD 170 |

Recommended model stack:

- 1B-3B for routing and simple chat.
- 7B-14B for normal chat and writing.
- Optional 32B/API fallback for high quality.

Recommended hosting:

- RunPod Secure Cloud, Lambda, one AWS/GCP/Azure GPU node, or on-prem GPU server.

### 500 Users

| Item | Low | Recommended | High |
|---|---:|---:|---:|
| One-time setup | USD 35,000 | USD 70,000 | USD 120,000 |
| Hosting/month | USD 6,000 | USD 14,000 | USD 22,000 |
| Maintenance/month | USD 5,000 | USD 9,000 | USD 15,000 |
| Total/month | USD 13,000 | USD 25,000 | USD 45,000 |
| Monthly cost/user | USD 26 | USD 50 | USD 90 |

Recommended model stack:

- 7B-14B default.
- 32B for business documents and support.
- 70B or API fallback for complex tasks.

Recommended hosting:

- AWS, Google Cloud, Azure, Lambda reserved capacity, CoreWeave, or hybrid cloud.

### 1000 Users

| Item | Low | Recommended | High |
|---|---:|---:|---:|
| One-time setup | USD 90,000 | USD 180,000 | USD 300,000 |
| Hosting/month | USD 18,000 | USD 45,000 | USD 85,000 |
| Maintenance/month | USD 12,000 | USD 22,000 | USD 35,000 |
| Total/month | USD 35,000 | USD 75,000 | USD 140,000 |
| Monthly cost/user | USD 35 | USD 75 | USD 140 |

Recommended model stack:

- 14B-32B default.
- 70B high-quality model.
- 120B-405B or API fallback for specialist tasks.

Recommended hosting:

- AWS/GCP/Azure private VPC, CoreWeave, Lambda clusters, Oracle Cloud, or on-prem cluster.

## 1T To 1.5T+ Enterprise Model Budget

| Item | Low | Recommended | High |
|---|---:|---:|---:|
| GPU hosting/month | USD 150,000 | USD 300,000 | USD 575,000+ |
| Platform/month | USD 20,000 | USD 45,000 | USD 80,000 |
| Maintenance/month | USD 25,000 | USD 60,000 | USD 120,000 |
| Total/month | USD 200,000 | USD 450,000 | USD 750,000+ |
| One-time setup | USD 300,000 | USD 750,000 | USD 1,500,000+ |

This level should be sold as an enterprise/national platform, not as a normal
SaaS plan for 50 to 1000 users.

## Hosting Platform Decision Matrix

| Platform | Cost | Control | Compliance | Speed to launch | Best use |
|---|---:|---:|---:|---:|---|
| RunPod | Low-medium | Medium | Medium | Fast | Pilot, MVP, startup, flexible GPU jobs |
| Lambda Cloud | Medium | Medium-high | Medium-high | Fast | Dedicated GPU private AI and clusters |
| AWS | Medium-high | High | High | Medium | Enterprise, finance, healthcare, government |
| Google Cloud | Medium-high | High | High | Medium | Kubernetes, data/analytics, committed discounts |
| Azure | Medium-high | High | High | Medium | Microsoft enterprise and Entra ID |
| Oracle Cloud | Medium | High | High | Medium | GPU clusters and enterprise private networks |
| CoreWeave | Medium-high | High | Medium-high | Medium | Large GPU workloads |
| On-prem | High upfront | Very high | Very high | Slow | Strict data residency and predictable workloads |
| Hybrid | Medium-high | Very high | Very high | Medium | Best balance for serious private AI |

## What To Quote Customers

### Simple Starting Quotes

| Customer type | One-time setup | Monthly managed service |
|---|---:|---:|
| Small company, 50 users | USD 15,000-35,000 | USD 3,000-8,500 |
| Medium company, 500 users | USD 50,000-120,000 | USD 15,000-45,000 |
| Large company, 1000 users | USD 120,000-300,000 | USD 40,000-140,000 |
| Enterprise 1T+ platform | USD 300,000-1,500,000+ | USD 200,000-750,000+ |

### What The Monthly Fee Includes

- GPU and application hosting.
- Model serving and routing.
- RAG and document indexing.
- Search integration.
- Security patches.
- Backups.
- Logs and monitoring.
- Usage dashboard.
- Monthly model and prompt optimization.
- Support hours.

### What The Monthly Fee Does Not Include By Default

- Training a new foundation model from scratch.
- Buying physical GPUs.
- Legal certification fees.
- Customer data labeling at large scale.
- 24/7 phone support unless included in enterprise support.
- Government certification or third-party audit fees.

## Commercial Recommendation

Start with 7B-32B private models, strong RAG, and a 70B/API fallback. Add 120B,
405B, or 1T+ only when the customer has enough traffic and budget to justify it.
