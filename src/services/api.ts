// Mock API service - replace with real backend later
import { mockDemandData, mockSurplusData, mockNGOs, mockDonations, mockKPIs } from '@/mockData/data';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export interface PredictionItem {
  item: string;
  predicted: number;
  recommended: number;
  confidence: number;
}

export interface DemandPoint {
  date: string;
  actual: number;
  predicted: number;
}

export interface SurplusItem {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  expiresIn: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface NGO {
  id: string;
  name: string;
  distance: number;
  capacity: number;
  acceptedTypes: string[];
  rating: number;
}

export interface Donation {
  id: string;
  vendorName: string;
  foodType: string;
  quantity: number;
  unit: string;
  distance: number;
  urgency: 'high' | 'medium' | 'low';
  status: 'pending' | 'accepted' | 'completed';
  createdAt: string;
}

export interface KPIs {
  predictedDemand: number;
  surplusDetected: number;
  foodSaved: number;
  peopleFed: number;
  impactScore: number;
}

export async function getPrediction(): Promise<{ items: PredictionItem[]; chart: DemandPoint[]; insight: string }> {
  await delay(600);
  return {
    items: [
      { item: 'Rice Bowls', predicted: 120, recommended: 115, confidence: 92 },
      { item: 'Sandwiches', predicted: 85, recommended: 80, confidence: 88 },
      { item: 'Salads', predicted: 60, recommended: 55, confidence: 85 },
      { item: 'Pasta', predicted: 95, recommended: 90, confidence: 90 },
    ],
    chart: mockDemandData,
    insight: 'Higher demand expected due to weekend trend and favorable weather conditions.',
  };
}

export async function getSurplus(): Promise<{ items: SurplusItem[]; totalMeals: number }> {
  await delay(400);
  return {
    items: mockSurplusData,
    totalMeals: mockSurplusData.reduce((sum, s) => sum + s.quantity, 0),
  };
}

export async function getNearbyNGOs(): Promise<NGO[]> {
  await delay(500);
  return mockNGOs;
}

export async function sendDonationRequest(surplusId: string, ngoId: string): Promise<{ success: boolean; message: string }> {
  await delay(800);
  return { success: true, message: 'Donation request sent successfully!' };
}

export async function getKPIs(): Promise<KPIs> {
  await delay(300);
  return mockKPIs;
}

export async function getDonationsForNGO(): Promise<Donation[]> {
  await delay(500);
  return mockDonations;
}

export async function acceptDonation(donationId: string): Promise<{ success: boolean }> {
  await delay(600);
  return { success: true };
}

export async function getExplainability(): Promise<string[]> {
  await delay(200);
  return [
    'Based on 30-day historical sales trend',
    'Weekend pattern detected (+15% typical increase)',
    'Weather forecast: Clear skies (positive correlation)',
    'No nearby events that might affect demand',
  ];
}
