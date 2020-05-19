interface AzureProfile {
  email: string;
  subscriptions: Subscription[];
}

interface Subscription {
  name: string;
  isMicrosoftLearn: boolean;
}

interface SubscriptionData {
  resourceGroups: ResourceGroup[];
  locations: AzureLocation[];
}

interface ResourceGroup {
  name: string;
}

interface AzureLocation {
  name: string;
}

export interface IServiceGroup {
  name: FormattedMessage.MessageDescriptor;
  description: FormattedMessage.MessageDescriptor;
  services: IService[];
}

export type IService = IOption & {  
  openModalAction?: IOpenModalAction;
  expectedPrice?: FormattedMessage.MessageDescriptor;
  expectedTime?: FormattedMessage.MessageDescriptor;
};
