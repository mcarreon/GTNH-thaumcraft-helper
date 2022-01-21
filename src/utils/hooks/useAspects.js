import { useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import usePrevious from './usePrevious'

import addonDict from "../../data/addon_dictionary.json";
import versionDict from "../../data/version_dictionary.json";
import translate from "../../data/translation_dictionary.json";

const useAspects = () => {
  const [state, setState] = useContext(AppContext);
  const prevVersion = usePrevious(state.version)

  useEffect(() => {
    if (!state.initialLoad || state.version !== prevVersion) {
      loadAspects()
    }
  }, [state.version])

  const setVersion = (ver) => {
    setState((state) => ({
      ...state,
      version: ver,
    }));
  };

  const setSteps = (steps) => {
    setState((state) => ({
      ...state,
      steps: steps,
    }));
  };
  
  const removeAddon = (addonToRemove) => {
    let newAddons = state.addons.filter((addon) => {
      return addon !== addonToRemove
    })

    setState((state) => ({
      ...state, 
      addons: newAddons
    }))
  }

  const addAddon = (addonToAdd) => {
    let newAddons = [...state.addons, addonToAdd]
    setState((state) => ({
      ...state, 
      addons: newAddons
    }))
  }

  const loadAspects = () => {
    const { version } = state;

    let aspects = [...versionDict[version]["base_aspects"]];
    let combinations = { ...versionDict[version]["combinations"] };

    let tierAspects = Object.keys(combinations);
    tierAspects = sortAspects(tierAspects);

    aspects = [...aspects, ...tierAspects, ...getAddonAspects()];
    combinations = { ...combinations, ...getAddonCombinations };

    let graph = buildGraph(combinations);

    setState((state) => ({
      ...state,
      aspects: aspects,
      graph: graph,
      combinations: combinations,
      initialLoad: true,
    }));
  };

  const getAddonAspects = () => {
    let addonAspects = [];

    state.addons.forEach((addonCode) => {
      addonAspects = [...addonAspects, ...addonDict[addonCode].aspects];
    });

    return sortAspects(addonAspects);
  };

  const getAddonCombinations = () => {
    let addonCombinations = {};

    state.addons.forEach((addonCode) => {
      addonDict[addonCode].aspects.forEach((aspect) => {
        addonCombinations[aspect] = addonDict[addonCode].combinations[aspect];
      });
    });

    return addonCombinations;
  };

  return {
    version: state.version,
    addons: state.addons,
    steps: state.steps,
    graph: state.graph,
    aspects: state.aspects,
    combinations: state.combinations,
    setVersion,
    setSteps,
    loadAspects,
    removeAddon, 
    addAddon,
  };
};

const buildGraph = (combinations) => {
  const graph = {};

  for (const compound in combinations) {
    connect(graph, compound, combinations[compound][0]);
    connect(graph, compound, combinations[compound][1]);
  }

  return graph;
};

const sortAspects = (aspects) => {
  let sortArr = [...aspects];

  sortArr.sort((a, b) => {
    if (translate[a] < translate[b]) return -1;
    if (translate[b] > translate[a]) return 1;
    return 0;
  });

  return sortArr;
};

const connect = (graph, aspect1, aspect2) => {
  addConnection(graph, aspect1, aspect2);
  addConnection(graph, aspect2, aspect1);
};

const addConnection = (graph, from, to) => {
  if (!(from in graph)) graph[from] = [];
  graph[from].push(to);
};

export default useAspects;
