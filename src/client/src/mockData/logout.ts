interface ILogOutResponse {
  status: string;
  body: string;
}

const logOutOfAzure = (): Promise<ILogOutResponse> => {
  return Promise.resolve({
    status: "200 OK",
    body: "success"
  });
};

export default logOutOfAzure;
