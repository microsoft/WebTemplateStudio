export namespace NameGenerator {
  export function generateName(
    userProjectName: string,
    resourceType?: string
  ): string {
    const timestamp = unixToSuffix(Date.now());
    const suffix =
      resourceType === undefined ? timestamp : resourceType + "_" + timestamp;
    return userProjectName + "_" + suffix;
  }

  function unixToSuffix(unixTimestamp: any): string {
    const fullDate = new Date(unixTimestamp);
    const year = fullDate.getFullYear().toString();
    // getMonth() returns month as a zero-based value
    const month = (fullDate.getMonth() + 1).toString();
    const date = fullDate.getDate().toString();
    const hour = fullDate.getHours().toString();
    const min = fullDate.getMinutes().toString();
    const sec = fullDate.getSeconds().toString();
    return year.concat(month, date, hour, min, sec);
  }
}
