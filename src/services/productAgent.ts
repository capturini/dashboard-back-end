export class ProductAgent {
  private families = [
    "PET Extra 30 CL",
    "PET Ramy 1,25 L",
    "PET Extra 1,25 L",
    "PET Ramy Jus 2 L",
    "PET Extra Jus 2 L",
    "PET Frutty Jus 2 L",
    "PET Boisson Maltée 33 CL",
    "PET Boisson Energétique 33 CL",
    "Canette Jus 24 CL",
    "Canette Gazeifie 33 CL",
    "Canette Maltée 33 CL",
    "Water Fruits 33 CL",
    "Ramy Gazéifié 33 CL",
    "Ramy Kids 125 ML",
    "Pack Ramy 20 CL",
    "Pack Ramy 1 L",
    "Pack Ramy 2 L",
    "Pack Frutty Kids 20 CL",
    "Pack Frutty 20 CL",
    "Pack Frutty 1 L",
    "Pack Frutty 2 L",
    "Frutty Pack 1L * 6 PCS",
    "Ramy UP 125 ML",
    "Ramy UP 20 CL",
    "Water Fruits 1L",
    "Water Fruits 1.25L",
    "PET Milky 30CL",
    "PET Frutty 1.25L",
    "Ramy Extreme PET 25CL",
    "Pack Taiba 2 L",
    "Ramy Milk 1 L",
    "Ramy Kids 110 ML",
    "Pack Milky 20CL",
    "Ramy Duo 20 CL",
    "Ramy L'ben 1 kg",
    "Ramy Raîb 1kg",
    "Yaourt 1kg",
    "PET Taiba 1L",
    "Canette Pulpe 24 CL",
    "PET Milky 1L",
    "Pack Milky 1L",
    "Pack Premium 1L",
    "Canette Boisson Energetique 240ML",
    "Pack Premium 2L"
  ];

  constructor() {
    this.initialize();
  }

  async initialize() {
    // No initialization needed for simple string matching
  }

  async findProductFamily(productName: string) {
    // Normalize strings for better matching
    const normalizedInput = productName.toLowerCase().replace(/\s+/g, ' ').trim();
    
    // Try to find the best matching family
    const matchingFamily = this.families.find(family => {
      const normalizedFamily = family.toLowerCase();
      
      // Check if the base product type matches (e.g., "PET Extra 30 CL" matches "PET Extra Peche 30 CL")
      const baseMatch = normalizedInput.includes(normalizedFamily) || 
                       normalizedFamily.split(' ')
                         .filter(word => word.length > 2) // Ignore small words
                         .every(word => normalizedInput.includes(word));
      
      return baseMatch;
    });

    return matchingFamily ? {
      productName,
      family: matchingFamily,
      confidence: 1.0
    } : null;
  }

  async searchProduct(description: string) {
    // Find all families that match the description
    return this.families
      .filter(family => family.toLowerCase().includes(description.toLowerCase()))
      .map(family => ({
        name: family,
        family,
        confidence: 1.0
      }));
  }

  async verifyProduct(input: any) {
    return {
      id: input.id,
      name: input.name,
      verified: true,
      details: {
        quantity: input.quantity || 1,
        size: input.size || '',
        flavor: input.flavor || '',
        brand: input.brand || '',
        matchConfidence: 1.0
      }
    };
  }

  async addProduct(product: any) {
    // Store in memory if needed
    this.families.push(product.category);
  }
}