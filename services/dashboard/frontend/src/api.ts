// API functions for dashboard data (replace with real backend calls)

export async function fetchProfile() {
  // Simulate API call
  return Promise.resolve({ name: 'Admin User', email: 'admin@example.com' });
}

export async function fetchNumberOfWiki() {
  return Promise.resolve(5);
}

export async function fetchCurrentPlan() {
  return Promise.resolve('Pro');
}

export async function fetchExpirationDate() {
  return Promise.resolve('2024-12-31');
}

export async function fetchPayInfo() {
  return Promise.resolve({ amount: '$20', status: 'Paid' });
} 