import type { SurplusItem, NGO, Donation, DemandPoint, KPIs } from '@/services/api';

export const mockDemandData: DemandPoint[] = [
  { date: 'Mon', actual: 110, predicted: 105 },
  { date: 'Tue', actual: 95, predicted: 100 },
  { date: 'Wed', actual: 120, predicted: 115 },
  { date: 'Thu', actual: 105, predicted: 110 },
  { date: 'Fri', actual: 140, predicted: 135 },
  { date: 'Sat', actual: 160, predicted: 155 },
  { date: 'Sun', actual: 0, predicted: 145 },
];

export const mockWeeklyDemandData: DemandPoint[] = [
  { date: 'W1', actual: 750, predicted: 730 },
  { date: 'W2', actual: 820, predicted: 800 },
  { date: 'W3', actual: 780, predicted: 790 },
  { date: 'W4', actual: 0, predicted: 850 },
];

export const mockSurplusData: SurplusItem[] = [
  { id: 's1', item: 'Rice Bowls', quantity: 25, unit: 'meals', expiresIn: '2 hours', urgency: 'high' },
  { id: 's2', item: 'Sandwiches', quantity: 15, unit: 'meals', expiresIn: '4 hours', urgency: 'medium' },
  { id: 's3', item: 'Fresh Salads', quantity: 10, unit: 'meals', expiresIn: '1 hour', urgency: 'high' },
];

export const mockNGOs: NGO[] = [
  { id: 'n1', name: 'City Food Bank', distance: 1.2, capacity: 200, acceptedTypes: ['meals', 'produce'], rating: 4.8 },
  { id: 'n2', name: 'Hope Kitchen', distance: 2.5, capacity: 100, acceptedTypes: ['meals'], rating: 4.6 },
  { id: 'n3', name: 'Community Care', distance: 3.8, capacity: 150, acceptedTypes: ['meals', 'produce', 'bakery'], rating: 4.9 },
];

export const mockDonations: Donation[] = [
  { id: 'd1', vendorName: 'Green Bistro', foodType: 'Rice Bowls', quantity: 25, unit: 'meals', distance: 1.2, urgency: 'high', status: 'pending', createdAt: '5 min ago' },
  { id: 'd2', vendorName: 'Fresh Market', foodType: 'Sandwiches', quantity: 40, unit: 'meals', distance: 3.1, urgency: 'medium', status: 'pending', createdAt: '12 min ago' },
  { id: 'd3', vendorName: 'Baker\'s Delight', foodType: 'Pastries', quantity: 30, unit: 'pieces', distance: 0.8, urgency: 'low', status: 'accepted', createdAt: '1 hour ago' },
];

export const mockKPIs: KPIs = {
  predictedDemand: 360,
  surplusDetected: 50,
  foodSaved: 1240,
  peopleFed: 3860,
  impactScore: 87,
};
