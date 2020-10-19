import { CONSTANTS } from "../../constants/constants";
import NodeChecker from "./validators/nodeValidator";
import PythonChecker from "./validators/pythonValidator";
import NetCoreChecker from "./validators/netCoreValidator";

export default class RequirementsService {
  private validators: Map<string, IRequirementValidator>;

  constructor() {
    this.validators = new Map<string, IRequirementValidator>([
      [CONSTANTS.DEPENDENCY_CHECKER.NODE, new NodeChecker()],
      [CONSTANTS.DEPENDENCY_CHECKER.PYTHON, new PythonChecker()],
      [CONSTANTS.DEPENDENCY_CHECKER.NETCORE, new NetCoreChecker()],
    ]);
  }

  public async isInstalled(requirementName: string, minVersion: string) {
    const requirementValidator = this.validators.get(requirementName);
    const result = requirementValidator ? await requirementValidator.isInstalled(minVersion) : false;
    return result;
  }
}
