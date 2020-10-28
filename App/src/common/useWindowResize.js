import React, { useLayoutEffect, useState } from 'react';

// exemple de configuration à donner a ce hook
// const sizeConfig = [{
    //     maxWidTh: 768,
    //     name: "xs"
    // }]
// const windowSizeStatus = useWindowSize(sizeConfig)
// windowSizeStatus agira comme un state en prenant une valeur ("xs" par exemple dans ce cas)
// quand la width de la fenetre passe en dessous du maxWidth associé
    
export function useWindowSize(sizeConfig) {
    const initialState = () => {
        const width = window.innerWidth;
        let sizeName = ""
        let currentMax = 0
        sizeConfig.map((conf) => {
            if (width < conf.maxWidTh && (currentMax === 0 || conf.maxWidTh < currentMax))
                sizeName = conf.name
        })
        return sizeName
    }

    const [sizeName, setSizeName] = useState(initialState());
    const sizeRef = React.useRef(null)
    useLayoutEffect(() => {
      function updateSize() {
        const newName = initialState();
        if (sizeRef.current === null)
            sizeRef.current = sizeName
        if (newName !== sizeRef.current) {
            sizeRef.current = newName;
            setSizeName(newName);
        }
       
      }
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return sizeName;
  }
