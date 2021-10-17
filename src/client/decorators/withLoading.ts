import { Dispatch, SetStateAction } from 'react';

const withLoading = (callback: () => void, setLoadingStatus: Dispatch<SetStateAction<boolean>>) => async () => {
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
