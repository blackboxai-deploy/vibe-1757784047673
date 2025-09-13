export type ViolationType = 'Policy' | 'Content' | 'Advertising' | 'Privacy' | 'Safety';
export type ViolationSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type ViolationStatus = 'Active' | 'Under Review' | 'Resolved';

export interface PageReport {
  id: string;
  pageUrl: string;
  pageName: string;
  views: number;
  engagementRate: number;
  bounceRate: number;
  loadTime: number;
  violations: Violation[];
  lastUpdated: string;
  status: 'Active' | 'Inactive';
  category: string;
}

export interface Violation {
  id: string;
  type: ViolationType;
  severity: ViolationSeverity;
  status: ViolationStatus;
  description: string;
  detectedDate: string;
  resolvedDate?: string;
}

// Generate realistic page names and categories
const pageCategories = [
  'Product Pages', 'Category Pages', 'Blog Posts', 'Landing Pages', 
  'Checkout Pages', 'User Profiles', 'Search Results', 'Home Pages'
];

const productNames = [
  'Pink Sparkle Collection', 'Gus Premium Line', 'Shopco Essentials', 'Trendy Pink Series',
  'Gus Signature Items', 'Pink Fashion Hub', 'Shopco Accessories', 'Pink Beauty Range',
  'Gus Sport Collection', 'Pink Lifestyle Products', 'Shopco Home Decor', 'Pink Tech Gadgets'
];

const violationDescriptions: Record<ViolationType, string[]> = {
  'Policy': [
    'Terms of Service violation detected',
    'Age restriction policy not enforced',
    'Return policy information missing',
    'Privacy policy link broken'
  ],
  'Content': [
    'Inappropriate content detected',
    'Copyright infringement suspected',
    'Misleading product claims',
    'Adult content in general audience section'
  ],
  'Advertising': [
    'False advertising claims',
    'Unauthorized promotional content',
    'Price manipulation detected',
    'Deceptive marketing practices'
  ],
  'Privacy': [
    'Personal data exposed',
    'Cookie consent not obtained',
    'Data collection without permission',
    'User tracking without disclosure'
  ],
  'Safety': [
    'Security vulnerability detected',
    'Unsafe payment processing',
    'Malicious code detected',
    'SSL certificate expired'
  ]
};

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateViolations(pageId: string): Violation[] {
  const violationCount = Math.random() < 0.3 ? Math.floor(Math.random() * 3) + 1 : 0;
  const violations: Violation[] = [];
  
  for (let i = 0; i < violationCount; i++) {
    const types: ViolationType[] = ['Policy', 'Content', 'Advertising', 'Privacy', 'Safety'];
    const severities: ViolationSeverity[] = ['Critical', 'High', 'Medium', 'Low'];
    const statuses: ViolationStatus[] = ['Active', 'Under Review', 'Resolved'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const detectedDate = getRandomDate(new Date('2025-08-01'), new Date('2025-09-13'));
    const resolvedDate = status === 'Resolved' 
      ? getRandomDate(detectedDate, new Date('2025-09-13')).toISOString()
      : undefined;
    
    violations.push({
      id: `viol-${pageId}-${i + 1}`,
      type,
      severity,
      status,
      description: violationDescriptions[type][Math.floor(Math.random() * violationDescriptions[type].length)],
      detectedDate: detectedDate.toISOString(),
      resolvedDate
    });
  }
  
  return violations;
}

export function generatePageReports(count: number = 18790): PageReport[] {
  const reports: PageReport[] = [];
  
  for (let i = 1; i <= count; i++) {
    const category = pageCategories[Math.floor(Math.random() * pageCategories.length)];
    const productName = productNames[Math.floor(Math.random() * productNames.length)];
    const pageId = `page-${i.toString().padStart(5, '0')}`;
    
    const report: PageReport = {
      id: pageId,
      pageUrl: `https://pinkyshopco.com/${category.toLowerCase().replace(/\s+/g, '-')}/${productName.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      pageName: `${productName} - ${category}`,
      views: Math.floor(Math.random() * 50000) + 100,
      engagementRate: Math.round((Math.random() * 15 + 5) * 100) / 100,
      bounceRate: Math.round((Math.random() * 40 + 20) * 100) / 100,
      loadTime: Math.round((Math.random() * 3 + 0.5) * 100) / 100,
      violations: generateViolations(pageId),
      lastUpdated: getRandomDate(new Date('2025-09-01'), new Date('2025-09-13')).toISOString(),
      status: Math.random() > 0.1 ? 'Active' : 'Inactive',
      category
    };
    
    reports.push(report);
  }
  
  return reports;
}

export function getViolationStats(reports: PageReport[]) {
  let totalViolations = 0;
  let activeViolations = 0;
  let resolvedViolations = 0;
  let criticalViolations = 0;
  
  const violationsByType: Record<ViolationType, number> = {
    Policy: 0,
    Content: 0,
    Advertising: 0,
    Privacy: 0,
    Safety: 0
  };
  
  const violationsBySeverity: Record<ViolationSeverity, number> = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0
  };
  
  reports.forEach(report => {
    report.violations.forEach(violation => {
      totalViolations++;
      violationsByType[violation.type]++;
      violationsBySeverity[violation.severity]++;
      
      if (violation.status === 'Active') activeViolations++;
      if (violation.status === 'Resolved') resolvedViolations++;
      if (violation.severity === 'Critical') criticalViolations++;
    });
  });
  
  const complianceRate = Math.round(((reports.length - reports.filter(r => r.violations.length > 0).length) / reports.length) * 100);
  
  return {
    totalViolations,
    activeViolations,
    resolvedViolations,
    criticalViolations,
    violationsByType,
    violationsBySeverity,
    complianceRate,
    pagesWithViolations: reports.filter(r => r.violations.length > 0).length,
    cleanPages: reports.length - reports.filter(r => r.violations.length > 0).length
  };
}

export function getChartData(reports: PageReport[]) {
  // Generate monthly violations trend
  const monthlyViolations: Array<{
    month: string;
    violations: number;
    resolved: number;
    active: number;
  }> = [];
  const months = ['Aug', 'Sep'];
  
  months.forEach(month => {
    const monthViolations = reports.reduce((acc, report) => {
      const violations = report.violations.filter(v => 
        v.detectedDate.includes(month === 'Aug' ? '2025-08' : '2025-09')
      );
      return acc + violations.length;
    }, 0);
    
    monthlyViolations.push({
      month,
      violations: monthViolations,
      resolved: Math.floor(monthViolations * 0.7),
      active: Math.floor(monthViolations * 0.3)
    });
  });
  
  // Generate page performance data
  const performanceData = Array.from({ length: 10 }, (_, i) => ({
    name: `Week ${i + 1}`,
    views: Math.floor(Math.random() * 100000) + 50000,
    engagement: Math.round((Math.random() * 10 + 5) * 100) / 100,
    violations: Math.floor(Math.random() * 50) + 10
  }));
  
  return {
    monthlyViolations,
    performanceData
  };
}