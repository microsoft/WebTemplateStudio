import { CONSTANTS } from "../../constants";
import NodeChecker from "./checkers/nodeChecker";
import PythonChecker from "./checkers/pythonChecker";
import NetCoreChecker from "./checkers/netCoreChecker";

export default class DependencyChecker {
  private checkers: Map<string, IDependencyChecker> = new Map<string, IDependencyChecker>();

  constructor() {
    this.checkers.set(CONSTANTS.DEPENDENCY_CHECKER.NODE, new NodeChecker());
    this.checkers.set(CONSTANTS.DEPENDENCY_CHECKER.PYTHON, new PythonChecker());
    this.checkers.set(CONSTANTS.DEPENDENCY_CHECKER.NETCORE, new NetCoreChecker());
  }

  public async hasDependency(name: string) {
    const checker = this.checkers.get(name);
    const result = checker ? await checker.hasDependency() : false;
    return result;
  }
}
