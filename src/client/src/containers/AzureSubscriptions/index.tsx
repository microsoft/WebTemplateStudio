import * as React from "react";
import { connect } from "react-redux";

import Card from "../../components/Card";

import buttonStyles from "../../css/buttonStyles.module.css";
import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";

import * as AzureActions from "../../actions/logOutAzure";
import * as ModalActions from "../../actions/modalActions";
import { isCosmosResourceCreatedSelector } from "../../selectors/cosmosServiceSelector";
import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";

import getAzureServiceOptions from "../../mockData/azureServiceOptions";
import { IOption } from "../../types/option";

interface IDispatchProps {
  startLogOutToAzure: () => any;
  openCosmosDbModal: () => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  isCosmosDbModalOpen: boolean;
  isCosmosResourceCreated: boolean;
}

interface IState {
  azureServices?: IOption[] | undefined;
}

type Props = IAzureLoginProps & IDispatchProps;

class AzureSubscriptions extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      azureServices: undefined
    };
  }
  public async componentDidMount() {
    const azureServices = await getAzureServiceOptions();
    this.setState({
      azureServices
    });
  }
  public isCosmosContent = (optionTitle: string): boolean => {
    return optionTitle.includes("Cosmos");
  }
  public isCosmosContentCreated = (optionTitle: string): boolean => {
    return this.props.isCosmosResourceCreated && this.isCosmosContent(optionTitle);
  }
  public resourceButtonContent = (optionTitle: string): string => {
    if (this.isCosmosContentCreated(optionTitle)) {
      return "Edit Resource";
    }
    return "Add Resource";
  };
  public render() {
    return (
      this.props.isLoggedIn != null && (
        <div className={styles.container}>
          {this.state.azureServices != null &&
            this.state.azureServices.map(option => (
              <div
                key={option.title}
                className={styles.subscriptionCardContainer}
              >
                <Card
                  cardTitle={option.title}
                  cardBody={option.body}
                  buttonText={this.resourceButtonContent(option.title)}
                  handleButtonClick={this.isCosmosContent(option.title) ? this.props.openCosmosDbModal : ()=>{}}
                  handleDetailsClick={() => {}}
                  svgUrl={option.svgUrl}
                  useNormalButtons={this.isCosmosContentCreated(option.title)}
                />
              </div>
            ))}
        </div>
      )
    );
  }
}

const mapStateToProps = (state: any): IAzureLoginProps => {
  const { isLoggedIn } = state.azureProfileData;
  return {
    isLoggedIn,
    isCosmosDbModalOpen: isCosmosDbModalOpenSelector(state),
    isCosmosResourceCreated: isCosmosResourceCreatedSelector(state)
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  startLogOutToAzure: () => {
    dispatch(AzureActions.startLogOutAzure());
  },
  openCosmosDbModal: () => {
    dispatch(ModalActions.openCosmosDbModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AzureSubscriptions);
