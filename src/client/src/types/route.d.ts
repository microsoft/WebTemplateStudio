export interface IRoutesNavItems {
  route: string;
  isSelected: boolean;
  wasVisited: boolean;
  index: number;
  messageDescriptor: ReactIntl.FormattedMessage.MessageDescriptor;
}
