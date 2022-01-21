import { createContext, useState } from 'react';

const AppContext = createContext([{}, () => {}])

const AppProvider = (props) => {
  const [state, setState] = useState({
    version: "4.2.3.5",
    steps: 1,
    addons: ["fm", "mb", "gt"],
    graph: {},
    aspects: [],
    combinations: {},
    initialLoad: false
  })

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }