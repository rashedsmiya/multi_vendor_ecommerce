// Re-export data table types
export * from './data-table.types';

// User type
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_operator?: boolean;
  [key: string]: any;
}

// Navigation types
export interface NavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
  permissions?: string[];
  active?: boolean;
  external?: boolean;
  [key: string]: any;
}

export interface DropdownPosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

// Breadcrumb type
export interface BreadcrumbItem {
  title: string;
  href?: string;
}

// Shared data interface for Inertia
export interface SharedData {
  auth: {
    user: User | null;
    [key: string]: any;
  };
  features?: Record<string, any>;
  appName?: string;
  ziggy?: {
    location: string;
    url: string;
    [key: string]: any;
  };
  [key: string]: any;
}
