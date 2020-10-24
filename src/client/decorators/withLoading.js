const withLoading = (callback, setLoadingStatus) => async () => {
  try {
    setLoadingStatus(true);

    await callback();
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingStatus(false);
  }
};

export default withLoading;

