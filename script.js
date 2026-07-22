const HOURS_PER_MONTH = 730;

const providerRates = {
  lambda: {
    label: "Lambda GPU Cloud",
    node: "8x H100 SXM equivalent",
    hourly: 31.92,
    detail:
      "Public H100 SXM reference: USD 3.99 per GPU hour. Re-check Lambda before a final quote.",
  },
  runpod: {
    label: "RunPod Secure Cloud",
    node: "8x H100 SXM equivalent",
    hourly: 23.92,
    detail:
      "Public H100 SXM reference: USD 2.99 per GPU hour. Secure, community, and serverless prices vary.",
  },
  aws: {
    label: "AWS EC2 P5",
    node: "p5.48xlarge, 8x H100",
    hourly: 55.04,
    detail:
      "AWS public offer reference for us-east-1 Linux on-demand p5.48xlarge. Region, savings plans, and reservations change cost.",
  },
  azure: {
    label: "Azure ND H100 v5",
    node: "ND96isr_H100_v5, 8x H100",
    hourly: 98.32,
    detail:
      "Azure Retail Prices API reference for East US ND96isr H100 v5 consumption. Region changes price.",
  },
};

const modelProfiles = {
  "1b": {
    label: "1B-3B",
    minNodes: 0.1,
    nodeStep: 0.1,
    usersPerNode: 250,
    setupBase: 12000,
    setupPerUser: 80,
    platformBase: 600,
    platformPerUser: 1.5,
    note: "Fast routing, FAQ, small private chat, and lightweight automation.",
  },
  "7b": {
    label: "7B-14B",
    minNodes: 0.25,
    nodeStep: 0.25,
    usersPerNode: 220,
    setupBase: 24000,
    setupPerUser: 110,
    platformBase: 900,
    platformPerUser: 2.2,
    note: "Default private chat, multilingual writing, documents, and business support.",
  },
  "70b": {
    label: "32B-70B",
    minNodes: 1,
    nodeStep: 1,
    usersPerNode: 500,
    setupBase: 65000,
    setupPerUser: 160,
    platformBase: 1800,
    platformPerUser: 3.5,
    note: "RAG, business documents, coding, quality answers, and stronger reasoning.",
  },
  "405b": {
    label: "120B-405B",
    minNodes: 3,
    nodeStep: 1,
    usersPerNode: 650,
    setupBase: 180000,
    setupPerUser: 250,
    platformBase: 5000,
    platformPerUser: 5.5,
    note: "Expert AI, legal, medical, research, government, and review workflows.",
  },
  "1t": {
    label: "1T-1.5T+",
    minNodes: 8,
    nodeStep: 2,
    usersPerNode: 900,
    setupBase: 450000,
    setupPerUser: 400,
    platformBase: 12000,
    platformPerUser: 8,
    note: "National or very large enterprise AI with multiple specialist models and strict operations.",
  },
};

const supportLevels = {
  none: {
    label: "No support",
    base: 0,
    rate: 0,
    note:
      "No-support option removes managed maintenance. The customer operates monitoring, patches, incidents, backups, model updates, and security fixes.",
  },
  light: {
    label: "Light support",
    base: 1200,
    rate: 0.08,
    note: "Light support covers monthly updates, basic monitoring review, and limited helpdesk time.",
  },
  standard: {
    label: "Standard support",
    base: 3000,
    rate: 0.12,
    note: "Standard support covers monitoring, patches, RAG updates, incident response, and monthly optimization.",
  },
  enterprise: {
    label: "Enterprise support",
    base: 9000,
    rate: 0.16,
    note: "Enterprise support adds stronger SLA, security review, admin reporting, and architecture governance.",
  },
};

const profileDefaults = {
  starter: {
    users: 50,
    model: "7b",
    provider: "lambda",
    uptime: "0.5",
    support: "light",
  },
  growing: {
    users: 500,
    model: "70b",
    provider: "lambda",
    uptime: "1",
    support: "standard",
  },
  large: {
    users: 1000,
    model: "405b",
    provider: "aws",
    uptime: "1",
    support: "enterprise",
  },
  national: {
    users: 5000,
    model: "1t",
    provider: "azure",
    uptime: "1",
    support: "enterprise",
  },
};

const profileSelect = document.querySelector("#profileSelect");
const userCount = document.querySelector("#userCount");
const modelSelect = document.querySelector("#modelSelect");
const providerSelect = document.querySelector("#providerSelect");
const uptimeSelect = document.querySelector("#uptimeSelect");
const supportSelect = document.querySelector("#supportSelect");
const setupCost = document.querySelector("#setupCost");
const hostingCost = document.querySelector("#hostingCost");
const platformCost = document.querySelector("#platformCost");
const supportCost = document.querySelector("#supportCost");
const totalCost = document.querySelector("#totalCost");
const perUserCost = document.querySelector("#perUserCost");
const nodeCount = document.querySelector("#nodeCount");
const modelProfile = document.querySelector("#modelProfile");
const estimateNote = document.querySelector("#estimateNote");
const providerNote = document.querySelector("#providerNote");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  })
    .format(value)
    .replace("$", "USD ");
}

function calculateNodes(users, profile) {
  const rawNodes = Math.max(profile.minNodes, users / profile.usersPerNode);
  return Math.ceil(rawNodes / profile.nodeStep) * profile.nodeStep;
}

function applyProfileDefaults() {
  const defaults = profileDefaults[profileSelect.value];
  userCount.value = defaults.users;
  modelSelect.value = defaults.model;
  providerSelect.value = defaults.provider;
  uptimeSelect.value = defaults.uptime;
  supportSelect.value = defaults.support;
  updateEstimate();
}

function updateEstimate() {
  const users = Math.max(10, Number(userCount.value) || profileDefaults.growing.users);
  const profile = modelProfiles[modelSelect.value];
  const provider = providerRates[providerSelect.value];
  const support = supportLevels[supportSelect.value];
  const uptime = Number(uptimeSelect.value) || 1;
  const nodes = calculateNodes(users, profile);

  const gpuMonthly = provider.hourly * HOURS_PER_MONTH * uptime * nodes;
  const platformMonthly = profile.platformBase + users * profile.platformPerUser;
  const supportMonthly = support.base + (gpuMonthly + platformMonthly) * support.rate;
  const setup = profile.setupBase + users * profile.setupPerUser;
  const total = gpuMonthly + platformMonthly + supportMonthly;

  setupCost.textContent = formatCurrency(setup);
  hostingCost.textContent = formatCurrency(gpuMonthly);
  platformCost.textContent = formatCurrency(platformMonthly);
  supportCost.textContent = formatCurrency(supportMonthly);
  totalCost.textContent = formatCurrency(total);
  perUserCost.textContent = formatCurrency(total / users);
  nodeCount.textContent = `${nodes.toFixed(nodes < 1 ? 2 : 0)} x ${provider.node}`;
  modelProfile.textContent = profile.label;

  estimateNote.textContent = `${profile.note} Estimated for ${users.toLocaleString()} monthly active users with ${support.label.toLowerCase()}.`;
  providerNote.textContent = `${provider.label}: ${provider.detail} ${support.note}`;
}

profileSelect.addEventListener("change", applyProfileDefaults);
[userCount, modelSelect, providerSelect, uptimeSelect, supportSelect].forEach((element) => {
  element.addEventListener("input", updateEstimate);
  element.addEventListener("change", updateEstimate);
});

updateEstimate();
