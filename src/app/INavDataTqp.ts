import {
  INavAttributes,
  INavBadge,
  INavLabel,
  INavLinkProps,
  INavWrapper
} from '@coreui/angular/lib/sidebar/app-sidebar-nav';
import { INavData } from '@coreui/angular';

export interface INavDataTqp {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
  // TQP Custom
  allow?: string;
}
