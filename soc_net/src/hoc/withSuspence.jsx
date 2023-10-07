import React from "react";
import Preloader from '../components/Common/Preloader/Preloader.jsx';



export const withSuspense = (Component) => {


    return (
      <React.Suspense fallback={<Preloader />}>
              <Component />
            </React.Suspense>
    )
}

export default withSuspense

