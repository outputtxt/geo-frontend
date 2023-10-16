export const getHedefListesi = async (setHedefListesi) => {
  console.log("getHedefListesi called");
  try {
    const response = await fetch("https://baseURL/getHedefListesi");
    const data = await response.json();

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      setHedefListesi(data[0]);
      return;
    }
  } catch (error) {
    console.error("There was an error!", error);
  }

  // GET request using fetch with error handling
  // fetch("https://baseURL/getHedefListesi")
  //   .then(async (response) => {
  //     const data = await response.json();

  //     console.log(data);

  //     // check for error response
  //     if (!response.ok) {
  //       // get error message from body or default to response statusText
  //       const error = (data && data.message) || response.statusText;
  //       return Promise.reject(error);
  //     }

  //     //   this.setState({ totalReactPackages: data.total });
  //     console.log("successful call");
  //     return data;
  //   })
  //   .catch((error) => {
  //     //   this.setState({ errorMessage: error.toString() });
  //     console.error("There was an error!", error);
  //   });
};
