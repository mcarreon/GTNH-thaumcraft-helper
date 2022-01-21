import React from 'react';

import { Select, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/system";

import useAspects from "../utils/hooks/useAspects";

import versionDictionary from "../data/version_dictionary";

const ToolbarDiv = styled("div")({
  height: 64,
  display: "flex",
  flexGrow: 0,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start"
});

const VersionPicker = () => {
  const { version, setVersion, loadAspects } = useAspects();

  const versions = Object.keys(versionDictionary);

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
  };

  return (
    <ToolbarDiv>
      <Select
        sx={{
          height: 40, 
          marginLeft: "5px",
          width: "105px",
        }}
        value={version}
        onChange={handleVersionChange}
      >
        {versions.map((ver, i) => {
          return <MenuItem value={ver} key={i}>{ver}</MenuItem>;
        })}
      </Select>
      <Typography variant="h6" sx={{ marginLeft: "30px"}}>TC Research Helper</Typography>
    </ToolbarDiv>
  );
};

export default VersionPicker 
