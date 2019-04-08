interface ILicenseObject {
  text: string;
  url: string;
}

type License = ILicenseObject | string;

export { ILicenseObject, License };
