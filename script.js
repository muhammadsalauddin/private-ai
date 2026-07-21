const planData = {
  small: {
    setup: "USD 22,000",
    hosting: "USD 2,200",
    support: "USD 2,500",
    total: "USD 5,000",
    note: "Best for small teams that need private chat, RAG, document search, and a simple admin dashboard.",
  },
  medium: {
    setup: "USD 70,000",
    hosting: "USD 14,000",
    support: "USD 9,000",
    total: "USD 25,000",
    note: "Best for departments, policy search, business documents, support, SSO, and audit logs.",
  },
  large: {
    setup: "USD 180,000",
    hosting: "USD 45,000",
    support: "USD 22,000",
    total: "USD 75,000",
    note: "Best for enterprise private AI with high availability, RAG workers, compliance, and department controls.",
  },
  ultra: {
    setup: "USD 750,000",
    hosting: "USD 300,000",
    support: "USD 60,000",
    total: "USD 450,000",
    note: "Best for government, national AI programs, or very large enterprises that need 405B to 1.5T+ private model capacity.",
  },
};

const planSelect = document.querySelector("#planSelect");
const setupCost = document.querySelector("#setupCost");
const hostingCost = document.querySelector("#hostingCost");
const supportCost = document.querySelector("#supportCost");
const totalCost = document.querySelector("#totalCost");
const estimateNote = document.querySelector("#estimateNote");

function updateEstimate() {
  const selectedPlan = planData[planSelect.value];
  setupCost.textContent = selectedPlan.setup;
  hostingCost.textContent = selectedPlan.hosting;
  supportCost.textContent = selectedPlan.support;
  totalCost.textContent = selectedPlan.total;
  estimateNote.textContent = selectedPlan.note;
}

planSelect.addEventListener("change", updateEstimate);
updateEstimate();
