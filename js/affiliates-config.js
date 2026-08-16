/**
 * ConvertsText - Centralized Affiliate Tracking & Partner Configuration
 * Manage all partner affiliate IDs and links across the site from a single file.
 */

const ConvertsAffiliates = {
  // Replace placeholder IDs with your official affiliate IDs once approved
  partners: {
    grammarly: {
      name: 'Grammarly',
      category: 'Grammar & Writing',
      network: 'Impact.com / CJ Affiliate',
      commission: '$0.20 per free signup + $20.00 per premium sale',
      defaultUrl: 'https://www.grammarly.com/',
      affiliateParam: '?utm_source=convertstext&utm_medium=affiliate',
      affiliateUrl: 'https://grammarly.com/?utm_source=convertstext'
    },
    quillbot: {
      name: 'QuillBot AI',
      category: 'Paraphrasing & AI',
      network: 'Impact.com',
      commission: '10% - 20% recurring monthly revenue share',
      defaultUrl: 'https://quillbot.com/',
      affiliateParam: '?ref=convertstext',
      affiliateUrl: 'https://quillbot.com/?ref=convertstext'
    },
    jasper: {
      name: 'Jasper AI',
      category: 'AI Copywriting & Marketing',
      network: 'FirstPromoter / PartnerStack',
      commission: '30% recurring lifetime commission',
      defaultUrl: 'https://www.jasper.ai/',
      affiliateParam: '?fpr=convertstext',
      affiliateUrl: 'https://www.jasper.ai/?fpr=convertstext'
    },
    copyscape: {
      name: 'Copyscape',
      category: 'Plagiarism Detection',
      network: 'Direct / Indigo Stream',
      commission: 'Pay-per-scan partner credits',
      defaultUrl: 'https://www.copyscape.com/',
      affiliateUrl: 'https://www.copyscape.com/'
    },
    hemingway: {
      name: 'Hemingway Editor',
      category: 'Readability & Style',
      network: 'Direct',
      commission: 'Desktop app license referral',
      defaultUrl: 'https://hemingwayapp.com/',
      affiliateUrl: 'https://hemingwayapp.com/'
    },
    notion: {
      name: 'Notion AI',
      category: 'Productivity & Workspace',
      network: 'Notion Affiliate Program (PartnerStack)',
      commission: '50% of all payments for first 12 months',
      defaultUrl: 'https://www.notion.so/',
      affiliateParam: '?fpr=convertstext',
      affiliateUrl: 'https://www.notion.so/?fpr=convertstext'
    },
    namecheap: {
      name: 'Namecheap',
      category: 'Domains & SSL',
      network: 'Impact.com',
      commission: '20% - 35% on all domain and hosting purchases',
      defaultUrl: 'https://www.namecheap.com/',
      affiliateUrl: 'https://www.namecheap.com/'
    },
    semrush: {
      name: 'Semrush',
      category: 'SEO & Content Optimization',
      network: 'Impact.com',
      commission: '$200 per new subscription + $10 per free trial',
      defaultUrl: 'https://www.semrush.com/',
      affiliateUrl: 'https://www.semrush.com/'
    }
  },

  /**
   * Helper to retrieve active tracked link for a partner
   */
  getLink(partnerKey) {
    const p = this.partners[partnerKey];
    return p ? (p.affiliateUrl || p.defaultUrl) : '#';
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConvertsAffiliates;
}
