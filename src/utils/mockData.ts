export const mockData = {
  overview: {
    displayPresenceCount: 1250,
    activeSalesPoints: 850,
    shelfSharePercentage: 65.5,
    displayComplianceRate: 78.2
  },
  
  locations: {
    salesPoints: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Sales Point ${i + 1}`,
      address: `Address ${i + 1}, Algeria`,
      type: ['premium', 'standard', 'basic'][Math.floor(Math.random() * 3)],
      wilaya: `Wilaya ${Math.floor(Math.random() * 48) + 1}`,
      lastVisit: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      displayScore: Math.floor(Math.random() * 100)
    })),
    
    wilayas: Array.from({ length: 48 }, (_, i) => ({
      id: i + 1,
      name: `Wilaya ${i + 1}`,
      salesPointsCount: Math.floor(Math.random() * 100),
      activeDisplays: Math.floor(Math.random() * 80),
      complianceRate: Math.floor(Math.random() * 100)
    }))
  },

  team: {
    merchandisers: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Merchandiser ${i + 1}`,
      wilaya: `Wilaya ${Math.floor(Math.random() * 48) + 1}`,
      assignedAreas: Math.floor(Math.random() * 5) + 1,
      performanceScore: Math.floor(Math.random() * 100)
    })),
    
    supervisors: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Supervisor ${i + 1}`,
      region: `Region ${Math.floor(Math.random() * 5) + 1}`,
      teamSize: Math.floor(Math.random() * 10) + 1,
      performanceScore: Math.floor(Math.random() * 100)
    }))
  }
}; 